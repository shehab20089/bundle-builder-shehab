import { useMemo } from "react";

import type { BundleProduct, StepId } from "../types/bundle-builder";
import {
  getBundleTotals,
  getProductActiveQuantity,
  getProductActiveVariantId,
  getSelectedLineItems,
  getSelectedProductTotalQuantity,
  getStepSelectedCount,
} from "../utils/bundle-builder-selectors";
import { useBundleBuilderStore } from "./use-bundle-builder-store";

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

  const selectedLineItems = useMemo(
    () => getSelectedLineItems(selections),
    [selections],
  );
  const { subtotal, compareTotal } = getBundleTotals(selectedLineItems);

  function getActiveVariantId(product: BundleProduct) {
    return getProductActiveVariantId(selections, product);
  }

  function getActiveQuantity(product: BundleProduct) {
    return getProductActiveQuantity(selections, product);
  }

  function getProductTotalQuantity(product: BundleProduct) {
    return getSelectedProductTotalQuantity(selections, product);
  }

  function selectedCountForStep(stepId: StepId) {
    return getStepSelectedCount(selections, stepId);
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
