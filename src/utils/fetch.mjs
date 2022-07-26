/**
 * @param {string} date yyyy-mm-dd
 * @param {number} id
 * @param {Boolean} debug
 */
export default async function fetchText(date,id,debug =false) {
  try {
    const response =await fetch(`https://niezbednik.niedziela.pl/liturgia/${date}/Psalm`)
    const html =await response.text()
    let index =html.search(/"tabnowy01"/)
    if ( index < 0 ) index =html.search(/"tabstary01"/)
    const [ searched ] =html.substring(index,index +400).match(/(?<=em>).+(?=<\/em)/) || ["error"]
    const result =searched.replace(/\s+<br>.+/g,"").toUpperCase()
  
    debug && console.log(`${date}: ${result !== "error" ? "success" : "error"}`)
    return {result,date,id}
  }
  catch (err) {
    console.log(err)
    return {result:"Connection error",date,id}
  }
}