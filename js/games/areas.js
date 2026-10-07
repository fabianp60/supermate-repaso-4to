/* Minijuego 6: Área de Rectángulos, Cuadrados y Triángulos */
const AreasGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentShapeType: 'rectangle', // 'rectangle', 'square', 'triangle'
  b: 0,
  h: 0,
  correctArea: 0,
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
          <span>📐 Tema 6: Área de Figuras Géometricas</span>
          <span>Puntos: <strong id="area-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="area-prompt" style="font-size: 1.25rem;">
          Calcula el área de la figura:
        </div>

        <div class="game-canvas-wrapper" style="width: 320px; height: 260px; position: relative;">
          <svg id="svg-area" width="300" height="240" viewBox="0 0 300 240"></svg>
        </div>

        <div id="area-controls" style="display: flex; gap: 12px; align-items: center; justify-content: center; flex-wrap: wrap;">
          <!-- Controls -->
        </div>

        <div id="area-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  nextQuestion() {
    this.isAnswered = false;
    if (this.questionsAnswered >= this.maxQuestions) {
      this.finishGame();
      return;
    }

    const feedback = document.getElementById('area-feedback');
    if (feedback) feedback.innerText = '';

    const shapes = ['rectangle', 'square', 'triangle'];
    this.currentShapeType = shapes[Math.floor(Math.random() * shapes.length)];

    if (this.currentShapeType === 'square') {
      const side = Math.floor(Math.random() * 4) + 3; // 3 to 6 cm
      this.b = side;
      this.h = side;
      this.correctArea = side * side;

      document.getElementById('area-prompt').innerHTML = `
        🟦 <strong>Cuadrado:</strong> Lado = <strong>${side} cm</strong>.<br>
        Fórmula: <span class="formula-badge">Área = Lado × Lado</span>
      `;
    } else if (this.currentShapeType === 'rectangle') {
      this.b = Math.floor(Math.random() * 4) + 4; // 4 to 7
      this.h = Math.floor(Math.random() * 3) + 2; // 2 to 4
      this.correctArea = this.b * this.h;

      document.getElementById('area-prompt').innerHTML = `
        🟩 <strong>Rectángulo:</strong> Base = <strong>${this.b} cm</strong>, Altura = <strong>${this.h} cm</strong>.<br>
        Fórmula: <span class="formula-badge">Área = Base × Altura</span>
      `;
    } else { // triangle
      this.b = (Math.floor(Math.random() * 3) + 2) * 2; // Even numbers 4, 6, 8 for clean integer division
      this.h = Math.floor(Math.random() * 4) + 3; // 3 to 6
      this.correctArea = (this.b * this.h) / 2;

      document.getElementById('area-prompt').innerHTML = `
        🔺 <strong>Triángulo:</strong> Base = <strong>${this.b} cm</strong>, Altura = <strong>${this.h} cm</strong>.<br>
        Fórmula: <span class="formula-badge">Área = (Base × Altura) ÷ 2</span>
      `;
    }

    this.drawShape();

    document.getElementById('area-controls').innerHTML = `
      <label style="font-size: 1.2rem; font-weight: 600;">Área = 
        <input type="number" id="input-area-val" class="input-num" placeholder="?"> cm²
      </label>
      <button class="btn-action" id="btn-check-area" onclick="AreasGame.checkAnswer()">Comprobar Área</button>
    `;
  },

  drawShape() {
    const svg = document.getElementById('svg-area');
    svg.innerHTML = '';
    const unit = 25; // pixels per cm

    const offsetX = (300 - this.b * unit) / 2;
    const offsetY = (240 - this.h * unit) / 2;

    // Draw grid background
    for (let x = 0; x <= 300; x += unit) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x); line.setAttribute('y1', 0);
      line.setAttribute('x2', x); line.setAttribute('y2', 240);
      line.setAttribute('stroke', '#F1F5F9');
      svg.appendChild(line);
    }
    for (let y = 0; y <= 240; y += unit) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0); line.setAttribute('y1', y);
      line.setAttribute('x2', 300); line.setAttribute('y2', y);
      line.setAttribute('stroke', '#F1F5F9');
      svg.appendChild(line);
    }

    // Draw shape
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let pts = '';
    if (this.currentShapeType === 'square' || this.currentShapeType === 'rectangle') {
      pts = `${offsetX},${offsetY} ${offsetX + this.b * unit},${offsetY} ${offsetX + this.b * unit},${offsetY + this.h * unit} ${offsetX},${offsetY + this.h * unit}`;
    } else { // triangle
      pts = `${offsetX},${offsetY + this.h * unit} ${offsetX + (this.b * unit)/2},${offsetY} ${offsetX + this.b * unit},${offsetY + this.h * unit}`;
    }

    polygon.setAttribute('points', pts);
    polygon.setAttribute('fill', '#00CEC9');
    polygon.setAttribute('fill-opacity', '0.45');
    polygon.setAttribute('stroke', '#00B894');
    polygon.setAttribute('stroke-width', '4');
    svg.appendChild(polygon);

    // Dimension Labels
    const baseTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    baseTxt.setAttribute('x', offsetX + (this.b * unit) / 2);
    baseTxt.setAttribute('y', offsetY + this.h * unit + 20);
    baseTxt.setAttribute('text-anchor', 'middle');
    baseTxt.setAttribute('font-weight', 'bold');
    baseTxt.setAttribute('fill', '#2D3436');
    baseTxt.textContent = `b = ${this.b} cm`;
    svg.appendChild(baseTxt);

    const heightTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    heightTxt.setAttribute('x', offsetX - 15);
    heightTxt.setAttribute('y', offsetY + (this.h * unit) / 2);
    heightTxt.setAttribute('text-anchor', 'middle');
    heightTxt.setAttribute('font-weight', 'bold');
    heightTxt.setAttribute('fill', '#2D3436');
    heightTxt.textContent = `h = ${this.h} cm`;
    svg.appendChild(heightTxt);
  },

  checkAnswer() {
    if (this.isAnswered) return;

    const val = parseInt(document.getElementById('input-area-val').value);
    const feedback = document.getElementById('area-feedback');

    if (val === this.correctArea) {
      this.isAnswered = true;
      const btn = document.getElementById('btn-check-area');
      if (btn) btn.disabled = true;

      sounds.play('correct');
      feedback.style.color = '#00B894';
      let calcStr = (this.currentShapeType === 'triangle') 
        ? `(${this.b} × ${this.h}) ÷ 2 = ${val} cm²` 
        : `${this.b} × ${this.h} = ${val} cm²`;
      feedback.innerHTML = `🎉 ¡Perfecto Lu! El área calculada es ${calcStr}.`;
      this.score++;
      document.getElementById('area-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1800);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      let hint = (this.currentShapeType === 'triangle')
        ? `Para triángulos: multiplica base (${this.b}) por altura (${this.h}) = ${this.b * this.h}, y luego divide entre 2.`
        : `Para rectángulos/cuadrados: multiplica base (${this.b}) por altura (${this.h}).`;
      feedback.innerHTML = `❌ Revisa tu cálculo. Pista: ${hint}`;
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('areas', starsEarned);
    sounds.play('fanfare');

    document.getElementById('area-prompt').innerHTML = `
      🏆 <strong>¡Repaso de Áreas Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
    document.getElementById('area-controls').innerHTML = '';
  }
};
