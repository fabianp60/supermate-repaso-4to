/* Examen Final: Gran Desafío de 7 Estrellas */
const ExamenGame = {
  questions: [],
  currentIndex: 0,
  score: 0,
  isAnswered: false,

  init(container) {
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;
    this.generateQuestions();
    this.renderLayout(container);
    this.showQuestion();
  },

  generateQuestions() {
    this.questions = [
      // Topic 1
      {
        topic: "Plano Cartesiano",
        text: "¿Cuáles son las coordenadas del punto ubicado en el plano horizontal 4 y vertical 7?",
        options: ["(7, 4)", "(4, 7)", "(4, 4)", "(7, 7)"],
        correct: 1,
        explanation: "Las coordenadas siempre se escriben (X, Y), donde X es horizontal (4) e Y es vertical (7)."
      },
      {
        topic: "Traslación de Figuras",
        text: "Si el punto A(2, 3) se traslada 3 unidades a la derecha (+3 en X) y 2 arriba (+2 en Y), ¿cuáles son sus nuevas coordenadas?",
        options: ["(5, 5)", "(5, 3)", "(2, 5)", "(6, 6)"],
        correct: 0,
        explanation: "Sumamos a X: 2 + 3 = 5; Sumamos a Y: 3 + 2 = 5. El nuevo punto es (5, 5)."
      },
      // Topic 2
      {
        topic: "Congruencia y Semejanza",
        text: "Dos triángulos tienen exactamente la misma forma, pero uno tiene lados de 3 cm y el otro de 6 cm. ¿Cómo son entre sí?",
        options: ["Congruentes", "Semejantes", "Iguales", "Diferentes"],
        correct: 1,
        explanation: "Tienen la misma forma pero distinto tamaño, por lo tanto son Semejantes."
      },
      {
        topic: "Congruencia y Semejanza",
        text: "Dos cuadrados tienen lados de 5 cm exactamente. ¿Cómo se clasifican?",
        options: ["Semejantes únicamente", "Congruentes", "Perpendiculares", "Asimétricos"],
        correct: 1,
        explanation: "Al tener exactamente la misma forma y el mismo tamaño (lados de 5 cm), son Congruentes."
      },
      // Topic 3
      {
        topic: "Jerarquía de Operaciones",
        text: "¿Cuál es el resultado de la operación: 10 + 3² × 2?",
        options: ["26", "28", "38", "19"],
        correct: 1,
        explanation: "1° Potencia: 3² = 9. 2° Multiplicación: 9 × 2 = 18. 3° Suma: 10 + 18 = 28."
      },
      {
        topic: "Jerarquía de Operaciones",
        text: "¿Cuál es el valor de: √25 + (8 - 3) × 2?",
        options: ["15", "20", "25", "10"],
        correct: 0,
        explanation: "√25 = 5. Paréntesis (8 - 3) = 5. Multiplicación 5 × 2 = 10. Suma final: 5 + 10 = 15."
      },
      // Topic 4
      {
        topic: "Diagrama Circular",
        text: "En un diagrama circular de 40 estudiantes, el color azul representa el 25% (un cuarto). ¿Cuántos estudiantes son?",
        options: ["5 estudiantes", "10 estudiantes", "15 estudiantes", "20 estudiantes"],
        correct: 1,
        explanation: "El 25% es un cuarto de la cantidad total: 40 ÷ 4 = 10 estudiantes."
      },
      {
        topic: "Diagrama Circular",
        text: "Si un círculo completo representa 100% y se divide por la mitad exacta, ¿qué porcentaje tiene cada mitad?",
        options: ["25%", "50%", "75%", "100%"],
        correct: 1,
        explanation: "La mitad de 100% es 50%."
      },
      // Topic 5
      {
        topic: "Fracciones",
        text: "¿Cuánto es 3/5 de 25 chocolates?",
        options: ["10 chocolates", "12 chocolates", "15 chocolates", "20 chocolates"],
        correct: 2,
        explanation: "25 ÷ 5 = 5. Luego 5 × 3 = 15 chocolates."
      },
      {
        topic: "Suma de Fracciones",
        text: "¿Cuál es el resultado de sumar: 2/9 + 4/9?",
        options: ["6/18", "6/9", "8/9", "2/9"],
        correct: 1,
        explanation: "En fracciones homogéneas sumamos numeradores (2 + 4 = 6) y mantenemos denominador (9) = 6/9."
      },
      // Topic 6
      {
        topic: "Área de Figuras",
        text: "¿Cuál es el área de un triángulo con Base = 8 cm y Altura = 5 cm?",
        options: ["40 cm²", "20 cm²", "13 cm²", "25 cm²"],
        correct: 1,
        explanation: "Fórmula: (Base × Altura) ÷ 2 = (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm²."
      },
      {
        topic: "Área de Figuras",
        text: "Un terreno rectangular mide 10 m de largo y 6 m de ancho. ¿Cuál es su área total?",
        options: ["16 m²", "60 m²", "32 m²", "120 m²"],
        correct: 1,
        explanation: "Fórmula: Largo × Ancho = 10 × 6 = 60 m²."
      },
      // Topic 7
      {
        topic: "Media Aritmética",
        text: "Lu sacó las siguientes notas en 4 talleres: 8, 9, 7, 10. ¿Cuál es su promedio?",
        options: ["8.5", "8.0", "9.0", "7.5"],
        correct: 0,
        explanation: "Suma: 8 + 9 + 7 + 10 = 34. División entre 4: 34 ÷ 4 = 8.5."
      },
      {
        topic: "Media Aritmética",
        text: "Tres amigos tienen 10, 15 y 20 canicas respectivamente. ¿Cuál es la media o promedio de canicas?",
        options: ["10 canicas", "15 canicas", "20 canicas", "45 canicas"],
        correct: 1,
        explanation: "Suma: 10 + 15 + 20 = 45. División entre 3: 45 ÷ 3 = 15 canicas."
      }
    ];
  },

  renderLayout(container) {
    container.innerHTML = `
      <div class="game-container">
        <div class="game-score-bar">
          <span>🎓 Gran Examen de Repaso 4°</span>
          <span>Pregunta: <strong id="exam-progress">1</strong> / 14</span>
        </div>

        <div class="question-box pop-animation" id="exam-question-title" style="font-size: 1.3rem;">
          Pregunta...
        </div>

        <div class="options-grid" id="exam-options-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
          <!-- Options -->
        </div>

        <div id="exam-feedback" style="font-weight: 700; font-size: 1.2rem; min-height: 30px; text-align: center;"></div>
      </div>
    `;
  },

  showQuestion() {
    this.isAnswered = false;
    if (this.currentIndex >= this.questions.length) {
      this.finishExam();
      return;
    }

    const q = this.questions[this.currentIndex];
    document.getElementById('exam-progress').innerText = `${this.currentIndex + 1}`;
    document.getElementById('exam-question-title').innerHTML = `
      <span style="font-size:0.9rem; text-transform:uppercase; color:var(--primary); font-weight:bold;">${q.topic}</span><br>
      ${q.text}
    `;

    const feedback = document.getElementById('exam-feedback');
    if (feedback) feedback.innerText = '';

    const optsDiv = document.getElementById('exam-options-grid');
    optsDiv.innerHTML = q.options.map((opt, idx) => `
      <button class="btn-option" onclick="ExamenGame.checkAnswer(${idx})">
        ${opt}
      </button>
    `).join('');
  },

  checkAnswer(chosenIdx) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    // Disable all option buttons
    const buttons = document.querySelectorAll('#exam-options-grid .btn-option');
    buttons.forEach(btn => btn.style.pointerEvents = 'none');

    const q = this.questions[this.currentIndex];
    const feedback = document.getElementById('exam-feedback');

    if (chosenIdx === q.correct) {
      sounds.play('correct');
      feedback.style.color = '#00B894';
      feedback.innerHTML = `🎉 ¡Excelente! ${q.explanation}`;
      this.score++;
    } else {
      sounds.play('wrong');
      feedback.style.color = '#FF7675';
      feedback.innerHTML = `❌ Respuesta correcta: ${q.options[q.correct]}. Explicación: ${q.explanation}`;
    }

    this.currentIndex++;
    setTimeout(() => this.showQuestion(), 2400);
  },

  finishGame() {
    sounds.play('fanfare');
    if (window.triggerConfetti) window.triggerConfetti();

    const score10 = ((this.score / 14) * 10).toFixed(1);
    const passed = this.score >= 10;

    const area = document.getElementById('game-area');
    area.innerHTML = `
      <div class="certificate-view pop-animation">
        <h2 class="certificate-title">🌟 DIPLOMA DE HONOR 🌟</h2>
        <p style="font-size: 1.2rem; color: var(--text-muted);">Concedido con orgullo a la estudiante de 4° Grado:</p>
        <div class="certificate-name">LU</div>
        <p style="font-size: 1.2rem; margin: 15px 0;">
          Por haber completado exitosamente el <strong>Gran Examen de Repaso de Matemáticas</strong> para la evaluación de la docente Andrea Guerrero.
        </p>
        <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin: 15px 0;">
          Calificación: ${score10} / 10.0 (${this.score} de 14 aciertos)
        </div>
        <p style="color: var(--accent-green); font-weight: bold; font-size: 1.3rem;">
          ${passed ? '🎉 ¡Estás súper preparada para tu examen del jueves 13 de agosto!' : '💪 ¡Excelente esfuerzo! Puedes repasar los temas donde tuviste dudas.'}
        </p>
        <div style="margin-top: 25px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;" class="no-print">
          <button class="btn-action" onclick="window.print()">🖨️ Imprimir Diploma</button>
          <button class="btn-action" style="background: var(--secondary);" onclick="App.showDashboard()">🏠 Volver al Menú Principal</button>
        </div>
      </div>
    `;
  }
};
