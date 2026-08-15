// --- COLOR PALETTE INSPIRED BY YOUR IMAGE ---
const NB = "#05070f"; // Deep shadow
const SARI = "#c33a2e"; // Deep vibrant red
const SKIN = "#c67840"; // Warm skin tone
const GREEN = "#4a7c29"; // Jamara / hills green
const RED = "#dc143c"; // Tika red
const APPLE = "#d82b2b"; // Bright Apple Red <--- ADD THIS LINE
const GOLD = "#f3b236"; // Gold jewelry
const FLAME = "#ffcf5e"; // Diya fire
const MARIGOLD = "#d98a2e"; // Orange flowers
const TRAY = "#8a6a3f"; // Woven Nanglo tray
const BAMBOO = "#4a5d23"; // Ping swing

/** Warm, golden distant mountains with snowcaps */
function distantMountains(): string {
  return (
    `<g fill="#e69c3a" opacity="0.75">
      <path d="M50,200 L250,50 L450,200 Z"/>
      <path d="M300,200 L550,70 L800,200 Z"/>
      <path d="M700,200 L950,40 L1200,200 Z"/>
      <path d="M1050,200 L1350,60 L1600,200 Z"/>
    </g>` +
    `<!-- Snowcaps -->
    <g fill="#fff5d7" opacity="0.9">
      <path d="M156,120 L250,50 L343,120 L300,130 L250,110 L200,130 Z"/>
      <path d="M473,130 L550,70 L626,130 L590,140 L550,120 L510,140 Z"/>
      <path d="M856,140 L950,40 L1043,140 L1000,150 L950,130 L900,150 Z"/>
      <path d="M1221,150 L1350,60 L1478,150 L1420,160 L1350,140 L1280,160 Z"/>
    </g>`
  );
}

/** Midground rolling hills */
function rollingHills(): string {
  return `<g fill="#6b8e23" opacity="0.8">
      <path d="M-100,200 Q200,120 500,200 Z"/>
      <path d="M300,200 Q700,90 1100,200 Z"/>
      <path d="M900,200 Q1300,130 1700,200 Z"/>
    </g>`;
}

/** Small birds flying in the distance */
function birdsList(): string {
  return `<g fill="${NB}" opacity="0.5">
      <path d="M300,80 Q310,70 320,80 Q310,75 300,80 Z"/>
      <path d="M325,95 Q335,85 345,95 Q335,90 325,95 Z"/>
      <path d="M280,105 Q290,95 300,105 Q290,100 280,105 Z"/>
    </g>`;
}

/** Cozy village house with lit windows and a tree */
function villageHouse(x: number, scale: number): string {
  return `<g transform="translate(${x}, 200) scale(${scale})">
      <!-- Main body -->
      <rect x="-40" y="-50" width="80" height="50" fill="#cc6633"/>
      <rect x="-45" y="-55" width="90" height="10" fill="#8b4513"/> <!-- Roof trim -->
      <!-- Roof -->
      <polygon points="-40,-50 0,-90 40,-50" fill="#a52a2a"/>
      <!-- Door -->
      <rect x="-10" y="-25" width="20" height="25" fill="#3e2723"/>
      <!-- Windows -->
      <rect x="-30" y="-30" width="12" height="12" fill="${FLAME}"/>
      <rect x="18" y="-30" width="12" height="12" fill="${FLAME}"/>
      <!-- Tree beside house -->
      <circle cx="55" cy="-35" r="20" fill="#2e7d32"/>
      <circle cx="70" cy="-25" r="15" fill="#1b5e20"/>
      <rect x="58" y="-15" width="6" height="15" fill="#4e342e"/>
    </g>`;
}

/** Bamboo Swing (Ping) with a person swinging dynamically */
function dashainSwing(x: number, scale: number): string {
  return `<g transform="translate(${x}, 200) scale(${scale})">
      <!-- Bamboo poles -->
      <path d="M-80,0 L0,-240 L80,0" stroke="${BAMBOO}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M-50,0 L0,-240 L50,0" stroke="#556b2f" stroke-width="8" stroke-linecap="round" fill="none"/>
      
      <!-- Swing ropes and person at an angle -->
      <g transform="rotate(18 0 -240)">
        <path d="M0,-240 L-20,-80" stroke="#e3c24a" stroke-width="2" fill="none"/>
        <path d="M0,-240 L20,-80" stroke="#e3c24a" stroke-width="2" fill="none"/>
        <rect x="-30" y="-80" width="60" height="6" fill="${TRAY}" rx="3"/>
        <path d="M-15,-80 C-20,-110 20,-110 15,-80 Z" fill="${NB}"/>
        <path d="M-10,-100 L-20,-140" stroke="${NB}" stroke-width="3" fill="none"/>
        <path d="M10,-100 L20,-140" stroke="${NB}" stroke-width="3" fill="none"/>
        <path d="M-15,-80 L-40,-60" stroke="${NB}" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M15,-80 L40,-60" stroke="${NB}" stroke-width="4" stroke-linecap="round" fill="none"/>
      </g>
    </g>`;
}

/** Nanglo (Woven Tray) with Jamara, Apple, Marigolds, and Diyas */
function pujaTray(x: number, scale: number): string {
  return `<g transform="translate(${x}, 200) scale(${scale})">
      <!-- Tray base -->
      <ellipse cx="0" cy="-15" rx="90" ry="25" fill="${TRAY}"/>
      <ellipse cx="0" cy="-17" rx="85" ry="22" fill="#8b5a2b"/>
      
      <!-- Jamara (Right side) -->
      <path d="M30,-20 Q40,-90 60,-110 Q50,-60 50,-20 Z" fill="${GREEN}"/>
      <path d="M35,-20 Q50,-100 70,-95 Q55,-50 55,-20 Z" fill="${GREEN}"/>
      <path d="M40,-20 Q60,-110 80,-80 Q65,-40 65,-20 Z" fill="${GREEN}"/>
      <path d="M25,-20 Q30,-90 45,-100 Q40,-50 40,-20 Z" fill="${GREEN}"/>
      <rect x="35" y="-45" width="25" height="6" fill="${RED}" rx="2" transform="rotate(15 45 -45)"/>

      <!-- Apple (Center) -->
      <circle cx="0" cy="-40" r="22" fill="${APPLE}"/>
      <path d="M0,-62 Q5,-75 15,-70 Q10,-60 0,-62 Z" fill="#7cb342"/> <!-- Leaf -->
      <path d="M0,-62 Q-2,-68 2,-72" stroke="#4e342e" stroke-width="2" fill="none"/> <!-- Stem -->

      <!-- Marigolds (Left side) -->
      <circle cx="-45" cy="-35" r="20" fill="${MARIGOLD}"/>
      <path d="M-45,-35 L-45,-50 M-45,-35 L-33,-43 M-45,-35 L-30,-35 M-45,-35 L-33,-27 M-45,-35 L-45,-20 M-45,-35 L-57,-27 M-45,-35 L-60,-35 M-45,-35 L-57,-43" stroke="${FLAME}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="-20" cy="-20" r="16" fill="${FLAME}"/>
      <path d="M-20,-20 L-20,-32 M-20,-20 L-11,-26 M-20,-20 L-8,-20 M-20,-20 L-11,-14 M-20,-20 L-20,-8 M-20,-20 L-29,-14 M-20,-20 L-32,-20 M-20,-20 L-29,-26" stroke="${MARIGOLD}" stroke-width="3" stroke-linecap="round"/>

      <!-- Diya (Front center) -->
      <path d="M-20,-10 Q0,0 20,-10 Q0,10 -20,-10 Z" fill="${GOLD}"/>
      <ellipse cx="0" cy="-10" rx="20" ry="6" fill="#8b4513"/>
      <path d="M-5,-10 Q0,-30 5,-10 Z" fill="${FLAME}"/>
    </g>`;
}

/** Woman receiving Tika on the right, with a hand reaching from the left */
function tikaCeremony(x: number, scale: number): string {
  return `<g transform="translate(${x}, 200) scale(${scale})">
      <!-- Woman Body & Sari -->
      <path d="M0,0 C0,-60 40,-90 60,-90 C80,-90 100,-70 110,0 Z" fill="${SARI}"/>
      <path d="M45,-85 C45,-120 75,-120 75,-85 Z" fill="${SKIN}"/> <!-- Neck -->
      
      <!-- Face profile facing left -->
      <path d="M50,-110 C45,-140 70,-150 80,-150 C95,-150 100,-130 100,-110 L100,-80 L50,-80 Z" fill="${SKIN}"/>
      
      <!-- Nose / Chin / Smile-->
      <path d="M50,-110 C40,-110 38,-100 47,-95 C45,-90 47,-85 55,-80" fill="${SKIN}"/>
      <path d="M52,-90 Q58,-85 62,-90" stroke="#8c4723" stroke-width="1.5" fill="none"/>
      
      <!-- Hair & Earring -->
      <path d="M70,-150 C50,-150 55,-120 60,-110 C75,-110 95,-120 100,-140 Z" fill="${NB}"/>
      <circle cx="95" cy="-105" r="18" fill="${NB}"/> <!-- Hair bun -->
      <circle cx="80" cy="-100" r="5" fill="${GOLD}"/> <!-- Earring -->
      
      <!-- Sari drape detail -->
      <path d="M70,-80 C75,-60 90,-50 110,-50 L110,0 C90,-30 60,-30 40,0 Z" fill="#992317"/> 
      
      <!-- Closed Eye -->
      <path d="M55,-105 Q60,-102 65,-105" stroke="${NB}" stroke-width="2" fill="none"/>
      <!-- Tika already on forehead -->
      <circle cx="48" cy="-115" r="5" fill="${RED}"/>
      
      <!-- Hand applying Tika (coming from far left) -->
      <path d="M-120,-180 C-60,-150 -10,-135 15,-125 C25,-120 35,-115 37,-120 C40,-125 30,-135 15,-140 C-10,-150 -50,-170 -100,-200 Z" fill="${SKIN}"/>
      <circle cx="37" cy="-120" r="4" fill="${SKIN}"/> <!-- thumb/finger pinch -->
      <circle cx="37" cy="-120" r="2.5" fill="${RED}"/> <!-- Tika pinch -->
      <rect x="-35" y="-155" width="8" height="25" fill="${GOLD}" transform="rotate(-30 -31 -142)"/> <!-- Bangle -->
    </g>`;
}

/** Combines everything into the final SVG block */
export function buildHorizonSvg(): string {
  // Dark olive green/brown ground to anchor the foreground elements
  const banks =
    '<path d="M-100,200 L-100,180 C150,160 300,190 600,200 Z" fill="#1e2b10"/>' +
    '<path d="M1700,200 L1700,160 C1300,150 1100,180 800,200 Z" fill="#1e2b10"/>' +
    '<path d="M400,200 Q800,180 1200,200 Z" fill="#15200b"/>';

  // Order matters: Background to foreground
  const scene =
    distantMountains() +
    rollingHills() +
    birdsList() +
    banks +
    villageHouse(150, 0.85) +
    dashainSwing(450, 0.8) +
    pujaTray(850, 1.1) +
    tikaCeremony(1250, 1.35);

  return (
    '<svg viewBox="0 0 1600 500" xmlns="http://www.w3.org/2000/svg">' +
    "<defs>" +
    `<g id="festivalScene">${scene}</g>` +
    '<linearGradient id="reflFade" x1="0" y1="200" x2="0" y2="360" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>' +
    '<mask id="reflMask" maskUnits="userSpaceOnUse" x="0" y="200" width="1600" height="300">' +
    '<rect x="0" y="200" width="1600" height="300" fill="url(#reflFade)"/></mask>' +
    '<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.1"/></filter>' +
    '<filter id="paperCut" x="-20%" y="-20%" width="140%" height="140%">' +
    '<feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.35"/>' +
    "</filter>" +
    "</defs>" +
    // WATER REFLECTION:
    '<g mask="url(#reflMask)">' +
    // NOTE: Removed the hard-coded orange fill so the true colors reflect in the water!
    '<g transform="matrix(1 0 0 -1 0 400)" opacity="0.6" filter="url(#soft)"><use href="#festivalScene"/></g>' +
    "</g>" +
    // MAIN LAND SCENE:
    // NOTE: Removed the hard-coded black (NB) fill so the true colors appear on land!
    `<g filter="url(#paperCut)"><use href="#festivalScene"/></g>` +
    "</svg>"
  );
}
