'use client'

const error = console.error
console.error = (...args: any) => {
  // hide
  if (/spread|defaultProps/.test(args[0])) return
  error(...args)
}
const warn = console.warn
console.warn = (...args: any) => {
  // hide
  if (/renamed/.test(args[0])) return
  warn(...args)
}
