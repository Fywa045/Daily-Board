const app = document.getElementById("app");

const topBar = document.createElement("div");
topBar.className = "top-bar";


const mainRow = document.createElement("div");
mainRow.className = "main-row";

const darkDIV = document.createElement("div");
darkDIV.id = "DarkDIV";

const toggleTema = document.createElement("button");
toggleTema.textContent = "Dark";
toggleTema.id = "changeMode";
darkDIV.appendChild(toggleTema);

const changeTema = document.getElementById("changeMode");

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeOn = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeOn ? "gelap" : "terang");
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
    }
});

topBar.appendChild(darkDIV);
app.appendChild(topBar);

import { allTugas } from "./tugas.js";
const scriptTugas = allTugas();

import { allCatatan } from "./catatan.js";
const scriptCatatan = allCatatan();

import { allAPI } from "./api.js";
const scriptAPI = allAPI();

app.appendChild(scriptAPI);
app.appendChild(mainRow);
mainRow.appendChild(scriptTugas);
mainRow.appendChild(scriptCatatan);