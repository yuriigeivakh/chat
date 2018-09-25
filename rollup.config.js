import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel'
import image from 'rollup-plugin-img';
const embedCSS = require('rollup-plugin-embed-css');

export default {
    input: 'src/components/App.js',
    external: ['@babel/react'],
    output: {
        format: 'umd',
        name: 'countdown',
        file: 'dist/index.js',
        globals: {
            react: "React"
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        image({
            limit: 10000
          }),
        terser(),
        embedCSS()
    ],
}