module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    production: {
      plugins: ['babel-plugin-jsx-remove-data-test-id'],
    },
  },
};
