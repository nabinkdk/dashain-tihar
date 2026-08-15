export type Song = {
  title: string;
  artist: string;
};

// Updated to use YOUR custom Dashain & Tihar Playlist!
export const PLAYLIST_ID = "PLHY_ryTqxil8";
export const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;

// We can keep this generic or change the name later if you want
// export const JIOSAAVN_URL =
//   "https://open.spotify.com/playlist/37i9dQZF1DXbeO486KzZJc";

// Classic Dashain and Tihar songs
export const SONGS: Song[] = [
  { title: "Dashain Tihar", artist: "Sugam Pokharel" },
  { title: "Dashain Aayo", artist: "Udit Narayan" },
  { title: "Tihar Aayo", artist: "Sugam Pokharel" },
  { title: "Bhailini Aayin Angana", artist: "Traditional" },
  { title: "Deusire (Deusi Re)", artist: "Traditional" },
  { title: "Aayo Dashain", artist: "Yogeshwor Amatya" },
  { title: "Numbur Kanchhi", artist: "Pramod Kharel" },
  { title: "Kite Flying (Changa Chet)", artist: "Various Artists" },
  { title: "Mangal Dhun", artist: "Instrumental" },
  { title: "Asare Mahinama", artist: "Chudanami Devkota" },
];
