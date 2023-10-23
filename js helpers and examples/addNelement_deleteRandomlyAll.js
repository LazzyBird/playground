//https://the-internet.herokuapp.com/add_remove_elements/
function createElements(num) {
    const button = document.querySelector("#content > div > button");
    for (let i = 0; i < num; i++) {
      button.click();
    }
  }
  
  function deleteElements() {
    const elements = document.querySelectorAll(".added-manually");
    if (elements.length === 0) {
      console.log("No elements to delete.");
      return;
    }
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * elements.length);
      elements[randomIndex].click();
  console.log(`${randomIndex} element deleted`);   
      if (document.querySelectorAll(".added-manually").length === 0) {
        console.log("All elements deleted.");
        clearInterval(interval);
      }
    }, 100);
  }
  let max = parseInt(prompt('number of elements'));
  // Usage example:
  createElements(max); // Replace '5' with the number of times you want to click the button
  setTimeout(deleteElements, 100, ); // Delay the start of deletion by 1 second (adjust as needed)
  