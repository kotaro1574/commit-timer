"use client"

import { ReactNode } from "react"
import NextAdapterApp from "next-query-params/app"
import { QueryParamProvider as NextQueryParamProvider } from "use-query-params"

export default function QueryParamProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <NextQueryParamProvider adapter={NextAdapterApp}>
      {children}
    </NextQueryParamProvider>
  )
}
