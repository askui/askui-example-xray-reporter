import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: '@askui/askui-reporters/dist/cjs/xray/jest-xray-environment.js',
  setupFilesAfterEnv: ['./helpers/askui-helper.ts'],
  sandboxInjectedGlobals: [
    'Math',
  ],
  reporters: [ "default", "jest-junit" ]
};

// eslint-disable-next-line import/no-default-export
export default config;
