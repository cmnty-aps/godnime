export default function ScheduleLoading() {
  return (
    <div className="w-full min-h-screen bg-[#0e1118] text-white px-3 sm:px-6 max-w-xl mx-auto pt-28 sm:pt-32 pb-32 select-none animate-pulse">
      {/* Title Placeholder */}
      <div className="w-48 h-8 bg-[#181f2f] rounded-lg mx-auto mb-6" />

      {/* Active Day Pill + Total Anime Badge Placeholder */}
      <div className="flex items-center justify-between gap-2 mt-2 mb-6">
        <div className="w-24 h-9 bg-[#2563eb]/40 rounded-2xl" />
        <div className="w-20 h-9 bg-[#171b26] rounded-2xl border border-[#202636]" />
      </div>

      {/* Content List Timeline Skeleton */}
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-2 sm:gap-3.5 relative">
            {/* Timeline Column */}
            <div className="w-12 sm:w-14 flex flex-col items-center pt-2.5 shrink-0">
              <div className="w-10 h-3 bg-[#1d273a] rounded" />
              <div className="w-2 h-2 rounded-full bg-[#1d273a] mt-1 shrink-0" />
              <div className="w-[1.5px] bg-[#1d273a] flex-1 my-1 min-h-[64px]" />
            </div>

            {/* Card Column */}
            <div className="flex-1 pb-3 min-w-0">
              <div className="bg-[#131926] rounded-2xl border-l-[3.5px] border-[#202636] p-3 flex gap-3 shadow-sm">
                <div className="w-20 h-28 sm:w-22 sm:h-30 bg-[#1e2536] rounded-xl shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
                  <div className="w-4/5 h-4 bg-[#1e2536] rounded" />
                  <div className="w-1/2 h-3 bg-[#1e2536] rounded" />
                  <div className="w-1/3 h-3 bg-[#1e2536] rounded" />
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-12 h-3 bg-[#1e2536] rounded" />
                    <div className="w-10 h-3 bg-[#1e2536] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Day Buttons Skeleton */}
      <div className="fixed bottom-20 left-4 right-4 max-w-xl mx-auto flex items-center justify-between pointer-events-none z-30">
        <div className="w-24 h-8 bg-[#131926f2] rounded-full border border-[#2b354c]" />
        <div className="w-24 h-8 bg-[#131926f2] rounded-full border border-[#2b354c] ml-auto" />
      </div>
    </div>
  );
}
