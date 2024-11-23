import { Plus, Play } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

interface SongCardProps {
  title: string;
  artist: string;
  cover: string;
  onPlay: () => void;
}

export function SongCard({ title, artist, cover, onPlay }: SongCardProps) {
  const { toast } = useToast();

  const addToPlaylist = (playlist: string) => {
    toast({
      title: "Added to playlist",
      description: `${title} has been added to ${playlist}`,
    });
  };

  return (
    <div className="group relative rounded-md bg-spotify-light p-4 transition-all hover:bg-spotify-light/80">
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <img
          src={cover}
          alt={title}
          className="object-cover transition-all hover:scale-105"
        />
        <Button
          size="icon"
          className="absolute bottom-2 right-2 h-10 w-10 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onPlay}
        >
          <Play className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-spotify-text">{artist}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => addToPlaylist("My Playlist #1")}>
            Add to My Playlist #1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addToPlaylist("Favorites")}>
            Add to Favorites
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addToPlaylist("Rock Classics")}>
            Add to Rock Classics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}