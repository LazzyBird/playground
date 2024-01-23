// Code Challenge #1
let images = [
  {
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    date: 1503
  },
  {
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    date: 1495
  },
  {
    title: "Starry Night",
    artist: "Vincent van Gogh",
    date: 1889
  },
  {
    title: "The Scream",
    artist: "Edvard Munch",
    date: 1893
  },
  {
    title: "Guernica",
    artist: "Pablo Picasso",
    date: 1937
  },
  {
    title: "The Kiss",
    artist: "Gustav Klimt",
    date: 1907
  },
  {
    title: "Girl With a Pearl Earring",
    artist: "Johannes Vermeer",
    date: 1665
  },
  {
    title: "The Birth of Venus",
    artist: "Sandro Boticelli",
    date: 1485
  },
  {
    title: "Las Meninas",
    artist: "Diego Velazques",
    date: 1656
  },
  {
    title: "The Creation of Adam",
    artist: "Michelangelo",
    date: 1512
  }
];
// properties template:
/*
    {
        title: "string",
        artist: "string",
        date: "number"
    }
    */
/* // My solution
  for (const image of images) {
    console.log(
      image.title,
      " (",
      image.artist,
      ",",
      image.date,
      ")"
    );
  }*/
// Sample solution:
images.forEach((image) => {
  console.log(`${image.title} (${image.artist}, ${image.date})`);
});
// Code Challenge #2
let Image = function (title, artist, date) {
  //constructor
  this.title = title;
  this.artist = artist;
  this.date = date;
};
let getImage = function (title, artist, date) {
  //factory
  {
    return { title, artist, date };
  }
};
let images1 = [];
let images2 = [];
images.forEach((image) =>
  images1.push(new Image(image.title, image.artist, image.date))
); // creating new array of new objects based on the properties read using Image constructor
images.forEach((image) =>
  images2.push(getImage(image.title, image.artist, image.date))
); // create same but using getImage function as factory?
//display content of images2:
images2.forEach((image) => {
  console.log(`${image.title} (${image.artist}, ${image.date})`);
});

/// Code challenge #3
{
    let Image = function (title, artist, date) {
      this.title = title;
      this.artist = artist;
      this.date = date;
    };
  let images = {
    list: {
      title: "string",
      artist: "string",
      date: "Number",
      contains(title) {
        return title ? true : false;
          },
      add(title, artist, date) {
          let obj = new Image(title, artist, date);
          return obj;
          },
          show() {
          // show all images froom the list
          },
          clear() {
              // delete all added items
          }
    }
  };
}
{// compare and comprehedt this openai corrected solution
  let Image = function (title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
  };

  let images = {
    list: [],

    contains(title) {
      // Check if an image with the given title is in the list
      return this.list.some((image) => image.title === title);
    },

    add(title, artist, date) {
      // Add a new image to the list if it doesn't already exist
      if (!this.contains(title)) {
        let obj = new Image(title, artist, date);
        this.list.push(obj);
      }
    },

    show() {
      // Display all images from the list
      for (image of this.list) {
        console.log(image);
      }
    },

    clear() {
      // Clear all items from the list
      this.list = [];
    }
  };

  // Example usage:
  images.add("Sunset", "John Doe", "2022-01-01");
  images.add("Mountains", "Jane Smith", "2022-02-15");
  images.show(); // Display all images
  images.clear(); // Clear the list
}
