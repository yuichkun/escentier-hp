import contentful from "contentful";
import type { EntryFieldTypes } from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
interface Works {
  contentTypeId: "works";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText;
    preview: any;
  };
}

export const getWorks = async () => {
  const entries = (
    await contentfulClient.getEntries<Works>({
      content_type: "works",
    })
  ).items.map((item) => {
    // const entry = entries[0].fields.preview.fields;
    return (item.fields.preview as any).fields;
  });

  return entries;
};
