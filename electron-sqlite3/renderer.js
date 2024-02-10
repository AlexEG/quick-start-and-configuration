// const { ipcRenderer } = require("electron");

// // const signUpForm = document.querySelector("#basic-form");

// // function signUp(e) {
// //   e.preventdefault();
// //   const formData = new FormData(signUpForm);
// //   const name = formData.get("name");
// //   const posts = formData.get("posts");

// //   ipcRenderer.send("new-post", { name, posts });
// // }

// signUpForm.addEventListener("submit", signUp);

// window.require = require;

// window.electronAPI.createDatabaseFile("database1");

// console.log(window.electronAPI.readDatabaseFile("manga"));

const title = document.querySelector("#title");
const rank = document.querySelector("#rank");
const chapters = document.querySelector("#chapters");
const volumes = document.querySelector("#volumes");

const addDataToDBBtn = document.querySelector("#add-to-db");

addDataToDBBtn.addEventListener("click", addFunc);

function addFunc() {
  const addDataToDB = [
    title.value,
    "#" + rank.value,
    chapters.value,
    volumes.value,
  ];

  window.electronAPI.addDataToDB("manga", addDataToDB);
}
