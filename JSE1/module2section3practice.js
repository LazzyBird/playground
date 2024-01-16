let ticket = {
  from: "Gara de Nord",
  to: "Cluj",
  price: 100,
};
console.log(ticket.from, ticket.to, ticket.price);
let person = {};
person.name = "John";
person.surname = "Snow";
console.log(person.name, person.surname);

function book(id, title, author, numberOfPages) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
}
const book1 = new book(1, "Speaking JavaScript", "Axel Rauschmayer", 460);
const book2 = new book(2, "Programming JavaScript", "Eric Elliot", 254);
const book3 = new book(3, "Understanding ECMAScript 6", "Nicholas C. Zakas", 352);
let library = [book1, book2, book3];
library.push(new book(4, "Learning JavaScript Design Patterns", "Addy Osmani", 254));
console.log(library.length);
library.forEach((book) => {
  console.log(book.title);
});
let newBooks = library.slice(-2);
console.log(newBooks.length);
newBooks.forEach((book) => {
  console.log(book.title);
});
console.log("This book was lost: ,", library.shift().title, "Number of boks left: ", library.length);

let sumOfPages = 0;
library.forEach((book) => {
    sumOfPages += book.numberOfPages;
    return sumOfPages;
})
console.log(sumOfPages);