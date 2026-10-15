const input = document.querySelector("#nombre-serie");
const boton = document.querySelector("#boton-busqueda");
const filtroGenero = document.querySelector("#filtro-genero");
const contadorResultados = document.querySelector("#contador-resultados");
let seriesEncontradas = [];

async function obtenerSeries(nombre) {
  try {
      const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nombre)}`);

      if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }
      const datos = await respuesta.json();
      return datos.map(d => d.show);
  } catch (error) {
      console.error("No se pudieron cargar las series:", error.message);
      return [];
  }
}
function crearTarjeta(serie) {
    const tarjeta = document.createElement("section");

    const nombre = document.createElement("h2");
    nombre.textContent = serie.name;

    const imagen = document.createElement("img");
    if (serie.image) {
        imagen.src = serie.image.medium;
        imagen.alt = `Portada de ${serie.name}`;
    } else {
        imagen.alt = "Imagen no disponible";
    }

    const descripcion = document.createElement("p");
    descripcion.innerHTML = serie.summary || "Sin descripción";

    const puntuacion = document.createElement("p");
    puntuacion.textContent =`Puntuación: ${serie.rating.average ?? "Sin puntuación"}`;

    tarjeta.append(nombre);
    tarjeta.append(imagen);
    tarjeta.append(descripcion);
    tarjeta.append(puntuacion);

    return tarjeta;
}
function mostrarSeries(series) {
    const contenedor = document.querySelector("#resultados");

    contenedor.replaceChildren();

    contadorResultados.textContent =`Mostrando ${series.length} ${series.length === 1 ? "resultado" : "resultados"}`;

    for (const serie of series) {
        const tarjeta = crearTarjeta(serie);
        contenedor.append(tarjeta);
    }
}
function cargarGenerosPosibles(series) {
    
    const generos = series.map(serie => serie.genres).flat();

    const generosUnicos = [...new Set(generos)];

    filtroGenero.replaceChildren();

    const opcionTodos = document.createElement("option");
    opcionTodos.value = "";
    opcionTodos.textContent = "Todos los géneros";
    filtroGenero.append(opcionTodos);

    for (const g of generosUnicos) {
        const opcion = document.createElement("option");
        opcion.value = g;
        opcion.textContent = g;
        filtroGenero.append(opcion);
    }
}
function filtrarSeries() {
    const generoSeleccionado = filtroGenero.value;

    const seriesFiltradas = generoSeleccionado === "" ? seriesEncontradas : seriesEncontradas.filter(serie => serie.genres?.includes(generoSeleccionado));

    mostrarSeries(seriesFiltradas);
}
boton.addEventListener("click", async () => {
    const nombre = input.value.trim();

    if (nombre === "") {
        return;
    }
    seriesEncontradas = await obtenerSeries(nombre);
    cargarGenerosPosibles(seriesEncontradas);
    filtrarSeries();
});
filtroGenero.addEventListener("change", () => {
    filtrarSeries();
});
