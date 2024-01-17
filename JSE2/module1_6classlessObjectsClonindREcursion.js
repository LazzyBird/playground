// 1.6.4 Copying objects
// Object.assign method
{
  let point0 = { x: 10, y: 20 };
  let point1 = point0; // copy reference
  let point2 = {};
  Object.assign(point2, point0); //  copy properties into the new object
  console.log(point2.x);
  console.log(point2.y);
  console.log(point1 === point0); // true
  console.log(point1 === point2); // false
}

// spread operator
{
  let point0 = { x: 10, y: 20 };
  let point2 = { ...point0 };
  let point3 = { ...point0, z: 100 };
  console.log(point2, point3);
}
{
  let circle1 = {
    radius: 100,
    center: {
      x: 100,
      y: 100
    }
  };
  let circle2 = { ...circle1 };
  circle1.radius = 200;
  circle1.center.x = 200;
  console.log(circle2.radius);
  console.log(circle2.center.x);
  console.log(circle1 === circle2); // false
  console.log(circle1.center === circle2.center); // true !
}
// function to create deep clone of an object with recursion and spread
// in this case it checks if the property is an object - inside initial object
// if it contains subobjects it will call the function recursively to deep clone them
// otherwise it will copy the property
{
/**
 * Deep clones an object.
 *
 * @param {object} obj - The object to be cloned.
 * @return {object} The deep cloned object.
 */
  let deepClone = function (obj) {
    let newObj = { ...obj };
    for (property in newObj) {
      if (typeof newObj[property] === "object") {
        newObj[property] = deepClone(newObj[property]);
      }
    }
    return newObj;
  };
}
