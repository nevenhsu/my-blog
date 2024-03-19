import _ from 'lodash'
import util from 'util'
import { format, formatDistanceToNowStrict } from 'date-fns'

export function logObj(val: any) {
  console.log(util.inspect(val, { showHidden: false, depth: null, colors: true }))
}

export function cleanup(val: string, toLowerCase = true) {
  // only keep a-z 0-9
  // allow special characters: . _ -
  const str = toLowerCase ? val.toLowerCase() : val
  return str.replace(/[^a-zA-Z0-9._-]/g, '')
}

export function formatDate(date: string | number | Date) {
  const result = formatDistanceToNowStrict(new Date(date))
  const [n, u] = _.split(result, ' ')
  const num = Number(n)
  const unit = _.last(u) == 's' ? _.dropRight(u).join('') : u

  switch (unit) {
    case 'second':
      return `Just now`
    case 'minute':
    case 'hour':
      return `${result} ago`
    case 'day': {
      if (num == 1) {
        return `Yesterday`
      }
      if (num < 8) {
        return `${result} ago`
      }
    }
  }

  return format(new Date(date), 'MMM d, yyyy')
}
