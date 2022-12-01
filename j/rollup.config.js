/* jshint esversion:11 */
import { terser } from "rollup-plugin-terser";
import strip from '@rollup/plugin-strip';
import replace from 'rollup-plugin-replace-imports-with-vars';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import {copyFileSync} from 'fs';
// const path = 'node_modules/three/examples/jsm/interactive/HTMLMesh.js';
// copyFileSync(path, 'src/HTMLMesh.js');

export default [
	{	
		input: "src/aframe-html.js",
		external: ['three'],
		output: {
			format: "iife",
			sourcemap: true,
			file: 'build/aframe-html.js',
			globals: {
				three: 'THREE'
			}
		},
		plugins: [
			resolve(),
			commonjs({
				include: ["node_modules/**"],
			}),
			// strip({labels: ['documentation']}),
			// replace({ varType: 'const', replacementLookup: globals })
		]
	},
	{
		input: "src/aframe-html.js",
		external: ['three'],
		output: {
			format: "iife",
			sourcemap: true,
			file: 'build/aframe-html.min.js',
			globals: {
				three: 'THREE'
			}
		},
		plugins: [
			resolve(),
			commonjs({
				include: ["node_modules/**"],
			}),
			// replace({ varType: 'const', replacementLookup: globals }),
			strip({labels: ['documentation']}),
			terser()
		]
	},
];
