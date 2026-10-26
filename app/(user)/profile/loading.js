export default function ProfileLoading() {
  return (
    <div className="w-full min-h-screen bg-[#12111a] text-white pt-[106px] pb-28 px-4 sm:px-8 max-w-[96rem] mx-auto animate-pulse select-none">
      {/* Header Cover & Avatar Skeleton */}
      <div className="relative w-full h-48 sm:h-64 bg-[#1a1827] rounded-3xl overflow-hidden mb-16 border border-[#232033]">
        <div className="absolute -bottom-10 left-6 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-[#252238] border-4 border-[#12111a]" />
      </div>

      {/* User Info Skeleton */}
      <div className="space-y-4 mb-10 px-2">
        <div className="w-48 h-8 bg-[#1f1d2d] rounded-lg" />
        <div className="w-64 h-4 bg-[#1f1d2d] rounded" />
      </div>

      {/* Stats / List Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[#171522] rounded-2xl p-4 border border-[#232033] space-y-3">
            <div className="w-32 h-5 bg-[#252236] rounded" />
            <div className="w-full h-12 bg-[#252236] rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
