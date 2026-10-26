"use client";
import TrendingCard from "@/components/Cards/TrendingCard/TrendingCard";
import { TrendingAnilist } from "@/lib/Anilistfunction";
import { Fragment, useState, useEffect, useMemo } from "react";

const Trending = ({ data: initialData }) => {
  const [items, setItems] = useState(initialData || []);
  const [visibleCount, setVisibleCount] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setItems(initialData);
    }
  }, [initialData]);

  const filteredItems = useMemo(() => {
    if (!items || !Array.isArray(items)) return [];
    
    const filtered = items.filter(
      (item) =>
        item &&
        item.bannerImage !== null &&
        item.status !== "NOT_YET_RELEASED"
    );

    return filtered.length > 0 ? filtered : items;
  }, [items]);

  const handleLoadMore = async () => {
    const nextVisible = visibleCount + 10;
    setVisibleCount(nextVisible);

    // If approaching the end of loaded items, fetch the next page from AniList
    if (nextVisible >= filteredItems.length - 3 && !loading) {
      setLoading(true);
      const nextPage = page + 1;
      const newItems = await TrendingAnilist(nextPage);
      if (Array.isArray(newItems) && newItems.length > 0) {
        setItems((prev) => {
          const combined = [...prev, ...newItems];
          // Filter unique
          return Array.from(new Map(combined.map((it) => [it.id, it])).values());
        });
        setPage(nextPage);
      }
      setLoading(false);
    }
  };

  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 max-[1270px]:bottom-0 max-[1270px]:mt-6 max-[1270px]:mb-8">
      <h1 className="text-[#ffffffbd] font-medium text-3xl font-['poppins'] max-[1270px]:text-2xl max-[1270px]:text-[#f6f4f4ea]">
        | Currently Trending
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {visibleItems.map((item, index) => (
          <Fragment key={item?.id || index}>
            <TrendingCard info={item} />
          </Fragment>
        ))}
      </div>

      <div className="mt-8 w-full flex justify-center">
        <button
          type="button"
          disabled={loading}
          className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2.5 rounded-lg text-slate-200 transition font-medium select-none disabled:opacity-50"
          onClick={handleLoadMore}
        >
          {loading ? "Memuat..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Trending;