"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

const ContinueWatchingCard = ({ data }) => {
  if (!data) return null;

  const animeId = data?.id;
  const title = data?.title || data?.animeTitle || "Anime";
  const episode = data?.episode || 1;
  const image =
    data?.thumbnail ||
    data?.coverImage ||
    data?.bannerImage ||
    "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg";

  const currentTime = data?.currentTime || 0;
  const duration = data?.duration || 1;
  const percent = Math.min(100, Math.max(0, Math.round((currentTime / duration) * 100)));

  const formatSec = (secs) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <Link
      href={`/watch/${animeId}?ep=${episode}${data?.videoURL ? `&videoURL=${data?.videoURL}` : ""}`}
      className="group relative flex flex-col bg-[#14121f] hover:bg-[#1a1829] border border-[#232036] hover:border-[#383354] rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[#00000080] hover:-translate-y-1"
    >
      {/* Thumbnail Banner / Cover Container */}
      <div className="relative w-full aspect-[16/9] bg-[#1a1828] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#14121f] via-transparent to-transparent opacity-80" />

        {/* Episode Badge on Top Left */}
        <div className="absolute top-3 left-3 bg-[#12111acc] backdrop-blur-md border border-[#ffffff1c] text-[#e0a948] text-xs font-bold px-3 py-1 rounded-xl shadow-md">
          Episode {episode}
        </div>

        {/* Play Icon Circle Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#ed2672cc] backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl pl-0.5">
            <FaPlay className="text-lg" />
          </div>
        </div>

        {/* Bottom Progress Bar inside Thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#26233a]">
          <div
            className="h-full bg-gradient-to-r from-[#e0a948] to-[#ed2672] transition-all duration-300"
            style={{ width: `${percent > 0 ? percent : 5}%` }}
          />
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-white font-bold text-base line-clamp-1 group-hover:text-[#e0a948] transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-2 text-xs text-[#8e95a5] font-medium">
          <span>{percent > 0 ? `${percent}% selesai` : "Lanjutkan menonton"}</span>
          <span>{duration > 1 ? `${formatSec(currentTime)} / ${formatSec(duration)}` : `Ep ${episode}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ContinueWatchingCard;