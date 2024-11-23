import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { SongCard } from "@/components/SongCard";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  setCurrentSong: (song: Song) => void;
  togglePlayPause: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,
  setCurrentSong: (song) => set({ currentSong: song, isPlaying: true }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

const songs: Song[] = [
  {
    id: 1,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    cover: "https://c.saavncdn.com/992/Aashiqui-2-Hindi-2013-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Aashiqui%202/Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.mp3",
  },
  {
    id: 2,
    title: "Kesariya",
    artist: "Arijit Singh, Pritam",
    cover: "https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Brahmastra/Kesariya%20-%20Brahmastra%20128%20Kbps.mp3",
  },
  {
    id: 3,
    title: "Channa Mereya",
    artist: "Arijit Singh",
    cover: "https://c.saavncdn.com/742/Ae-Dil-Hai-Mushkil-Hindi-2016-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Ae%20Dil%20Hai%20Mushkil/Channa%20Mereya%20-%20Ae%20Dil%20Hai%20Mushkil%20128%20Kbps.mp3",
  },
  {
    id: 4,
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal, Asees Kaur",
    cover: "https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Shershaah/Raataan%20Lambiyan%20-%20Shershaah%20128%20Kbps.mp3",
  },
  {
    id: 5,
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    cover: "https://c.saavncdn.com/663/Pasoori-Punjabi-2022-20220203181058-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Coke%20Studio%20Season%2014/Pasoori%20-%20Coke%20Studio%20Season%2014%20128%20Kbps.mp3",
  },
  {
    id: 6,
    title: "Kahani Suno",
    artist: "Kaifi Khalil",
    cover: "https://c.saavncdn.com/977/Kahani-Suno-2-0-Hindi-2022-20221006155213-500x500.jpg",
    url: "https://pagalsong.in/uploads/systemuploads/mp3/Kahani%20Suno%202.0/Kahani%20Suno%20-%20Kahani%20Suno%202.0%20128%20Kbps.mp3",
  },
];

const Index = () => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const localSong: Song = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Local File",
        cover: "/placeholder.svg",
        url: URL.createObjectURL(file),
      };
      usePlayerStore.getState().setCurrentSong(localSong);
      toast({
        title: "File loaded",
        description: `Now playing: ${localSong.title}`,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-spotify-dark">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 pb-28">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <div className="relative">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Music
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              cover={song.cover}
              onPlay={() => usePlayerStore.getState().setCurrentSong(song)}
            />
          ))}
        </div>
      </main>
      <Player />
    </div>
  );
};

export default Index;