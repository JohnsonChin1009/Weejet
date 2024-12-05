"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { TimerSettings, DEFAULT_TIMER_SETTINGS } from './types';
import { useTimer, useStatistics } from './hooks';

const StudyFlow: React.FC = () => {
  // Timer and settings
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_TIMER_SETTINGS);
  const { timer, sessions, startTimer, pauseTimer, resetTimer, completeSession } = useTimer(settings);
  const statistics = useStatistics(sessions);

  // Theme state
  const [currentTheme, setCurrentTheme] = useState<string>('study');
  const [showSettings, setShowSettings] = useState(false);
  
  // YouTube states
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleYoutubeSubmit = () => {
    const id = extractVideoId(youtubeUrl);
    if (id) {
      setVideoId(id);
      setShowYoutubeInput(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % BACKGROUND_PATTERNS[currentTheme].length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTheme]);

  const handleTrackChange = (track: PlaylistTrack) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div 
        className={cn(
          "rounded-3xl shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[600px]",
          "backdrop-blur-lg bg-opacity-95",
          currentTheme === 'study' 
            ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
        )}
      >
        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Timer Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Focus Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.focusDuration}
                    onChange={(e) => setSettings(prev => ({ ...prev, focusDuration: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Break Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.breakDuration}
                    onChange={(e) => setSettings(prev => ({ ...prev, breakDuration: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="mt-8 w-full bg-indigo-600 text-white rounded-lg py-3 font-medium hover:bg-indigo-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        <div className="p-8 flex flex-col items-center space-y-10">
          {/* Timer Display */}
          <div className="relative w-80 h-80">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-white/10"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-white"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: '283',
                  strokeDashoffset: `${283 - (283 * ((timer.minutes * 60 + timer.seconds) / (timer.isBreak ? settings.breakDuration * 60 : settings.focusDuration * 60)))}`,
                  transition: 'stroke-dashoffset 1s linear'
                }}
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-7xl font-bold tracking-tight mb-2">
                {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
              </span>
              <span className="text-xl font-medium opacity-90">
                {timer.isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={() => timer.isRunning ? pauseTimer() : startTimer()}
              className="px-8 py-3 text-white bg-white/20 rounded-xl hover:bg-white/30 transition-all font-medium shadow-lg hover:shadow-xl active:scale-95"
            >
              {timer.isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-8 py-3 text-white bg-white/20 rounded-xl hover:bg-white/30 transition-all font-medium shadow-lg hover:shadow-xl active:scale-95"
            >
              Reset
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-8 py-3 text-white bg-white/20 rounded-xl hover:bg-white/30 transition-all font-medium shadow-lg hover:shadow-xl active:scale-95"
            >
              Settings
            </button>
          </div>

          {/* YouTube Player */}
          <div className="w-full max-w-md">
            {showYoutubeInput ? (
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Enter YouTube URL"
                    className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleYoutubeSubmit}
                      className="flex-1 px-4 py-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => setShowYoutubeInput(false)}
                      className="px-4 py-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 rounded-2xl overflow-hidden">
                {videoId ? (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-t-2xl"
                    />
                  </div>
                ) : null}
                <button
                  onClick={() => setShowYoutubeInput(true)}
                  className="w-full px-4 py-3 bg-white/20 text-white hover:bg-white/30 transition-all"
                >
                  {videoId ? 'Change Video' : 'Add YouTube Video'}
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-1">{timer.focusScore}</div>
              <div className="text-sm font-medium text-white/80">Focus Score</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-1">{statistics.bestStreak}</div>
              <div className="text-sm font-medium text-white/80">Best Streak</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-1">{statistics.sessionsCompleted}</div>
              <div className="text-sm font-medium text-white/80">Sessions Done</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="text-3xl font-bold text-white mb-1">{Math.round(statistics.averageSessionLength)}m</div>
              <div className="text-sm font-medium text-white/80">Avg. Session</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyFlow;