// Landing Page JavaScript - Quiz Espacial

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animação de contagem para estatísticas
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = counter.textContent;
      if (target === "∞") return; // Não animar infinito

      const targetNumber = parseInt(target.replace("+", ""));
      let current = 0;
      const increment = targetNumber / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent =
            Math.floor(current) + (target.includes("+") ? "+" : "");
        }
      }, 30);
    });
  }

  // Intersection Observer para animações quando elementos entram na viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Animar contadores quando a seção hero está visível
        if (entry.target.classList.contains("hero-stats")) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(
    ".week-card, .feature, .timeline-item, .demo-question, .quiz-stats"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Observar estatísticas do hero
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) observer.observe(heroStats);

  // Parallax effect para planetas
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const planets = document.querySelectorAll(".planet");

    planets.forEach((planet, index) => {
      const speed = 0.5 + index * 0.2;
      planet.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Adicionar efeito de digitação ao título principal
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Efeito hover nas cartas da semana espacial
  const weekCards = document.querySelectorAll(".week-card");
  weekCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0, 255, 255, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    });
  });

  // Easter egg: clique no sol do sistema solar
  const sun = document.querySelector(".sun");
  if (sun) {
    sun.addEventListener("click", function () {
      this.style.animation = "none";
      this.offsetHeight; // Trigger reflow
      this.style.animation = "pulse 0.5s ease-in-out 3";

      // Mostrar mensagem especial
      const message = document.createElement("div");
      message.textContent = "🌟 Você descobriu o segredo do Sol! 🌟";
      message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--neon-green), var(--neon-cyan));
                color: var(--space-dark);
                padding: 20px 30px;
                border-radius: 50px;
                font-weight: 600;
                z-index: 10000;
                box-shadow: 0 0 30px rgba(6, 255, 165, 0.5);
                animation: fadeInOut 3s ease-in-out;
            `;

      document.body.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);
    });
  }

  // Adicionar animação de entrada aos elementos
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            20%, 80% { opacity: 1; }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .week-card, .feature, .timeline-item, .demo-question, .quiz-stats {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .week-card.animate-in, .feature.animate-in, .timeline-item.animate-in, 
        .demo-question.animate-in, .quiz-stats.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);

  // Criar partículas de estrelas dinâmicas
  function createStars() {
    const starsContainer = document.querySelector(".stars");
    if (!starsContainer) return;

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "dynamic-star";
      star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${
                  [
                    "var(--neon-cyan)",
                    "var(--neon-purple)",
                    "var(--neon-pink)",
                    "var(--neon-green)",
                  ][Math.floor(Math.random() * 4)]
                };
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: dynamicTwinkle ${
                  Math.random() * 3 + 2
                }s ease-in-out infinite alternate;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
            `;
      starsContainer.appendChild(star);
    }
  }

  // Adicionar animação para estrelas dinâmicas
  const dynamicStarStyle = document.createElement("style");
  dynamicStarStyle.textContent = `
        @keyframes dynamicTwinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1.2); }
        }
    `;
  document.head.appendChild(dynamicStarStyle);

  createStars();

  // Console Easter Egg
  console.log(`
    🚀 QUIZ ESPACIAL - SEMANA DO ESPAÇO 2025 🌌
    
    Bem-vindo ao código do Quiz Espacial!
    
    Easter Eggs descobertos:
    🌟 Clique no Sol do sistema solar
    🎮 Digite 'konami' no console para um segredo especial
    
    Desenvolvido com 💙 para inspirar exploradores espaciais!
    `);

  // Konami Code Easter Egg
  let konamiCode = "";
  const konamiSequence = "konami";

  document.addEventListener("keydown", function (e) {
    konamiCode += e.key.toLowerCase();
    if (konamiCode.length > konamiSequence.length) {
      konamiCode = konamiCode.slice(-konamiSequence.length);
    }

    if (konamiCode === konamiSequence) {
      // Ativar modo rainbow
      document.body.style.animation = "rainbow 2s ease-in-out infinite";

      const rainbowStyle = document.createElement("style");
      rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
      document.head.appendChild(rainbowStyle);

      setTimeout(() => {
        document.body.style.animation = "";
        rainbowStyle.remove();
      }, 10000);

      console.log("🌈 MODO RAINBOW ATIVADO! 🌈");
    }
  });
});

// Função para verificar se o usuário está pronto para o quiz
function checkQuizReadiness() {
  const isReady = confirm(
    "🚀 Você está pronto para explorar o universo? Esta será uma jornada incrível pelos mistérios do espaço!"
  );

  if (isReady) {
    window.location.href = "./src/pages/login.html";
  } else {
    alert(
      "📚 Sem problemas! Explore mais a página para se preparar melhor para a aventura espacial!"
    );
  }
}

// Adicionar verificação aos botões de CTA
document.addEventListener("DOMContentLoaded", function () {
  const ctaButtons = document.querySelectorAll('a[href*="login.html"]');
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      checkQuizReadiness();
    });
  });
});
