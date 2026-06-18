import { create } from "zustand";

import {
  bundleProducts,
  bundleSteps,
  getDefaultSelection,
  initialSelections,
} from "../apis/bundle-builder-data";
import type {
  BundleProduct,
  ProductSelection,
  SelectionState,
  StepId,
} from "../types/bundle-builder";
import { loadSavedConfiguration, saveConfiguration } from "../utils/storage";

const productById = new Map(
  bundleProducts.map((product) => [product.id, product]),
);

type BundleBuilderStore = {
  openStep: StepId;
  selections: SelectionState;
  setOpenStep: (stepId: StepId) => void;
  selectVariant: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    amount: number,
    variantId?: string,
  ) => void;
  goToNextStep: (stepId: StepId) => void;
  saveCurrentConfiguration: () => boolean;
};

export function createInitialSelectionState(savedSelections?: SelectionState) {
  return bundleProducts.reduce<SelectionState>((state, product) => {
    const defaultSelection = getDefaultSelection(product);
    const initialSelection = initialSelections[product.id];
    const savedSelection = savedSelections?.[product.id];

    state[product.id] = {
      ...defaultSelection,
      ...initialSelection,
      ...savedSelection,
      quantities: {
        ...defaultSelection.quantities,
        ...initialSelection?.quantities,
        ...savedSelection?.quantities,
      },
    };

    return state;
  }, {});
}

export function getSelection(
  state: SelectionState,
  product: BundleProduct,
): ProductSelection {
  return state[product.id] ?? getDefaultSelection(product);
}

export function getQuantityForSelection(
  selection: ProductSelection,
  variantId: string,
) {
  return selection.quantities[variantId] ?? 0;
}

export function getProductTotal(selection: ProductSelection) {
  return Object.values(selection.quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );
}

const savedConfiguration = loadSavedConfiguration();

export const useBundleBuilderStore = create<BundleBuilderStore>((set, get) => ({
  openStep: savedConfiguration?.openStep ?? "cameras",
  selections: createInitialSelectionState(savedConfiguration?.selections),
  setOpenStep: (openStep) => set({ openStep }),
  selectVariant: (productId, variantId) => {
    set((current) => {
      const product = productById.get(productId);

      if (!product) {
        return current;
      }

      const selection = getSelection(current.selections, product);

      return {
        selections: {
          ...current.selections,
          [productId]: {
            ...selection,
            activeVariantId: variantId,
          },
        },
      };
    });
  },
  updateQuantity: (productId, amount, variantId) => {
    set((current) => {
      const product = productById.get(productId);

      if (!product) {
        return current;
      }

      const selection = getSelection(current.selections, product);
      const quantityKey = variantId ?? selection.activeVariantId;
      const nextQuantity = Math.max(
        0,
        getQuantityForSelection(selection, quantityKey) + amount,
      );

      return {
        selections: {
          ...current.selections,
          [productId]: {
            ...selection,
            quantities: {
              ...selection.quantities,
              [quantityKey]: nextQuantity,
            },
          },
        },
      };
    });
  },
  goToNextStep: (stepId) => {
    const currentIndex = bundleSteps.findIndex((step) => step.id === stepId);
    const nextStep = bundleSteps[currentIndex + 1];

    if (nextStep) {
      set({ openStep: nextStep.id });
    }
  },
  saveCurrentConfiguration: () => {
    const { openStep, selections } = get();

    return saveConfiguration({ openStep, selections });
  },
}));
