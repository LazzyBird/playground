import Env from "@helpers/env";
const URL = Env.URL;
export const taskURL = {
  random: `${URL}/shifting_content/menu?mode=random`,
  shift: `${URL}/shifting_content/menu?pixel_shift=100`,
  randomAndShift: `${URL}/shifting_content/menu?mode=random&pixel_shift=100`,
};
