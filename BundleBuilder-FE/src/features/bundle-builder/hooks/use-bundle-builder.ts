import { useMemo, useState } from "react";

import {
  bundleProducts,
  bundleSteps,
  getDefaultSelection,
  initialSelections,
} from "../apis/bundle-builder-data";
import type {
  BundleProduct,
  ProductSelection,
  ReviewLineItem,
  SelectionState,
  StepId,
} from "../types/bundle-builder";

const productById = new Map(
  bundleProducts.map((product) => [product.id, product]),
);

function createInitialSelectionState() {
  return bundleProducts.reduce<SelectionState>((state, product) => {
    state[product.id] = {
      ...getDefaultSelection(product),
      ...initialSelections[product.id],
      quantities: {
        ...initialSelections[product.id]?.quantities,
      },
    };

    return state;
  }, {});
}

function getSelection(
  state: SelectionState,
  product: BundleProduct,
): ProductSelection {
  return state[product.id] ?? getDefaultSelection(product);
}

function getQuantityForSelection(
  selection: ProductSelection,
  variantId: string,
) {
  return selection.quantities[variantId] ?? 0;
}

function getProductTotal(selection: ProductSelection) {
  return Object.values(selection.quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  );
}

export function useBundleBuilder() {
  const [openStep, setOpenStep] = useState<StepId>("cameras");
  const [selections, setSelections] = useState(createInitialSelectionState);

  const selectedLineItems = useMemo<ReviewLineItem[]>(() => {
    return bundleProducts.flatMap((product) => {
      const selection = getSelection(selections, product);

      return Object.entries(selection.quantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([variantId, quantity]) => {
          const variant = product.variants?.find(
            (item) => item.id === variantId,
          );

          return {
            key: `${product.id}:${variantId}`,
            productId: product.id,
            variantId,
            stepId: product.stepId,
            title: product.title,
            variantLabel: variant?.label,
            quantity,
            price: product.price,
            compareAt: product.compareAt,
            visual: product.visual,
            imageSrc: product.imageSrc ?? variant?.imageSrc,
          };
        });
    });
  }, [selections]);

  const subtotal = selectedLineItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const compareTotal = selectedLineItems.reduce(
    (total, item) => total + (item.compareAt ?? item.price) * item.quantity,
    0,
  );

  function getActiveVariantId(product: BundleProduct) {
    return getSelection(selections, product).activeVariantId;
  }

  function getActiveQuantity(product: BundleProduct) {
    const selection = getSelection(selections, product);

    return getQuantityForSelection(selection, selection.activeVariantId);
  }

  function getProductTotalQuantity(product: BundleProduct) {
    return getProductTotal(getSelection(selections, product));
  }

  function selectedCountForStep(stepId: StepId) {
    const step = bundleSteps.find((item) => item.id === stepId);

    if (!step) {
      return 0;
    }

    return step.products.filter((product) => {
      return getProductTotalQuantity(product) > 0;
    }).length;
  }

  function selectVariant(productId: string, variantId: string) {
    setSelections((current) => {
      const product = productById.get(productId);

      if (!product) {
        return current;
      }

      const selection = getSelection(current, product);

      return {
        ...current,
        [productId]: {
          ...selection,
          activeVariantId: variantId,
        },
      };
    });
  }

  function updateQuantity(
    productId: string,
    amount: number,
    variantId?: string,
  ) {
    setSelections((current) => {
      const product = productById.get(productId);

      if (!product) {
        return current;
      }

      const selection = getSelection(current, product);
      const quantityKey = variantId ?? selection.activeVariantId;
      const nextQuantity = Math.max(
        0,
        getQuantityForSelection(selection, quantityKey) + amount,
      );

      return {
        ...current,
        [productId]: {
          ...selection,
          quantities: {
            ...selection.quantities,
            [quantityKey]: nextQuantity,
          },
        },
      };
    });
  }

  function goToNextStep(stepId: StepId) {
    const currentIndex = bundleSteps.findIndex((step) => step.id === stepId);
    const nextStep = bundleSteps[currentIndex + 1];

    if (nextStep) {
      setOpenStep(nextStep.id);
    }
  }

  return {
    openStep,
    setOpenStep,
    selectedLineItems,
    subtotal,
    compareTotal,
    getActiveVariantId,
    getActiveQuantity,
    getProductTotalQuantity,
    selectedCountForStep,
    selectVariant,
    updateQuantity,
    goToNextStep,
  };
}
