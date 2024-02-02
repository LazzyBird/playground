// reminding of creating objects with constructor function
{
  let Vehicle = function (id, latitude, longitude) {
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.time = Date.now();
    this.latitude = latitude;
    this.longitude = longitude;
  };
  let vehicle1 = new Vehicle("AL1024", 59.358615, 17.947589);
  vehicle1.setPosition(59.367647, 18.213451);
  console.log(vehicle1); // -> Vehicle {id: 'AL1024', status: 'unavailable', time: 1649347600000, latitude: 59.367647, longitude: 18.213451}
}
// refactoring of the above code
{
  let Vehicle = function (id, latitude, longitude) {
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.setPosition(latitude, longitude);
  };
}
//what if we don't want to depend on the order of the fields?
{
  let Vehicle = function (initialData) {
    //The values will be recognized by their names, not by their order. The constructor accepts this object as the initialData parameter and decomposes it into individual fields. The following line:
    let { id, latitude, longitude } = initialData;
    // this is called destructuring assignment
    /* 🔼this line is actually nothing but:
let id = initialData.id;
let latitude = initialData.latitude;
let longitude = initialData.longitude;

      */
    this.setPosition = function (latitude, longitude) {
      this.time = Date.now();
      this.longitude = longitude;
      this.latitude = latitude;
    };
    this.id = id;
    this.status = "unavailable";
    this.setPosition(latitude, longitude);
  };
  let vehicle1 = new Vehicle({
    id: "AL1024",
    latitude: 59.367647,
    longitude: 18.213451
  });
  let vehicle2 = new Vehicle({
    longitude: 18.213423,
    latitude: 59.367628,
    id: "AL1024"
  });
}
// some new iterations of code
{
    let Vehicle = function ({ id, latitude, longitude }) {
      this.setPosition = function ({ latitude, longitude }) {
        this.time = Date.now();
        this.longitude = longitude;
        this.latitude = latitude;
      };
      this.getPosition = function () {
        return {
          latitude: this.latitude,
          longitude: this.longitude
        };
      };
      this.id = id;
      this.status = "unavailable";
      this.setPosition({ latitude, longitude });
    };
    let vehicle1 = new Vehicle({
      id: "AL1024",
      latitude: 59.367647,
      longitude: 18.213451
    });
    let vehicle2 = new Vehicle({
      longitude: 18.213423,
      latitude: 59.367628,
      id: "AL1024"
    });

}