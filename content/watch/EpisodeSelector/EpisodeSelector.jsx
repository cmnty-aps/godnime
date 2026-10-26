"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useWatchContext } from "@/context/Watch";
import { fetchWatchedEpisodes, updateWatchedEpisodes } from "./utils/LocalStorage";
import { filterEpisodes, chunkEpisodes } from "./utils/EpisodeUtils";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import EpisodeList from "./EpisodeList";

const EpisodeSelector = ({ AnimeID }) => {
  const [dubSelected, setDubSelected] = useState({ id: 0 });
  const [epFromTo, setEpFromTo] = useState({ id: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedEP, setWatchedEP] = useState([]);
  const [showType, setShowType] = useState("list");

  const chunkSize = 80;
  const { setIsDub, episode, episodes, AnimeInfo } = useWatchContext();

  const loading = !Array.isArray(episodes) || episodes.length === 0;
  const isSubSelected = dubSelected.id === 0 || dubSelected.id === 1;

  const filteredEpisodes = useMemo(
    () => (Array.isArray(episodes) ? episodes : []),
    [episodes]
  );

  const SplitedEpisodes = useMemo(
    () => chunkEpisodes(filteredEpisodes, chunkSize),
    [filteredEpisodes]
  );

  useEffect(() => {
    setIsDub(!isSubSelected);
  }, [isSubSelected, setIsDub]);

  useEffect(() => {
    setWatchedEP(fetchWatchedEpisodes(AnimeID, episode));
    updateWatchedEpisodes(AnimeID, episode);
  }, [AnimeID, episode]);

  const handleSearchQueryChange = useCallback(
    (e) => setSearchQuery(e.target.value),
    []
  );

  return (
    <div className="bg-[#201f28] w-full max-w-[22rem] EPSResponsive rounded-md flex flex-col">
      <SearchBar
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        showType={showType}
        setShowType={setShowType}
      />
      <Filters
        setDubSelected={setDubSelected}
        setEpFromTo={setEpFromTo}
        SplitedEpisodes={SplitedEpisodes}
        chunkSize={chunkSize}
      />
      <EpisodeList
        loading={loading}
        searchQuery={searchQuery}
        data={filteredEpisodes}
        SplitedEpisodes={SplitedEpisodes}
        epFromTo={epFromTo}
        episode={episode}
        watchedEP={watchedEP}
        showType={showType}
      />
    </div>
  );
};

export default EpisodeSelector;
