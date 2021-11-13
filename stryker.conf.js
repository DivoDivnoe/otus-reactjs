/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  thresholds: { high: 90, low: 88, break: 85 },
  mutate: ['src/**/*.ts?(x)', '!src/**/*@(.test|stories).ts?(x)'],
};
