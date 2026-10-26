import Image from "next/image"
import Link from "next/link";
import { IoLayers } from "react-icons/io5";

const HorizontalCard = ({ data }) => {
  if (!data) return null;

  const title = data?.title?.english || data?.title?.romaji || data?.title?.userPreferred || "Anime";
  const cover = data?.coverImage?.large || data?.coverImage?.medium || data?.coverImage?.extraLarge || "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg";
  const format = data?.format ? (data.format.length > 4 ? `${data.format.slice(0, 1).toUpperCase()}${data.format.slice(1).toLowerCase()}` : data.format) : "TV";
  const episodes = data?.episodes || data?.nextAiringEpisode?.episode ? `${data?.episodes || data?.nextAiringEpisode?.episode} EPS` : "EPS ?";
  const status = data?.status ? `${data.status.slice(0, 1).toUpperCase()}${data.status.slice(1).toLowerCase()}` : "Releasing";

  return (
    <div className="bg-[#1a1827] border border-[#2a273e] hover:border-[#3c3859] flex w-full h-full overflow-hidden rounded-2xl relative items-center transition duration-200">
      <Link href={`/watch/${data?.id}`} className="shrink-0">
        <Image
          src={cover}
          alt={title}
          height={130}
          width={100}
          referrerPolicy="no-referrer"
          className="object-cover h-[106px] w-[80px] cursor-pointer max-[420px]:w-[112px] hover:scale-105 transition duration-200"
        />
      </Link>

      <div className="w-full h-full flex flex-col mx-3 my-2 max-w-[17rem] justify-center min-w-0">
        <div className="flex flex-col gap-1.5">
          <Link
            href={`/watch/${data?.id}`}
            className="text-white text-[14px] font-bold overflow-hidden text-ellipsis line-clamp-2 hover:text-[#e0a948] transition cursor-pointer"
          >
            {title}
          </Link>

          <div className="flex flex-wrap gap-1.5 text-[12px] text-[#8e95a5] items-center">
            <span className="font-semibold text-white/80">{format}</span>
            <span className="h-1 w-1 bg-white/40 rounded-full"></span>
            <span className="flex items-center gap-1 font-medium">
              <IoLayers className="text-[#e0a948]" /> {episodes}
            </span>
            <span className="h-1 w-1 bg-white/40 rounded-full"></span>
            <span className="font-medium text-[#2fc867]">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;