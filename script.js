const Input = document.getElementById('.doitInput');
const addButton = document.getElementById('.addBTN');
const doitList = document.getElementById('.doitlists');
const doneButton = document.getElementById('.doneBTN');
const deleteButton = document.getElementById('.deleteBTN');

document.addEventListener("DOMContentLoaded", localget);

addButton.addEventListener("click", doitAdd);
doitList.addEventListener("click", CheckAndDelete);

function doitAdd(event){

  event.preventDefault();

  const doit = doitcheck();

  if((Input.value.trim() !== "") && (!doit.includes(Input.value))){

    createdoitList(Input.value);

    saveLocaldoit(Input.value);

    Input.value = "";

  }else{
    alert("Task cannot be empty!!!");
  }
}


function createdoitList(doitCompleted){

  const newdoitList = document.createElement("li");
  newdoitList.classList.add("doit")
  createDoit(doitCompleted.newdoitList)
}

function createDoit(doit,newdoitList){

  const newdoitText = document.createElement("h5");
  newdoitText.innerText = doit;

  newdoitList.appendChild(newdoitText);

  const newdoitButton = document.createElement("span");
  newdoitList.appendChild(newdoitButton);

  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.classList.add("doneBTN");

  newdoitButton.appendChild(doneButton);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("deleteBTN");

  newdoitButton.appendChild(deleteButton);

  newdoitList.appendChild(newdoitButton);

  doitList.appendChild(newdoitList);
  }

  function CheckAndDelete(event){

    const item = event.target;

    if(item.classList[0] === "doneBTN"){

      const doit = item.parentElement.parentElement;

      doit.classList.toggle("done");

      saveLocaldoitDone(doit.children[0].innerText);
    }

    if(item.classList[0] === "deleteBTN"){
      
      const doit = item.parentElement.parentElement;
      doit.addEventListener(function(){
        doit.remove();
      });
    }

    removeLocaldoit(doit);
    removeLocaldoitDone(doit);
  }

  function saveLocaldoit(doit){

    const doits = checkdoit();

    doits.push(doit);
    localStorage.setItem("doit",JSON.stringify(doit));
  }

  function removeLocaldoit(doit){

    const doits = checkdoit();

    const doitIndex = doit.children[0].innerText;
    doit.splice(doits.indexOf(doitIndex), 1);
    localStorage.setItem("doits",JSON.stringify(doits));
  }

  function saveLocaldoitDone(doit){

    const doitsDone = checkdoitDone();

    if(!doitsDone.includes(doit)){
      doitsDone.push(doit);
    }else{

      const doitIndex = doit;
      doitsDone.splice(doitsDone.indexOf(doitIndex), 1);
    }

    localStorage.setItem("doitsDone",JSON.stringify(doitsDone));
  }

  function removeLocaldoitDone(doit){

    const doitsDone = checkdoitDone();

    const doitIndex = doit.children[0].innerText;

    doitsDone.splice(doitsDone.indexOf(doitIndex), 1);
    localStorage.setItem("doitsDone",JSON.stringify(doitsDone));
  }

  function local() {

    const doits = checkdoit();
    const doitsDone = checkdoitDone();

    doits.forEach(function(doit){

      if (!doitsDone.includes(doit)) {
        createdoitList(doit);
        
      } else {
        createdoitListDone(doit);
      }
    })
  }

  function checkdoit() {
    let doits;
    if (localStorage.getItem("doits")) {
      return doits = [];
    } else {
      return doits = JSON.parse(localStorage.getItem("doits"));
    }
  }

  function checkdoitDone(){
    let doitsDone;
    if (localStorage.getItem("doitsDone") === null) {
      return doitsDone = [];
    } else {
      return doitsDone = JSON.parse(localStorage.getItem("doitsDone"));
    }
  }