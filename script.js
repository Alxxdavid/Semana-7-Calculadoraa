let hp1 = 150, energia1 = 100;
let hp2 = 150, energia2 = 100;

let escudo = false;
let turnoJugador = true;
let juegoTerminado = false;

// ACTUALIZAR
function actualizar() {

  // limitar valores SIEMPRE
  hp1 = Math.max(0, Math.min(150, hp1));
  hp2 = Math.max(0, Math.min(150, hp2));
  energia1 = Math.max(0, Math.min(100, energia1));
  energia2 = Math.max(0, Math.min(100, energia2));

  document.getElementById("p1-hp").textContent = hp1;
  document.getElementById("p1-energia").textContent = energia1;

  document.getElementById("p2-hp").textContent = hp2;
  document.getElementById("p2-energia").textContent = energia2;

  document.getElementById("p1-hp-barra").style.width = (hp1 / 150 * 100) + "%";
  document.getElementById("p1-energia-barra").style.width = (energia1 / 100 * 100) + "%";

  document.getElementById("p2-hp-barra").style.width = (hp2 / 150 * 100) + "%";
  document.getElementById("p2-energia-barra").style.width = (energia2 / 100 * 100) + "%";
}

// LOG
function escribir(t) {
  let log = document.getElementById("log");
  let linea = document.createElement("div");
  linea.textContent = t;
  log.appendChild(linea);
}

// ACCIONES
function accion(tipo) {

  if (!turnoJugador || juegoTerminado) return;

  if (tipo == "laser" && energia1 >= 20) {
    energia1 -= 20;
    hp2 -= 25;
    escribir("🔫 Láser: -25");
  }

  else if (tipo == "misil" && energia1 >= 35) {
    energia1 -= 35;
    hp2 -= 40;
    escribir("💥 Misil: -40");
  }

  else if (tipo == "escudo") {
    escudo = true;
    escribir("🛡️ Escudo activado (reduce próximo daño)");
  }

  else if (tipo == "energia") {
    energia1 += 30;
    escribir("🔋 Energía +30");
  }

  else {
    escribir("⚠️ Energía insuficiente");
    return;
  }

  actualizar();

  if (hp2 <= 0) {
    escribir("🤖 Ganaste");
    juegoTerminado = true;
    return;
  }

  turnoJugador = false;
  setTimeout(turnoEnemigo, 600);
}

// Enemigo
function turnoEnemigo() {

  if (juegoTerminado) return;

  if (energia2 < 20) {
    energia2 += 30;
    escribir("Enemigo recarga energía");
  } else {
    let r = Math.random();

    if (r < 0.5) {
      energia2 -= 20;
      let daño = 20;

      if (escudo) {
        daño = Math.floor(daño / 2);
        escudo = false;
        escribir("🛡️ Escudo reduce daño");
      }

      hp1 -= daño;
      escribir("Enemigo láser: -" + daño);

    } else {
      energia2 -= 30;
      let daño = 35;

      if (escudo) {
        daño = Math.floor(daño / 2);
        escudo = false;
        escribir("🛡️ Escudo reduce daño");
      }

      hp1 -= daño;
      escribir("Enemigo misil: -" + daño);
    }
  }

  actualizar();

  if (hp1 <= 0) {
    escribir("🤖 Perdiste");
    juegoTerminado = true;
    return;
  }

  turnoJugador = true;
}

// REINICIAR
function reiniciar() {
  hp1 = 150; energia1 = 100;
  hp2 = 150; energia2 = 100;

  escudo = false;
  turnoJugador = true;
  juegoTerminado = false;

  document.getElementById("log").innerHTML = "";

  actualizar();
  escribir("Nueva batalla iniciada");
}

actualizar();
window.accion = accion;