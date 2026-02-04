import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";

/** Logo slice shape (use Content.LogoSlice after running Slice Machine). */
type LogoSlice = prismic.SharedSlice<
  "logo",
  prismic.SharedSliceVariation<
    "default",
    {
      heading: prismic.RichTextField;
      logos: prismic.GroupField<{ logo: prismic.ImageField }>;
    },
    never
  >
>;

/**
 * Props for `Logo`.
 */
export type LogoProps = SliceComponentProps<LogoSlice>;

/**
 * Component for "Logo" Slices.
 */
const Logo: FC<LogoProps> = ({ slice }) => {
  return (
    <section
      id="relume"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[var(--color-background)] px-[5%] py-12 md:py-16 lg:py-20"
    >
      <div className="container grid grid-cols-1 items-start justify-start gap-x-12 gap-y-8 md:grid-cols-[max-content_1fr] md:items-center md:justify-between md:gap-y-4 lg:gap-x-16">
        <RichText
          field={slice.primary.heading}
          // classNames="font-bold leading-[1.2] text-[var(--color-text-primary)] md:max-w-[16rem] md:text-md md:leading-[1.2] lg:max-w-xxs"
          classNames="leading-[1.2] md:max-w-[16rem] lg:max-w-xs"
        />
        <div className="grid grid-cols-2 items-center justify-end gap-x-4 gap-y-4 pt-4 sm:grid-cols-3 md:gap-x-8 md:pt-0 lg:grid-cols-5">
          {slice.primary.logos.map((item) =>
            item.logo.url ? (
              <div
                key={item.logo.url}
                className="flex items-start justify-center justify-self-center px-4 py-3 md:p-0"
              >
                <PrismicNextImage
                  field={item.logo}
                  className="max-h-12 md:max-h-14 w-auto"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default Logo;
