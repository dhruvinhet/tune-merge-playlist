import { Home, Library, PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";

export function Sidebar() {
  const { toast } = useToast();
  
  const createPlaylist = () => {
    toast({
      title: "Create Playlist",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="pb-12 w-64 bg-spotify-dark">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Spotify Clone</h2>
          <div className="space-y-1">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Library className="mr-2 h-4 w-4" />
              Your Library
            </Button>
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={createPlaylist}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Playlist
            </Button>
          </div>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {['My Playlist #1', 'Favorites', 'Rock Classics'].map((playlist) => (
                <Button
                  key={playlist}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}