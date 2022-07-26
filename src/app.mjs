import readline from "readline"
import inputFix from "./utils/inputfix.mjs";
import { dateFormatter, daysInMonth, zeroPrefix } from "./utils/date.mjs";
import fetchText from "./utils/fetch.mjs"
import formatText from "./utils/file.mjs";
import { writeFile } from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let year =new Date().getFullYear()
let month =new Date().getMonth() + 1

rl.question(`Rok: (${year})?`,y => {
  rl.question(`Miesiąc: (${month +1})?`,m => {
    y =parseInt(y.replace(/\s/g,""))
    m =parseInt(m.replace(/\s/g,""))
    
    year =inputFix(y,2019,2100,year)
    month =inputFix(m,1,12,month)
    rl.close()
  })
})


rl.on("close",async () => {
  const days =daysInMonth(month, year)
  const promiseArray =[]
  for ( let i =0; i < days; i++ ) {
    const date =dateFormatter(year, month, i +1)
    promiseArray.push(new Promise(resolve => {
      fetchText(date,i,true)
      .then(resolve)
    }))
  }

  const data =(await Promise.all(promiseArray)).sort((a,b) => a.id - b.id)
  for ( let i =0; i < days; i++ ) {
    const words =data[i].result
    const date =data[i].date
    const day =zeroPrefix(i +1,3)
    const file =formatText(words,day,date.replace(/-/g,"."))

    writeFile(`./out/${day}.txt`,file,err => err ? console.error(`failed to save ${day}.txt`) : console.log(`${day}.txt successfully saved`))
  }  
})