const template ="<------------------>\n<- Strona nr: 000 ->\n<------------------>\n    TEKST NR %day%\n PSALM RESPONSORYJNY\n     %date%\n\n\n\n\n\n\n<------------------>\n<- Strona nr: 001 ->\n<------------------>\n%content%\n<------------------>\n<- Strona nr: 002 ->\n<------------------>"

/**
 * @param {string} words <= 11 words
 * @param {string} day format: dd
 * @param {string} fulldate format: dd.mm.yyyy
 */
export default function formatText(words,day,fulldate) {
  const lines =splitWords(fixEncoding(words)).map(l => wordCentering(breakWords(l)))
  const content =lineCentering(lines)

  let file =template

  file =file.replace(/%day%/,day)
  file =file.replace(/%date%/,fulldate)
  file =file.replace(/%content%/,content)

  return file
}

/**
 * @param {string} str
 * @return {[string,string]} [line1, line2] -> 5 syllables, up to 6 syllables in line
 */
export function splitWords(str) {
  const words = str.split(/\s/)
  
  let splitIndex =0
  let count =0
  for ( const word of words ) {
    let n = word.match(/[AĄEĘIOÓUY]/g)?.length || 0
    const ia =word.match(/(IA)|(IE)|(IĄ)|(IĘ)|(IU)|(IO)/g)?.length || 0
    
    count += n -ia
    splitIndex += word.length +1
    if ( count >= 5 ) break
  }

  const line1 =str.substring(0,splitIndex).trim()
  const line2 =str.substring(splitIndex,str.length).trim()

  return [line1,line2]
}

/**
 * @param {string} str
 */
export function breakWords(str) {
  const words = str.split(/\s/)
  const lines =[]

  let count =0
  let line =[]
  for ( let i in words ) {
    const word =words[i]
    count += word.length +1

    if ( count > 20 ) {
      lines.push(line)
      line =[]
    }
    line.push(word)
  }
  lines.push(line)

  return lines
}

/**
 * @param {string[][]} arr
 */
export function wordCentering(arr) {
  return arr.map(l => {
    const str =l.join(" ")
    const n =Math.ceil((20 -str.length) /2)
    if ( n < 1 ) return str
    return " ".repeat(n) +str
  })
}

/**
 * @param {string[][]} arr
 * @return {string}
 */
export function lineCentering(arr) {
  const lines =arr.flat(Infinity)
  let n =Math.ceil((8 -lines.length) /2)

  let content ="\n".repeat(n) +lines.join("\n")
  n =8 -content.match(/\n/g)?.length || 0

  return content +"\n".repeat(n)
}

export function fixEncoding(str) {
  return str
  .replace(/Ą/g,String.fromCharCode(165))
  .replace(/Ć/g,String.fromCharCode(198))
  .replace(/Ę/g,String.fromCharCode(202))
  .replace(/Ł/g,String.fromCharCode(163))
  .replace(/Ń/g,String.fromCharCode(209))
  .replace(/Ó/g,String.fromCharCode(211))
  .replace(/Ś/g,String.fromCharCode(140))
  .replace(/Ź/g,String.fromCharCode(143))
  .replace(/Ż/g,String.fromCharCode(175))
}