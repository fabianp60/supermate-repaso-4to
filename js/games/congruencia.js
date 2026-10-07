/* Minijuego 2: Congruencia y Semejanza de Figuras */
const CongruenciaGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentType: '', // 'congruente', 'semejante', 'diferente'
  currentShapeA: null,
  currentShapeB: null,
  isAnswered: false,

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
          <span>🎨 Tema 2: Congruencia y Semejanza</span>
          <span>Puntos: <strong id="cong-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="cong-instruction">
          Compara las dos figuras y selecciona la relación correcta:
        </div>

        <div style="display: flex; gap: 20px; justify-content: center; align-items: center; width: 100%; flex-wrap: wrap;">
          <div class="game-canvas-wrapper" style="width: 220px; height: 220px;">
            <svg id="svg-shape-a" width="200" height="200" viewBox="0 0 200 200"></svg>
          </div>
          <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">vs</div>
          <div class="game-canvas-wrapper" style="width: 220px; height: 220px;">
            <svg id="svg-shape-b" width="200" height="200" viewBox="0 0 200 200"></svg>
          </div>
        </div>

        <div class="options-grid" style="grid-template-columns: repeat(3, 1fr); max-width: 700px;">
          <button class="btn-option" onclick="CongruenciaGame.checkAnswer('congruente')">
            ✨ Congruentes<br><small style="font-size: 0.8rem; font-weight: normal;">(Igual forma e igual tamaño)</small>
          </button>
          <button class="btn-option" onclick="CongruenciaGame.checkAnswer('semejante')">
            🔍 Semejantes<br><small style="font-size: 0.8rem; font-weight: normal;">(Igual forma, diferente tamaño)</small>
          </button>
          <button class="btn-option" onclick="CongruenciaGame.checkAnswer('diferente')">
            ❌ Diferentes<br><small style="font-size: 0.8rem; font-weight: normal;">(Diferente forma)</small>
          </button>
        </div>

        <div id="cong-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  nextQuestion() {
    this.isAnswered = false;
    if (this.questionsAnswered >= this.maxQuestions) {
      this.finishGame();
      return;
    }

    const feedback = document.getElementById('cong-feedback');
    if (feedback) feedback.innerText = '';

    const types = ['congruente', 'semejante', 'diferente'];
    this.currentType = types[Math.floor(Math.random() * types.length)];

    const shapes = ['triangle', 'star', 'arrow', 'trapezoid'];
    const chosenShape = shapes[Math.floor(Math.random() * shapes.length)];
    const otherShape = shapes.filter(s => s !== chosenShape)[Math.floor(Math.random() * (shapes.length - 1))];

    if (this.currentType === 'congruente') {
      this.drawShape('svg-shape-a', chosenShape, 1.0, 0, '#6C5CE7');
      // Same shape, same scale, maybe rotated 0 or 90 deg
      const rot = [0, 90, 180][Math.floor(Math.random() * 3)];
      this.drawShape('svg-shape-b', chosenShape, 1.0, rot, '#00CEC9');
    } else if (this.currentType === 'semejante') {
      this.drawShape('svg-shape-a', chosenShape, 1.0, 0, '#6C5CE7');
      // Same shape, scaled (0.6 or 1.4)
      const scale = [0.6, 1.4][Math.floor(Math.random() * 2)];
      this.drawShape('svg-shape-b', chosenShape, scale, 0, '#00CEC9');
    } else { // diferente
      this.drawShape('svg-shape-a', chosenShape, 1.0, 0, '#6C5CE7');
      this.drawShape('svg-shape-b', otherShape, 1.0, 0, '#FD79A8');
    }
  },

  drawShape(svgId, shapeType, scale, rotation, color) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    svg.innerHTML = '';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(100, 100) scale(${scale}) rotate(${rotation}) translate(-100, -100)`);

    let elem;
    if (shapeType === 'triangle') {
      elem = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      elem.setAttribute('points', '100,40 160,160 40,160');
    } else if (shapeType === 'star') {
      elem = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      elem.setAttribute('points', '100,20 120,75 180,75 130,110 150,170 100,135 50,170 70,110 20,75 80,75');
    } else if (shapeType === 'arrow') {
      elem = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      elem.setAttribute('points', '100,30 160,100 130,100 130,170 70,170 70,100 40,100');
    } else if (shapeType === 'trapezoid') {
      elem = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      elem.setAttribute('points', '60,50 140,50 170,150 30,150');
    }

    elem.setAttribute('fill', color);
    elem.setAttribute('fill-opacity', '0.85');
    elem.setAttribute('stroke', '#2D3436');
    elem.setAttribute('stroke-width', '3');

    g.appendChild(elem);
    svg.appendChild(g);
  },

  checkAnswer(userChoice) {
    if (this.isAnswered) return;

    const feedback = document.getElementById('cong-feedback');

    if (userChoice === this.currentType) {
      this.isAnswered = true;
      sounds.play('correct');
      feedback.style.color = '#00B894';
      let msg = '';
      if (userChoice === 'congruente') msg = '🎉 ¡Excelente! Tienen la misma forma y exactamente el mismo tamaño.';
      else if (userChoice === 'semejante') msg = '🎉 ¡Muy bien! Tienen la misma forma, pero una es de distinto tamaño.';
      else msg = '🎉 ¡Correcto! Son figuras completamente diferentes.';

      feedback.innerHTML = msg;
      this.score++;
      document.getElementById('cong-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1600);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      let hint = '';
      if (this.currentType === 'congruente') hint = 'Fíjate bien: si superpones las figuras, ¡tienen la misma forma y tamaño exacto!';
      else if (this.currentType === 'semejante') hint = 'Tienen la misma forma, pero una se encogió o se agrandó.';
      else hint = 'Compara los lados y esquinas: la forma de ambas figuras es distinta.';

      feedback.innerHTML = `❌ Ups, no es ${userChoice}. Pista: ${hint}`;
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('congruencia', starsEarned);
    sounds.play('fanfare');

    document.getElementById('cong-instruction').innerHTML = `
      🏆 <strong>¡Repaso de Congruencia y Semejanza Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
  }
};
