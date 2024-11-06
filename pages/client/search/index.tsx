import LayoutClient from "@/layouts/layout-client";
import SearchResultPage from "@/components/home-search";

export default function HomeSearch() {
  return (
    <LayoutClient title="Home Search">
      <SearchResultPage />
    </LayoutClient>
  );
}
