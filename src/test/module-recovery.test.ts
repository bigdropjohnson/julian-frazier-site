import { describe, expect, it } from "vitest";

import { isModuleImportFailure } from "@/lib/module-recovery";

describe("module import failure detection", () => {
  it("recognises the blank-screen module failure", () => {
    expect(isModuleImportFailure(new Error("Importing a module script failed."))).toBe(true);
  });

  it("recognises a chunk that could not be fetched", () => {
    expect(
      isModuleImportFailure(
        new Error("Failed to fetch dynamically imported module: http://localhost:8080/src/routes/photos.tsx"),
      ),
    ).toBe(true);
  });

  it("leaves unrelated errors alone", () => {
    expect(isModuleImportFailure(new Error("Cannot read properties of undefined"))).toBe(false);
    expect(isModuleImportFailure("boom")).toBe(false);
    expect(isModuleImportFailure(undefined)).toBe(false);
  });
});

describe("inline recovery script", () => {
  it("is valid standalone JavaScript", async () => {
    const { MODULE_RECOVERY_SCRIPT } = await import("@/lib/module-recovery");
    expect(() => new Function(MODULE_RECOVERY_SCRIPT)).not.toThrow();
  });
});

describe("error-screen recovery", () => {
  it("does not reload for errors that are not module load failures", async () => {
    const { reloadOnceForModuleFailure } = await import("@/lib/module-recovery");
    expect(reloadOnceForModuleFailure(new Error("Cannot read properties of undefined"))).toBe(false);
  });

  it("does not reload a second time once a reload was already tried", async () => {
    const { reloadOnceForModuleFailure, RELOAD_FLAG } = await import("@/lib/module-recovery");
    window.sessionStorage.setItem(RELOAD_FLAG, "1");
    expect(reloadOnceForModuleFailure(new Error("Importing a module script failed."))).toBe(false);
    window.sessionStorage.removeItem(RELOAD_FLAG);
  });
});

describe("missing-page recovery", () => {
  it("keeps the 404 when the server also says the page does not exist", async () => {
    const { reloadIfServerHasPage, RELOAD_FLAG } = await import("@/lib/module-recovery");
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response("", { status: 404 })) as typeof fetch;
    try {
      expect(await reloadIfServerHasPage()).toBe(false);
      expect(window.sessionStorage.getItem(RELOAD_FLAG)).toBeNull();
    } finally {
      globalThis.fetch = realFetch;
    }
  });
});
