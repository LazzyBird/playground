/*  this is vanilla object js file
const autoTodo = new (function () {
  this.clickItem = function (item) {
    item.click();
  };
  this.toggleAll = function () {
    document.querySelector("#toggle-all").click();
  };
  this.selectItemX = function (x) {
    document
      .querySelector(`ul.todo-list > li:nth-child(` + x + `) input.toggle`)
      .click();
  };
  this.deleteItemX = function (x) {
    document
      .querySelector("ul.todo-list > li:nth-child(" + x + ") button.destroy")
      .click();
  };
  this.clearCompleted = function () {
    document.querySelector("button.clear-completed").click();
  };
  this.filterCompleted = function () {
    location.hash = "/completed";
  };
  this.filterActive = function () {
    location.hash = "/active";
  };
  this.filterAll = function () {
    location.hash = "/";
  };
  this.createTodo = function (name) {
    document.querySelector("input.new-todo").value = name;
    document.querySelector("input.new-todo").dispatchEvent(
      new Event("change", {
        bubbles: true,
      })
    );
  };
  this.amendTodo = function (x, amendedValue) {
    document
      .querySelector("ul.todo-list > li:nth-child(" + x + ") > div > label")
      .dispatchEvent(
        new Event("dblclick", {
          bubbles: true,
        })
      );
    document.querySelector(
      "ul.todo-list > li:nth-child(" + x + ") .edit"
    ).value = amendedValue;
    document
      .querySelector("ul.todo-list > li:nth-child(" + x + ") .edit")
      .dispatchEvent(new Event("blur"));
  };
  this.toggleOddItem = function () {
    let toggles = document.querySelectorAll(".toggle");
    for (togglePos = 1; togglePos < toggles.length; togglePos++) {
      if (togglePos % 2 == 1) {
        toggles[togglePos].click();
      }
    }
  };
});
*/
/* this is first version of random todo bot
let rando = new function() {
    function getRandomInt(x) {
        return Math.floor(Math.random() * x)
    };
    function getRandomItemIndex() {
        max = document.querySelectorAll("ul.todo-list li").length;
        if (max === 0) {
            console.log("The list is empty");
            return 0;
        }
        x = getRandomInt(max)+1;
return x;
    }
    this.toggleAll = function(){
        console.log("toggle all");
        autoTodo.toggleAll();
    }
    this.selectRandomItem= function(){
        x = getRandomItemIndex();
        if(x>0){
            console.log("select item "+x);
            autoTodo.selectItemX(x);
        }
    }
    this.createRandomTodo = function(){
        console.log("create a todo")
        autoTodo.createTodo("random todo "+ Date.now())
    }
    this.amendRandomTodo = function(){
        x = getRandomItemIndex();
        if(x>0){
            console.log("amend toto "+x);
            autoTodo.amendTodo(x, "amended random todo "+ Date.now())
        }
    }
}
*/

// this is final version with migration of all vanilla functions to todo bot wrapper
var rando = new function(){

    function getRandomInt(x){
        return Math.floor(Math.random() * x);
    }

    function getRandomItemIndex(){
        max = document.querySelectorAll("ul.todo-list li").length;
        if(max===0){
            console.log("no items to choose from");
            return 0;
        }
        x = getRandomInt(max)+1;
        return x;
    }

    this.toggleAll = function(){
        console.log("toggle all");
        autoTodo.toggleAll();
    }

    this.selectRandomItem = function () {    
        x = getRandomItemIndex();
        if(x>0){    
            console.log("select item " + x);
            autoTodo.selectItemX(x);
        }
    }

    this.deleteRandomItem = function () {        
        x = getRandomItemIndex();
        if(x>0){    
            console.log("delete item " + x);
            autoTodo.deleteItemX(x);
        }
    }

    this.clearCompleted = function () {    
        console.log("clear completed");   
        autoTodo.clearCompleted();
    }

    this.filterAll = function () {   
        console.log("filter all");        
        autoTodo.filterAll();
    }

    this.filterActive = function () {        
        console.log("filter active");   
        autoTodo.filterActive();
    }

    this.filterCompleted = function () {      
        console.log("filter completed");     
        autoTodo.filterCompleted();
    }

    this.createRandomTodo = function(){
        console.log("create todo");   
        autoTodo.createTodo("random todo " +  Date.now());
    }

    this.amendRandomTodo = function(){
        x = getRandomItemIndex();
        if(x>0){  
            console.log("amend todo" + x);   
            autoTodo.amendTodo(x, "amended random todo " +  Date.now());
        }
    }
};

