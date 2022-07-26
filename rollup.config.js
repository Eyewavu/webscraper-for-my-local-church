import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

export default {
  input: "./src/app.mjs",
  output: {
    name:"index",
    format: "cjs",
    file:"./build/bundle.js",
    
  },
  plugins: [
    commonjs(),
    resolve({
      browser: false
    })
  ]
}