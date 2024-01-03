import LoginForm from "./login-form"

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Login
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Enter your email address and we will send you a magic link to log in
        without having to remember your password.
      </p>

      <div className="col-6">
        <LoginForm />
      </div>
    </section>
  )
}
