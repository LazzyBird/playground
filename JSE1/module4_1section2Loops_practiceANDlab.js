// Ex 1,2
{
  let x = prompt("Enter initial vallue");
  let y = prompt("Enter final value");
  if (!Number(x) || !Number(y) || x < y) {
    alert("Invalid input");
  } else {
    while (x >= y) {
      console.log(x);
      x = x - 10;
    }
  }
}
// Ex 3
{
  let numbers = [21, 45, 100, 12, 11, 78, 61, 4, 39, 22];
  for (number of numbers) {
    console.log(number);
  }
  for (number of numbers) {
    if (number % 2 === 0) {
      console.log(number);
    }
  }
  for (number of numbers) {
    if (number > 10 && number < 60) {
      console.log(number);
    }
  }
}
// Ex 4
{
  let movieList = [];
  let movie = {};
  for (let i = 0; i++; ) {
    let name = prompt("Enter movie name");
    let rating = prompt("Enter rating");
    movie.name = name;
    movie.rating = Number(rating);
    movieList.push(movie);
    if (!name || !rating) {
      break;
    }
  }
  for (const movie of movieList) {
    if (movie.rating < 7) {
      continue;
    }
    console.log(movie.name, movie.rating);
  }
  for (const movie of movieList) {
    if (movie.rating >= 7) {
      continue;
    }
    console.log(movie.name, movie.rating);
  }
}
// Ex 4 while variant
{
  let movies = [];
  while (true) {
    let title = prompt("Enter movie title");
    let rating = prompt("Enter movie rating (imdb)");
    if (isNaN(rating)) {
      rating = prompt("You entered invalid rating. Enter valid");
    }
    if (title === "") {
      title = prompt("You entered empty title, retry");
    }
    if (rating == 0) {
      rating = prompt("You entered empty rating, retry");
    }
    if (title === null || rating === null) {
      break;
    } else {
      movies.push({
        title: title,
        rating: Number(rating),
      });
    }
  }

  console.log("All with ratings under 7:");
  for (movie of movies) {
    if (movie.rating < 7) {
      console.log(`${movie.title} (${movie.rating})`);
    }
  }

  console.log("All with ratings over 7:");
  for (movie of movies) {
    if (movie.rating >= 7) {
      console.log(`${movie.title} (${movie.rating})`);
      break;
    }
  }
}
// Ex 5
{
  let vessel = {
    LATITUDE: 40.07288,
    LONGITUDE: 154.48535,
    COURSE: 285.6,
    SPEED: 14.0,
    IMO: 9175717,
    NAME: "MARENO",
  };

  for (let key in vessel) {
    console.log(`${key} -> ${vessel[key]}`);
  }
}
// Ex 6
{
  let firstNumber = prompt("Enter firstNumber or press Q to exit");
  let secondNumber = prompt("Enter secondNumber or press Q to exit");
  let operator = prompt("Enter operator(+, -, *, /) or press Q to exit");
  let result;
  while (
    firstNumber !== "Q" &&
    secondNumber !== "Q" &&
    operator !== "Q" &&
    firstNumber !== null &&
    secondNumber !== null &&
    operator !== null &&
    firstNumber !== "q" &&
    secondNumber !== "q" &&
    operator !== "q"
  ) {
    if (
      Number.isNaN(Number(firstNumber)) ||
      Number.isNaN(Number(secondNumber)) ||
      (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/")
    ) {
      alert("Invalid input");
    } else {
      firstNumber = Number(firstNumber);
      secondNumber = Number(secondNumber);
      switch (operator) {
        case "+":
          result = firstNumber + secondNumber;
          alert(result);
          break;
        case "-":
          result = firstNumber - secondNumber;
          alert(result);
          break;
        case "*":
          result = firstNumber * secondNumber;
          alert(result);
          break;
        case "/":
          result = firstNumber / secondNumber;
          alert(result);
          break;
        default:
          alert("Invalid input");
      }
    }
    firstNumber = prompt("Enter firstNumber or press Q to exit");
    secondNumber = prompt("Enter secondNumber or press Q to exit");
    operator = prompt("Enter operator(+, -, *, /) or press Q to exit");
  } alert("Cancelled");
}
  // Lab loops
  {
    let contacts = [
      {
        name: "Maxwell Wright",
        phone: "(0191) 719 6495",
        email: "Curabitur.egestas.nunc@nonummyac.co.uk",
      },
      {
        name: "Raja Villarreal",
        phone: "0866 398 2895",
        email: "posuere.vulputate@sed.com",
      },
      {
        name: "Helen Richards",
        phone: "0800 1111",
        email: "libero@convallis.edu",
      },
    ];
    let option = prompt(
      "Enter option: 1 - display 1st contact, 2 - display last contact, 3 - display all contacts, 4 - add new contact, 5 - exit"
    );
    if (option === null) {
      alert("Cancelled.");
      option = "5";
    }
    while (option !== "5") {
      switch (option) {
        case "1":
          console.log(contacts[0].name, contacts[0].phone, contacts[0].email);
          break;
        case "2":
          console.log(
            contacts[contacts.length - 1].name,
            contacts[contacts.length - 1].phone,
            contacts[contacts.length - 1].email
          );
          break;
        case "3":
          for (const contact of contacts) {
            console.log(contact.name, contact.phone, contact.email);
          }
          break;
        case "4":
          {
            let name = prompt("Enter name");
            if (name === null) {
              alert("Cancelled. Please enter a valid name.");
              break;
            }
            let phone = prompt("Enter phone");
            if (phone === null) {
              alert("Cancelled. Please enter a valid phone number.");
              break;
            }
            let email = prompt("Enter email");
            if (email === null) {
              alert("Cancelled. Please enter a valid email.");
              break;
            }
            contacts.push({
              name: name,
              phone: phone,
              email: email,
            });
            console.log(
              contacts[contacts.length - 1].name,
              contacts[contacts.length - 1].phone,
              contacts[contacts.length - 1].email
            );
          }
          break;
        default:
          alert("Invalid option. Please try again.");
      }
      option = prompt(
        "Enter option: 1 - display 1st contact, 2 - display last contact, 3 - display all contacts, 4 - add new contact, 5 - exit"
      );
    }
  }

