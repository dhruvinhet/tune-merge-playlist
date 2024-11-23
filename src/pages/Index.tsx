import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { SongCard } from "@/components/SongCard";

const songs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    cover: "https://placehold.co/400",
  },
  {
    id: 2,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    cover: "https://placehold.co/400",
  },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    cover: "https://placehold.co/400",
  },
  {
    id: 4,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    cover: "https://placehold.co/400",
  },
  {
    id: 5,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    cover: "https://placehold.co/400",
  },
  {
    id: 6,
    title: "Nothing Else Matters",
    artist: "Metallica",
    cover: "https://placehold.co/400",
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen bg-spotify-dark">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 pb-28">
        <h1 className="mb-8 text-3xl font-bold">Welcome Back</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              cover={song.cover}
            />
          ))}
        </div>
      </main>
      <Player />
    </div>
  );
};

export default Index;