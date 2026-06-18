import type {
  BundleProduct,
  BundleStep,
  ProductSelection,
  SelectionState,
} from "../types/bundle-builder";

import cam1BlackThumbnail from "../../../../Images/cam1-black.png";
import cam1GreyThumbnail from "../../../../Images/cam1-grey.png";
import cam1WhiteThumbnail from "../../../../Images/cam1-white.png";
import cam1Image from "../../../../Images/cam1.png";
import cam2BlackThumbnail from "../../../../Images/cam2-black.png";
import cam2WhiteThumbnail from "../../../../Images/cam2-white.png";
import cam2Image from "../../../../Images/cam2.png";
import cam3BlackThumbnail from "../../../../Images/cam3-black.png";
import cam3WhiteThumbnail from "../../../../Images/cam3-white.png";
import cam3Image from "../../../../Images/cam3.png";
import cam4Image from "../../../../Images/cam4.png";
import cam5BlackThumbnail from "../../../../Images/cam5-black.png";
import cam5Image from "../../../../Images/cam5.png";

const camV4Variants = [
  {
    id: "white",
    label: "White",
    swatch: "bg-white",
    imageSrc: cam1WhiteThumbnail,
  },
  {
    id: "gray",
    label: "Grey",
    swatch: "bg-slate-300",
    imageSrc: cam1GreyThumbnail,
  },
  {
    id: "black",
    label: "Black",
    swatch: "bg-zinc-950",
    imageSrc: cam1BlackThumbnail,
  },
];

const camPanVariants = [
  {
    id: "white",
    label: "White",
    swatch: "bg-white",
    imageSrc: cam2WhiteThumbnail,
  },
  {
    id: "black",
    label: "Black",
    swatch: "bg-zinc-950",
    imageSrc: cam2BlackThumbnail,
  },
];

const floodlightVariants = [
  {
    id: "white",
    label: "White",
    swatch: "bg-white",
    imageSrc: cam3WhiteThumbnail,
  },
  {
    id: "black",
    label: "Black",
    swatch: "bg-zinc-950",
    imageSrc: cam3BlackThumbnail,
  },
];

const batteryCamVariants = [
  {
    id: "white",
    label: "White",
    swatch: "bg-white",
    imageSrc: cam5Image,
  },
  {
    id: "black",
    label: "Black",
    swatch: "bg-zinc-950",
    imageSrc: cam5BlackThumbnail,
  },
];

export const bundleSteps: BundleStep[] = [
  {
    id: "cameras",
    stepNumber: 1,
    title: "Choose your cameras",
    nextLabel: "Next: Choose your plan",
    products: [
      {
        id: "cam-v4",
        stepId: "cameras",
        title: "Wyze Cam v4",
        description: "The clearest Wyze Cam ever made.",
        learnMore: "Learn More",
        badge: "Save 22%",
        price: 27.98,
        compareAt: 35.98,
        visual: "cam-v4",
        imageSrc: cam1Image,
        variants: camV4Variants,
      },
      {
        id: "cam-pan-v3",
        stepId: "cameras",
        title: "Wyze Cam Pan v3",
        description: "360 pan and 180 tilt security camera.",
        learnMore: "Learn More",
        badge: "Save 13%",
        price: 34.98,
        compareAt: 39.98,
        visual: "cam-pan",
        imageSrc: cam2Image,
        variants: camPanVariants,
      },
      {
        id: "floodlight-v2",
        stepId: "cameras",
        title: "Wyze Cam Floodlight v2",
        description: "2K floodlight camera with a 160 degree view.",
        learnMore: "Learn More",
        badge: "Save 11%",
        price: 89.98,
        compareAt: 99.98,
        visual: "floodlight",
        imageSrc: cam3Image,
        variants: floodlightVariants,
      },
      {
        id: "duo-cam-doorbell",
        stepId: "cameras",
        title: "Wyze Duo Cam Doorbell",
        description: "Two cameras. Two views. One front-door view.",
        learnMore: "Learn More",
        price: 69.98,
        visual: "doorbell",
        imageSrc: cam4Image,
      },
      {
        id: "battery-cam-pro",
        stepId: "cameras",
        title: "Wyze Battery Cam Pro",
        description: "Wire-free protection with 2.5K video.",
        learnMore: "Learn More",
        price: 95.98,
        visual: "battery-cam",
        imageSrc: cam5Image,
        variants: batteryCamVariants,
      },
    ],
  },
  {
    id: "plan",
    stepNumber: 2,
    title: "Choose your plan",
    nextLabel: "Next: Choose your sensors",
    products: [
      {
        id: "cam-unlimited",
        stepId: "plan",
        title: "Cam Unlimited",
        description: "Unlimited event recording for every camera in your home.",
        price: 10,
        compareAt: 12.99,
        visual: "plan",
      },
    ],
  },
  {
    id: "sensors",
    stepNumber: 3,
    title: "Choose your sensors",
    nextLabel: "Next: Add extra protection",
    products: [
      {
        id: "motion-sensor",
        stepId: "sensors",
        title: "Wyze Sense Motion Sensor",
        description: "Detects movement in halls, rooms, and entryways.",
        price: 9.99,
        compareAt: 13.33,
        visual: "motion-sensor",
      },
      {
        id: "sense-hub",
        stepId: "sensors",
        title: "Wyze Sense Hub (Required)",
        description: "Connects sensors and keeps your system online.",
        price: 0,
        compareAt: 0,
        visual: "hub",
      },
    ],
  },
  {
    id: "protection",
    stepNumber: 4,
    title: "Add extra protection",
    products: [
      {
        id: "microsd-card",
        stepId: "protection",
        title: "Wyze MicroSD Card (256GB)",
        description: "Local recording storage for continuous backup.",
        price: 24.99,
        compareAt: 34.98,
        visual: "microsd",
      },
    ],
  },
];

export const initialSelections: SelectionState = {
  "cam-v4": {
    activeVariantId: "black",
    quantities: {
      black: 1,
    },
  },
  "cam-pan-v3": {
    activeVariantId: "black",
    quantities: {
      black: 2,
    },
  },
  "cam-unlimited": {
    activeVariantId: "default",
    quantities: {
      default: 1,
    },
  },
  "motion-sensor": {
    activeVariantId: "default",
    quantities: {
      default: 3,
    },
  },
  "sense-hub": {
    activeVariantId: "default",
    quantities: {
      default: 1,
    },
  },
  "microsd-card": {
    activeVariantId: "default",
    quantities: {
      default: 2,
    },
  },
};

export const fulfillmentItems = [
  {
    id: "shipping",
    label: "Fast Shipping",
    compareAt: 5.99,
    price: 0,
  },
];

export const bundleProducts: BundleProduct[] = bundleSteps.flatMap(
  (step) => step.products,
);

export function getDefaultSelection(product: BundleProduct): ProductSelection {
  return {
    activeVariantId: product.variants?.[0]?.id ?? "default",
    quantities: {},
  };
}
