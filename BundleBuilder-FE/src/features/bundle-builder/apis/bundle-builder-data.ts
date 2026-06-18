import type {
  BundleProduct,
  BundleStep,
  FulfillmentItem,
  ProductSelection,
  ProductVariant,
  SelectionState,
} from "../types/bundle-builder";
import bundleBuilderData from "./bundle-builder-data.json";

import cam1BlackThumbnail from "../assets/images/cam1-black.png";
import cam1GreyThumbnail from "../assets/images/cam1-grey.png";
import cam1WhiteThumbnail from "../assets/images/cam1-white.png";
import cam1Image from "../assets/images/cam1.png";
import cam2BlackThumbnail from "../assets/images/cam2-black.png";
import cam2WhiteThumbnail from "../assets/images/cam2-white.png";
import cam2Image from "../assets/images/cam2.png";
import cam3BlackThumbnail from "../assets/images/cam3-black.png";
import cam3WhiteThumbnail from "../assets/images/cam3-white.png";
import cam3Image from "../assets/images/cam3.png";
import cam4Image from "../assets/images/cam4.png";
import cam5BlackThumbnail from "../assets/images/cam5-black.png";
import cam5Image from "../assets/images/cam5.png";
import microSdImage from "../assets/images/microSd1.png";
import senseImage from "../assets/images/sense1.png";
import senseHubImage from "../assets/images/Wyse1.png";

const productImages = {
  cam1: cam1Image,
  cam1Black: cam1BlackThumbnail,
  cam1Grey: cam1GreyThumbnail,
  cam1White: cam1WhiteThumbnail,
  cam2: cam2Image,
  cam2Black: cam2BlackThumbnail,
  cam2White: cam2WhiteThumbnail,
  cam3: cam3Image,
  cam3Black: cam3BlackThumbnail,
  cam3White: cam3WhiteThumbnail,
  cam4: cam4Image,
  cam5: cam5Image,
  cam5Black: cam5BlackThumbnail,
  microSd: microSdImage,
  sense: senseImage,
  senseHub: senseHubImage,
} satisfies Record<string, string>;

type ProductImageKey = keyof typeof productImages;

type RawProductVariant = Omit<ProductVariant, "imageSrc"> & {
  imageKey?: ProductImageKey;
};

type RawBundleProduct = Omit<BundleProduct, "imageSrc" | "variants"> & {
  imageKey?: ProductImageKey;
  variants?: RawProductVariant[];
};

type RawBundleStep = Omit<BundleStep, "products"> & {
  products: RawBundleProduct[];
};

type BundleBuilderJson = {
  steps: RawBundleStep[];
  initialSelections: SelectionState;
  fulfillmentItems: FulfillmentItem[];
};

const rawData = bundleBuilderData as BundleBuilderJson;

export const bundleSteps: BundleStep[] = rawData.steps.map((step) => ({
  ...step,
  products: step.products.map((product) => ({
    ...product,
    imageSrc: resolveImage(product.imageKey),
    variants: product.variants?.map((variant) => ({
      ...variant,
      imageSrc: resolveImage(variant.imageKey),
    })),
  })),
}));

export const initialSelections: SelectionState = rawData.initialSelections;

export const fulfillmentItems: FulfillmentItem[] = rawData.fulfillmentItems;

export const bundleProducts: BundleProduct[] = bundleSteps.flatMap(
  (step) => step.products,
);

export function getDefaultSelection(product: BundleProduct): ProductSelection {
  return {
    activeVariantId: product.variants?.[0]?.id ?? "default",
    quantities: {},
  };
}

function resolveImage(imageKey: ProductImageKey | undefined) {
  if (!imageKey) {
    return undefined;
  }

  return productImages[imageKey];
}
