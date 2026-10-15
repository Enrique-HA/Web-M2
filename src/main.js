import {obtenerSeries} from "./api.js";
import {cargarGenerosPosibles,filtrarSeries} from "./render.js";


const input = document.querySelector("#nombre-serie");
const boton = document.querySelector("#boton-busqueda");
const filtroGenero = document.querySelector("#filtro-genero");
const estado = document.querySelector("#estado");
let seriesEncontradas = [];

boton.addEventListener("click", async () => {
    const nombre = input.value.trim();

    if (nombre === "") {
        estado.textContent = "Escribe el nombre de una serie.";
        return;
    }
    try {
        seriesEncontradas = await obtenerSeries(nombre);
        cargarGenerosPosibles(seriesEncontradas);
        filtrarSeries(seriesEncontradas);

        estado.textContent = seriesEncontradas.length ? "" : "No se encontraron series.";
    } catch (error) {
        estado.textContent = "No se pudieron cargar las series. Inténtalo de nuevo.";
    }
});
filtroGenero.addEventListener("change", () => {
    filtrarSeries(seriesEncontradas);
});
