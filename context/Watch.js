"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, AnimeInfo }) {
  const searchparam = useSearchParams();

  const [episode, setEpisode] = useState(() => {
    const epFromSearch = parseInt(searchparam.get("ep"), 10);
    return !isNaN(epFromSearch) && epFromSearch > 0 ? epFromSearch : 1;
  });

  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [isDub, setIsDub] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [server, setServer] = useState("sub");

  // Construct episode list directly from AniList data
  useEffect(() => {
    if (!AnimeInfo) return;

    const rawEp =
      AnimeInfo?.episodes ||
      (AnimeInfo?.nextAiringEpisode?.episode
        ? AnimeInfo.nextAiringEpisode.episode - 1
        : 12);

    const totalEp = Math.max(1, rawEp || 1);

    const generatedEpisodes = Array.from({ length: totalEp }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      title: `Episode ${i + 1}`,
      isSubbed: true,
      isDubbed: true,
    }));

    setEpisodes(generatedEpisodes);
  }, [AnimeInfo]);

  // Construct player streaming embed URL based on AniList ID + Episode + Sub/Dub
  useEffect(() => {
    if (!AnimeInfo?.id) return;

    const isDubbed = server === "dub" || isDub;
    const currentEpNum = episode || 1;
    const embedUrl = `https://megaplay.buzz/stream/ani/${AnimeInfo.id}/${currentEpNum}/${isDubbed ? "dub" : "sub"}`;

    setWatchInfo({
      embedUrl,
      title: `${AnimeInfo?.title?.english || AnimeInfo?.title?.romaji || "Anime"} - Episode ${currentEpNum}`,
      loading: false,
    });

    // Automatically update watch history
    if (typeof window !== "undefined") {
      try {
        const history = JSON.parse(localStorage.getItem("watch_history") || "{}");
        history[AnimeInfo.id] = {
          id: AnimeInfo.id,
          animeid: AnimeInfo.id,
          title: AnimeInfo?.title?.english || AnimeInfo?.title?.romaji || "Anime",
          episode: currentEpNum,
          thumbnail: AnimeInfo?.coverImage?.extraLarge || AnimeInfo?.bannerImage,
          updatedAt: Date.now(),
        };
        localStorage.setItem("watch_history", JSON.stringify(history));
      } catch (e) {}
    }
  }, [episode, server, isDub, AnimeInfo]);

  // Load last watched episode from history if available
  useEffect(() => {
    if (typeof window !== "undefined" && AnimeInfo?.id) {
      try {
        const history = JSON.parse(localStorage.getItem("watch_history") || "{}");
        const epFromHistory = parseInt(history?.[AnimeInfo.id]?.episode, 10);
        if (!isNaN(epFromHistory) && epFromHistory > 0 && !searchparam.get("ep")) {
          setEpisode(epFromHistory);
        }
      } catch (e) {}
    }
  }, [AnimeInfo?.id, searchparam]);

  const contextValue = useMemo(
    () => ({
      episode,
      watchInfo,
      setEpisode,
      setIsDub,
      isDub,
      setEpisodes,
      episodes,
      AnimeInfo,
      server,
      setServer,
      animeid: AnimeInfo?.id,
    }),
    [episode, watchInfo, isDub, episodes, server, setServer, AnimeInfo]
  );

  return (
    <WatchAreaContext.Provider value={contextValue}>
      {children}
    </WatchAreaContext.Provider>
  );
}

export function useWatchContext() {
  return useContext(WatchAreaContext);
}
