/* VARIABLES*/
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para el resultados
const resultado = document.querySelector("#resultado");

//contenedor para el año
const max = new Date().getFullYear();
const min = max - 10;

//generando un objepto para la busqueda especifica
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

/*EVENTOS*/

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestra los autos al cargar
});

//llena las opciones de año
llenarSelect();

//eventListener para los select de busqueda del objepto
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

/*FUNCIONES*/
function mostrarAutos(autos) {
  limpiarHtml();

  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `

        ${marca}-${modelo}-${year}-${puertas}-${transmision} -precio ${precio} -${color}

        
        `;
    //insertando en el html
    resultado.appendChild(autoHTML);
  });
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // agrega las opciones de año al select
  }
}

/*FUNCIONES DE ALTO NIVEL*/

// funcion que filtra en base a la busqueda

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtraryear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(FiltrarTransmision)
    .filter(FiltrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHtml();

  setTimeout(() => {
    mostrarAutos(autos);
  }, 2000);

  const noResultado = document.createElement("div");
  noResultado.classList.add("alert", "error");
  noResultado.textContent =
    "no hay Resultados, intenta con otras especificaciones";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtraryear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMin(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= parseInt(minimo);
  }
  return auto;
}

function filtrarMax(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= parseInt(maximo);
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function FiltrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function FiltrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
