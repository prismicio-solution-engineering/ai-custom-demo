import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/components/RichText";

/** Filled star icon for rating (matches BiSolidStar). */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  if (slice.variation === "default") {
    const stars = (rate: "5" | "4" | null) =>
      Math.min(5, rate === "5" || rate === "4" ? Number(rate) : 5);

    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
            <RichText
              field={slice.primary.title}
              classNames="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl"
              components={{
                heading2: ({ children }) => (
                  <h1 className="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl">
                    {children}
                  </h1>
                ),
              }}
            />
            <RichText
              field={slice.primary.txt}
              classNames="text-[var(--color-text-secondary)] md:text-md"
              components={{
                paragraph: ({ children }) => (
                  <p className="text-[var(--color-text-secondary)] md:text-md">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          <div className="columns-1 gap-x-8 md:columns-2 lg:columns-3">
            {slice.primary.grp.map((testimonial, index) => {
              const starCount = stars(testimonial.rate);
              return (
                <div
                  key={testimonial.img.url ?? index}
                  className="mb-8 inline-block w-full border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
                >
                  <div className="mb-5 flex md:mb-6" aria-hidden>
                    {Array(starCount)
                      .fill(null)
                      .map((_, starIndex) => (
                        <StarIcon
                          key={starIndex}
                          className="mr-1 size-6 text-[var(--brand-primary)]"
                        />
                      ))}
                  </div>
                  <RichText
                    field={testimonial.quote}
                    classNames="text-[var(--color-text-secondary)] md:text-md"
                  />
                  <div className="mt-5 flex w-full flex-col items-start gap-4 md:mt-6 md:w-fit md:flex-row md:items-center">
                    {testimonial.img.url ? (
                      <PrismicNextImage
                        field={testimonial.img}
                        width={48}
                        height={48}
                        className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                      />
                    ) : null}
                    <div>
                      <RichText
                        field={testimonial.author}
                        classNames="font-semibold text-[var(--color-text-primary)]"
                      />
                      <RichText
                        field={testimonial.company}
                        classNames="text-[var(--color-text-secondary)]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "variation1") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16"
      >
        <p className="text-[var(--color-text-secondary)]">
          Testimonials variation 1 – customize in slices/Testimonials/index.tsx
        </p>
      </section>
    );
  }

  if (slice.variation === "variation2") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16"
      >
        <p className="text-[var(--color-text-secondary)]">
          Testimonials variation 2 – customize in slices/Testimonials/index.tsx
        </p>
      </section>
    );
  }

  return null;
};

export default Testimonials;
