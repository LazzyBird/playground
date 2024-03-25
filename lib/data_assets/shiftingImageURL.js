import Env from "@helpers/env"
const mainURL = Env.URL +
    "shifting_content/image";
export const taskURL = {
  randomShift: `${mainURL}?mode=random`,
  ramdomPixels: `${mainURL}?pixel_shift=100`,
  randomBoth: `${mainURL}?mode=random&pixel_shift=100`,
  simpleAppend: `${mainURL}?image_type=simple`,
};

// ! якщо можна задати зсув у запиті, чому б не додати рандомайзер й функцію для перевірки чи відповідає зсув параметру
