
import FeaturedAndRecommended from "../components/organisms/home/FeaturedAndRecommended/FeaturedAndRecommended";
import BrowseByCategory from "../components/organisms/home/BrowseByCategory/BrowseByCategory";
import NewAndTrending from "../components/organisms/home/NewAndTrending/NewAndTrending";

export default function Home() {
  return (
    <section>
      <FeaturedAndRecommended />
      <BrowseByCategory />
      <NewAndTrending />
    </section>
  );
}
