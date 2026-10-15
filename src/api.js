export async function obtenerSeries(nombre) {
    const clave = `busca-serie:${nombre.toLowerCase()}`;

    try {
        const guardado = localStorage.getItem(clave);

        if (guardado !== null) {
            const datosGuardados = JSON.parse(guardado);

            if (Array.isArray(datosGuardados)) {
                return datosGuardados;
            }
        }
    } catch (error) {
        console.warn("No se pudo leer la caché:", error);
    }

    const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nombre)}`);

    if (!respuesta.ok) {
        throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();


    const series = datos.map(d => d.show);
    
    try {
        localStorage.setItem(clave, JSON.stringify(series));
    } catch (error) {
        console.warn("No se pudo guardar la caché:", error);
    }

    return series;
  
}