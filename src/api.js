export async function obtenerSeries(nombre) {
      const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nombre)}`);

      if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
      }
      const datos = await respuesta.json();
      return datos.map(d => d.show);
  
}