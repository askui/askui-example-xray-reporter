import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: '@askui/askui-jest-xray-environment',
  setupFilesAfterEnv: ['./helpers/askui-helper.ts'],
  sandboxInjectedGlobals: [
    'Math',
  ],
  reporters: [ "default", "jest-junit" ]
};

// eslint-disable-next-line import/no-default-export
export default config;
