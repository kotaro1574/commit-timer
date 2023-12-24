"use client"

import { useEffect, useState } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

import { Button } from "@/components/ui/button"

export default function CommitTimer({
  duration,
  onComplete,
}: {
  duration: number
  onComplete: (totalElapsedTime: number) => void
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [key, setKey] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const onStart = () => {
    setIsPlaying(true)
  }

  const onStop = () => {
    setIsPlaying(false)
  }

  const onReset = () => {
    setIsPlaying(false)
    setKey((prevKey) => prevKey + 1)
  }
  const onEnd = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the timer?")
    if (confirmEnd) {
      onComplete(elapsedTime)
    } else {
      setIsPlaying(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
  }

  return (
    <div className="grid gap-4">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={"#F7A278"}
        size={300}
        onComplete={onComplete}
        strokeWidth={12}
        key={key}
        trailStrokeWidth={6}
      >
        {({ remainingTime }) => (
          <div className="text-4xl font-bold">{formatTime(remainingTime)}</div>
        )}
      </CountdownCircleTimer>
      {isPlaying ? (
        <Button className="w-full" onClick={onStop}>
          Stop
        </Button>
      ) : (
        <>
          <Button className="w-full" onClick={onStart}>
            Start
          </Button>
          <div className="flex justify-center space-x-4">
            <Button className="w-full" variant={"outline"} onClick={onReset}>
              Reset
            </Button>
            <Button className="w-full" variant={"outline"} onClick={onEnd}>
              Done
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
