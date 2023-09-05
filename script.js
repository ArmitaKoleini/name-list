// let names = [];

const nameInput = document.querySelector(".first-input");
const surnameInput = document.querySelector(".second-input");
const ageInput = document.querySelector(".third-input");
const nameForm = document.querySelector(".name-form");
const nameList = document.querySelector(".namelist");

// events

nameForm.addEventListener("submit", addNewName);

document.addEventListener("DOMContentLoaded", (e) => {
  const names = getAllNames();
  createNames(names);
});

function addNewName(e) {
  e.preventDefault();

  if (!nameInput.value) return null;

  const newName = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    firstName: nameInput.value.toLowerCase(),
    surname: surnameInput.value.toLowerCase(),
    age: ageInput.value,
  };

  // names.push(newName);
  saveName(newName);
  const names = getAllNames();
  createNames(names);
}

function createNames(names) {
  // create names on DOM
  let result = "";
  names.forEach((name) => {
    result += `<li class="name">
      <p class="name__title">${
        name.firstName[0].toUpperCase() + name.firstName.slice(1)
      } ${name.surname[0].toUpperCase() + name.surname.slice(1)}, ${
      name.age
    } years old</p>
      <button class="name__remove" data-name-id=${
        name.id
      } ><i class="fa fa-times"></i></button>
    </li>`;
  });

  nameList.innerHTML = result;
  nameInput.value = "";
  surnameInput.value = "";
  ageInput.value = "";

  const removeBtns = [...document.querySelectorAll(".name__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeName));
}

function removeName(e) {
  // console.log(e.target.dataset.nameId);
  // data-name-id => nameId
  let names = getAllNames();
  const nameId = Number(e.target.dataset.nameId);
  names = names.filter((t) => t.id !== nameId);
  saveAllNames(names);
  createNames(names);
}

// localStorage => web API

function getAllNames() {
  const savedNames = JSON.parse(localStorage.getItem("names")) || [];
  return savedNames;
}

function saveName(name) {
  // const savednames = JSON.parse(localStorage.getItem("names")) || [];
  const savedNames = getAllNames();
  savedNames.push(name);
  localStorage.setItem("names", JSON.stringify(savedNames));
  return savedNames;
}

function saveAllNames(names) {
  localStorage.setItem("names", JSON.stringify(names));
}
