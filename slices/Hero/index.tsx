import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
  PrismicLink,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 py-24 md:py-32 bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Title */}
        <div className="mb-6 text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)]">
          <PrismicRichText field={slice.primary.title} />
        </div>

        {/* Description */}
        <div className="mb-10 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          <PrismicRichText field={slice.primary.description} />
        </div>

        {/* Buttons */}
        {slice.primary.buttons && slice.primary.buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {slice.primary.buttons.map((button, index) => (
              <PrismicLink
                key={index}
                field={button}
                className={
                  button.variant === "Primary"
                    ? "inline-block px-6 py-3 text-sm font-medium text-[var(--color-button-primary-text)] bg-[var(--color-button-primary-bg)] border border-[var(--color-button-primary-bg)] rounded transition-colors hover:opacity-90"
                    : "inline-block px-6 py-3 text-sm font-medium text-[var(--color-button-secondary-text)] bg-[var(--color-button-secondary-bg)] border border-[var(--color-button-secondary-border)] rounded transition-colors hover:opacity-80"
                }
              >
                {button.text || "Button"}
              </PrismicLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
