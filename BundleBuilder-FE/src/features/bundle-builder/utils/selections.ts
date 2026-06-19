import { getDefaultSelection } from "../apis/bundle-builder-data";
import type {
  BundleProduct,
  ProductSelection,
  SelectionState,
} from "../types/bundle-builder";

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
