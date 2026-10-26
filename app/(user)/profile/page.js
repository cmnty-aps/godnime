"use client";
import { useEffect, useState, Fragment } from "react";
import Banner from "@/content/profile/Banner";
import CategoryMain from "@/content/profile/CategoryMain";
import { getWatchProgress } from "@/utils/GetProgress";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    user: {
      name: "Community Otaku",
      avatar: {
        large: "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg",
      },
      bannerImage: "/images/banner.jpg",
      statistics: {
        anime: {
          count: 0,
          episodesWatched: 0,
          minutesWatched: 0,
          meanScore: 8.5,
        },
      },
    },
    lists: [
      { status: "CURRENT", name: "Watching", entries: [] },
      { status: "PLANNING", name: "Plan to Watch", entries: [] },
      { status: "COMPLETED", name: "Completed", entries: [] },
      { status: "PAUSED", name: "Paused", entries: [] },
      { status: "DROPPED", name: "Dropped", entries: [] },
    ],
  });

  useEffect(() => {
    try {
      const historyItems = getWatchProgress(false) || [];
      const episodesCount = historyItems.reduce((acc, item) => acc + (Number(item.episode) || 1), 0);
      const minutesCount = episodesCount * 24;

      const convertedEntries = historyItems.map((item) => ({
        id: item.id || item.animeid,
        mediaId: item.animeid,
        status: "CURRENT",
        progress: item.episode || 1,
        media: {
          id: item.animeid,
          title: {
            romaji: item.title || "Anime Title",
            english: item.title || "Anime Title",
          },
          coverImage: {
            extraLarge: item.thumbnail || "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg",
          },
          episodes: item.episode,
          format: "TV",
        },
      }));

      setProfileData({
        user: {
          name: "Community Otaku",
          avatar: {
            large: "/images/artworks-Xhbx2TzxHzrllTQR-kmD5OQ-t500x500.jpg",
          },
          bannerImage: "/images/banner.jpg",
          statistics: {
            anime: {
              count: historyItems.length,
              episodesWatched: episodesCount,
              minutesWatched: minutesCount,
              meanScore: 8.5,
            },
          },
        },
        lists: [
          { status: "CURRENT", name: "Watching", entries: convertedEntries },
          { status: "PLANNING", name: "Plan to Watch", entries: [] },
          { status: "COMPLETED", name: "Completed", entries: [] },
          { status: "PAUSED", name: "Paused", entries: [] },
          { status: "DROPPED", name: "Dropped", entries: [] },
        ],
      });
    } catch (e) {
      console.error("Error setting up profile state:", e);
    }
  }, []);

  const { user, lists } = profileData;
  const watchedAnime = lists.find((item) => item?.status === "COMPLETED") || { entries: [] };

  return (
    <Fragment>
      <div className="w-full min-h-screen">
        <Banner info={user} data={watchedAnime} />
        <CategoryMain lists={lists} user={user} watchedAnime={watchedAnime} />
      </div>

      {/* background glow */}
      <div className="fixed w-[138px] h-[82px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px] pointer-events-none"></div>
      <div className="fixed w-[500px] h-[370px] right-[50%] bottom-[50%] bg-[#576683b4] blur-[215px] translate-x-[70%] z-0 rounded-full pointer-events-none"></div>
    </Fragment>
  );
};

export default ProfilePage;