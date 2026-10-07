/* Minijuego 4: Diagrama Circular (Lectura e Interpretación) */
const DiagramaCircularGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentSurvey: null,
  isAnswered: false,

  surveys: [
    {
      topic: "Mascotas Favoritas de 40 Estudiantes",
      slices: [
        { label: "Perros", percent: 50, color: "#6C5CE7", count: 20 },
        { label: "Gatos", percent: 25, color: "#00CEC9", count: 10 },
        { label: "Pájaros", percent: 25, color: "#FD79A8", count: 10 }
      ],
      question: "¿Cuántos estudiantes prefieren los <strong>Perros</strong> si representan el 50% de 40?",
      options: ["10 estudiantes", "20 estudiantes", "30 estudiantes"],
      correctIndex: 1,
      explanation: "El 50% es la mitad de la encuesta. La mitad de 40 es 20."
    },
    {
      topic: "Sabores de Helado Favoritos (Total: 20 niños)",
      slices: [
        { label: "Chocolate", percent: 50, color: "#E17055", count: 10 },
        { label: "Vainilla", percent: 25, color: "#FDCB6E", count: 5 },
        { label: "Fresa", percent: 25, color: "#FF7675", count: 5 }
      ],
      question: "¿Qué fracción o porcentaje representa el sabor <strong>Chocolate</strong>?",
      options: ["El 25% (un cuarto)", "El 50% (la mitad)", "El 75% (tres cuartos)"],
      correctIndex: 1,
      explanation: "El sector de chocolate ocupa exactamente la mitad del círculo (50%)."
    },
    {
      topic: "Deportes Preferidos (Total: 100 niños)",
      slices: [
        { label: "Fútbol", percent: 40, color: "#00B894", count: 40 },
        { label: "Baloncesto", percent: 30, color: "#E17055", count: 30 },
        { label: "Natación", percent: 20, color: "#0984E3", count: 20 },
        { label: "Tenis", percent: 10, color: "#FDCB6E", count: 10 }
      ],
      question: "¿Cuál es el deporte <strong>MENOS</strong> votado según el diagrama circular?",
      options: ["Fútbol", "Natación", "Tenis"],
      correctIndex: 2,
      explanation: "Tenis tiene el sector circular más pequeño con el 10% (10 niños)."
    },
    {
      topic: "Fruta de la Merienda (Total: 30 estudiantes)",
      slices: [
        { label: "Manzana", percent: 33.3, color: "#FF7675", count: 10 },
        { label: "Bananos", percent: 33.3, color: "#FDCB6E", count: 10 },
        { label: "Uvas", percent: 33.3, color: "#A29BFE", count: 10 }
      ],
      question: "Si las tres frutas tienen el mismo tamaño en el gráfico, ¿cuántos niños prefieren Manzanas?",
      options: ["10 niños", "15 niños", "5 niños"],
      correctIndex: 0,
      explanation: "Como el gráfico está dividido en 3 partes iguales, 30 ÷ 3 = 10 niños."
    },
    {
      topic: "Actividades de Fin de Semana (Total: 50 familias)",
      slices: [
        { label: "Ver Películas", percent: 60, color: "#6C5CE7", count: 30 },
        { label: "Pasear al Parque", percent: 40, color: "#00B894", count: 20 }
      ],
      question: "¿Cuántas familias prefieren <strong>Pasear al Parque</strong> si son el 40% de 50?",
      options: ["10 familias", "20 familias", "25 familias"],
      correctIndex: 1,
      explanation: "El 40% de 50 es (50 × 40) / 100 = 20 familias."
    }
  ],

  init(container) {
    this.score = 0;
    this.questionsAnswered = 0;
    this.isAnswered = false;
    this.renderLayout(container);
    this.nextQuestion();
  },

  renderLayout(container) {
    container.innerHTML = `
      <div class="game-container">
        <div class="game-score-bar">
          <span>📊 Tema 4: Diagrama Circular</span>
          <span>Puntos: <strong id="diag-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="diag-topic-title">
          Encuesta
        </div>

        <div style="display: flex; gap: 30px; align-items: center; justify-content: center; width: 100%; flex-wrap: wrap;">
          <div class="game-canvas-wrapper" style="width: 260px; height: 260px;">
            <svg id="svg-pie" width="240" height="240" viewBox="-120 -120 240 240"></svg>
          </div>
          <div id="diag-legend" style="display: flex; flex-direction: column; gap: 10px; font-weight: 600;">
            <!-- Legend inserted dynamically -->
          </div>
        </div>

        <p id="diag-question" style="font-size: 1.25rem; font-weight: 600; text-align: center; margin-top: 10px;"></p>

        <div class="options-grid" id="diag-options" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <!-- Options inserted dynamically -->
        </div>

        <div id="diag-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  nextQuestion() {
    this.isAnswered = false;
    if (this.questionsAnswered >= this.maxQuestions) {
      this.finishGame();
      return;
    }

    const feedback = document.getElementById('diag-feedback');
    if (feedback) feedback.innerText = '';

    this.currentSurvey = this.surveys[this.questionsAnswered];

    document.getElementById('diag-topic-title').innerHTML = `📊 <strong>${this.currentSurvey.topic}</strong>`;
    document.getElementById('diag-question').innerHTML = this.currentSurvey.question;

    this.drawPieChart(this.currentSurvey.slices);
    this.renderLegend(this.currentSurvey.slices);
    this.renderOptions(this.currentSurvey.options);
  },

  drawPieChart(slices) {
    const svg = document.getElementById('svg-pie');
    svg.innerHTML = '';
    let startAngle = 0;

    slices.forEach(slice => {
      const angle = (slice.percent / 100) * 360;
      const endAngle = startAngle + angle;

      const path = this.createPieSlicePath(0, 0, 100, startAngle, endAngle);
      const pathElem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElem.setAttribute('d', path);
      pathElem.setAttribute('fill', slice.color);
      pathElem.setAttribute('stroke', '#FFFFFF');
      pathElem.setAttribute('stroke-width', '3');
      svg.appendChild(pathElem);

      startAngle = endAngle;
    });
  },

  createPieSlicePath(cx, cy, r, startAngle, endAngle) {
    const rad = Math.PI / 180;
    const x1 = cx + r * Math.cos(startAngle * rad);
    const y1 = cy + r * Math.sin(startAngle * rad);
    const x2 = cx + r * Math.cos(endAngle * rad);
    const y2 = cy + r * Math.sin(endAngle * rad);

    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  },

  renderLegend(slices) {
    const legend = document.getElementById('diag-legend');
    legend.innerHTML = slices.map(s => `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="width: 20px; height: 20px; background: ${s.color}; border-radius: 6px; display: inline-block;"></span>
        <span>${s.label}: <strong>${s.percent}%</strong></span>
      </div>
    `).join('');
  },

  renderOptions(options) {
    const optsDiv = document.getElementById('diag-options');
    optsDiv.innerHTML = options.map((opt, idx) => `
      <button class="btn-option" onclick="DiagramaCircularGame.checkAnswer(${idx})">
        ${opt}
      </button>
    `).join('');
  },

  checkAnswer(idx) {
    if (this.isAnswered) return;

    const feedback = document.getElementById('diag-feedback');

    if (idx === this.currentSurvey.correctIndex) {
      this.isAnswered = true;
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Excelente Lu! ${this.currentSurvey.explanation}`;
      this.score++;
      document.getElementById('diag-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 2000);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Casi. Pista: ${this.currentSurvey.explanation}`;
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('diagrama_circular', starsEarned);
    sounds.play('fanfare');

    document.getElementById('diag-question').innerHTML = `
      🏆 <strong>¡Repaso de Diagramas Circulares Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
    document.getElementById('diag-options').innerHTML = '';
  }
};
