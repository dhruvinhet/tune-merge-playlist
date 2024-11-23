import { Volume2, SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { usePlayerStore } from "@/pages/Index";

export function Player() {
  const { currentSong, isPlaying, togglePlayPause } = usePlayerStore();
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-light p-4">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlayPause()}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentSong.cover}
            alt="Album art"
            className="h-14 w-14 rounded-md"
          />
          <div>
            <h3 className="text-sm font-medium">{currentSong.title}</h3>
            <p className="text-xs text-spotify-text">{currentSong.artist}</p>
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
              onClick={togglePlayPause}
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
              value={[progress]}
              max={100}
              step={1}
              onValueChange={handleProgressChange}
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