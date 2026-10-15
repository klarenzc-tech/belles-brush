import { Hero } from "@/components/home/hero";
import { Welcome } from "@/components/home/welcome";
import { FeaturedArtwork } from "@/components/home/featured-artwork";
import { InspiredByNature } from "@/components/home/inspired-by-nature";
import { HeartBehindBrush } from "@/components/home/heart-behind-brush";
import { JoinJourney } from "@/components/home/join-journey";
import { getFeaturedArtworks } from "@/lib/content";

export default async function HomePage() {
  const featured = await getFeaturedArtworks(6);
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedArtwork artworks={featured} />
      <InspiredByNature />
      <HeartBehindBrush />
      <JoinJourney />
    </>
  );
}
