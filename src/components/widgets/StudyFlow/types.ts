export interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isBreak: boolean;
  focusScore: number;
  streak: number;
}

export interface Session {
  date: string;
  duration: number;
  type: 'study' | 'break';
  completed: boolean;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  url: string;
}

export interface Statistics {
  totalFocusTime: number;
  sessionsCompleted: number;
  bestStreak: number;
  averageSessionLength: number;
}

export interface TimerSettings {
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
};
