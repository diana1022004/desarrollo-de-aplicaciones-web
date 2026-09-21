function procesarSolicitud(solicitud) {
  // 1. Sacar el nombre del usuario (primer elemento)
  const usuario = solicitud.shift();

  // 2. Añadir "Carné de socio" al inicio
  solicitud.unshift("Carné de socio");

  // 3. Añadir el nombre del usuario al final
  solicitud.push(usuario);

  // 4. Devolver el array modificado
  return solicitud;
}

// Ejemplo
console.log(procesarSolicitud(["Diana", "Don Quijote", "Cien años de soledad"]));
