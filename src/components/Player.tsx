import { Volume2, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-light p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://placehold.co/56x56"
            alt="Album art"
            className="h-14 w-14 rounded-md"
          />
          <div>
            <h3 className="text-sm font-medium">Song Title</h3>
            <p className="text-xs text-spotify-text">Artist Name</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-spotify-text hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-spotify-text hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="w-96">
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="h-5 w-5" />
          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}