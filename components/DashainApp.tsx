"use client";

import { useEffect, useState } from "react";
import Background from "@/components/Background";
import StaticBackground from "@/components/StaticBackground";
import Player from "@/components/Player";
import SongsPanel from "@/components/SongsPanel";
import { PLAYLIST_URL } from "@/lib/songs";

const DASHAIN_START = "2026-10-11T00:00:00";
const TIHAR_START = "2026-11-07T00:00:00"; // Tihar start date for 2026

export default function FestivalApp() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [staticBg, setStaticBg] = useState(false);

  // Countdown states for both festivals
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
      {staticBg ? <StaticBackground /> : <Background />}

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

            {/* Tihar Countdown (Only shows or stays alongside once Dashain passes, or display both!) */}
            {(tiharDays === null || tiharDays > 0) && (
              <span
                className="live"
                style={{
                  opacity: dashainDays !== null && dashainDays <= 0 ? 1 : 0.85,
                }}
              >
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
            <button
              className={`chip ${staticBg ? "solid" : ""}`}
              aria-pressed={staticBg}
              aria-label="Toggle animated background"
              onClick={() => setStaticBg((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="M21 15l-5-5-4 4-3-3-5 5" />
              </svg>
              <span>{staticBg ? "Live Scene" : "Static Image"}</span>
            </button>
            <a
              className="chip"
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-3.8-.5-5.6a2.9 2.9 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.4a2.9 2.9 0 0 0-2 2C1 8.2 1 12 1 12s0 3.8.5 5.6a2.9 2.9 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.4a2.9 2.9 0 0 0 2-2C23 15.8 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z" />
              </svg>
              <span>YouTube</span>
            </a>
            <button
              className="chip solid"
              aria-haspopup="dialog"
              onClick={() => setPanelOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h12" />
              </svg>
              <span>Songs</span>
            </button>
            <a
              className="chip"
              href={`https://x.com/intent/tweet?text=${encodeURIComponent("Listening to Dashain & Tihar tunes! 🪔🪁")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.4 8.5L23 22h-6.6l-5.2-6.8L5 22H2l8-9.2L1.5 2H8l4.7 6.2L18.9 2Zm-2.3 18h1.9L8.3 4H6.3l10.3 16Z" />
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
