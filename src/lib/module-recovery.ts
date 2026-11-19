// A stale module graph — a dev-server full reload, or a deploy that replaced the
// chunk files a tab had already loaded — makes module imports fail with
// "Importing a module script failed." and the screen goes blank. Recover by
// reloading once; the guard keeps a genuine failure from reloading forever.
//
// The recovery ships as an inline classic <script> in the document head (see
// MODULE_RECOVERY_SCRIPT), not as part of the app bundle: when the entry module
// itself fails to load, no bundled code ever runs, so a bundled handler could
// never catch the very failure it exists for.

export const RELOAD_FLAG = "l5e-module-reload-attempted";
const CLEAR_AFTER_MS = 3_000;
const FRESH_FETCH_TIMEOUT_MS = 5_000;
const IMAGE_RETRIES = 2;
const IMAGE_RETRY_DELAY_MS = 1_500;

export const MODULE_FAILURE_SIGNATURES = [
  "importing a module script failed",
  "failed to fetch dynamically imported module",
  "error loading dynamically imported module",
  "unable to preload css",
  "could not fetch module",
  "module script failed",
];

export function isModuleImportFailure(reason: unknown): boolean {
  const error = reason as { message?: unknown } | null | undefined;
  const text = `${typeof error?.message === "string" ? error.message : ""} ${String(reason)}`.toLowerCase();
  return MODULE_FAILURE_SIGNATURES.some((signature) => text.includes(signature));
}

// Plain ES5 so it runs before, and independently of, the module bundle.
// A plain reload is not enough when the browser keeps serving a stale copy of
// the entry file from its cache (seen in the preview: the tab ran a bundle that
// was hours old), so first re-download every module file on the page with
// cache: "reload" to overwrite the cached copies, then reload.
export const MODULE_RECOVERY_SCRIPT = `(function(){
var FLAG=${JSON.stringify(RELOAD_FLAG)};
var SIGS=${JSON.stringify(MODULE_FAILURE_SIGNATURES)};
function isFailure(r){
  var m=r&&typeof r.message==="string"?r.message:"";
  var t=(m+" "+String(r)).toLowerCase();
  for(var i=0;i<SIGS.length;i++){if(t.indexOf(SIGS[i])!==-1)return true;}
  return false;
}
function reloadFresh(){
  var urls=[];
  var els=document.querySelectorAll('script[type="module"][src],link[rel="modulepreload"][href]');
  for(var i=0;i<els.length;i++){
    var u=els[i].src||els[i].href;
    if(u&&u.indexOf(location.origin)===0&&urls.indexOf(u)===-1)urls.push(u);
  }
  var done=false;
  function go(){if(done)return;done=true;location.reload();}
  setTimeout(go,${FRESH_FETCH_TIMEOUT_MS});
  if(!window.fetch||!window.Promise||!urls.length){go();return;}
  Promise.all(urls.map(function(u){return fetch(u,{cache:"reload",credentials:"same-origin"}).catch(function(){});})).then(go,go);
}
window.__l5eReloadFresh=reloadFresh;
function reloadOnce(){
  try{if(sessionStorage.getItem(FLAG))return;sessionStorage.setItem(FLAG,"1");}catch(e){return;}
  reloadFresh();
}
setTimeout(function(){try{sessionStorage.removeItem(FLAG);}catch(e){}},${CLEAR_AFTER_MS});
// A photo can fail briefly while the server restarts; try it again a couple of times.
window.addEventListener("error",function(e){
  var img=e&&e.target;
  if(!img||img.tagName!=="IMG"||!img.src||img.src.indexOf(location.origin)!==0)return;
  var n=+(img.getAttribute("data-retry")||0);
  if(n>=${IMAGE_RETRIES})return;
  img.setAttribute("data-retry",String(n+1));
  setTimeout(function(){
    var u=img.src.replace(/([?&])retry=\\d+&?/,"$1").replace(/[?&]$/,"");
    img.src=u+(u.indexOf("?")===-1?"?":"&")+"retry="+(n+1);
  },${IMAGE_RETRY_DELAY_MS}*(n+1));
},true);
window.addEventListener("error",function(e){
  var el=e&&e.target;
  if(el&&el.tagName==="SCRIPT"&&el.type==="module"&&el.src&&el.src.indexOf(location.origin)===0){reloadOnce();return;}
  if(isFailure(e.error||e.message))reloadOnce();
},true);
window.addEventListener("unhandledrejection",function(e){if(isFailure(e.reason))reloadOnce();});
// An out-of-date copy of the app catches the failure in its own error screen and
// only logs it, so no window event fires. Watch the logs for the same signatures.
["error","warn"].forEach(function(level){
  var orig=console[level];
  if(typeof orig!=="function")return;
  console[level]=function(){
    try{for(var i=0;i<arguments.length;i++){if(isFailure(arguments[i])){reloadOnce();break;}}}catch(e){}
    return orig.apply(this,arguments);
  };
});
})();`;

// Reload after refreshing cached module files when the inline script is present.
export function reloadWithFreshModules(): void {
  const fresh = (window as unknown as { __l5eReloadFresh?: () => void }).__l5eReloadFresh;
  if (typeof fresh === "function") fresh();
  else window.location.reload();
}

// For failures the router catches itself (a page's code failing to load while
// switching pages) and hands to the error screen instead of the window.
// Returns false when a reload was already tried, so the error screen shows.
export function reloadOnceForModuleFailure(error: unknown): boolean {
  if (typeof window === "undefined" || !isModuleImportFailure(error)) return false;
  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return false;
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    return false;
  }
  reloadWithFreshModules();
  return true;
}

// An out-of-date copy of the site can also be missing newer pages and show
// "Page not found" for a page that exists. Ask the server: if it has the page,
// reload once with fresh files instead of showing the 404.
export async function reloadIfServerHasPage(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(RELOAD_FLAG)) return false;
  } catch {
    return false;
  }
  let exists = false;
  try {
    const res = await fetch(window.location.href, {
      cache: "no-store",
      credentials: "same-origin",
      headers: { accept: "text/html" },
    });
    exists = res.ok;
  } catch {
    return false;
  }
  if (!exists) return false;
  try {
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
  } catch {
    return false;
  }
  reloadWithFreshModules();
  return true;
}
