import Timer from "./timer"

export default function TimerPage() {
  return (
    <section className="grid gap-6">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Timer
        </h1>
        <div className="mx-auto">
          <Timer duration={60} />
        </div>
      </div>
    </section>
  )
}
