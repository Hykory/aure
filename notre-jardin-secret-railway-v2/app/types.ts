export type Playlist = {
  title: string;
  description: string;
  url: string;
  cover: string;
  theme: "rose" | "sage" | "lavender" | "sunset";
};

export type SiteConfig = {
  recipientName: string;
  senderName: string;
  passcode: string;
  relationshipStartDate: string;
  eyebrow: string;
  heroTitle: string;
  heroMessage: string;
  puzzleImage: string;
  puzzleImageAlt: string;
  loveLetter: {
    title: string;
    date: string;
    paragraphs: string[];
    signature: string;
  };
  playlists: Playlist[];
  timerMessage: string;
};
