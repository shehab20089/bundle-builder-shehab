import { bundleProducts, bundleSteps } from "../apis/bundle-builder-data";
import type {
  BundleProduct,
  ReviewLineItem,
  SelectionState,
  StepId,
} from "../types/bundle-builder";
import {
  getProductTotal,
  getQuantityForSelection,
  getSelection,
} from "./selections";

export function getSelectedLineItems(selections: SelectionState) {
  return bundleProducts.flatMap<ReviewLineItem>((product) => {
    const selection = getSelection(selections, product);

    return Object.entries(selection.quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([variantId, quantity]) => {
        const variant = product.variants?.find((item) => item.id === variantId);

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
}

export function getBundleTotals(lineItems: ReviewLineItem[]) {
  return lineItems.reduce(
    (totals, item) => {
      totals.subtotal += item.price * item.quantity;
      totals.compareTotal += (item.compareAt ?? item.price) * item.quantity;

      return totals;
    },
    { subtotal: 0, compareTotal: 0 },
  );
}

export function getProductActiveVariantId(
  selections: SelectionState,
  product: BundleProduct,
) {
  return getSelection(selections, product).activeVariantId;
}

export function getProductActiveQuantity(
  selections: SelectionState,
  product: BundleProduct,
) {
  const selection = getSelection(selections, product);

  return getQuantityForSelection(selection, selection.activeVariantId);
}

export function getSelectedProductTotalQuantity(
  selections: SelectionState,
  product: BundleProduct,
) {
  return getProductTotal(getSelection(selections, product));
}

export function getStepSelectedCount(
  selections: SelectionState,
  stepId: StepId,
) {
  const step = bundleSteps.find((item) => item.id === stepId);

  if (!step) {
    return 0;
  }

  return step.products.filter((product) => {
    return getSelectedProductTotalQuantity(selections, product) > 0;
  }).length;
}
