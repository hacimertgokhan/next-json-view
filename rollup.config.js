const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const dts = require('rollup-plugin-dts');
const babel = require('@rollup/plugin-babel');
const packageJson = require('./package.json');

// CJS yapılandırması
const cjsConfig = {
    input: 'src/index.ts',
    output: {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
        preserveModules: true
    },
    plugins: [
        resolve.default(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'dist/cjs',
            declaration: false, // CJS için declaration dosyaları oluşturma
        }),
        babel.babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
    ],
    external: [...Object.keys(packageJson.peerDependencies || {})],
};

// ESM yapılandırması
const esmConfig = {
    input: 'src/index.ts',
    output: {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        preserveModules: true
    },
    plugins: [
        resolve.default(),
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.esm.json',
            outDir: 'dist/esm',
            declaration: false, // ESM için declaration dosyaları oluşturma
        }),
        babel.babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
    ],
    external: [...Object.keys(packageJson.peerDependencies || {})],
};

// Tipleri oluşturmak için yapılandırma
const dtsConfig = {
    input: 'src/index.ts', // Doğrudan kaynak dosyayı kullan
    output: [{
        file: 'dist/index.d.ts',
        format: 'esm'
    }],
    plugins: [dts.default()],
};

module.exports = [cjsConfig, esmConfig, dtsConfig];