const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(process.cwd());

config.resolver.sourceExts = [
  'expo-router.js',
  'mjs',
  'js',
  'ts',
  'tsx',
  'json'
];

config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.unstable_allowRequireContext = true;

module.exports = config;