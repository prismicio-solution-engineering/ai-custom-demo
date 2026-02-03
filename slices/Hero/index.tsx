import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
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
