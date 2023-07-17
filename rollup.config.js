import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'lib/cjs/index.js',
            format: 'cjs',
        },
        {
            file: 'lib/esm/index.js',
            format: 'es',
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            extensions: ['.ts'],
            babelHelpers: 'runtime',
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
        }),

    ],
};
