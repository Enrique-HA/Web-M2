const filtroGenero = document.querySelector("#filtro-genero");
const contadorResultados = document.querySelector("#contador-resultados");

export function crearTarjeta(serie) {
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
export function mostrarSeries(series) {
    const contenedor = document.querySelector("#resultados");

    contenedor.replaceChildren();

    contadorResultados.textContent =`Mostrando ${series.length} ${series.length === 1 ? "resultado" : "resultados"}`;

    for (const serie of series) {
        const tarjeta = crearTarjeta(serie);
        contenedor.append(tarjeta);
    }
}
export function cargarGenerosPosibles(series) {
    
    const generos = series.map(serie => serie.genres).flat();

    const cantidadPorGenero = generos.reduce((acumulador, genero) => {
        acumulador[genero] = (acumulador[genero] ?? 0) + 1;
        return acumulador;
    }, {});

    const generosUnicos = [...new Set(generos)];

    filtroGenero.replaceChildren();

    const opcionTodos = document.createElement("option");
    opcionTodos.value = "";
    opcionTodos.textContent = "Todos los géneros";
    filtroGenero.append(opcionTodos);

    for (const g of generosUnicos) {
        const opcion = document.createElement("option");
        opcion.value = g;
        opcion.textContent = `${g} (${cantidadPorGenero[g]})`;
        filtroGenero.append(opcion);
    }
}
export function filtrarSeries(seriesEncontradas) {
    const generoSeleccionado = filtroGenero.value;

    const seriesFiltradas = generoSeleccionado === "" ? seriesEncontradas : seriesEncontradas.filter(serie => serie.genres?.includes(generoSeleccionado));

    mostrarSeries(seriesFiltradas);
}