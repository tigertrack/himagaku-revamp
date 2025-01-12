import React, { useImperativeHandle, useMemo, forwardRef, useRef, useState,useEffect } from "react";

export interface exposeMethods {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface Props {
  timeLimit: number,
  onTimeUp: () => void
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const TimeBar: any = forwardRef<exposeMethods, Props>(({timeLimit, onTimeUp}, ref) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const elapsedTimePercentage = useMemo(
    () => {
      const percentage = (elapsedTime / timeLimit) * 100 
      return percentage > 100 ? 100 : percentage
    },
    [elapsedTime, timeLimit]
  );

  useEffect(() => {
    if(elapsedTime >= timeLimit){
      clearInterval(intervalRef.current ?? undefined);
      intervalRef.current = null;
      onTimeUp()
    }
  }, [elapsedTime, timeLimit, onTimeUp])
  

  useImperativeHandle(ref, () => ({
    start: () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
        }, 10)
      }
    },
    stop: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    reset: () => {
      stop()
      setElapsedTime(0)
    }
  }));

  
  return (
    <div>
      <div className="h-1 w-full">
        <div
          className="h-2 bg-gray-400"
          style={{ width: `${elapsedTimePercentage}%` }}
        ></div>
      </div>
    </div>
  );
});

TimeBar.displayName = 'TimerBar'

export default TimeBar;
