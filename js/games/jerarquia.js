/* Minijuego 3: Jerarquía de Operaciones (con potencias y raíces) */
const JerarquiaGame = {
  score: 0,
  questionsAnswered: 0,
  maxQuestions: 5,
  currentProblem: null,
  isAnswered: false,
  isStep1Done: false,

  // Database of balanced 4th-grade hierarchy problems
  problems: [
    {
      expression: "5 + 2^3 \\times 2 - 4",
      htmlExpr: "5 + 2<sup>3</sup> × 2 - 4",
      step1Title: "¿Qué operación se realiza PRIMERO?",
      optionsStep1: [
        { text: "La potencia: 2³", correct: true },
        { text: "La suma: 5 + 2", correct: false },
        { text: "La resta: 2 - 4", correct: false }
      ],
      step2Prompt: "Calcula el valor de 2³ (es decir, 2 × 2 × 2):",
      correctStep2: 8,
      finalResultPrompt: "Ahora resolvemos: 5 + 8 × 2 - 4 = 5 + 16 - 4. ¿Cuál es el resultado final?",
      finalResult: 17
    },
    {
      expression: "12 - \\sqrt{25} + (6 - 2)",
      htmlExpr: "12 - √25 + (6 - 2)",
      step1Title: "¿Qué debe resolverse PRIMERO según la jerarquía?",
      optionsStep1: [
        { text: "El paréntesis: (6 - 2)", correct: true },
        { text: "La resta: 12 - √25", correct: false },
        { text: "La raíz: √25", correct: false }
      ],
      step2Prompt: "Calcula (6 - 2):",
      correctStep2: 4,
      finalResultPrompt: "Ahora con √25 = 5, tenemos: 12 - 5 + 4. ¿Cuál es el resultado final?",
      finalResult: 11
    },
    {
      expression: "3^2 + 4 \\times \\sqrt{16}",
      htmlExpr: "3<sup>2</sup> + 4 × √16",
      step1Title: "¿Qué operaciones tienen MAYOR jerarquía aquí?",
      optionsStep1: [
        { text: "Las potencias y raíces (3² y √16)", correct: true },
        { text: "La suma central (3² + 4)", correct: false },
        { text: "La multiplicación (4 × √16) antes de la potencia", correct: false }
      ],
      step2Prompt: "Calcula 3² y √16 (sabiendo que √16 es el número que multiplicado por sí mismo da 16):",
      correctStep2: 9, // 3^2 = 9
      finalResultPrompt: "Como 3² = 9 y √16 = 4, nos queda: 9 + 4 × 4 = 9 + 16. ¿Resultado final?",
      finalResult: 25
    },
    {
      expression: "(10 - 2) \\div 2 + 5^2",
      htmlExpr: "(10 - 2) ÷ 2 + 5<sup>2</sup>",
      step1Title: "¿Por cuál parte se debe empezar?",
      optionsStep1: [
        { text: "El paréntesis: (10 - 2)", correct: true },
        { text: "La división: 2 ÷ 2", correct: false },
        { text: "La suma: 2 + 5²", correct: false }
      ],
      step2Prompt: "Calcula (10 - 2):",
      correctStep2: 8,
      finalResultPrompt: "Nos queda 8 ÷ 2 + 5² = 4 + 25. ¿Resultado final?",
      finalResult: 29
    },
    {
      expression: "\\sqrt{36} + 2 \\times (7 - 3)",
      htmlExpr: "√36 + 2 × (7 - 3)",
      step1Title: "¿Qué se resuelve PRIMERO de todo?",
      optionsStep1: [
        { text: "El paréntesis: (7 - 3)", correct: true },
        { text: "La suma: √36 + 2", correct: false },
        { text: "La multiplicación: 2 × 7", correct: false }
      ],
      step2Prompt: "Resuelve (7 - 3) y √36 (el número que por sí mismo da 36):",
      correctStep2: 6, // sqrt(36)
      finalResultPrompt: "Nos queda: 6 + 2 × 4 = 6 + 8. ¿Resultado final?",
      finalResult: 14
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
          <span>⚡ Tema 3: Jerarquía de Operaciones</span>
          <span>Puntos: <strong id="jer-score">0</strong> / 5</span>
        </div>

        <div class="question-box pop-animation" id="jer-expression" style="font-size: 1.6rem; font-family: var(--font-heading); color: var(--primary);">
          10 + 2³ × 2
        </div>

        <div id="jer-step-area" style="width: 100%; display: flex; flex-direction: column; gap: 16px; align-items: center;">
          <!-- Steps inserted dynamically -->
        </div>

        <div id="jer-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
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

    const feedback = document.getElementById('jer-feedback');
    if (feedback) feedback.innerText = '';

    this.currentProblem = this.problems[this.questionsAnswered];
    document.getElementById('jer-expression').innerHTML = `Operación: <strong>${this.currentProblem.htmlExpr}</strong>`;

    this.renderStep1();
  },

  renderStep1() {
    const area = document.getElementById('jer-step-area');
    area.innerHTML = `
      <p style="font-size: 1.2rem; font-weight: 600;">${this.currentProblem.step1Title}</p>
      <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
        ${this.currentProblem.optionsStep1.map((opt, idx) => `
          <button class="btn-option" onclick="JerarquiaGame.checkStep1(${idx})">
            ${opt.text}
          </button>
        `).join('')}
      </div>
    `;
  },

  checkStep1(index) {
    if (this.isStep1Done) return;

    const chosen = this.currentProblem.optionsStep1[index];
    const feedback = document.getElementById('jer-feedback');

    if (chosen.correct) {
      this.isStep1Done = true;
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = '🎉 ¡Correcto! Respetaste la regla de jerarquía.';
      setTimeout(() => this.renderStep2(), 1000);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = '❌ Recuérdale a la mente la regla: 1° Paréntesis () $\\rightarrow$ 2° Potencias/Raíces $\\rightarrow$ 3° Multiplicación/División $\\rightarrow$ 4° Suma/Resta.';
    }
  },

  renderStep2() {
    const feedback = document.getElementById('jer-feedback');
    feedback.innerText = '';

    const area = document.getElementById('jer-step-area');
    area.innerHTML = `
      <p style="font-size: 1.15rem; font-weight: 600;">${this.currentProblem.finalResultPrompt}</p>
      <div style="display: flex; gap: 12px; align-items: center;">
        <input type="number" id="input-jer-final" class="input-num" placeholder="?">
        <button class="btn-action" id="btn-jer-final" onclick="JerarquiaGame.checkFinal()">Enviar Respuesta</button>
      </div>
    `;
  },

  checkFinal() {
    if (this.isAnswered) return;
    this.isAnswered = true;
    const btn = document.getElementById('btn-jer-final');
    if (btn) btn.disabled = true;

    const val = parseInt(document.getElementById('input-jer-final').value);
    const feedback = document.getElementById('jer-feedback');

    if (val === this.currentProblem.finalResult) {
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Brillante Lu! El resultado final es ${val}.`;
      this.score++;
      document.getElementById('jer-score').innerText = this.score;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 1600);
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Casi. El resultado correcto es ${this.currentProblem.finalResult}. ¡Revisemos las sumas y productos parciales!`;
      this.questionsAnswered++;
      setTimeout(() => this.nextQuestion(), 2200);
    }
  },

  finishGame() {
    const starsEarned = this.score >= 4 ? 3 : (this.score >= 2 ? 2 : 1);
    App.saveStars('jerarquia', starsEarned);
    sounds.play('fanfare');

    document.getElementById('jer-step-area').innerHTML = `
      🏆 <strong>¡Repaso de Jerarquía Completado!</strong><br>
      Obtuviste ${this.score} de 5 puntos y <strong>${'⭐'.repeat(starsEarned)}</strong> Estrellas.
    `;
  }
};
