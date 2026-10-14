const input = document.querySelector("#nombre-serie");
const boton = document.querySelector("#boton-busqueda");

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

    const descripcion = document.createElement("p");
    descripcion.innerHTML = serie.summary || "Sin descripción";

    const puntuacion = document.createElement("p");
    puntuacion.textContent =`Puntuación: ${serie.rating.average ?? "Sin puntuación"}`;

    tarjeta.append(nombre);
    tarjeta.append(descripcion);
    tarjeta.append(puntuacion);

    return tarjeta;
}
function mostrarSeries(series) {
    const contenedor = document.querySelector("#resultados");

    contenedor.replaceChildren();

    for (const serie of series) {
        const tarjeta = crearTarjeta(serie);
        contenedor.append(tarjeta);
    }
}
boton.addEventListener("click", async () => {
    const nombre = input.value.trim();

    if (nombre === "") {
        return;
    }
    const series = await obtenerSeries(nombre);
    mostrarSeries(series);
});