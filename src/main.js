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

obtenerSeries("The Flash").then(s => {console.log(s)});