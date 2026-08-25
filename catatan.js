import { loadStorageCatatan, saveStorageCatatan } from "./storage.js";

export function allCatatan() {

    const catatan = document.createElement("section");
    catatan.id = "catatanSection";
    catatan.className = "dashboard-card";

    const catatanHTML = document.createElement("article");

    const catatanTittle = document.createElement("h2");
    catatanTittle.textContent = "Catatan";

    const inputCatatan = document.createElement("textarea");
    inputCatatan.id = "noteInput";
    inputCatatan.placeholder = "Input Catatan.."
    inputCatatan.rows = 5;
    inputCatatan.cols = 40;

    const saveDIV = document.createElement("div");

    const saveNoteButton = document.createElement("button")
    saveNoteButton.className = "note-button";
    saveNoteButton.textContent = "Simpan Catatan";


    saveNoteButton.addEventListener("click", () => {

        const isiCatatan = inputCatatan.value;

        if (!validasiInput(isiCatatan)) {
            return;
        }

        alert("Catatan Telah Disimpan");

        addCatatan(isiCatatan)

        inputCatatan.value = "";


    });

    let daftarCatatan = loadStorageCatatan();

    loadStorageCatatan();
    renderCatatan();

    function addCatatan(isi) {
        daftarCatatan.push({ id: Date.now(), isi, tanggal: new Date().toLocaleDateString() });
        saveStorageCatatan();
        renderCatatan()
    }

    function editCatatan(id, edit) {
        daftarCatatan = daftarCatatan.map((t) =>
            t.id === id ? { ...t, isi: edit } : t
        );
        saveStorageCatatan();
        renderCatatan();
    }

    function hapusCatatan(id) {
        daftarCatatan = daftarCatatan.filter((t) => t.id !== id);
        saveStorageCatatan();
        renderCatatan();
    }

    function validasiInput(inputCatatan) {
        if (inputCatatan.trim() === "") {
            alert("Input tidak boleh kosong!");
            return false;
        }
        if (inputCatatan.length > 100) {
            alert("Input maksimal 100 character!");
            return false;
        }
        return true;
    }

    //Rendering Catatan
    function renderCatatan() {
        catatanHTML.innerHTML = "";

        catatanHTML.appendChild(inputCatatan);


        daftarCatatan.forEach((ctt) => {
            const container = document.createElement("div");
            container.className = "cttItem";

            const isiInputCatatan = document.createElement("p");
            isiInputCatatan.textContent = ctt.isi;

            const tanggalCatatan = document.createElement("small");
            tanggalCatatan.textContent = ctt.tanggal;

            container.appendChild(isiInputCatatan);
            container.appendChild(tanggalCatatan);
            catatanHTML.appendChild(container);

            const buttonEdit = document.createElement("button");
            buttonEdit.textContent = "Edit";

            buttonEdit.addEventListener("click", () => {
                const edit = prompt("Edit Catatan:", ctt.isi);

                if (edit === null) return;

                if (!validasiInput(edit)) {
                    return;
                }
                editCatatan(ctt.id, edit.trim());
            });

            container.appendChild(buttonEdit);

            const buttonHapusCatatan = document.createElement("button");
            buttonHapusCatatan.textContent = "Hapus Catatan";
            buttonHapusCatatan.addEventListener("click", () => {
                hapusCatatan(ctt.id)
            });

            container.appendChild(buttonHapusCatatan);

        });
    }
    catatan.appendChild(catatanTittle);
    catatan.appendChild(catatanHTML);
    catatan.appendChild(saveNoteButton);

    renderCatatan();
    return catatan;
}