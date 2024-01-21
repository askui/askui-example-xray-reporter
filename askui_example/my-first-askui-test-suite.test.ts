import { aui } from './helpers/askui-helper';

describe('jest with XRAY', () => {
  it('TEST1', async () => {
    await aui.moveMouse(200, 200).exec();

    await aui.moveMouse(1000, 500).exec();

    // await aui.expect().button().contains().text("I'm happy!").exists().exec();
    expect(true).toBe(false);
  });
  
  it('TEST2', async () => {
    await aui.moveMouse(200, 200).exec();
    
    expect(true).toBe(true);
    // await aui.expect().text().exists().exec();
  });

});
