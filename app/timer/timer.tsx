"use client"

import { CountdownCircleTimer } from "react-countdown-circle-timer"

export default function Timer({
  duration,
  onComplete,
}: {
  duration: number
  onComplete: () => void
}) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
  }

  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      colors={"#F7A278"}
      size={300}
      onComplete={onComplete}
    >
      {({ remainingTime }) => (
        <div className="text-4xl font-bold">{formatTime(remainingTime)}</div>
      )}
    </CountdownCircleTimer>
  )
}
