"use client";

import { useState, useEffect, useCallback } from 'react';
import { TimerState, Session, Statistics, TimerSettings, DEFAULT_TIMER_SETTINGS } from './types';

export const useTimer = (settings: TimerSettings = DEFAULT_TIMER_SETTINGS) => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: settings.focusDuration,
    seconds: 0,
    isRunning: false,
    isBreak: false,
    focusScore: 0,
    streak: 0,
  });

  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              // Timer completed
              const newIsBreak = !prev.isBreak;
              completeSession();
              return {
                ...prev,
                isRunning: false,
                isBreak: newIsBreak,
                minutes: newIsBreak ? settings.breakDuration : settings.focusDuration,
                seconds: 0,
                focusScore: prev.focusScore + (prev.isBreak ? 0 : 1),
                streak: prev.streak + (prev.isBreak ? 0 : 1),
              };
            }
            return {
              ...prev,
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          }
          return {
            ...prev,
            seconds: prev.seconds - 1,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, settings]);

  const startTimer = useCallback(() => {
    setTimer(prev => ({ ...prev, isRunning: true }));
    if (!currentSession) {
      const newSession: Session = {
        date: new Date().toISOString(),
        duration: 0,
        type: timer.isBreak ? 'break' : 'study',
        completed: false,
      };
      setCurrentSession(newSession);
    }
  }, [timer.isBreak, currentSession]);

  const pauseTimer = useCallback(() => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(prev => ({
      ...prev,
      minutes: prev.isBreak ? settings.breakDuration : settings.focusDuration,
      seconds: 0,
      isRunning: false,
    }));
    setCurrentSession(null);
  }, [settings]);

  const completeSession = useCallback(() => {
    if (currentSession) {
      const completedSession: Session = {
        ...currentSession,
        completed: true,
        duration: timer.isBreak ? settings.breakDuration : settings.focusDuration,
      };
      setSessions(prev => [...prev, completedSession]);
      setCurrentSession(null);
    }
  }, [currentSession, timer.isBreak, settings]);

  return {
    timer,
    setTimer,
    sessions,
    startTimer,
    pauseTimer,
    resetTimer,
    completeSession,
  };
};

export const useStatistics = (sessions: Session[]) => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalFocusTime: 0,
    sessionsCompleted: 0,
    bestStreak: 0,
    averageSessionLength: 0,
  });

  useEffect(() => {
    const studySessions = sessions.filter(s => s.type === 'study' && s.completed);
    const totalTime = studySessions.reduce((acc, session) => acc + session.duration, 0);
    const avgLength = studySessions.length > 0 ? totalTime / studySessions.length : 0;

    let currentStreak = 0;
    let bestStreak = 0;
    
    // Calculate streaks
    studySessions.forEach((session, index) => {
      if (index === 0 || isConsecutiveDay(studySessions[index - 1].date, session.date)) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    });

    setStatistics({
      totalFocusTime: totalTime,
      sessionsCompleted: studySessions.length,
      bestStreak,
      averageSessionLength: avgLength,
    });
  }, [sessions]);

  return statistics;
};

const isConsecutiveDay = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};
