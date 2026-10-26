export default function ContinueWatchingLoading() {
  return (
    <div className="w-full min-h-screen bg-[#12111a] text-white pt-[106px] pb-32 px-4 sm:px-8 max-w-[96rem] mx-auto select-none animate-pulse">
      {/* Page Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#221f33] mb-8">
        <div className="space-y-2">
          <div className="w-48 h-8 bg-[#1a1828] rounded-lg" />
          <div className="w-72 sm:w-96 h-4 bg-[#1a1828] rounded" />
        </div>
        <div className="w-36 h-9 bg-[#1a1828] rounded-xl self-start sm:self-auto" />
      </div>

      {/* Grid of Continue Watching Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col bg-[#14121f] border border-[#232036] rounded-2xl overflow-hidden shadow-lg">
            {/* Aspect 16:9 Image Placeholder */}
            <div className="relative w-full aspect-[16/9] bg-[#1a1828]">
              <div className="absolute top-3 left-3 w-16 h-5 bg-[#252238] rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#252238]" />
            </div>
            {/* Info Area Placeholder */}
            <div className="p-4 flex flex-col justify-between space-y-3">
              <div className="w-4/5 h-5 bg-[#1a1828] rounded" />
              <div className="flex items-center justify-between pt-1">
                <div className="w-20 h-3 bg-[#1a1828] rounded" />
                <div className="w-24 h-3 bg-[#1a1828] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
