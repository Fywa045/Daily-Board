import { loadStorage, saveStorage } from "./storage.js";

export function allTugas() {

const tugas = document.createElement("section");
tugas.id = "tugasSection";
tugas.className = "dashboard-card";

const tugasHTML = document.createElement("article");
tugasHTML.id = "articleHTML";

const tugasTittle = document.createElement("h2");
tugasTittle.textContent = "Tugas";

const tugasControls = document.createElement("div");
tugasControls.className = "tugas-controls";

const tugasButton = document.createElement("div");
tugasButton.className = "tugas-button"

const searchDIV = document.createElement("div");
searchDIV.id = "sDIV";

const input = document.createElement("input");
input.placeholder = "Input Tugas.."
tugasControls.appendChild(input);

input.addEventListener("input", (e) => {
    console.log("Nilai Input:", e.target.value);
});

const button = document.createElement("button")
button.textContent = "Tambah Tugas";
tugasControls.appendChild(button);

button.addEventListener("click", () => {

    const newTugas = input.value;

    if (!validasiInputTugas(newTugas)) {
        return;
    }

    alert("Tugas Telah Ditambahkan");

    addTugas(newTugas);
    input.value = "";
});

const inputSearch = document.createElement("input");
inputSearch.placeholder = "Search..";
searchDIV.appendChild(inputSearch);

function searchTugas(keyWord){
    const all = document.querySelectorAll(".list-tugas");
    
    keyWord = keyWord.toLowerCase();
    
    all.forEach((a) => {
        const li1 = a.firstChild.textContent.toLowerCase();
        
        if (li1.includes(keyWord)) {
            a.classList.remove("hide")
        }
        else {
            a.classList.add("hide");
        }
    });
}
    
const searchWithDebounce = debounce(searchTugas, 300);

inputSearch.addEventListener("input", (e) => {
        searchWithDebounce(inputSearch.value);
});

const buttonSemua = document.createElement("button")
buttonSemua.textContent = "Semua";
tugasButton.appendChild(buttonSemua);

buttonSemua.addEventListener("click", () => {
    renderTugas("semua");
})

const buttonBelum = document.createElement("button")
buttonBelum.textContent = "Belum";
tugasButton.appendChild(buttonBelum);

buttonBelum.addEventListener("click", () => {
    renderTugas("belum");
})

const buttonSelesai = document.createElement("button")
buttonSelesai.textContent = "Selesai";
tugasButton.appendChild(buttonSelesai);

buttonSelesai.addEventListener("click", () => {
    renderTugas("selesai");
})

let daftarTugas = loadStorage();

let moveItem = null;

console.log()
let nextId = Date.now();


function addTugas(namaTugas) {
    daftarTugas.push({ id: nextId++, namaTugas, selesai: false });
    input.focus();
    saveStorage(daftarTugas);
    renderTugas();
}

function hapusTugas(id) {
    daftarTugas = daftarTugas.filter((t) => t.id !== id);
    saveStorage(daftarTugas);
    renderTugas();
}

function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) => t.id === id ? { ...t, selesai: !t.selesai } : t);
    saveStorage(daftarTugas);
    renderTugas();
}

function validasiInputTugas(input) {
    if (input.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (input.length > 100) {
        alert("Input maksimal 100 character!");
        return false;
    }
    return true;
}

function editTugas(id, namaBaru) {
    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? { ...t, namaTugas: namaBaru } : t
    );
    saveStorage(daftarTugas);
    renderTugas();
}
function debounce (fn, delay = 300) {
    let timer;
    return(...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function renderTugas(filter = "semua") {
    tugasHTML.innerHTML = "";
    const listTugas = document.createElement("ul");
    tugasHTML.appendChild(listTugas);

    const tugasFilter = daftarTugas.filter((t) => {
        if (filter === "selesai") return t.selesai;
        if (filter === "belum") return !t.selesai;
        return true;
    });

    const items = document.querySelectorAll(".list-tugas");

    tugasFilter.forEach((tugas) => {
        const list = document.createElement("li");

        list.dataset.id = tugas.id;
        list.className = "list-tugas"
        list.textContent = tugas.namaTugas;
        list.style.textDecoration = tugas.selesai ? "line-through" : "none";
        list.addEventListener("click", () => {
            toggleSelesai(tugas.id)
        });

        const buttonHapus = document.createElement("button");
        buttonHapus.className = "btn-hapus";
        buttonHapus.textContent = "Hapus Tugas";
        buttonHapus.addEventListener("click", () => {
            hapusTugas(tugas.id)
        });

        const buttonEditTugas = document.createElement("button");
        buttonEditTugas.className = "btn-edit-tugas";
        buttonEditTugas.textContent = "Edit";

        buttonEditTugas.addEventListener("click", (e) => {
            e.stopPropagation()

            const editTugasBaru = prompt("Edit Tugas:",tugas.namaTugas);

            if (editTugasBaru === null) return;

            if(!validasiInputTugas(editTugasBaru)) {
                return;
            }
            editTugas(tugas.id, editTugasBaru.trim());
        });
        
        list.appendChild(buttonEditTugas);

        list.appendChild(buttonHapus);
        listTugas.appendChild(list);

        list.setAttribute("draggable", true);

        list.addEventListener("dragstart", (e) => {
            moveItem = list;
            console.log(moveItem);

        });

    });

    listTugas.addEventListener("dragover", (e) => e.preventDefault());
    listTugas.addEventListener("drop", (e) => {
        e.preventDefault();

        const targetDrop = e.target.closest(".list-tugas");

        console.log('Item yang di drag :', moveItem);
        console.log('Target:', targetDrop);

        if (moveItem !== targetDrop) {
            targetDrop.before(moveItem);
            saveStorage(daftarTugas);
        }
    });
}

tugas.appendChild(tugasTittle);
tugas.appendChild(searchDIV);
tugas.appendChild(tugasControls)
tugas.appendChild(tugasButton);
tugas.appendChild(tugasHTML);

renderTugas();
return tugas;
}