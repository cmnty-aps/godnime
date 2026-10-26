"use client";
import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

const Video = ({ populardata, onEnded, setIsVideoReady, isVideoReady }) => {
  const iframeRef = useRef(null);
  const trailerId = populardata?.trailer?.id;

  useEffect(() => {
    if (!trailerId) return;

    const handleMessage = (event) => {
      try {
        if (!event.data) return;
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        // info === 0 indicates video ended (YT.PlayerState.ENDED)
        if (data && (data.info === 0 || (data.event === "onStateChange" && data.info === 0))) {
          if (typeof onEnded === "function") {
            onEnded();
          }
        }
      } catch (err) {}
    };

    window.addEventListener("message", handleMessage);

    const timer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "listening", id: trailerId }),
          "*"
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("message", handleMessage);
    };
  }, [trailerId, onEnded]);

  if (!trailerId) return null;

  return (
    <div
      className={`${styles.smoothTransform} relative aspect-[16/9] max-h-[800px] min-h-[460px] w-full overflow-hidden`}
      style={{ display: !isVideoReady ? "none" : "block" }}
    >
      {/* 
        The iframe is scaled 170% and centered with -35% offset inside an overflow-hidden container.
        This completely pushes YouTube's watermark logo, title, and buttons outside the visible viewport box.
      */}
      <iframe
        ref={iframeRef}
        key={trailerId}
        src={`https://www.youtube-nocookie.com/embed/${trailerId}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
        title="Anime Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setIsVideoReady && setIsVideoReady(true)}
        className="absolute w-[170%] h-[170%] -left-[35%] -top-[35%] pointer-events-none border-0 select-none"
        tabIndex="-1"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
};

export default Video;
