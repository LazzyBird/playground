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
  console.log(`${image.title},${image.artist}, ${image.date}`);
});

/// Code challenge #3
{
  let Image = function (title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
  };

  let images = {
    list: [],

    contains(title) {
      // Check if an image with the given title is in the list
      let retVal = false;
      for (var image of this.list) {
        if (image.title === title) {
          retVal = true;
          console.log(retVal);
          break;
        }
      }
      return retVal;
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
      if (this.list.length === 0) {
        console.log("The list is empty");
      } else {
        for (var image of this.list) {
          console.log(`${image.title}, ${image.artist}, ${image.date}`);
        }
      }
    },

    clear() {
      // Clear all items from the list
      this.list = [];
    }
  };

  // Example usage:
  images.add("Mona Lisa", "Leonardo da Vinci", 1503);
  images.add("The Last Supper", "Leonardo da Vinci", 1495);
  images.add("The Starry Night", "Vincent van Gogh", 1889);
  images.add("Mona Lisa", "Leonardo da Vinci", 1503);
  console.log(images.contains("Mona Lisa"));
  images.show();
  images.clear();
  images.show();
}
// Code Challenge #4
{
  let Image = function (title, artist, date) {
    this.title = title;
    this.artist = artist;
    this.date = date;
  };

  let images = {
    list: [],

    contains(title) {
      // Check if an image with the given title is in the list
      let retVal = false;
      for (var image of this.list) {
        if (image.title === title) {
          retVal = true;
          console.log(retVal);
          break;
        }
      }
      return retVal;
    },
    edit(title, artist, date) {
      // Edit an image in the list
      for (var image of this.list) {
        if (image.title === title) {
          image.artist = artist;
          image.date = date;
          break;
        }
      }
    }

    add(title, artist, date) {
      // Add a new image to the list if it doesn't already exist
      if (!this.contains(title)) {
        let obj = new Image(title, artist, date);
        this.list.push(obj);
      }
    },

    show() {
      // Display all images from the list
      if (this.list.length === 0) {
        console.log("The list is empty");
      } else {
        for (var image of this.list) {
          console.log(`${image.title}, ${image.artist}, ${image.date}`);
        }
      }
    },

    clear() {
      // Clear all items from the list
      this.list = [];
    }
  };
}
