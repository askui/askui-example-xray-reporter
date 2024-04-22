# 📇 askui-example-xray-reporter

An example of how to create an [XRAY](https://marketplace.atlassian.com/apps/1211769/xray-test-management-for-jira?tab=overview&hosting=cloud) compatible report you can import via XRAYs-REST-API with [AskUI](https://github.com/askui/askui) and `jest`.

## 🖥️ Installation
Install example project's dependencies

```shell
# Root folder
npm install
```

## 📝 Configuration

1. You need to configure credentials to be able to run the example (except on Windows). See [AskUI UI Control Client docs](https://docs.askui.com/docs/general/Components/askui-ui-control-client#credentials)

2. Also the example assumes that you start the AskUI UI Controller manually instead of through the `beforeAll` and `afterAll` (teardown) hooks.

Downloads:

* Please use our AskUI Installer and follow the Getting Started guide: [Windows](https://docs.askui.com/docs/general/Getting%20Started/Installing%20AskUI/getting-started)
* [Linux](https://files.askui.com/releases/askui-ui-controller/latest/linux/x64/askui-ui-controller.AppImage)

> ℹ️ **macOS** After installation to `Applications` remove the quarantine flag with the following command run from a terminal: `xattr -d com.apple.quarantine /Applications/askui-ui-controller.app`

* [macOS(Intel)](https://files.askui.com/releases/askui-ui-controller/latest/darwin/x64/askui-ui-controller.dmg)
* [macOS(Apple silicon)](https://files.askui.com/releases/askui-ui-controller/latest/darwin/arm64/askui-ui-controller.dmg)

3. Set the environment variable `ASKUI_INFERENCE_SERVER_URL` for your terminal session like this:

```
export ASKUI_INFERENCE_SERVER_URL=https://inference.askui.com
```

## 🦾 Usage

Workflows can be run with:

```shell
npm run askui
```

## JSON Report
The JSON with the results in [XRAYs proprietary format](https://docs.getxray.app/display/XRAYCLOUD/Using+Xray+JSON+format+to+import+execution+results) will be generated under `xray-report/report.json` and will look like this:

```json
{
  "tests": [
    {
      "testKey": "TEST1",
      "start": "2024-01-10T15:17:05.998Z",
      "steps": [
        {
          "status": "PASS",
          "evidences": [
            {
              "data": "iVBORw0KGgoAAAANSUhEUgAAC ...",
              "filename": "before.png",
              "contentType": "image/png"
            },
            {
              "data": "AAAAesCAYAAACEMRk8ABJYYklEQVR ...",
              "filename": "after.png",
              "contentType": "image/png"
            }
          ]
        }
      ],
      "finish": "2024-01-10T15:17:10.852Z",
      "status": "FAIL"
    }
  ]
}
```

The `testKey` property is extracted from the `it`-block. So a workflow file that looks like this will generate the above report:

```typescript
import { aui } from './helpers/askui-helper';

describe('jest with XRAY', () => {
  it('TEST1', async () => {
    // For Windows users:
    // Use annotate() to create an annotated HTML file
    // of your screen that is saved under <project_root>/report
    // await aui.annotate();
    await aui.moveMouse(200, 200).exec();

    expect(true).toBe(false);

    // Uncomment for macOS and Linux
    // Delete the lines above to not trigger annotate()
    // await aui.annotateInteractively();
  });
});
```

## JUnit-XML Report
In case you only need a JUnit-XML file for XRAY. The JUnit-XML will be generated in your root-folder as `junit.xml`

## 🔧 Details
* [The reporter implementation](https://github.com/askui/askui-reporters/blob/main/src/xray/askui-xray-step-reporter.ts)
* [Enabling reporter and configuration](https://github.com/askui/askui-example-xray-reporter/blob/main/test/helper/askui-helper.ts)
* [testEnvironment configuration for XRAY](https://github.com/askui/askui-example-xray-reporter/blob/main/test/jest.config.ts)
