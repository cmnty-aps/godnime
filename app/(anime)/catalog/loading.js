export default function CatalogLoading() {
  return (
    <div className="w-full min-h-screen bg-[#12111a] text-white pt-[106px] pb-28 px-4 sm:px-8 max-w-[96rem] mx-auto animate-pulse select-none">
      {/* Small top border separation */}
      <div className="w-full h-[1px] bg-[#212029] mb-4" />

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="w-32 h-8 bg-[#1a1828] rounded-lg" />
        <div className="w-36 h-9 bg-[#1a1828] rounded-xl" />
      </div>

      {/* Main Content Layout Skeleton */}
      <div className="flex gap-4 max-[780px]:flex-col">
        {/* Left Options Filter Panel Skeleton */}
        <div className="w-full max-[780px]:w-full min-[781px]:w-64 shrink-0 bg-[#161424] rounded-2xl p-4 space-y-4 border border-[#221f33]">
          <div className="w-24 h-5 bg-[#242136] rounded" />
          <div className="space-y-3">
            <div className="w-full h-10 bg-[#242136] rounded-xl" />
            <div className="w-full h-10 bg-[#242136] rounded-xl" />
            <div className="w-full h-10 bg-[#242136] rounded-xl" />
            <div className="w-full h-10 bg-[#242136] rounded-xl" />
          </div>
        </div>

        {/* Anime Cards Grid Skeleton */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-[9/14] bg-[#1a1828] rounded-2xl border border-[#221f33]" />
              <div className="w-3/4 h-4 bg-[#1a1828] rounded mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
