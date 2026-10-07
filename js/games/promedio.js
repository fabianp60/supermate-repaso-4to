/* Minijuego 7: Media Aritmética o Promedio */
const PromedioGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentDataset: [],
  currentSum: 0,
  currentAvg: 0,
  isAnswered: false,
  isStep1Done: false,

  problems: [
    {
      context: "Notas de exámenes de Lu",
      data: [8, 10, 6, 8],
      icon: "📚"
    },
    {
      context: "Goles anotados en los últimos partidos",
      data: [3, 1, 4, 2, 5],
      icon: "⚽"
    },
    {
      context: "Kilos de frutas vendidas por día",
      data: [12, 15, 9],
      icon: "🍎"
    },
    {
      context: "Puntos obtenidos en el juego de mesa",
      data: [20, 30, 10, 40],
      icon: "🎲"
    },
    {
      context: "Minutos de lectura diaria de esta semana",
      data: [15, 25, 20],
      icon: "📖"
    }
  ],

  init(container) {
    this.score = 0;
    this.questionsAnswered = 0;
    this.isAnswered = false;
    this.isStep1Done = false;
    this.renderLayout(container);
    this.nextQuestion();
  },

  renderLayout(container) {
    container.innerHTML = `
      <div class="game-container">
        <div class="game-score-bar">
          <span>⚖️ Tema 7: Media Aritmética (Promedio)</span>
          <span>Puntos: <strong id="prom-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="prom-prompt" style="font-size: 1.3rem;">
          Situación...
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; align-items: center; margin: 20px 0; flex-wrap: wrap;" id="prom-blocks">
          <!-- Data blocks -->
        </div>

        <div id="prom-step-area" style="display: flex; flex-direction: column; gap: 14px; align-items: center; width: 100%;">
          <!-- Step 1 and 2 inputs -->
        </div>

        <div id="prom-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  nextQuestion() {
    this.isAnswered = false;
    this.isStep1Done = false;
    if (this.questionsAnswered >= this.maxQuestions) {
      this.finishGame();
      return;
    }

    const feedback = document.getElementById('prom-feedback');
    if (feedback) feedback.innerText = '';

    const problem = this.problems[this.questionsAnswered];
    this.currentDataset = problem.data;
    this.currentSum = problem.data.reduce((a, b) => a + b, 0);
    this.currentAvg = this.currentSum / problem.data.length;

    document.getElementById('prom-prompt').innerHTML = `
      ${problem.icon} <strong>${problem.context}:</strong><br>
      Datos: <strong>${problem.data.join(', ')}</strong><br>
      <small style="font-size: 0.95rem; color: var(--text-muted);">Recuerda: 1° Suma todos los datos $\\rightarrow$ 2° Divide entre la cantidad de datos (${problem.data.length}).</small>
    `;

    document.getElementById('prom-blocks').innerHTML = problem.data.map(val => `
      <div style="background: white; border: 3px solid var(--primary); border-radius: 16px; width: 65px; height: 65px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 700; font-size: 1.4rem; box-shadow: 0 4px 10px rgba(0,0,0,0.06);">
        ${val}
      </div>
    `).join('');

    this.renderStep1();
  },

  renderStep1() {
    document.getElementById('prom-step-area').innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <label style="font-size: 1.15rem; font-weight: 600;">1° Suma de todos los datos = 
          <input type="number" id="input-prom-sum" class="input-num" placeholder="?">
        </label>
        <button class="btn-action" id="btn-prom-step1" onclick="PromedioGame.checkStep1()">Comprobar Suma</button>
      </div>
    `;
  },

  checkStep1() {
    if (this.isStep1Done) return;

    const userSum = parseInt(document.getElementById('input-prom-sum').value);
    const feedback = document.getElementById('prom-feedback');

    if (userSum === this.currentSum) {
      this.isStep1Done = true;
      const btn = document.getElementById('btn-prom-step1');
      if (btn) btn.disabled = true;

      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Suma correcta! Los datos suman ${this.currentSum}. Ahora vamos al paso 2.`;
      setTimeout(() => this.renderStep2(), 1200);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ La suma no da ${userSum}. Sumemos con cuidado: ${this.currentDataset.join(' + ')} = ${this.currentSum}.`;
    }
  },

  renderStep2() {
    const feedback = document.getElementById('prom-feedback');
    feedback.innerText = '';

    document.getElementById('prom-step-area').innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: center;">
        <label style="font-size: 1.15rem; font-weight: 600;">2° Divide la suma (${this.currentSum}) ÷ ${this.currentDataset.length} datos = 
          <input type="number" id="input-prom-avg" class="input-num" placeholder="Promedio">
        </label>
        <button class="btn-action" id="btn-prom-final" onclick="PromedioGame.checkFinal()">Calcular Promedio</button>
      </div>
    `;
  },

  checkFinal() {
    if (this.isAnswered) return;
    this.isAnswered = true;
    const btn = document.getElementById('btn-prom-final');
    if (btn) btn.disabled = true;

    const userAvg = parseFloat(document.getElementById('input-prom-avg').value);
    const feedback = document.getElementById('prom-feedback');

    if (userAvg === this.currentAvg) {
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Excelente Lu! El promedio o media aritmética es ${this.currentAvg}.`;
      this.score++;
      document.getElementById('prom-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1800);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Revisa la división: ${this.currentSum} ÷ ${this.currentDataset.length} = ${this.currentAvg}.`;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 2400);
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('promedio', starsEarned);
    sounds.play('fanfare');

    document.getElementById('prom-prompt').innerHTML = `
      🏆 <strong>¡Repaso de Promedio Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
    document.getElementById('prom-blocks').innerHTML = '';
    document.getElementById('prom-step-area').innerHTML = '';
  }
};
