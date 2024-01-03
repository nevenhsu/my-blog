import util from 'util'

export function logObj(val: any) {
  console.log(util.inspect(val, { showHidden: false, depth: null, colors: true }))
}

export function cleanup(val: string, toLowerCase = true) {
  // only keep a-z 0-9
  // allow special characters: . _ -
  const str = toLowerCase ? val.toLowerCase() : val
  return str.replace(/[^a-zA-Z0-9._-]/g, '')
}
