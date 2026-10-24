module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  resolver: 'react-native-worklets/jest/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-[a-z-]+)?|@react-native(-community|-async-storage)?|@react-navigation)/)',
  ],
};
