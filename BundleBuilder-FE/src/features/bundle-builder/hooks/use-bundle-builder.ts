import { useMemo } from "react";

import { bundleProducts, bundleSteps } from "../apis/bundle-builder-data";
import type {
  BundleProduct,
  ReviewLineItem,
  StepId,
} from "../types/bundle-builder";
import {
  getProductTotal,
  getQuantityForSelection,
  getSelection,
  useBundleBuilderStore,
} from "./use-bundle-builder-store";

export function useBundleBuilder() {
  const openStep = useBundleBuilderStore((state) => state.openStep);
  const selections = useBundleBuilderStore((state) => state.selections);
  const setOpenStep = useBundleBuilderStore((state) => state.setOpenStep);
  const selectVariant = useBundleBuilderStore((state) => state.selectVariant);
  const updateQuantity = useBundleBuilderStore((state) => state.updateQuantity);
  const goToNextStep = useBundleBuilderStore((state) => state.goToNextStep);
  const saveCurrentConfiguration = useBundleBuilderStore(
    (state) => state.saveCurrentConfiguration,
  );

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
    saveCurrentConfiguration,
  };
}
