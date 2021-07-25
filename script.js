const DoitInput = document.querySelector('.doitInput');
const AddButton = document.querySelector('.addBTN');
const DoitList = document.querySelector('.dolists');
const DoneButton = document.querySelector('.doneBTN');
const DelButton = document.querySelector('.delBTN');

document.addEventListener("DOMContentLoaded", getdoit);

AddButton.addEventListener("click", DoitAdd);
DoitList.addEventListener("click", CheckAndDelete);

function DoitAdd(event){

  event.preventDefault();

  const doits = DoitsCheck();

  if((DoitInput.value.trim() !== "") && (!doits.includes(DoitInput.value))){

    createDoitList(DoitInput.value);

    saveLocalDoits(DoitInput.value);

    DoitInput.value = "";

  }else{
    alert("Task cannot be empty!!!");
  }
}


function createDoitList(doit){

  const newDoitList = document.createElement("li");
  newDoitList.classList.add("doit","todo-tasks-wrapper", "flex p-2", "text-black", "rounded-sm")
  createDoit(doitDone.newDoitList)
}

function createDoitListDone(doitDone) {

  const newDoitList = document.createElement("li");
  newDoitList.classList.add("doit", "todo-tasks-wrapper", "flex p-2", "text-black", "rounded-sm");

  createDoit(doitDone, newDoitList);

}

function createDoit(doit,newDoitList){

  const newDoitText = document.createElement("h5");
  newDoitText.classList.add("")
  newDoitText.innerText = doit;

  newDoitList.appendChild(newDoitText);

  const newAddButtons = document.createElement("span");
  newDoitList.appendChild(newAddButtons);

  const DoneButton = document.createElement("button");
  DoneButton.innerHTML = "Done";
  DoneButton.type = "button";
  DoneButton.classList.add("doneBTN","text-green-400 hover:text-green-300");

  newAddButtons.appendChild(DoneButton);

  const DelButton = document.createElement("button");
  DelButton.innerHTML = "Del";
  DelButton.type = "button";
  DelButton.classList.add("delBTN","text-red-400 hover:text-red-300");

  newAddButtons.appendChild(DelButton);

  newDoitList.appendChild(newAddButtons);

  DoitList.appendChild(newDoitList);
  }

  function CheckAndDelete(event){

    const item = event.target;

    if(item.classList[0] === "doneBTN"){

      const doit = item.parentElement.parentElement;

      doit.classList.toggle("done");

      saveLocalDoitsDone(doit.children[0].innerText);
    }

    if(item.classList[0] === "delBTN"){
      
      const doit = item.parentElement.parentElement;
      doit.addEventListener(function(){
        doit.remove();
      });
    }

    removeLocalDoits(doit);
    removeLocalDoitsDone(doit);
  }

  function saveLocalDoits(doit){

    const doits = checkdoits();

    doits.push(doit);
    localStorage.setItem("doits",JSON.stringify(doits));
  }

  function removeLocaldoits(doit){

    const doits = checkdoits();

    const doitIndex = doit.children[0].innerText;
    doits.splice(doits.indexOf(doitIndex), 1);
    localStorage.setItem("doits",JSON.stringify(doits));
  }

  function saveLocalDoitsDone(doit){

    const doitsDone = checkdoitsDone();

    if(!doitsDone.includes(doit)){
      doitsDone.push(doit);
    }else{

      const doitIndex = doit;
      doitsDone.splice(doitsDone.indexOf(doitIndex), 1);
    }

    localStorage.setItem("doitsDone",JSON.stringify(doitsDone));
  }

  function removeLocaldoitsDone(doit){

    const doitsDone = checkdoitsDone();

    const doitIndex = doit.children[0].innerText;

    doitsDone.splice(doitsDone.indexOf(doitIndex), 1);
    localStorage.setItem("doitsDone",JSON.stringify(doitsDone));
  }

  function getdoit() {

    const doits = checkdoits();
    const doitsDone = checkdoitsDone();

    doits.forEach(function(doit){

      if (!doitsDone.includes(doit)) {
        createDoitList(doit);
        
      } else {
        createDoitListDone(doit);
      }
    })
  }

  function checkdoits() {
    let doits;
    if (localStorage.getItem("doits")) {
      return doits = [];
    } else {
      return doits = JSON.parse(localStorage.getItem("doits"));
    }
  }

  function checkdoitsDone(){
    let doitsDone;
    if (localStorage.getItem("doitsDone") === null) {
      return doitsDone = [];
    } else {
      return doitsDone = JSON.parse(localStorage.getItem("doitsDone"));
    }
  }