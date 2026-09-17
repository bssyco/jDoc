import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import banner from "./banner.js";
// import { terser } from 'rollup-plugin-terser';
import { MEDIA_FILE_NAME, MEDIA_NAME } from "../src/var.js";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

let fileDest = MEDIA_FILE_NAME;
const external = ["jquery"];

const globals = {
  jquery: "jQuery",
};

module.exports = {
  input: [path.resolve(__dirname, "../src/jdoc.js")],
  output: {
    banner,
    file: path.resolve(__dirname, `../dist/${fileDest}`),
    format: "umd",
    globals,
    name: MEDIA_NAME,
    sourcemap: true,
  },
  external,
  plugins: [
    babel({
      exclude: "node_modules/**", // Only transpile our source code
      presets: [],
      plugins: []
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    //production && terser(), // minify, but only in production
  ],
};
