import type { SelectionState, StepId } from "../types/bundle-builder";

const storageKey = "bundle-builder:saved-configuration";
const storageVersion = 1;
const validStepIds = new Set<StepId>([
  "cameras",
  "plan",
  "sensors",
  "protection",
]);

export type SavedBundleBuilderConfiguration = {
  version: typeof storageVersion;
  openStep: StepId;
  selections: SelectionState;
};

type UnsavedBundleBuilderConfiguration = Omit<
  SavedBundleBuilderConfiguration,
  "version"
>;

export function loadSavedConfiguration() {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const savedValue = window.localStorage.getItem(storageKey);

    if (!savedValue) {
      return null;
    }

    const parsedValue = JSON.parse(savedValue) as unknown;

    if (!isSavedConfiguration(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function saveConfiguration(
  configuration: UnsavedBundleBuilderConfiguration,
) {
  if (!canUseLocalStorage()) {
    return false;
  }

  const savedConfiguration: SavedBundleBuilderConfiguration = {
    version: storageVersion,
    ...configuration,
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(savedConfiguration));

    return true;
  } catch {
    return false;
  }
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isSavedConfiguration(
  value: unknown,
): value is SavedBundleBuilderConfiguration {
  if (!value || typeof value !== "object") {
    return false;
  }

  const configuration = value as Partial<SavedBundleBuilderConfiguration>;

  return (
    configuration.version === storageVersion &&
    typeof configuration.openStep === "string" &&
    validStepIds.has(configuration.openStep) &&
    isSelectionState(configuration.selections)
  );
}

function isSelectionState(value: unknown): value is SelectionState {
  if (!value || typeof value !== "object") {
    return false;
  }

  return Object.values(value).every((selection) => {
    if (!selection || typeof selection !== "object") {
      return false;
    }

    const candidate = selection as {
      activeVariantId?: unknown;
      quantities?: unknown;
    };

    return (
      typeof candidate.activeVariantId === "string" &&
      isQuantityRecord(candidate.quantities)
    );
  });
}

function isQuantityRecord(value: unknown): value is Record<string, number> {
  if (!value || typeof value !== "object") {
    return false;
  }

  return Object.values(value).every((quantity) => typeof quantity === "number");
}
