export default function WatchLoading() {
  return (
    <div className="w-full min-h-screen bg-[#12111a] text-white pt-[106px] pb-28 px-4 sm:px-8 max-w-[96rem] mx-auto animate-pulse select-none">
      {/* Episode Selector & Video Player Layout Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        {/* Episode Selector Panel Skeleton */}
        <div className="w-full lg:w-80 shrink-0 bg-[#161424] rounded-2xl p-4 space-y-3 border border-[#221f33] order-2 lg:order-1">
          <div className="w-32 h-5 bg-[#242136] rounded" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-9 bg-[#242136] rounded-xl" />
            ))}
          </div>
        </div>

        {/* Video Player Box Skeleton */}
        <div className="flex-1 aspect-[16/9] bg-[#1a1828] rounded-2xl border border-[#221f33] order-1 lg:order-2 flex items-center justify-center">
          <div className="w-16 h-16 bg-[#242136] rounded-full" />
        </div>
      </div>

      {/* Anime Info & Rating Skeleton */}
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-10 pb-8 border-b border-[#221f33]">
        <div className="space-y-3 flex-1">
          <div className="w-3/4 h-8 bg-[#1a1828] rounded-lg" />
          <div className="flex gap-2">
            <div className="w-16 h-6 bg-[#1a1828] rounded-full" />
            <div className="w-20 h-6 bg-[#1a1828] rounded-full" />
            <div className="w-16 h-6 bg-[#1a1828] rounded-full" />
          </div>
          <div className="w-full h-16 bg-[#1a1828] rounded-xl" />
        </div>
        <div className="w-48 h-24 bg-[#1a1828] rounded-2xl shrink-0" />
      </div>

      {/* Comments & Recommendations Layout Skeleton */}
      <div className="flex flex-col min-[1125px]:flex-row gap-5 mb-10">
        {/* Comments Panel Skeleton */}
        <div className="flex-1 bg-[#161424] rounded-2xl p-4 h-64 border border-[#221f33] space-y-4">
          <div className="w-36 h-6 bg-[#242136] rounded" />
          <div className="w-full h-12 bg-[#242136] rounded-xl" />
        </div>

        {/* Recommendations Panel Skeleton */}
        <div className="w-full min-[1125px]:max-w-[24rem] shrink-0 space-y-3">
          <div className="w-36 h-6 bg-[#1a1828] rounded mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#1a1827] border border-[#2a273e] rounded-2xl p-3 flex gap-3 h-[106px] items-center">
              <div className="w-[80px] h-[90px] bg-[#242136] rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-4/5 h-4 bg-[#242136] rounded" />
                <div className="w-1/2 h-3 bg-[#242136] rounded" />
                <div className="w-1/3 h-3 bg-[#242136] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
