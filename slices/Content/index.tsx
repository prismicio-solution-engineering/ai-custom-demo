import { FC } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { ContentSlice } from "@/prismicio-types";

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const Content: FC<ContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for content (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default Content;
