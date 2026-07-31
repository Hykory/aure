"use client";

import { useEffect, useState } from "react";

export type ElapsedTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateElapsed(startDate: string): ElapsedTime {
  const elapsed = Math.max(0, Date.now() - new Date(startDate).getTime());
  const totalSeconds = Math.floor(elapsed / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function useRelationshipTimer(startDate: string): ElapsedTime {
  const [elapsed, setElapsed] = useState<ElapsedTime>(() =>
    calculateElapsed(startDate),
  );

  useEffect(() => {
    const update = () => setElapsed(calculateElapsed(startDate));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [startDate]);

  return elapsed;
}
