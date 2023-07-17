import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [{
    input: 'src/index.ts',
    output: [
        {
            dir: 'lib/cjs',
            format: 'cjs',
            entryFileNames: '[name].js',
        },
        {
            dir: 'lib/esm',
            format: 'es',
            entryFileNames: '[name].js',
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
}, {
    input: 'src/matrix.ts',
    output: [
        {
            dir: 'lib/cjs',
            format: 'cjs',
            entryFileNames: '[name].js',
        },
        {
            dir: 'lib/esm',
            format: 'es',
            entryFileNames: '[name].js',
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
}, {
    input: 'src/math.ts',
    output: [
        {
            dir: 'lib/cjs',
            format: 'cjs',
            entryFileNames: '[name].js',
        },
        {
            dir: 'lib/esm',
            format: 'es',
            entryFileNames: '[name].js',
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
}];
