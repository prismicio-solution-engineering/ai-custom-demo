import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import type {
  FaqSliceVariation1Primary,
  FaqSliceVariation1PrimaryGrpItem,
  FaqSliceVariation2Primary,
  FaqSliceVariation2PrimaryGrpItem,
} from "@/prismicio-types";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  if (slice.variation === "default") {
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-[.75fr,1fr] lg:gap-x-20">
          <div>
            <RichText
              field={slice.primary.title}
              // classNames="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl"
              classNames="mb-5 md:mb-6"
            />
            <RichText
              field={slice.primary.txt}
              // classNames="text-[var(--color-text-secondary)] md:text-md"
            />
            <div className="mt-6 md:mt-8">
              <Button
                field={slice.primary.btn}
                variant={
                  slice.primary.btn?.variant === "Secondary"
                    ? "secondary"
                    : "primary"
                }
                size="md"
              >
                {(slice.primary.btn as { text?: string } | null)?.text ??
                  "Contact"}
              </Button>
            </div>
          </div>
          <div className="space-y-0">
            {slice.primary.grp.map((item, index) => (
              <details
                key={index}
                className="group border-b border-[var(--color-border)]"
              >
                <summary className="flex list-none cursor-pointer items-center justify-between py-4 text-left text-[var(--color-text-primary)] md:py-5 md:text-md [&::-webkit-details-marker]:hidden">
                  <RichText
                    field={item.question}
                    classNames="font-semibold !text-3xl"
                  />
                  <span
                    className="ml-2 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-4 text-[var(--color-text-secondary)] md:pb-6">
                  <RichText
                    field={item.answer}
                    // classNames="text-[var(--color-text-secondary)] md:text-md"
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "variation1") {
    const primary = slice.primary as FaqSliceVariation1Primary;
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
            <RichText
              field={primary.title}
              // classNames="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl"
              classNames="mb-5 md:mb-6"
            />
            <RichText
              field={primary.txt}
              // classNames="text-[var(--color-text-secondary)] md:text-md"
            />
          </div>
          <div>
            {primary.grp.map((item: FaqSliceVariation1PrimaryGrpItem, index: number) => (
              <div
                key={index}
                className="grid auto-cols-fr grid-cols-1 items-start gap-x-10 gap-y-4 border-t border-[var(--color-border)] pb-10 pt-5 sm:grid-cols-[0.75fr_1fr] md:gap-x-12 md:gap-y-16 md:pb-12 md:pt-6 lg:gap-x-16 lg:gap-y-20"
              >
                <RichText
                  field={item.question}
                  classNames="font-bold text-[var(--color-text-primary)] !text-3xl"
                />
                <RichText
                  field={item.answer}
                  // classNames="text-[var(--color-text-secondary)] md:text-md"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-18 lg:mt-20">
            <RichText
              field={primary.title_foot}
              // classNames="mb-3 text-2xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl"
              classNames="mb-3 md:mb-4 md:leading-[1.3]"
            />
            <RichText
              field={primary.txt_foot}
              // classNames="text-[var(--color-text-secondary)] md:text-md"
            />
            <div className="mt-6 md:mt-8">
              <Button
                field={primary.btn}
                variant={
                  primary.btn?.variant === "Secondary" ? "secondary" : "primary"
                }
                size="md"
              >
                {(primary.btn as { text?: string } | null)?.text ?? "Contact"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "variation2") {
    const primary = slice.primary as FaqSliceVariation2Primary;
    return (
      <section
        id="relume"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="bg-[var(--color-background)] px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container max-w-lg">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <RichText
              field={primary.title}
              // classNames="mb-5 text-5xl font-bold text-[var(--color-text-primary)] md:mb-6 md:text-7xl lg:text-8xl"
              classNames="mb-5 md:mb-6 md:text-7xl"
            />
            <RichText
              field={primary.txt}
              // classNames="text-[var(--color-text-secondary)] md:text-md"
            />
          </div>
          <div className="space-y-0">
            {primary.grp.map((item: FaqSliceVariation2PrimaryGrpItem, index: number) => (
              <details
                key={index}
                className="group border-b border-[var(--color-border)]"
              >
                <summary className="flex list-none cursor-pointer items-center justify-between py-4 text-left text-[var(--color-text-primary)] md:py-5 md:text-md [&::-webkit-details-marker]:hidden">
                  <RichText
                    field={item.question}
                    classNames="font-semibold !text-3xl"
                  />
                  <span
                    className="ml-2 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-4 text-[var(--color-text-secondary)] md:pb-6">
                  <RichText
                    field={item.answer}
                    // classNames="text-[var(--color-text-secondary)] md:text-md"
                  />
                </div>
              </details>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
            <RichText
              field={primary.title_foot}
              // classNames="mb-3 text-2xl font-bold text-[var(--color-text-primary)] md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl"
              classNames="mb-3 md:mb-4 md:leading-[1.3]"
            />
            <RichText
              field={primary.txt_foot}
              // classNames="text-[var(--color-text-secondary)] md:text-md"
            />
            <div className="mt-6 md:mt-8">
              <Button
                field={primary.btn}
                variant={
                  primary.btn?.variant === "Secondary" ? "secondary" : "primary"
                }
                size="md"
              >
                {(primary.btn as { text?: string } | null)?.text ?? "Contact"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Faq;
