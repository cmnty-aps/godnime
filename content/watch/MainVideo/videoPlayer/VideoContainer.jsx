"use client";

import { AnimatePresence, motion } from "framer-motion";
import LoadingVideo from "@/components/loadings/loadingVideo/loadingVideo";
import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";
import "./video_player.css";
import clsx from "clsx";

const VideoPlayerContainer = () => {
  const { watchInfo, AnimeInfo, episode, server, isDub } = useWatchContext();
  const { watchSetting, setWatchSetting } = useWatchSettingContext();

  const isDubbed = server === "dub" || isDub;
  const embedUrl =
    watchInfo?.embedUrl ||
    (AnimeInfo?.id
      ? `https://megaplay.buzz/stream/ani/${AnimeInfo.id}/${episode || 1}/${isDubbed ? "dub" : "sub"}`
      : null);

  return (
    <>
      <div className="z-30">
        <motion.div
          className={clsx({
            "min-[1300px]:fixed min-[1300px]:max-w-[1156px] min-[1300px]:w-full min-[1300px]:aspect-video min-[1300px]:top-1/2 min-[1300px]:left-1/2 min-[1300px]:-translate-x-1/2 min-[1300px]:-translate-y-1/2":
              watchSetting?.light,
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {embedUrl ? (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-2xl">
              <iframe
                key={embedUrl}
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <LoadingVideo />
          )}
        </motion.div>

        {watchSetting?.light && (
          <div className="aspect-video w-full max-[1300px]:hidden"></div>
        )}
      </div>

      <AnimatePresence>
        {watchSetting?.light ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full z-20 bg-[#000000e5]"
            onClick={() =>
              setWatchSetting((prev) => ({ ...prev, light: false }))
            }
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayerContainer;