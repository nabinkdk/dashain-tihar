"use client";

import { useEffect } from "react";
// import { SONGS, PLAYLIST_URL, JIOSAAVN_URL } from "@/lib/songs";
import { SONGS, PLAYLIST_URL } from "@/lib/songs";

export default function SongsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [onClose]);

  return (
    <>
      <div className={`scrim ${open ? "on" : ""}`} onClick={onClose} />
      <section
        className={`panel ${open ? "on" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Festival songs"
      >
        <div className="panel-head">
          <div>
            <div className="sub">Your Playlist</div>
            {/* Updated title to Nepali for Dashain/Tihar */}
            <h2>दशैं र तिहार</h2>
          </div>
          <button className="close" aria-label="Close" onClick={onClose}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <p className="note">
          Get into the festive spirit with these classic tunes.{" "}
          <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
            Full Playlist
          </a>{" "}
          ·{" "}
          {/* <a href={JIOSAAVN_URL} target="_blank" rel="noopener noreferrer">
            Spotify
          </a> */}
          .
        </p>
        <div className="list">
          {SONGS.map((s, i) => {
            // Updated the search query to append "dashain tihar song" instead of "chhath geet"
            const q = encodeURIComponent(
              s.title + " " + s.artist + " dashain tihar song",
            );
            return (
              <a
                key={i}
                className="song"
                href={`https://www.youtube.com/results?search_query=${q}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="info">
                  <span className="st">{s.title}</span>
                  <span className="sa">{s.artist}</span>
                </span>
                <span className="go">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </span>
              </a>
            );
          })}
        </div>
        {/* Updated the footer greeting */}
        <div className="jai">शुभ दशैं तथा तिहार 🪔🪁</div>
      </section>
    </>
  );
}
