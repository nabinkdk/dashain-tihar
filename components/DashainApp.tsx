"use client";

import { useEffect, useState } from "react";
import StaticBackground from "@/components/StaticBackground";
import Player from "@/components/Player";
import SongsPanel from "@/components/SongsPanel";
import MarigoldRain from "./Marigold";
import { PLAYLIST_URL } from "@/lib/songs";

const DASHAIN_START = "2026-10-11T00:00:00";
const TIHAR_START = "2026-11-07T00:00:00";

export default function FestivalApp() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [dashainDays, setDashainDays] = useState<number | null>(null);
  const [tiharDays, setTiharDays] = useState<number | null>(null);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const now = Date.now();
      setDashainDays(
        Math.ceil((new Date(DASHAIN_START).getTime() - now) / 86400000),
      );
      setTiharDays(
        Math.ceil((new Date(TIHAR_START).getTime() - now) / 86400000),
      );
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("/api/presence");

    eventSource.onmessage = (event) => {
      const count = parseInt(event.data, 10);
      if (!isNaN(count)) {
        setOnlineCount(count);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      {/* Permanently render the static background image */}
      <StaticBackground />
      <MarigoldRain/>

      <div className="ui">
        <div className="topbar">
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Dashain Countdown */}
            {(dashainDays === null || dashainDays > 0) && (
              <span className="live">
                <span className="dot" />
                <span>{dashainDays ?? ""}</span>&nbsp;days to Dashain
              </span>
            )}

            {/* Tihar Countdown */}
            {(tiharDays === null || tiharDays > 0) && (
              <span className="live" style={{ opacity: 0.85 }}>
                <span className="dot" style={{ background: "var(--gold)" }} />
                <span>{tiharDays ?? ""}</span>&nbsp;days to Tihar
              </span>
            )}

            {/* Online Users Count */}
            {onlineCount !== null && (
              <span className="live" style={{ opacity: 0.9 }}>
                <span className="dot" style={{ background: "#4ade80" }} />
                <span>{onlineCount}</span>&nbsp;online
              </span>
            )}
          </div>

          <div className="top-actions">
            <a
              className="chip"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://dashain-tihar-playlist.vercel.app")}&quote=${encodeURIComponent("Listening to Dashain & Tihar songs on this website! 🪔🪁")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Share</span>
            </a>
          </div>
        </div>

        <div className="hero">
          <div className="eyebrow">बडा दशैं तथा तिहार</div>
          <h1 className="wordmark">शुभकामना</h1>
          <p className="subtitle">Let the festive vibes bring us together.</p>
          <div className="credit">Celebrate the light, music, and joy.</div>
        </div>

        <Player />
      </div>

      <SongsPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
