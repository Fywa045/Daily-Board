export function saveStorage(daftarTugas) {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}
export function loadStorage() {
    const data = localStorage.getItem("daftarTugas");
    return data ? JSON.parse(data) : [];
}
export function saveStorageCatatan(daftarCatatan) {
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
}
export function loadStorageCatatan() {
    const dataCatatan = localStorage.getItem("daftarCatatan");
    return dataCatatan ? JSON.parse(dataCatatan) : [];
}