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
// works fine without adding sorting
function showAllContacts(contacts) {
  if (contacts instanceof Array) {
    for (contact of contacts) {
      console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
    }
  }
}
// works fine
function showContact(contacts, i) {
  if (contacts instanceof Array && contacts[i]) {
    console.log(`Name: ${contacts[i].name} / Phone: ${contacts[i].phone} / Email: ${contacts[i].email}`);
  }
}
// works fine
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
function sortContactsByKey(contacts, key, order) {
  contacts.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1 * order;
    }
    if (a[key] > b[key]) {
      return 1 * order;
    }
    return 0;
  });
  console.log(`Contacts sorted by ${key}`);
  for (contact of contacts) {
    console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
  }
}
function sortingOrder(order) {
  // call in confirm window - OK ascendant, Cancel - descendant
  if (order !== null) {
    return order ? 1 : -1;
  } else {
    return null; // Handle cancel case
  }
}

while (confirm("Do you want to use contact manager?OK - confirm, Cancel - exit")) {
  let viewOrAdd = confirm("Do you want to view contact(s) or add a new one?OK - view, Cancel - add");
  if (viewOrAdd) {
    let allOrOne = confirm(
      `You have ${contacts.length} contacts. OK - process to entering the index of the contact you want to see or Cancel - show all contacts`
    );
    if (allOrOne) {
      let index = parseInt(
        promptValidInput(`You have ${contacts.length} contacts. Enter the index of the contact you want to see`, true),
        10
      );
      if (index !== null && !isNaN(index) && index >= 1 && index <= contacts.length) {
        showContact(contacts, index - 1);
      }
    } else {
      let keyToSort = promptValidInput("Enter key to sort (0 - name, 1 - phone, 2 - email)", true);
      if (keyToSort) {
        let order = confirm("OK - ascendent, Cancel - descendant");
        sortContactsByKey(contacts, keyToSort, sortingOrder(order));
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
