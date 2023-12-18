"use client"

import { CountdownCircleTimer } from "react-countdown-circle-timer"

export default function Timer({ duration }: { duration: number }) {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[10, 6, 3, 0]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
}
