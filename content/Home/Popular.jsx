"use client";
import Card from "@/components/Cards/Card/Card";
import { PopularAnilist } from "@/lib/Anilistfunction";
import { useEffect, useState } from "react";

const Popular = () => {
  const [page, setPage] = useState(1);
  const [popularData, setPopularData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const getPopular = async () => {
      setLoading(true);
      const data = await PopularAnilist(page);
      if (!isCancelled) {
        setPopularData((prev) => {
          const combined = [...prev, ...data];
          // Remove duplicates
          const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());
          return unique;
        });
        setLoading(false);
      }
    };
    getPopular();
    return () => {
      isCancelled = true;
    };
  }, [page]);

  const handleLoadMore = () => {
    const nextVisible = visibleCount + 10;
    setVisibleCount(nextVisible);
    if (nextVisible >= popularData.length - 5 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const visibleItems = popularData.slice(0, visibleCount);

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | Most Popular
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {visibleItems.map((item, index) => (
          <Card data={item} key={item?.id || index} />
        ))}
        {loading && visibleItems.length === 0
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} index={index} loading />
            ))
          : null}
      </div>

      <div className="mt-8 w-full flex justify-center">
        <button
          type="button"
          disabled={loading && visibleItems.length === 0}
          className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2.5 rounded-lg text-slate-200 transition font-medium select-none disabled:opacity-50"
          onClick={handleLoadMore}
        >
          {loading ? "Memuat..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Popular;