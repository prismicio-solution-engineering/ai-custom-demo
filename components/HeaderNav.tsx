"use client";

import { useState, useEffect } from "react";
import { PrismicNextLink } from "@prismicio/next";
import type { HeaderDocument, SettingsDocument } from "@/prismicio-types";
import type { NavigationLinksSlice } from "@/prismicio-types";
import { Button } from "@/components/Button";
import { motion, AnimatePresence } from "motion/react";
import { LinkField } from "@prismicio/client";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const handler = () => setMatches(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const topLineVariants = {
  open: { translateY: 8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};
const middleLineVariants = {
  open: { width: 0, transition: { duration: 0.1 } },
  closed: { width: "1.5rem", transition: { delay: 0.3, duration: 0.2 } },
};
const bottomLineVariants = {
  open: { translateY: -8, transition: { delay: 0.1 } },
  rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
  closed: { translateY: 0, rotate: 0, transition: { duration: 0.2 } },
};

function isWithSublinks(
  slice: NavigationLinksSlice
): slice is Extract<NavigationLinksSlice, { variation: "withSublinks" }> {
  return slice.variation === "withSublinks";
}

export function HeaderNav({
  header,
  settings,
}: {
  header: HeaderDocument;
  settings: SettingsDocument | null;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const data = header.data;
  const navSlices = data.slices ?? [];
  const ctas = data.ctas ?? [];

  return (
    <section
      id="relume"
      className="z-999 flex w-full items-center border-b border-[var(--color-border)] bg-[var(--color-background)] lg:min-h-18 lg:px-[5%]"
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <PrismicNextLink href="/" className="flex shrink-0 items-center">
            <img
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </PrismicNextLink>
          <button
            type="button"
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-[var(--color-text-primary)]"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={topLineVariants}
              aria-hidden
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-[var(--color-text-primary)]"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={middleLineVariants}
              aria-hidden
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-[var(--color-text-primary)]"
              animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
              variants={bottomLineVariants}
              aria-hidden
            />
          </button>
        </div>
        <motion.div
          variants={{
            open: { height: "var(--height-open, 100dvh)" },
            close: { height: "var(--height-closed, 0)" },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navSlices.map((slice, index) => {
            if (
              isWithSublinks(slice) &&
              slice.primary.sublinks &&
              slice.primary.sublinks.length > 0
            ) {
              return (
                <SubMenu
                  key={`${slice.variation}-${index}`}
                  link={slice.primary.link}
                  sublinks={slice.primary.sublinks}
                  isMobile={isMobile}
                />
              );
            }
            return (
              <Button
                key={`${slice.variation}-${index}`}
                variant="text"
                field={slice.primary.link}
                className="block py-3 text-[var(--color-text-primary)] first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
              />
            );
          })}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            {ctas.map((button, index) => (
              <Button
                key={button.key ?? index}
                field={button}
                variant={
                  button.variant === "Secondary"
                    ? "secondary"
                    : button.variant === "Link"
                      ? "link"
                      : "primary"
                }
                size="sm"
              >
                {(button as { text?: string }).text ?? "Button"}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SubMenu({
  link,
  sublinks,
  isMobile,
}: {
  link: LinkField;
  sublinks: LinkField[];
  isMobile: boolean;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const linkText = (link as { text?: string })?.text ?? "Link";

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 py-3 text-left text-[var(--color-text-primary)] lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <span>{linkText}</span>
        <motion.span
          variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--color-text-primary)]"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            variants={{
              open: {
                visibility: "visible",
                opacity: 1,
                y: 0,
              },
              close: {
                visibility: "hidden",
                opacity: 0,
                y: "-10%",
              },
            }}
            animate="open"
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-background)] lg:absolute lg:left-0 lg:top-full lg:z-500 lg:min-w-48 lg:border lg:border-[var(--color-border)] lg:p-2"
            aria-label="Submenu"
          >
            {sublinks.map((sub, i) => (
              <PrismicNextLink
                key={i}
                field={sub}
                className="block py-3 pl-[5%] text-[var(--color-text-primary)] lg:px-4 lg:py-2 lg:text-base"
              >
                {(sub as { text?: string })?.text ?? "Sublink"}
              </PrismicNextLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
