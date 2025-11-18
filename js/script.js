const personajes = [
    { nombre: "Sonic", img: "img/sonic.png" },
    { nombre: "Lara Croft", img: "img/lara.png" },
    { nombre: "Mario", img: "img/mario.png" },
    { nombre: "Link", img: "img/link.png" },
    { nombre: "Pikachu", img: "img/pikachu.png" },
    { nombre: "Goku", img: "img/goku.png" },
    { nombre: "Luigi", img: "img/luigi.png" },
    { nombre: "Wario", img: "img/wario.png" },
    { nombre: "Waluigi", img: "img/waluigi.png" },
    { nombre: "Kirby", img: "img/kirby.png" },
    { nombre: "Donkey Kong", img: "img/donkeykong.png" },
    { nombre: "Crash Bandicoot", img: "img/crash.png" },
    { nombre: "Spyro", img: "img/spyro.png" },
    { nombre: "Doomguy", img: "img/doomguy.png" },
    { nombre: "Master Chief", img: "img/masterchief.png" },
    { nombre: "Dragonite", img: "img/dragonite.png" },
    { nombre: "Wolverine", img: "img/wolverine.png" },
    { nombre: "Deadpool", img: "img/deadpool.png" },
    { nombre: "VENOM", img: "img/venom.png" },
    { nombre: "Ironman", img: "img/ironman.png" },
    { nombre: "Ratchet", img: "img/ratchet.png" },
    { nombre: "Clank", img: "img/clank.png" },
    { nombre: "Cloud", img: "img/cloud.png" },
    { nombre: "Lightning", img: "img/lightning.png" },
    { nombre: "Caius", img: "img/caius.png" },
    { nombre: "Lu bu", img: "img/lubu.png" },
    { nombre: "Tom nook", img: "img/tomnook.png" },
    { nombre: "Lucy", img: "img/lucy.png" },
    { nombre: "Rebecca", img: "img/rebecca.png" },
    { nombre: "Joker", img: "img/joker.png" },
    { nombre: "Zana", img: "img/zana.png" },
    { nombre: "Maelle", img: "img/maelle.png" },
    { nombre: "Geralt", img: "img/geralt.png" },
    { nombre: "Vesemir", img: "img/vesemir.png" },
    { nombre: "2 B", img: "img/2b.png" },
    { nombre: "Kainé", img: "img/kaine.png" },
    { nombre: "A 2", img: "img/a2.png" },
    { nombre: "9 S", img: "img/9s.png" },
    { nombre: "Nier", img: "img/nier.png" },
    { nombre: "Malenia", img: "img/malenia.png" },
    { nombre: "Artorias", img: "img/artorias.png" },
    { nombre: "Sparx", img: "img/sparx.png" },
    { nombre: "Spike", img: "img/spike.png" },
    { nombre: "Dante", img: "img/dante.png" },
    { nombre: "Vergil", img: "img/vergil.png" },
    { nombre: "Kratos", img: "img/kratos.png" },
    { nombre: "Atreus", img: "img/atreus.png" },
    { nombre: "Aloy", img: "img/aloy.png" },
    { nombre: "Ellie", img: "img/ellie.png" },
    { nombre: "N.Cortex", img: "img/cortex.png" },
    { nombre: "Joel", img: "img/joel.png" }
];

// Variables de estado
var ronda = [];
var indice = 0;
var aciertos = 0;

// ---------- Funciones auxiliares ----------

// Baraja un array usando el algoritmo de Fisher-Yates
// asi se obtienen opciones totalmente aleatorias cada vez
function barajarArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
// Crea un boton para cada uno de las opciones
// y le asigna la funcion de comprobar respuesta
function crearBoton(opcion, correcto) {
    var btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = function () {
        comprobarRespuesta(this, this.textContent, correcto);
    };
    return btn;
}
// actualiza el progreso de la barra de estado inferior
// para tener un acceso visual a la cantidad de preguntas respondidas
function actualizarProgreso() {
    var porcentaje = ((indice) / ronda.length) * 100;
    document.getElementById("barra").style.width = porcentaje + "%";
}

// ---------- Juego ----------
// Inicia una nueva ronda del juego
// seleccionando personajes aleatorios mediante la funcion
// barajarArray y reseteando las variables de estado para
// comenzar desde el principio
function iniciarJuego() {
    // leer valor del slider
    var cantidad = parseInt(document.getElementById("numPreguntas").value, 10);

    // barajar personajes
    var barajados = barajarArray(personajes.slice());

    // elegir la cantidad seleccionada
    ronda = barajados.slice(0, cantidad);

    indice = 0;
    aciertos = 0;
    mostrarPregunta();
    actualizarProgreso();
}

// actualizar número y reiniciar juego al mover el slider
// actualiza el número en tiempo real
document.getElementById("numPreguntas").addEventListener("input", function () {
    document.getElementById("valorPreguntas").textContent = this.value;
});

// reinicia solo cuando se suelta el slider
document.getElementById("numPreguntas").addEventListener("change", function () {
    iniciarJuego();
});


document.getElementById("reiniciar").onclick = iniciarJuego;

// iniciar al cargar
iniciarJuego();
// Muestra el personaje actual y las opciones de respuesta
// en caso de haber terminado la ronda muestra el resultado final
function mostrarPregunta() {
   
    if (indice >= ronda.length) {
        document.getElementById("mensaje").innerHTML =
            "Juego terminado. Aciertos: " + aciertos + "/" + ronda.length;
        return;
    }

    var personaje = ronda[indice];
    var img = document.getElementById("imagen");

    // efecto fade-out → cambio → fade-in
    img.classList.add("hidden");
    setTimeout(function() {
        img.src = personaje.img;
        img.classList.remove("hidden");
    }, 300);





    // opciones de respuesta
    // se asegura que no haya opciones repetidas
    // el bucle while se repite hasta tener el numero indiaco de opciones unicas
    // el if dentro del bucle comprueba si la opcion ya existe en el array
    // si no existe se añade al array de opciones
    var opciones = [personaje.nombre];
    while (opciones.length < 3) {
        var candidato = personajes[Math.floor(Math.random() * personajes.length)].nombre;
        if (opciones.indexOf(candidato) === -1) {
            opciones.push(candidato);
        }
    }
    // barajar opciones para que el correcto no este siempre en la misma posicion
    opciones = barajarArray(opciones);
    // crea los botones de las opciones
    // y los añade al contenedor
    var contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";
    for (var k = 0; k < opciones.length; k++) {
        contenedor.appendChild(crearBoton(opciones[k], personaje.nombre));
    }

    document.getElementById("mensaje").innerHTML = "";
}
// Comprueba si la opcion elegida es correcta
// actualiza el marcador de aciertos y muestra
// un mensaje de feedback antes de pasar a la siguiente pregunta
function comprobarRespuesta(botonElegido, opcion, correcto) {
    var mensaje = document.getElementById("mensaje");

    // desactivar botones
    var botones = document.querySelectorAll("#opciones button");
    for (var i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }

    if (opcion === correcto) {
        aciertos++;
        mensaje.innerHTML = "✅ Correcto!";
        mensaje.className = "correcto";
        botonElegido.classList.add("correcto");
    } else {
        mensaje.innerHTML = "❌ Incorrecto. Era " + correcto;
        mensaje.className = "incorrecto";
        botonElegido.classList.add("incorrecto");
    }

    indice++;
    actualizarProgreso();
    setTimeout(mostrarPregunta, 1500);
}

document.getElementById("reiniciar").onclick = iniciarJuego;
iniciarJuego();
