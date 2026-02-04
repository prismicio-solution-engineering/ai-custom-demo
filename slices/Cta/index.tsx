import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<Content.CtaSlice>;

/**
 * Component for "Cta" Slices.
 */
const Cta: FC<CtaProps> = ({ slice }) => {
  if (slice.variation === "default") {
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container grid w-full grid-cols-1 items-start justify-between gap-6 md:grid-cols-[1fr_max-content] md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div className="md:mr-12 lg:mr-0">
            <div className="w-full max-w-lg">
              <RichText
                field={slice.primary.title}
                classNames="mb-3 text-4xl font-bold leading-[1.2] text-foreground md:mb-4 md:text-5xl lg:text-6xl"
              />
              <RichText
                field={slice.primary.txt}
                classNames="text-(--color-text-secondary) md:text-md"
              />
            </div>
          </div>
          <div className="flex items-start justify-start gap-4">
            {slice.primary.btns.map((button, index) => (
              <Button
                key={button.key ?? index}
                field={button}
                variant={
                  button.variant === "Secondary" ? "secondary" : "primary"
                }
                size="md"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "twoColumn") {
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container grid grid-rows-1 items-start gap-y-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20 lg:gap-y-16">
          <RichText
            field={slice.primary.title}
            classNames="text-5xl font-bold text-foreground md:text-7xl lg:text-8xl"
          />
          <div>
            <RichText
              field={slice.primary.txt}
              classNames="text-(--color-text-secondary) md:text-md"
            />
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {slice.primary.btns.map((button, index) => (
                <Button
                  key={button.key ?? index}
                  field={button}
                  variant={
                    button.variant === "Secondary" ? "secondary" : "primary"
                  }
                  size="md"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Cta;
