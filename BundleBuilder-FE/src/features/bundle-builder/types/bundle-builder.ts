export type StepId = "cameras" | "plan" | "sensors" | "protection";

export type ProductVisualKind =
  | "cam-v4"
  | "cam-pan"
  | "floodlight"
  | "doorbell"
  | "battery-cam"
  | "plan"
  | "motion-sensor"
  | "hub"
  | "microsd";

export type ProductVariant = {
  id: string;
  label: string;
  swatch: string;
  imageSrc?: string;
};

export type BundleProduct = {
  id: string;
  stepId: StepId;
  title: string;
  description: string;
  price: number;
  compareAt?: number;
  badge?: string;
  learnMore?: string;
  visual: ProductVisualKind;
  imageSrc?: string;
  supportsQuantity?: boolean;
  variants?: ProductVariant[];
};

export type BundleStep = {
  id: StepId;
  stepNumber: number;
  title: string;
  nextLabel?: string;
  products: BundleProduct[];
};

export type ProductSelection = {
  activeVariantId: string;
  quantities: Record<string, number>;
};

export type SelectionState = Record<string, ProductSelection>;

export type FulfillmentItem = {
  id: string;
  label: string;
  price: number;
  compareAt: number;
};

export type ReviewLineItem = {
  key: string;
  productId: string;
  variantId: string;
  stepId: StepId;
  title: string;
  variantLabel?: string;
  quantity: number;
  price: number;
  compareAt?: number;
  visual: ProductVisualKind;
  imageSrc?: string;
};
