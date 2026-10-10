import type { Metadata } from "next";
import { headers } from "next/headers";
import { HomeLoader } from "@/components/app/HomeLoader";
import { LIVE_CITIES, nearestCity } from "@/lib/cities";

export const metadata: Metadata = {
  title: { absolute: "BikeSim: feel your bike ride before you go" },
  description: `See how stressful every block of a bike trip will be, then ride it virtually. ${LIVE_CITIES.length} US cities.`,
  alternates: { canonical: "/" },
};

// The home page is a map, not a landing page: the city nearest the visitor (Vercel's IP location headers;
// DC when unknown) shows behind a panel of every city to pick from.
export default async function Home() {
  const h = await headers();
  const city = nearestCity(Number(h.get("x-vercel-ip-latitude")), Number(h.get("x-vercel-ip-longitude")));
  return (
    <main>
      <h1 className="sr-only">BikeSim: feel it before you ride it. Pick a city.</h1>
      <HomeLoader slug={city.slug} />
    </main>
  );
}
