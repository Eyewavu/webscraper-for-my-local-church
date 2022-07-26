/**
 * @param {string} input
 * @param {number} min
 * @param {number} max
 * @param {number} def
 */
export default function inputFix(input,min,max,def) {
  const n =parseInt(input,10)
  if (isNaN(n)) return def
  if ( n < min || n > max ) return def
  return n
}