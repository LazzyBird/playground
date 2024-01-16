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
// rethink all logic. prompt returns empty sting if no input and ok was pressed, null if cancel was pressed.
/*let a = prompt("Enter smth");
console.log(a, typeof a)
*/
function showAllContacts(contacts) {
  if (contacts instanceof Array) {
    for (contact of contacts) {
      console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
    }
  }
}

function showContact(contacts, i) {
  if (contacts instanceof Array && contacts[i]) {
    console.log(`Name: ${contacts[i].name} / Phone: ${contacts[i].phone} / Email: ${contacts[i].email}`);
  }
}

function addNewContact(contacts, name, phone, email) {
  if (contacts instanceof Array && name && phone && email) {
    contacts.push({
      name: name,
      phone: phone,
      email: email,
    });
    console.log(`Contact added: ${contacts.length}th / ${name} / ${phone} / ${email}`);
  }
}

function promptValidInput(promptMessage, allowCancel) {
  let input;
  do {
    input = prompt(promptMessage);
    if (input === null && allowCancel) {
      return null;
    }
  } while (!input);

  return input;
}
while (confirm("Do you want to use the contact manager?")) {
  let choice1 = confirm("Do you want to view contact(s) - (OK button) or add a new one - (Cancel button)?");

  if (choice1) {
    let choice2 = confirm(
      `You have ${contacts.length} contacts. Enter the index of the contact you want to see or cancel to show all contacts`
    );

    if (choice2 === null) {
      showAllContacts(contacts);
    } else if (Number(choice2) && (Number(choice2) <= contacts.length)) {
      showContact(contacts, Number(choice2) - 1);
      if (choice2 === null) {
        showAllContacts(contacts);
      } else {
        let index = parseInt(choice2, 10);
        if (!isNaN(index) && index >= 1 && index <= contacts.length) {
          showContact(contacts, index - 1);
        } else {
          promptValidInput(`Enter a valid index of the contact (1 - ${contacts.length})`);
        }
      }
    } else {
      let name = promptValidInput("Enter name", true);
      let phone = promptValidInput("Enter phone", true);
      let email = promptValidInput("Enter email", true);

      if (name === null || phone === null || email === null) {
        continue;
      }

      addNewContact(contacts, name, phone, email);
    }
  }
}
