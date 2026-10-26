"use client";
import Card from "@/components/Cards/Card/Card";
import { SeasonalAnilist } from "@/lib/Anilistfunction";
import { useState, useEffect } from "react";

const Season = ({ data: initialData }) => {
  const [items, setItems] = useState(initialData || []);
  const [visibleCount, setVisibleCount] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      setItems(initialData);
    }
  }, [initialData]);

  const handleLoadMore = async () => {
    const nextVisible = visibleCount + 10;
    setVisibleCount(nextVisible);

    if (nextVisible >= items.length - 3 && !loading) {
      setLoading(true);
      const nextPage = page + 1;
      const newItems = await SeasonalAnilist(nextPage);
      if (Array.isArray(newItems) && newItems.length > 0) {
        setItems((prev) => {
          const combined = [...prev, ...newItems];
          return Array.from(new Map(combined.map((it) => [it.id, it])).values());
        });
        setPage(nextPage);
      }
      setLoading(false);
    }
  };

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-12">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | Most Popular This Season
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {visibleItems.map((item, index) => (
          <Card data={item} key={item?.id || index} />
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

export default Season;