import { UiControlClient, UiController } from 'askui';
import { AskUIXRayStepReporter } from '@askui/askui-reporters';

// Client is necessary to use the askui API
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

let xRayReporter: AskUIXRayStepReporter;

beforeAll(async () => {
  xRayReporter = new AskUIXRayStepReporter({
    // Uncomment the next line if you want screenshots also when steps pass
    // withScreenshots: 'always',
  });

  aui = await UiControlClient.build({
    credentials: {
      workspaceId: '<your workspace id>',
      token: '<your access token>',
    },
    reporter: xRayReporter,
  });

  await aui.connect();
});

beforeEach(async () => {
  xRayReporter.createNewTestEntry(global.testName);
});

afterEach(async () => {
  xRayReporter.finishTestEntry(global.testStatus);
});

afterAll(async () => {
  await xRayReporter.writeReport();

  aui.disconnect();
});

export { aui };
