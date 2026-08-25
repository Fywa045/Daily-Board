export function allAPI(){

const widgetRow = document.createElement("div");
widgetRow.className = "widget-row";

const cuaca = document.createElement("section");
cuaca.className = "dashboard-card widget-card"

const CuacaHTML = document.createElement("article");
CuacaHTML.id = "artCQ";

const containerCuaca = document.createElement("div");
containerCuaca.id = "con-cuaca";


const cuacaTittle = document.createElement("h2");
cuacaTittle.textContent = "Cuaca";

const cuacaWidget = document.createElement("p");

const inputCity = document.createElement("input");
inputCity.className = "input-city";
inputCity.placeholder = "Masukan Kota..";

const buttonCity = document.createElement("button");
buttonCity.className = "btn-city";
buttonCity.textContent = "Confirm";

const kutipan = document.createElement("section");
kutipan.className = "dashboard-card widget-card";

const kutipanHTML = document.createElement("article");

const kutipanTittle = document.createElement("h2");
kutipanTittle.textContent = "Kutipan";

const quotesHTML = document.createElement("p");
quotesHTML.id = "idQ";

const refresh = document.createElement("button");
refresh.className = "refresh";
refresh.textContent = "\u27f3";

async function pullKutipan() {
    try {
        const res = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
        const data = await res.json();
        console.log(data);
        quotesHTML.textContent = data.quote;
    } catch (error) {
        console.error("Gagal mengambil kutipan:", error);
    }
}

refresh.addEventListener("click", () => pullKutipan())


async function pullCuaca(kota) {
    const apiKey = "80ecf0e40b154ad47a82599fd0110339";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Kota tidak ditemukan");
        const data = await res.json();

        cuacaWidget.innerHTML = `
            <p>${data.name}: ${data.main.temp}°C</P>
            <p>${data.weather[0].description}</p>
            `;
    } catch (error) {
        cuacaWidget.textContent = error.message;
    }
}

buttonCity.addEventListener("click", () => {
    pullCuaca(inputCity.value.trim());
})

const status = document.createElement("p");

async function loadAllWidget() {
    status.textContent = "Loading..";

    await Promise.all([pullKutipan(), pullCuaca("Jakarta")]);

    status.textContent = "";
}

window.addEventListener("DOMContentLoaded", loadAllWidget);

CuacaHTML.appendChild(cuacaTittle);
CuacaHTML.appendChild(inputCity);
CuacaHTML.appendChild(buttonCity);
CuacaHTML.appendChild(status);
CuacaHTML.appendChild(containerCuaca);
containerCuaca.appendChild(cuacaWidget);
cuaca.appendChild(CuacaHTML);


kutipanHTML.appendChild(kutipanTittle);
kutipanHTML.appendChild(quotesHTML);
kutipanHTML.appendChild(refresh);
kutipan.appendChild(kutipanHTML);
widgetRow.appendChild(cuaca);
widgetRow.appendChild(kutipan);

return widgetRow;
}