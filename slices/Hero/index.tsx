import { FC } from "react";
import type * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/** Primary with optional image for With background image variation (types update after Slice Machine push). */
type HeroPrimaryWithImage = HeroProps["slice"]["primary"] & {
  image?: prismic.ImageField;
};

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  if ((slice.variation as string) === "withBackgroundImage") {
    const primary = slice.primary as HeroPrimaryWithImage;
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative px-[5%]"
      >
        <div className="container relative z-10">
          <div className="flex max-h-240 min-h-svh items-center justify-center py-16 text-center md:py-24 lg:py-28">
            <div className="w-full max-w-lg">
              <RichText
                field={slice.primary.title}
                classNames="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl"
              />
              <RichText
                field={slice.primary.description}
                classNames="text-text-alternative md:text-md"
              />
              <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
                {slice.primary.buttons.map((button, index) => (
                  <Button
                    key={button.key ?? index}
                    field={button}
                    variant="primary"
                    size="md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {primary.image?.url && (
            <PrismicNextImage
              field={primary.image}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="relume"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[5%] py-16 md:py-24 lg:py-28"
    >
      <div className="container">
        <div className="mx-auto w-full max-w-lg text-center">
          <RichText
            field={slice.primary.title}
            classNames="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl"
          />
          <RichText field={slice.primary.description} classNames="md:text-md" />

          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {slice.primary.buttons.map((button) => (
              <Button
                key={button.key}
                field={button}
                variant="primary"
                size="md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
