module.exports = {
  presets: [require('@react-native/babel-preset')],
  plugins: [
    require('react-native-css-interop/dist/babel-plugin').default,
    [
      require('@babel/plugin-transform-react-jsx'),
      {
        runtime: 'automatic',
        importSource: 'react-native-css-interop',
      },
    ],
  ],
};
