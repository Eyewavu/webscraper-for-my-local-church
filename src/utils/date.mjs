/**
 * @param {number} y year
 * @param {number} m month
 * @param {number} d day
 * @return {string} formatted date: yyyy-mm-dd
 */
export function dateFormatter(y,m,d) {
  m =zeroPrefix(m,2)
  d =zeroPrefix(d,2)

  return `${y}-${m}-${d}`
}

/**
 * @param {number} value
 * @param {number} zeros
 * @return {string}
 */
export function zeroPrefix(value,zeros) {
  const n =zeros -`${value}`.length
  if ( n < 0 ) return `${value}`
  return "0".repeat(n) +value
}

/**
 * @param {number} m month 1 -12
 * @param {number} y year 2019 +
 * 
 * @return {number} days in month
 */
 export function daysInMonth(m,y =new Date().getFullYear()) {
  switch(m) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: return 31

    case 4:
    case 6:
    case 9:
    case 11: return 30

    case 2: return (((y%4 == 0) && (y%100 != 0)) || (y%400 == 0)) ? 29 : 28
    default: return null
  }
}