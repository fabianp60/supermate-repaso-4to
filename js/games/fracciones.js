/* Minijuego 5: Fracción de un número y suma de fracciones homogéneas */
const FraccionesGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentType: 'of_number', // 'of_number' or 'sum'
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
          <span>🍰 Tema 5: Fracciones y Sumas Homogéneas</span>
          <span>Puntos: <strong id="frac-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="frac-prompt" style="font-size: 1.3rem;">
          Cargando situación...
        </div>

        <div id="frac-visual-area" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 15px 0;">
          <!-- Visual fraction representation -->
        </div>

        <div id="frac-controls" style="display: flex; gap: 12px; align-items: center; justify-content: center;">
          <!-- Inputs / options -->
        </div>

        <div id="frac-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  nextQuestion() {
    this.isAnswered = false;
    if (this.questionsAnswered >= this.maxQuestions) {
      this.finishGame();
      return;
    }

    const feedback = document.getElementById('frac-feedback');
    if (feedback) feedback.innerText = '';

    // Alternate between fraction of a number and sum of homogeneous fractions
    this.currentType = (this.questionsAnswered % 2 === 0) ? 'of_number' : 'sum';

    if (this.currentType === 'of_number') {
      this.generateFractionOfNumberQuestion();
    } else {
      this.generateHomogeneousSumQuestion();
    }
  },

  generateFractionOfNumberQuestion() {
    // Pick friendly numbers for 4th grade
    const denominators = [3, 4, 5, 6];
    const den = denominators[Math.floor(Math.random() * denominators.length)];
    const num = Math.floor(Math.random() * (den - 1)) + 1; // 1 to den-1
    const mult = Math.floor(Math.random() * 4) + 3; // 3 to 6
    const totalQuantity = den * mult; // e.g., 4 * 5 = 20
    const answer = (totalQuantity / den) * num;

    this.currentAnswer = answer;
    this.currentDen = den;
    this.currentNum = num;
    this.currentTotal = totalQuantity;

    document.getElementById('frac-prompt').innerHTML = `
      🍬 <strong>Fracción de una cantidad:</strong> En la pastelería prepararon <strong>${totalQuantity} galletas</strong>.<br>
      Calcula cuánto es <strong><span style="font-size:1.5rem;"><sup>${num}</sup>&frasl;<sub>${den}</sub></span> de ${totalQuantity}</strong>.
    `;

    // Render visual candy groups
    const visual = document.getElementById('frac-visual-area');
    visual.innerHTML = `
      <div style="background: white; border: 2px dashed #CBD5E1; border-radius: 16px; padding: 16px; text-align: center; width: 100%; max-width: 500px;">
        <p style="margin-bottom: 10px; color: var(--text-muted);">Pista: Divide las ${totalQuantity} galletas en <strong>${den} grupos iguales</strong> (cada grupo tiene ${totalQuantity / den} galletas) y toma <strong>${num} grupos</strong>.</p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          ${Array(den).fill(0).map((_, groupIdx) => `
            <div style="border: 2px solid ${groupIdx < num ? '#6C5CE7' : '#CBD5E1'}; background: ${groupIdx < num ? '#F0EDF9' : '#F8FAFC'}; border-radius: 12px; padding: 8px; font-size: 1.4rem;">
              ${'🍪'.repeat(totalQuantity / den)}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('frac-controls').innerHTML = `
      <label style="font-size: 1.2rem; font-weight: 600;">Respuesta: 
        <input type="number" id="input-frac-ans" class="input-num" placeholder="?">
      </label>
      <button class="btn-action" id="btn-frac-send" onclick="FraccionesGame.checkFractionOfNumber()">Enviar</button>
    `;
  },

  checkFractionOfNumber() {
    if (this.isAnswered) return;
    this.isAnswered = true;
    const btn = document.getElementById('btn-frac-send');
    if (btn) btn.disabled = true;

    const val = parseInt(document.getElementById('input-frac-ans').value);
    const feedback = document.getElementById('frac-feedback');

    if (val === this.currentAnswer) {
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Perfecto Lu! (${this.currentTotal} ÷ ${this.currentDen}) × ${this.currentNum} = ${val}.`;
      this.score++;
      document.getElementById('frac-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1800);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Casi. Recuerda: Primero divide ${this.currentTotal} ÷ ${this.currentDen} = ${this.currentTotal / this.currentDen}. Luego multiplica por ${this.currentNum}: ${this.currentAnswer}.`;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 2400);
    }
  },

  generateHomogeneousSumQuestion() {
    const den = [5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 6)];
    const num1 = Math.floor(Math.random() * (den - 2)) + 1;
    const num2 = Math.floor(Math.random() * (den - num1 - 1)) + 1;
    const sumNum = num1 + num2;

    this.currentDen = den;
    this.currentSumNum = sumNum;

    document.getElementById('frac-prompt').innerHTML = `
      🍕 <strong>Suma de Fracciones Homogéneas:</strong><br>
      Resuelve: <span style="font-size:1.6rem; font-family: var(--font-heading);"><sup>${num1}</sup>&frasl;<sub>${den}</sub> + <sup>${num2}</sup>&frasl;<sub>${den}</sub> = ?</span>
    `;

    // Visual pizza/bar addition representation
    const visual = document.getElementById('frac-visual-area');
    visual.innerHTML = `
      <div style="display: flex; gap: 20px; align-items: center; justify-content: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="display: flex; gap: 2px; width: 140px; height: 30px; border: 2px solid #2D3436; border-radius: 6px; overflow: hidden;">
            ${Array(den).fill(0).map((_, i) => `<div style="flex:1; background: ${i < num1 ? '#6C5CE7' : '#FFF'}; border-right: 1px solid #CBD5E1;"></div>`).join('')}
          </div>
          <small><sup>${num1}</sup>&frasl;<sub>${den}</sub></small>
        </div>
        <span style="font-size: 1.8rem; font-weight: 700;">+</span>
        <div style="text-align: center;">
          <div style="display: flex; gap: 2px; width: 140px; height: 30px; border: 2px solid #2D3436; border-radius: 6px; overflow: hidden;">
            ${Array(den).fill(0).map((_, i) => `<div style="flex:1; background: ${i < num2 ? '#00CEC9' : '#FFF'}; border-right: 1px solid #CBD5E1;"></div>`).join('')}
          </div>
          <small><sup>${num2}</sup>&frasl;<sub>${den}</sub></small>
        </div>
      </div>
    `;

    document.getElementById('frac-controls').innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; font-size: 1.3rem; font-family: var(--font-heading);">
        <input type="number" id="input-sum-num" class="input-num" style="width: 70px;" placeholder="num">
        <span>/</span>
        <input type="number" id="input-sum-den" class="input-num" style="width: 70px;" value="${den}">
        <button class="btn-action" id="btn-frac-sum" onclick="FraccionesGame.checkHomogeneousSum()">Comprobar Suma</button>
      </div>
    `;
  },

  checkHomogeneousSum() {
    if (this.isAnswered) return;
    this.isAnswered = true;
    const btn = document.getElementById('btn-frac-sum');
    if (btn) btn.disabled = true;

    const userNum = parseInt(document.getElementById('input-sum-num').value);
    const userDen = parseInt(document.getElementById('input-sum-den').value);
    const feedback = document.getElementById('frac-feedback');

    if (userNum === this.currentSumNum && userDen === this.currentDen) {
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Excelente Lu! Se suman los numeradores (${userNum}) y se mantiene el mismo denominador (${userDen}).`;
      this.score++;
      document.getElementById('frac-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1800);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Recuerda la regla de oro: En fracciones homogéneas, ¡los denominadores NO se suman! El resultado es <sup>${this.currentSumNum}</sup>&frasl;<sub>${this.currentDen}</sub>.`;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 2400);
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('fracciones', starsEarned);
    sounds.play('fanfare');

    document.getElementById('frac-prompt').innerHTML = `
      🏆 <strong>¡Repaso de Fracciones Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
    document.getElementById('frac-visual-area').innerHTML = '';
    document.getElementById('frac-controls').innerHTML = '';
  }
};
