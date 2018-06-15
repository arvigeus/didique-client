// @flow
import { randomFloat, randomInt } from "./random";

const friendStore = (id: string) => {
  if (!global.window.friends[id])
    global.window.friends[id] = {
      picture: randomFloat(-2, 2),
      tapeMove: randomFloat(5, 15),
      tapeDelete: randomFloat(-5, -15),
      tapeLinks: {
        top: randomInt(60, 90),
        right: randomInt(-10, -15)
      },
      nameTag: randomFloat(-3, 3)
    };
  return global.window.friends[id];
};

export default friendStore;
