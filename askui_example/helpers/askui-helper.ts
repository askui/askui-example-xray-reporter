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
      },
      'xray-report', // outputDirectory (default: 'xray-report')
      false, // resetReportDirectory -> deletes the outputDirectory before execution if set to true (default: false)
      false // appendToReport -> appends the results to the file 'report.json if set to true. Otherwise it creates files report_<timestamp>.json (default: false)
    );

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
  xRayReporter.finishTestEntry(global.testName, global.testStatus);
});

afterAll(async () => {
  await xRayReporter.writeReport();

  aui.disconnect();
});

export { aui };
