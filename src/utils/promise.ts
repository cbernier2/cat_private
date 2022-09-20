export const sleep = async (time = 0) =>
  await new Promise<void>(resolve => setTimeout(resolve, time));
