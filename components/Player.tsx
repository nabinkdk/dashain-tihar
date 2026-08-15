"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { PLAYLIST_ID, PLAYLIST_URL, SONGS } from "@/lib/songs";

// The YouTube IFrame API ships no official type declarations.
type YTNamespace = any; // eslint-disable-line @typescript-eslint/no-explicit-any

declare global {
  interface Window {
    YT: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type NowPlaying = { title: string; artist: string };

function fmt(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60),
    x = Math.floor(s % 60);
  return m + ":" + String(x).padStart(2, "0");
}

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Updated default state to match your Dashain/Tihar playlist
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({
    title: SONGS[0]?.title || "Dashain Tihar Playlist",
    artist: SONGS[0]?.artist || "Various Artists",
  });

  const [hintText, setHintText] = useState(
    "Press play — audio streams from YouTube",
  );
  const [hintIsLink, setHintIsLink] = useState(false);
  const [hintFading, setHintFading] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);

  const playerRef = useRef<YTNamespace>(null);
  const apiReadyRef = useRef(false);
  const readyRef = useRef(false);
  const seekingRef = useRef(false);
  const fellRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const initedRef = useRef(false);

  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const curRef = useRef<HTMLSpanElement>(null);
  const durRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;

    function updateNowPlaying() {
      const p = playerRef.current;
      if (!readyRef.current || !p?.getVideoData) return;
      const d = p.getVideoData();
      if (d && d.title) {
        const title = String(d.title).split("|")[0].trim();
        setNowPlaying({
          title: title || d.title,
          artist: String(d.author || "Various Artists")
            .replace(/\s*-\s*Topic$/, "")
            .trim(),
        });
      }
    }

    function onReady() {
      readyRef.current = true;
      setHintIsLink(false);
      setHintText("Press play — audio streams from YouTube");
      updateNowPlaying();
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        try {
          playerRef.current.playVideo();
        } catch {}
      }
      setInterval(() => {
        const p = playerRef.current;
        if (!readyRef.current || seekingRef.current || !p?.getDuration) return;
        const dur = p.getDuration(),
          cur = p.getCurrentTime();
        if (dur > 0) {
          const pct = (cur / dur) * 100;
          if (fillRef.current) fillRef.current.style.width = pct + "%";
          if (thumbRef.current) thumbRef.current.style.left = pct + "%";
          if (rangeRef.current)
            rangeRef.current.value = String(Math.round((cur / dur) * 1000));
          if (curRef.current) curRef.current.textContent = fmt(cur);
          if (durRef.current) durRef.current.textContent = fmt(dur);
        }
      }, 250);
    }

    function onState(e: { data: number }) {
      const playing = e.data === window.YT.PlayerState.PLAYING;
      setIsPlaying(playing);
      if (playing) {
        updateNowPlaying();
        setHintFading(true);
        setTimeout(() => setHintHidden(true), 400);
      }
    }

    function onErr() {
      if (readyRef.current && playerRef.current?.nextVideo) {
        try {
          playerRef.current.nextVideo();
        } catch {}
      }
    }

    function enterFallback() {
      if (fellRef.current) return;
      fellRef.current = true;
      readyRef.current = false;
      setHintFading(false);
      setHintHidden(false);
      setHintIsLink(true);
    }

    function createPlayer() {
      playerRef.current = new window.YT.Player("yt", {
        width: "100%",
        height: "100%",
        playerVars: {
          listType: "playlist",
          list: PLAYLIST_ID,
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: { onReady, onStateChange: onState, onError: onErr },
      });
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = () => enterFallback();
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      apiReadyRef.current = true;
      createPlayer();
    };
    setTimeout(() => {
      if (!apiReadyRef.current) enterFallback();
    }, 5000);
  }, []); // Intentional empty array for initialization

  useEffect(() => {
    const range = rangeRef.current;
    if (!range) return;
    const onInput = () => {
      seekingRef.current = true;
      const p = playerRef.current;
      if (readyRef.current && p?.getDuration) {
        const d = p.getDuration();
        const c = (Number(range.value) / 1000) * d;
        const pct = Number(range.value) / 10;
        if (fillRef.current) fillRef.current.style.width = pct + "%";
        if (thumbRef.current) thumbRef.current.style.left = pct + "%";
        if (curRef.current) curRef.current.textContent = fmt(c);
      }
    };
    const onChange = () => {
      const p = playerRef.current;
      if (readyRef.current && p?.getDuration)
        p.seekTo((Number(range.value) / 1000) * p.getDuration(), true);
      seekingRef.current = false;
    };
    range.addEventListener("input", onInput);
    range.addEventListener("change", onChange);
    return () => {
      range.removeEventListener("input", onInput);
      range.removeEventListener("change", onChange);
    };
  }, []);

  function openYT() {
    window.open(PLAYLIST_URL, "_blank", "noopener");
  }

  // Wrapped in useCallback so they can be safely used in the keydown effect
  const handlePlay = useCallback(() => {
    if (!readyRef.current) {
      if (fellRef.current) openYT();
      else {
        pendingPlayRef.current = true;
        setHintIsLink(false);
        setHintFading(false);
        setHintHidden(false);
        setHintText("Loading festival vibes…");
      }
      return;
    }
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  }, [isPlaying]);

  const handlePrev = useCallback(() => {
    if (readyRef.current)
      try {
        playerRef.current.previousVideo();
        playerRef.current.playVideo();
      } catch {}
  }, []);

  const handleNext = useCallback(() => {
    if (readyRef.current)
      try {
        playerRef.current.nextVideo();
        playerRef.current.playVideo();
      } catch {}
  }, []);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const tg = (e.target as HTMLElement)?.tagName?.toLowerCase() || "";
      if (tg === "input" || tg === "textarea") return;
      if (e.code === "Space") {
        e.preventDefault();
        handlePlay();
      } else if (e.code === "ArrowRight") handleNext();
      else if (e.code === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [handlePlay, handleNext, handlePrev]);

  return (
    <>
      <div className={`videobox ${videoVisible ? "on" : "hidden-player"}`}>
        <div id="yt" />
      </div>

      <div className="player" role="region" aria-label="Now playing">
        <div className="p-row">
          <div className={`art ${isPlaying ? "spinning" : ""}`}>
            {/* Remember to change this image in your public folder later! */}
            <Image
              alt=""
              src="/playlist.jpg"
              fill
              sizes="56px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="meta">
            <div className="t">{nowPlaying.title}</div>
            <div className="a">{nowPlaying.artist}</div>
          </div>
          <div className="controls">
            <button
              className="ctl small"
              aria-label="Previous song"
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
              </svg>
            </button>
            <button
              className="ctl play"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={handlePlay}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                {isPlaying ? (
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                ) : (
                  <path d="M7 5v14l12-7z" />
                )}
              </svg>
            </button>
            <button
              className="ctl small"
              aria-label="Next song"
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 5h2v14h-2zM4 5l11 7-11 7z" />
              </svg>
            </button>
            <button
              className="ctl small"
              id="vidToggle"
              aria-label="Show video"
              title="Show / hide video"
              onClick={() => setVideoVisible((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="6" width="14" height="12" rx="2" />
                <path d="M17 10l4-2v8l-4-2" />
              </svg>
            </button>
          </div>
        </div>
        <div className="seek">
          <span className="time" ref={curRef}>
            0:00
          </span>
          <div className="track">
            <div className="fill" ref={fillRef} />
            <div className="thumb" ref={thumbRef} />
            <input
              type="range"
              className="range"
              ref={rangeRef}
              min={0}
              max={1000}
              defaultValue={0}
              aria-label="Seek"
            />
          </div>
          <span className="time" ref={durRef}>
            –:––
          </span>
        </div>
        <div
          className="hint"
          style={{
            opacity: hintFading ? 0 : 1,
            visibility: hintHidden ? "hidden" : "visible",
          }}
        >
          {hintIsLink ? (
            <>
              Tap play to open the playlist on{" "}
              <a
                style={{ color: "var(--gold)" }}
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </>
          ) : (
            hintText
          )}
        </div>
      </div>
    </>
  );
}
