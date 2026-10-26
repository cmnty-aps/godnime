"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { schedule as scheduleQuery } from "@/lib/anilistqueries";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DAYS = [
  { id: 0, label: "Senin" },
  { id: 1, label: "Selasa" },
  { id: 2, label: "Rabu" },
  { id: 3, label: "Kamis" },
  { id: 4, label: "Jumat" },
  { id: 5, label: "Sabtu" },
  { id: 6, label: "Minggu" },
];

export default function SchedulePage() {
  const initialDayIndex = useMemo(() => {
    const day = new Date().getDay(); // 0 is Sunday
    return day === 0 ? 6 : day - 1;
  }, []);

  const [selectedDay, setSelectedDay] = useState(initialDayIndex);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const fetchSchedule = async () => {
      try {
        // Attempt 1: Fetch through internal Next.js API route
        const res = await fetch(`/api/anime/schedule?day=${selectedDay}`);
        const contentType = res.headers.get("content-type") || "";

        if (res.ok && contentType.includes("application/json")) {
          const data = await res.json();
          if (!isCancelled && Array.isArray(data?.schedules)) {
            setSchedules(data.schedules);
            setLoading(false);
            return;
          }
        }

        // Attempt 2 (Fallback): Direct client-side fetch to AniList GraphQL real-time
        const now = new Date();
        const currentDay = now.getDay();
        const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date(now);
        monday.setDate(now.getDate() + diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const targetDate = new Date(monday);
        targetDate.setDate(monday.getDate() + selectedDay);
        targetDate.setHours(0, 0, 0, 0);

        const fromTimestamp = Math.floor(targetDate.getTime() / 1000);
        const toTimestamp = fromTimestamp + 86399;

        const directRes = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: scheduleQuery,
            variables: {
              airingAt_greater: fromTimestamp,
              airingAt_lesser: toTimestamp,
              page: 1,
              perPage: 100,
            },
          }),
        });

        if (directRes.ok) {
          const directData = await directRes.json();
          const list = directData?.data?.Page?.airingSchedules || [];
          if (!isCancelled) {
            setSchedules(list);
          }
        } else {
          if (!isCancelled) setSchedules([]);
        }
      } catch (err) {
        console.warn("Schedule load notice:", err);
        if (!isCancelled) setSchedules([]);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchSchedule();

    return () => {
      isCancelled = true;
    };
  }, [selectedDay]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "00:00";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatViews = (views) => {
    if (!views) return "0";
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return String(views);
  };

  // Detailed relative countdown and elapsed time calculation
  const getDetailedScheduleStatus = (timeUntilAiring, airingAt) => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const diff = airingAt ? airingAt - nowInSeconds : (timeUntilAiring ?? 0);

    if (diff <= 0) {
      // Episode has aired (e.g., "1 jam lalu", "2 hari lalu")
      const elapsed = Math.abs(diff);
      if (elapsed < 60) {
        return { text: "Baru saja tayang", isAired: true };
      }
      const minutes = Math.floor(elapsed / 60);
      if (minutes < 60) {
        return { text: `${minutes} menit lalu`, isAired: true };
      }
      const hours = Math.floor(elapsed / 3600);
      if (hours < 24) {
        return { text: `${hours} jam lalu`, isAired: true };
      }
      const days = Math.floor(elapsed / 86400);
      if (days === 1) {
        return { text: "1 hari lalu", isAired: true };
      }
      return { text: `${days} hari lalu`, isAired: true };
    } else {
      // Upcoming episode (e.g., "1 hari lagi", "3 jam lagi")
      if (diff < 60) {
        return { text: "Segera tayang", isAired: false };
      }
      const minutes = Math.floor(diff / 60);
      if (minutes < 60) {
        return { text: `${minutes} menit lagi`, isAired: false };
      }
      const hours = Math.floor(diff / 3600);
      const remMinutes = Math.floor((diff % 3600) / 60);
      if (hours < 24) {
        if (hours === 1 && remMinutes > 0) {
          return { text: `1 jam ${remMinutes}m lagi`, isAired: false };
        }
        return { text: `${hours} jam lagi`, isAired: false };
      }
      const days = Math.floor(diff / 86400);
      if (days === 1) {
        return { text: "1 hari lagi", isAired: false };
      }
      return { text: `${days} hari lagi`, isAired: false };
    }
  };

  const prevDayIndex = selectedDay > 0 ? selectedDay - 1 : 6;
  const nextDayIndex = selectedDay < 6 ? selectedDay + 1 : 0;
  const prevDayLabel = DAYS[prevDayIndex].label;
  const nextDayLabel = DAYS[nextDayIndex].label;

  return (
    <div className="w-full min-h-screen bg-[#0e1118] text-white px-3 sm:px-6 max-w-xl mx-auto pt-28 sm:pt-32 pb-32 select-none">
      {/* Title - positioned safely below the fixed header */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center py-3 tracking-tight font-['Outfit']">
        Jadwal Tayang
      </h1>

      {/* Day pill badge + Total anime count */}
      <div className="flex items-center justify-between gap-2 mt-2 mb-6">
        <div className="bg-[#2563eb] text-white font-bold text-sm sm:text-base px-6 py-2 rounded-2xl shadow-md select-none">
          {DAYS[selectedDay]?.label}
        </div>

        <div className="bg-[#171b26] text-[#8e95a5] text-xs font-semibold px-4 py-2 rounded-2xl border border-[#202636] shrink-0">
          {schedules.length} Anime
        </div>
      </div>

      {/* Content List with timeline */}
      {loading ? (
        <div className="flex flex-col gap-3 py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-14 flex flex-col items-center pt-2">
                <div className="w-10 h-3 bg-[#1e2536] rounded" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e2536] mt-2" />
                <div className="w-[1.5px] bg-[#1e2536] flex-1 my-1 min-h-[60px]" />
              </div>
              <div className="flex-1 bg-[#131926] rounded-2xl p-3 flex gap-3">
                <div className="w-20 h-28 bg-[#1e2536] rounded-xl shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="w-3/4 h-4 bg-[#1e2536] rounded" />
                  <div className="w-1/2 h-3 bg-[#1e2536] rounded" />
                  <div className="w-1/3 h-3 bg-[#1e2536] rounded mt-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : schedules.length === 0 ? (
        <div className="bg-[#131926] border border-[#202636] rounded-2xl p-10 text-center my-8">
          <p className="text-white font-bold text-base mb-1">
            Belum Ada Jadwal
          </p>
          <p className="text-[#8e95a5] text-xs">
            Tidak ada anime yang dijadwalkan tayang untuk hari {DAYS[selectedDay]?.label}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {schedules.map((item, index) => {
            const anime = item?.media;
            const title =
              anime?.title?.english ||
              anime?.title?.romaji ||
              anime?.title?.userPreferred ||
              "Anime";
            const coverImage =
              anime?.coverImage?.extraLarge ||
              anime?.coverImage?.large ||
              "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg";

            const airingTime = formatTime(item?.airingAt);
            const statusInfo = getDetailedScheduleStatus(item?.timeUntilAiring, item?.airingAt);
            const score = anime?.averageScore
              ? (anime.averageScore / 10).toFixed(1)
              : "-";
            const views = anime?.popularity
              ? formatViews(anime.popularity)
              : "0";

            return (
              <div key={item.id || index} className="flex gap-2 sm:gap-3.5 relative">
                {/* Timeline Column */}
                <div className="w-12 sm:w-14 flex flex-col items-center pt-2.5 shrink-0">
                  <span className="text-[#d89f42] font-bold text-xs tracking-tight">
                    {airingTime}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#d89f42] mt-1 shrink-0" />
                  {index < schedules.length - 1 && (
                    <div className="w-[1.5px] bg-[#332e25] flex-1 my-1 min-h-[64px]" />
                  )}
                </div>

                {/* Card Column */}
                <div className="flex-1 pb-3 min-w-0">
                  <Link
                    href={`/watch/${anime?.id}`}
                    className="bg-[#131926] hover:bg-[#182030] rounded-2xl border-l-[3.5px] border-[#d89f42] p-3 flex gap-3 transition duration-150 block shadow-sm group"
                  >
                    <div className="relative w-20 h-28 sm:w-22 sm:h-30 rounded-xl overflow-hidden shrink-0 bg-[#1e2536]">
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        sizes="100px"
                        referrerPolicy="no-referrer"
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h2 className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-[#d89f42] transition">
                        {title}
                      </h2>
                      <p className="text-[#8e95a5] text-xs sm:text-sm mt-0.5 font-medium">
                        Episode {item?.episode}
                      </p>
                      <p
                        className={`text-xs font-semibold mt-0.5 ${
                          statusInfo.isAired ? "text-[#d89f42]" : "text-[#60a5fa]"
                        }`}
                      >
                        {statusInfo.text}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-[#8e95a5] mt-2">
                        <span className="flex items-center gap-1 font-medium text-[11px]">
                          ▷ {views}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#ffab40] font-semibold text-[11px]">
                          ★ {score}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Prev & Next Day buttons with FaArrowLeft and FaArrowRight icons */}
      <div className="fixed bottom-20 left-4 right-4 max-w-xl mx-auto flex items-center justify-between pointer-events-none z-30">
        <button
          type="button"
          onClick={() => setSelectedDay(prevDayIndex)}
          className="pointer-events-auto bg-[#131926f2] backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-[#2b354c] shadow-xl flex items-center gap-2 hover:bg-[#1b2336] active:scale-95 transition"
        >
          <FaArrowLeft className="text-xs text-slate-200" />
          <span>{prevDayLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedDay(nextDayIndex)}
          className="pointer-events-auto bg-[#131926f2] backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-[#2b354c] shadow-xl flex items-center gap-2 hover:bg-[#1b2336] active:scale-95 transition ml-auto"
        >
          <span>{nextDayLabel}</span>
          <FaArrowRight className="text-xs text-slate-200" />
        </button>
      </div>
    </div>
  );
}
