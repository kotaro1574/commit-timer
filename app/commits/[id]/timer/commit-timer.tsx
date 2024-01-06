"use client"

import { useEffect, useState } from "react"
import { ColorFormat, CountdownCircleTimer } from "react-countdown-circle-timer"
import { clearTimeout, setTimeout } from "worker-timers"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"

export default function CommitTimer({
  commit,
  onComplete,
}: {
  commit: Pick<Database["public"]["Tables"]["commits"]["Row"], "time" | "color">
  onComplete: (totalElapsedTime: number) => void
}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [key, setKey] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [timeoutId, setTimeoutId] = useState<number>(0)

  const setTimer = ({ time }: { time: number }) => {
    const id = setTimeout(() => {
      const audio = new Audio("/bell.mp3")
      audio.play()
    }, time * 1000)

    setTimeoutId(id)
  }

  useEffect(() => {
    setTimer({ time: commit.time })
  }, [])

  const onStart = () => {
    setTimer({ time: remainingTime })
    setIsPlaying(true)
  }

  const onStop = () => {
    clearTimeout(timeoutId)
    setIsPlaying(false)
  }

  const onReset = () => {
    setIsPlaying(false)
    setKey((prevKey) => prevKey + 1)
  }

  const onEnd = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the timer?")
    if (confirmEnd) {
      const elapsedTime = commit.time - remainingTime
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
        duration={commit.time}
        colors={commit.color as ColorFormat}
        size={300}
        onComplete={onComplete}
        onUpdate={(remainingTime) => {
          setRemainingTime(remainingTime)
        }}
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
