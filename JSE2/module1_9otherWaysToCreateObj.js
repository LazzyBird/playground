// FACTORY FUNCTION - this is not a mechanism of a language but PROGRAMMING PATTERN
{
  let createPoint = function (x, y) {
    let obj = {};
    obj.x = x;
    obj.y = y;
    return obj;
  };
  let point1 = createPoint(1, 1); // declaring the object as a variable which refers to function with given arguments
  let point2 = createPoint(2, 2);
  console.log(point1.x); // ->  1
  console.log(point2.x); // -> 2
}
// simplified version:
{
  let createPoint = function (x, y) {
    return { x: x, y: y };
  };
  let point1 = createPoint(1, 1);
  let point2 = createPoint(2, 2);
  console.log(point1.x); // ->  1
  console.log(point2.x); // -> 2
}
//even more simplified:
{
  let createPoint = function (x, y) {
    return {
      x,
      y
    };
  };
}
// and more: MORE.gif is here
{
  let createPoint = (x, y) => ({ x, y });
}

// зараз з'ясуємо що тут відбувається
{
  let createColoredPoint = function (x, y, color) {
    let _info = "... object under construction";
    let _color = color;
    console.log(_info);
    return {
      x,
      y,
      getColor() {
        return _color;
      }
    };
  };
  let coloredPoint1 = createColoredPoint(1, 1, "red"); // -> ... object under construction
  let coloredPoint2 = createColoredPoint(2, 2, "green"); // -> ... object under construction
  console.log(coloredPoint1.getColor()); // -> red
  console.log(coloredPoint2.getColor()); // -> green
  console.log(coloredPoint1._color); // -> undefined !!!
}
