let contacts = [{
name: "Maxwell Wright",
phone: "(0191) 719 6495",
email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
name: "Raja Villarreal",
phone: "0866 398 2895",
email: "posuere.vulputate@sed.com"
}, {
name: "Helen Richards",
phone: "0800 1111",
email: "libero@convallis.edu"
}];

contacts.push({
    name: "Maisie Haley",
    phone: "0913 531 3030",
    email: "rissus.Quisque@urna.ca"
});
 console.log( contacts[0].name, contacts[0].phone, contacts[0].email)
 console.log( contacts[contacts.length - 1].name, contacts[contacts.length - 1].phone, contacts[contacts.length - 1].email);

let aContact = contacts.pop();
console.log(aContact.name, aContact.phone, aContact.email)