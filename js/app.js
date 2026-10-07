/* Main Controller App for ¡SuperMate 4° con Lu! */
const App = {
  stars: {
    plano: 0,
    congruencia: 0,
    jerarquia: 0,
    diagrama_circular: 0,
    fracciones: 0,
    areas: 0,
    promedio: 0
  },

  theoryGuides: {
    plano: `
      <div class="theory-box">
        <h4 class="theory-title">📍 Plano Cartesiano y Traslación (Págs 143-147)</h4>
        <div class="theory-step">
          <strong>1. Ubicación de puntos:</strong> Todo punto se escribe como un par ordenado <strong>(X, Y)</strong>.<br>
          • <strong>X</strong> es la posición en el eje horizontal (hacia la derecha).<br>
          • <strong>Y</strong> es la posición en el eje vertical (hacia arriba).<br>
          <em>Ejemplo:</em> Para ubicar (4, 3), avanzas 4 pasos a la derecha y subes 3 pasos.
        </div>
        <div class="theory-step">
          <strong>2. Traslación de figuras:</strong> Mover una figura en la cuadrícula sin cambiar su forma ni su tamaño.<br>
          • Si trasladas <strong>+dx a la derecha</strong>, sumas dx a las coordenadas X.<br>
          • Si trasladas <strong>+dy arriba</strong>, sumas dy a las coordenadas Y.
        </div>
      </div>
    `,
    congruencia: `
      <div class="theory-box">
        <h4 class="theory-title">🎨 Congruencia y Semejanza de Figuras (Págs 148-153)</h4>
        <div class="theory-step">
          <strong>1. Figuras Congruentes:</strong> Son exactamente iguales en <strong>Forma</strong> y <strong>Tamaño</strong>. Aunque estén giradas o reflejadas, si las superpones coinciden perfectamente.
        </div>
        <div class="theory-step">
          <strong>2. Figuras Semejantes:</strong> Tienen la misma <strong>Forma</strong>, pero <strong>Diferente Tamaño</strong> (sus lados guardan una proporción, como una foto ampliada o reducida).
        </div>
      </div>
    `,
    jerarquia: `
      <div class="theory-box">
        <h4 class="theory-title">⚡ Jerarquía de Operaciones (Págs 48-55 y 63-65)</h4>
        <div class="theory-step">
          Para resolver expresiones combinadas, sigue estrictamente este orden:
          <ol style="margin-left: 20px; margin-top: 8px;">
            <li><strong>Paréntesis ( )</strong>: Resolver primero el contenido de los paréntesis.</li>
            <li><strong>Potencias ($a^b$) y Raíces ($\sqrt{a}$)</strong>: Ej. $3^2 = 9$, $\sqrt{16} = 4$.</li>
            <li><strong>Multiplicaciones y Divisiones</strong>: De izquierda a derecha.</li>
            <li><strong>Sumas y Restas</strong>: De izquierda a derecha.</li>
          </ol>
        </div>
      </div>
    `,
    diagrama_circular: `
      <div class="theory-box">
        <h4 class="theory-title">📊 Diagramas Circulares (Taller de Clase)</h4>
        <div class="theory-step">
          Un diagrama circular (o gráfico de pastel) representa partes de un total (100%):<br>
          • <strong>50%</strong> = La mitad exacta de los datos (1/2).<br>
          • <strong>25%</strong> = Un cuarto de los datos (1/4).<br>
          • El sector de mayor área representa la opción con más respuestas o votos.
        </div>
      </div>
    `,
    fracciones: `
      <div class="theory-box">
        <h4 class="theory-title">🍰 Fracción de un Número y Suma Homogénea (Cuaderno de Mates)</h4>
        <div class="theory-step">
          <strong>1. Fracción de una cantidad:</strong> Para hallar <sup>a</sup>&frasl;<sub>b</sub> de N:<br>
          1° Divide la cantidad N entre el denominador b: <em>(N ÷ b)</em>.<br>
          2° Multiplica el resultado por el numerador a: <em>(N ÷ b) × a</em>.
        </div>
        <div class="theory-step">
          <strong>2. Suma de fracciones homogéneas (igual denominador):</strong><br>
          • Se <strong>suman los numeradores</strong>.<br>
          • El <strong>denominador se queda IGUAL</strong>.<br>
          <em>Ejemplo:</em> <sup>2</sup>&frasl;<sub>7</sub> + <sup>3</sup>&frasl;<sub>7</sub> = <sup>5</sup>&frasl;<sub>7</sub>.
        </div>
      </div>
    `,
    areas: `
      <div class="theory-box">
        <h4 class="theory-title">📐 Área de Rectángulos, Cuadrados y Triángulos (Págs 227-236)</h4>
        <div class="theory-step">
          • <strong>Cuadrado:</strong> <span class="formula-badge">Área = Lado × Lado (l²)</span><br>
          • <strong>Rectángulo:</strong> <span class="formula-badge">Área = Base × Altura (b × h)</span><br>
          • <strong>Triángulo:</strong> <span class="formula-badge">Área = (Base × Altura) ÷ 2</span>
        </div>
      </div>
    `,
    promedio: `
      <div class="theory-box">
        <h4 class="theory-title">⚖️ Media Aritmética o Promedio (Págs 303-306)</h4>
        <div class="theory-step">
          El promedio representa el valor central o de equilibrio de un grupo de datos:<br>
          <span class="formula-badge">Promedio = (Suma de todos los datos) ÷ (Número total de datos)</span><br>
          <em>Ejemplo:</em> Para las notas 8, 9 y 7:<br>
          1° Suma: 8 + 9 + 7 = 24.<br>
          2° División entre 3 datos: 24 ÷ 3 = <strong>8.0</strong>.
        </div>
      </div>
    `
  },

  init() {
    this.loadStars();
    this.updateStarUI();
  },

  loadStars() {
    const saved = localStorage.getItem('supermate_stars');
    if (saved) {
      try {
        this.stars = Object.assign(this.stars, JSON.parse(saved));
      } catch (e) {}
    }
  },

  saveStars(topicKey, starsEarned) {
    if (starsEarned > (this.stars[topicKey] || 0)) {
      this.stars[topicKey] = starsEarned;
      localStorage.setItem('supermate_stars', JSON.stringify(this.stars));
      this.updateStarUI();
      sounds.play('star');
    }
  },

  updateStarUI() {
    let total = 0;
    for (let key in this.stars) {
      total += this.stars[key];
      const cardStar = document.getElementById(`stars-${key}`);
      if (cardStar) {
        cardStar.innerHTML = '⭐'.repeat(this.stars[key]) + '☆'.repeat(3 - this.stars[key]);
      }
    }
    const countElem = document.getElementById('total-stars-count');
    if (countElem) countElem.innerText = total;
  },

  openGame(topicKey) {
    sounds.play('click');
    const modal = document.getElementById('game-modal');
    const titleElem = document.getElementById('modal-game-title');
    const iconElem = document.getElementById('modal-game-icon');
    const gameArea = document.getElementById('game-area');

    const meta = {
      plano: { title: "Plano Cartesiano y Traslación", icon: "📍", game: PlanoGame },
      congruencia: { title: "Congruencia y Semejanza", icon: "🎨", game: CongruenciaGame },
      jerarquia: { title: "Jerarquía de Operaciones", icon: "⚡", game: JerarquiaGame },
      diagrama_circular: { title: "Diagrama Circular", icon: "📊", game: DiagramaCircularGame },
      fracciones: { title: "Fracciones y Sumas Homogéneas", icon: "🍰", game: FraccionesGame },
      areas: { title: "Área de Figuras Geométricas", icon: "📐", game: AreasGame },
      promedio: { title: "Media Aritmética / Promedio", icon: "⚖️", game: PromedioGame },
      examen: { title: "Examen Final de 7 Estrellas", icon: "🎓", game: ExamenGame }
    }[topicKey];

    if (!meta) return;

    this.currentTopicKey = topicKey;
    titleElem.innerText = meta.title;
    iconElem.innerText = meta.icon;

    // Show tab button for theory only for topics 1-7
    const tabTheory = document.getElementById('tab-btn-theory');
    if (tabTheory) {
      tabTheory.style.display = (topicKey === 'examen') ? 'none' : 'block';
    }

    this.switchTab('game');
    meta.game.init(gameArea);
    modal.classList.add('active');
  },

  closeModal() {
    sounds.play('click');
    const modal = document.getElementById('game-modal');
    modal.classList.remove('active');
  },

  switchTab(tabName) {
    sounds.play('click');
    const tabGameBtn = document.getElementById('tab-btn-game');
    const tabTheoryBtn = document.getElementById('tab-btn-theory');
    const gameArea = document.getElementById('game-area');
    const theoryArea = document.getElementById('theory-area');

    if (tabName === 'game') {
      tabGameBtn.classList.add('active');
      tabTheoryBtn.classList.remove('active');
      gameArea.style.display = 'block';
      theoryArea.style.display = 'none';
    } else {
      tabTheoryBtn.classList.add('active');
      tabGameBtn.classList.remove('active');
      gameArea.style.display = 'none';
      theoryArea.style.display = 'block';
      theoryArea.innerHTML = this.theoryGuides[this.currentTopicKey] || '<p>Guía teórica no disponible.</p>';
    }
  },

  showDashboard() {
    this.closeModal();
  },

  toggleSound() {
    const isMuted = sounds.toggleMute();
    const btn = document.getElementById('sound-btn');
    if (btn) btn.innerText = isMuted ? '🔇' : '🔊';
  }
};

/* Confetti System */
window.triggerConfetti = function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array(80).fill(0).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 8 + 4,
    d: Math.random() * 80,
    color: ['#6C5CE7', '#00CEC9', '#FD79A8', '#FDCB6E', '#00B894'][Math.floor(Math.random() * 5)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  }));

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      if (p.y > canvas.height) {
        particles[i] = {
          x: Math.random() * canvas.width,
          y: -20,
          r: p.r,
          d: p.d,
          color: p.color,
          tilt: p.tilt,
          tiltAngleIncremental: p.tiltAngleIncremental,
          tiltAngle: p.tiltAngle
        };
      }
    });
    animationFrame = requestAnimationFrame(render);
  }

  render();
  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    canvas.remove();
  }, 4000);
};

document.addEventListener('DOMContentLoaded', () => App.init());
