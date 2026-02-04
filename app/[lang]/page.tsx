import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { getLanguages } from "@/utils/getLanguages";
import { HeaderNav } from "@/components/HeaderNav";
import Container from "@/components/Container";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const client = createClient();

  let page;
  try {
    page = await client.getSingle("home", {
      lang,
    });
  } catch (error) {
    // Try to fall back to the default locale (en-us)
    try {
      page = await client.getSingle("home", {
        lang: "en-us",
      });
    } catch (fallbackError) {
      notFound();
    }
  }

  const [header, footer, settings, languages] = await Promise.all([
    client
      .getSingle("header", {
        lang,
      })
      .catch(() =>
        client.getSingle("header", {
          lang: "en-us",
        }),
      ),

    client
      .getSingle("footer", {
        lang,
      })
      .catch(() =>
        client.getSingle("footer", {
          lang: "en-us",
        }),
      ),

    client
      .getSingle("settings", {
        lang,
      })
      .catch(() =>
        client.getSingle("settings", {
          lang: "en-us",
        }),
      ),

    getLanguages(page, client),
  ]);

  return (
    <Container size="full" className="mx-auto py-10">
      <HeaderNav header={header} settings={settings} />
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ lang }}
      />
    </Container>
  );
}
