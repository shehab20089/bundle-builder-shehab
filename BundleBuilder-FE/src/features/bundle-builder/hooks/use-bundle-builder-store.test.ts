import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  createInitialSelectionState,
  getQuantityForSelection,
  useBundleBuilderStore,
} from "./use-bundle-builder-store";
import { loadSavedConfiguration, saveConfiguration } from "../utils/storage";

function createMemoryStorage() {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
    clear: vi.fn(() => {
      values.clear();
    }),
  };
}

describe("bundle builder store", () => {
  beforeEach(() => {
    useBundleBuilderStore.setState({
      openStep: "cameras",
      selections: createInitialSelectionState(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("tracks quantities separately per active variant", () => {
    const store = useBundleBuilderStore.getState();

    store.selectVariant("cam-v4", "white");
    store.updateQuantity("cam-v4", 2);
    store.selectVariant("cam-v4", "black");

    const selection = useBundleBuilderStore.getState().selections["cam-v4"];

    expect(getQuantityForSelection(selection, "white")).toBe(2);
    expect(getQuantityForSelection(selection, "black")).toBe(1);
  });

  it("saves and reloads an explicit configuration", () => {
    const localStorage = createMemoryStorage();
    vi.stubGlobal("window", { localStorage });

    const selections = createInitialSelectionState();

    expect(saveConfiguration({ openStep: "sensors", selections })).toBe(true);
    expect(loadSavedConfiguration()).toEqual({
      version: 1,
      openStep: "sensors",
      selections,
    });
  });

  it("saves the current Zustand configuration on demand", () => {
    const localStorage = createMemoryStorage();
    vi.stubGlobal("window", { localStorage });

    useBundleBuilderStore.getState().setOpenStep("protection");

    expect(useBundleBuilderStore.getState().saveCurrentConfiguration()).toBe(
      true,
    );
    expect(loadSavedConfiguration()?.openStep).toBe("protection");
  });
});
