import CreateCommitForm from "./create-commit-form"

export default function CommitCreatePage() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        New Commit
      </h1>
      <CreateCommitForm />
    </section>
  )
}
