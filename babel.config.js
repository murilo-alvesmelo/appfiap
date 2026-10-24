module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: { '@': './src' },
      },
    ],
    // Precisa ser o último plugin (Reanimated 4).
    'react-native-worklets/plugin',
  ],
};
