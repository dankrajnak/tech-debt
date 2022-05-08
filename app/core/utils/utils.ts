import { makeSingleton } from "./singleton"

const pr = makeSingleton(() => new Intl.PluralRules("en-US", { type: "ordinal" }))

const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
])

export const getOrdinal = (n: number): string => {
  const rule = pr().select(n)
  const suffix = suffixes.get(rule)
  return `${n}${suffix}`
}

const dateFormatter = makeSingleton(
  () => new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "short" })
)

export const formatDate = (date: Date): string => {
  if (!date) {
    return ""
  }
  return dateFormatter().format(date)
}
