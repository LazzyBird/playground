import Env from "@helpers/env";

const shiftSuffix = "pixel_shift=100";
const modeSuffix = "mode=random";
const random = Env.URL +
    "?" + modeSuffix;
const shift = Env.URL + "?" + shiftSuffix;
const randomAndShift = random + "&" + shiftSuffix;

export const taskURL = {
  random: random,
  shift: shift,
  randomAndShift: randomAndShift
}