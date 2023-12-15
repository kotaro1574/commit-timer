export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Commit Timer",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Commits",
      href: "/commits",
    },
    {
      title: "Timer",
      href: "/timer",
    },
    {
      title: "Chart",
      href: "/chart",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
