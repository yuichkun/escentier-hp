/// <reference types="astro/client" />

declare module "dom-to-image-more";
interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}

declare module "*.vs" {
  const content: string;
  export default content;
}

declare module "*.fs" {
  const content: string;
  export default content;
}
