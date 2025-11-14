class PixelBirthday {
  constructor() {
    this.messages = [
      "> SYSTEM: Initializing Birthday Protocol...",
      "> SYSTEM: Loading User Data...",
      "> SYSTEM: Accessing Memory Banks...",
      "> SYSTEM: Security Check: LOVE.EXE required",
      "> ERROR: LOVE.EXE not found",
      "> SYSTEM: Type 'love' to authenticate and continue...",
    ];
    
    this.birthdayMessages = [
      "> SYSTEM: Authentication Successful! 🎉",
      "> SYSTEM: Happy Birthday Sahana! 🎂",
      "> USER: Thank you for being with me through everything!",
      "> USER: I cannot express the amount of respect and love I have for you...",
      "> USER: Thank you for bearing with me and my bad jokes! 😄",
      "> USER: Thank you for understanding me and my stupidity!",
      "> USER: Thank you for getting to know who I am!",
      "> USER: Thank you for just existing in my life! 💖",
      "> USER: I don't know where I would be without my fat aunty...",
      "> USER: She matters to me the MOST! 🥰",
      "> USER: I want to be the best person for her always!",
      "> USER: Her birthday is actually my favorite day! 🎂",
      "> USER: From random people to most important - best journey! 🚀",
      "> USER: All our moments made us what we are today! 💕",
      "> USER: You're my Harvey when I'm Mike! 👔⚡",
      "> USER: I love you the most I ever did anyone! ✨",
      "> USER: We've grown so much, haven't we Motu? 🐻",
      "> USER: Keep climbing that corporate ladder! 📈",
      "> USER: Wishing you peace, fun, and happiness! 🌈",
      "> SYSTEM: PROCESSING... COMPLETE!",
      "> FINAL: Happiest birthday Hasi! I LOVE YOU! 💝"
    ];
    
    this.badJokes = [
      "> JOKE: Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "> JOKE: Why did the developer go broke? He used up all his cache! 💸",
      "> JOKE: What's a programmer's favorite hangout place? The Foo Bar! 🍻",
      "> JOKE: Why do Java developers wear glasses? Because they can't C#! 👓",
      "> JOKE: How many programmers does it take to change a light bulb? None, it's a hardware problem! 💡"
    ];
    
    this.memories = [
      "> MEMORY: Loading gaming sessions... 🎮 COMPLETE!",
      "> MEMORY: Accessing movie nights... 🎬 COMPLETE!",
      "> MEMORY: Playing shared songs... 🎵 COMPLETE!",
      "> MEMORY: Binging Suits episodes... 👔 COMPLETE!",
      "> MEMORY: Recalling inside jokes... 😂 COMPLETE!"
    ];
    
    this.authenticated = false;
    this.init();
  }

  init() {
    this.setupMusic();
    this.setupTerminal();
    this.setupGames();
    this.setupCursor();
    this.createFloatingCode();
    this.startMatrixEffect();
  }

  setupMusic() {
    this.audio = document.getElementById('bgMusic');
    this.musicBtn = document.getElementById('musicToggle');
    this.isPlaying = false;

    this.musicBtn.addEventListener('click', () => {
      if (this.isPlaying) {
        this.audio.pause();
        this.musicBtn.textContent = '🔊 ENABLE 8BIT MUSIC';
      } else {
        this.audio.play().catch(e => {
          this.addMessage("> SYSTEM: Click anywhere to enable audio!");
        });
        this.musicBtn.textContent = '🔇 DISABLE MUSIC';
      }
      this.isPlaying = !this.isPlaying;
    });

    document.addEventListener('click', this.enableAudio.bind(this), { once: true });
  }

  enableAudio() {
    if (this.audio.context) {
      this.audio.context.resume();
    }
  }

  setupTerminal() {
    this.output = document.getElementById('messageOutput');
    this.input = document.getElementById('commandInput');
    
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.processCommand(this.input.value);
        this.input.value = '';
      }
    });

    // Start with error messages only
    setTimeout(() => this.startInitialSequence(), 1000);
  }

  startInitialSequence() {
    this.messages.forEach((message, index) => {
      setTimeout(() => {
        this.addMessage(message);
      }, index * 800);
    });
  }

  startBirthdaySequence() {
    this.birthdayMessages.forEach((message, index) => {
      setTimeout(() => {
        this.addMessage(message);
        if (index === 0) {
          this.createConfetti();
        }
        if (index === this.birthdayMessages.length - 1) {
          this.createHeartExplosion();
        }
      }, index * 1500); // SLOWER: 1500ms between messages instead of 800ms
    });
  }

  addMessage(message) {
    const messageLine = document.createElement('div');
    messageLine.className = 'message-line';
    messageLine.textContent = message;
    this.output.appendChild(messageLine);
    this.output.scrollTop = this.output.scrollHeight;
  }

  processCommand(command) {
    const cmd = command.toLowerCase().trim();
    this.addMessage(`> USER: ${command}`);
    
    if (!this.authenticated) {
      if (cmd === 'love') {
        this.authenticated = true;
        this.addMessage("> SYSTEM: Authenticating...");
        setTimeout(() => {
          this.addMessage("> SYSTEM: LOVE.EXE verified! Access granted! 🎉");
          setTimeout(() => {
            this.startBirthdaySequence();
            this.unlockGames();
          }, 1000); // Additional delay before starting messages
        }, 1500);
      } else {
        this.addMessage("> ERROR: Authentication failed. LOVE.EXE required.");
        this.addMessage("> SYSTEM: Type 'love' to unlock birthday message.");
        this.showErrorEffect();
      }
      return;
    }
    
    // Commands after authentication
    switch(cmd) {
      case 'love':
        this.addMessage("> SYSTEM: Love already authenticated! 💖");
        this.createHeartExplosion();
        break;
      case 'help':
        this.addMessage("> HELP: Available commands: love, joke, memory, dance, clear");
        break;
      case 'clear':
        this.output.innerHTML = '';
        break;
      case 'joke':
        this.tellJoke();
        break;
      case 'memory':
        this.showMemory();
        break;
      case 'dance':
        this.startDanceParty();
        break;
      default:
        this.addMessage("> SYSTEM: Command not recognized. Type 'help' for options.");
    }
  }

  showErrorEffect() {
    const error = document.createElement('div');
    error.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 0, 0, 0.1);
      pointer-events: none;
      z-index: 1000;
      animation: errorFlash 0.5s ease-out;
    `;
    document.body.appendChild(error);
    setTimeout(() => error.remove(), 500);
  }

  unlockGames() {
    document.querySelectorAll('.pixel-game').forEach(game => {
      game.style.opacity = '1';
      game.style.cursor = 'pointer';
    });
    this.addMessage("> SYSTEM: Mini-games unlocked! Click to play! 🎮");
  }

  setupGames() {
    // Initially disable games
    document.querySelectorAll('.pixel-game').forEach(game => {
      game.style.opacity = '0.5';
      game.style.cursor = 'not-allowed';
    });

    document.querySelectorAll('.pixel-game').forEach(game => {
      game.addEventListener('click', () => {
        if (!this.authenticated) {
          this.addMessage("> ERROR: Authentication required. Type 'love' first.");
          this.showErrorEffect();
          return;
        }
        const gameType = game.dataset.game;
        this.playGame(gameType);
      });
    });

    document.querySelectorAll('.pixel-art').forEach(art => {
      art.addEventListener('click', () => {
        if (!this.authenticated) {
          this.addMessage("> ERROR: Authentication required. Type 'love' first.");
          this.showErrorEffect();
          return;
        }
        const memory = art.dataset.memory;
        this.showPixelMemory(memory);
      });
    });
  }

  playGame(gameType) {
    switch(gameType) {
      case 'joke':
        this.tellJoke();
        break;
      case 'memory':
        this.showMemory();
        break;
      case 'love':
        this.addMessage("> LOVE_CALC: Calculating love level...");
        setTimeout(() => {
          this.addMessage("> RESULT: INFINITY! 💖 You are loved beyond measure!");
          this.createHeartExplosion();
        }, 2000); // Slower response for love calculation
        break;
      case 'dance':
        this.startDanceParty();
        break;
    }
  }

  tellJoke() {
    const joke = this.badJokes[Math.floor(Math.random() * this.badJokes.length)];
    this.addMessage(joke);
    this.createConfetti();
  }

  showMemory() {
    const memory = this.memories[Math.floor(Math.random() * this.memories.length)];
    this.addMessage(memory);
    this.createPixelEffect();
  }

  showPixelMemory(memory) {
    const messages = {
      gaming: "> GAMING: Remember our epic gaming sessions? 🎮",
      movies: "> MOVIES: All those movie nights were amazing! 🍿",
      music: "> MUSIC: Our shared playlist is legendary! 🎵",
      suits: "> SUITS: Harvey and Mike vibes forever! 👔"
    };
    this.addMessage(messages[memory]);
  }

  createHeartExplosion() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          font-size: 20px;
          pointer-events: none;
          z-index: 1000;
          animation: pixelExplosion 1.5s ease-out forwards;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
      }, i * 100);
    }
  }

  createConfetti() {
    const emojis = ['🎉', '✨', '🎊', '🌟'];
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * 100}%;
        font-size: 15px;
        animation: pixelFall ${1 + Math.random() * 2}s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  createPixelEffect() {
    const pixels = document.createElement('div');
    pixels.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.1) 2px,
        rgba(0, 255, 255, 0.1) 4px
      );
      pointer-events: none;
      z-index: 1000;
      animation: pixelFade 1s ease-out;
    `;
    document.body.appendChild(pixels);
    setTimeout(() => pixels.remove(), 1000);
  }

  startDanceParty() {
    this.addMessage("> DANCE_PARTY: Initializing pixel dance! 💃");
    const elements = document.querySelectorAll('.pixel-game, .pixel-art');
    elements.forEach(el => {
      el.style.animation = 'pixelBounce 0.5s ease-in-out infinite';
    });
    setTimeout(() => {
      elements.forEach(el => {
        el.style.animation = '';
      });
    }, 3000);
  }

  setupCursor() {
    document.addEventListener('mousemove', (e) => {
      const cursor = document.querySelector('.custom-cursor');
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }

  createFloatingCode() {
    const codeContainer = document.querySelector('.floating-code');
    const codeSnippets = ['function love() {}', 'const happiness = true;', 'while(alive) { love(); }'];
    
    codeSnippets.forEach((snippet, index) => {
      setTimeout(() => {
        const code = document.createElement('div');
        code.textContent = snippet;
        code.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          color: #003300;
          font-size: 12px;
          animation: floatCode ${15 + Math.random() * 15}s linear infinite;
          pointer-events: none;
        `;
        codeContainer.appendChild(code);
      }, index * 2000);
    });
  }

  startMatrixEffect() {
    const chars = '01{}[]()=>;';
    const container = document.querySelector('.matrix-rain');
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const stream = document.createElement('div');
        stream.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          color: #00ff00;
          font-size: 14px;
          animation: matrixRain ${5 + Math.random() * 10}s linear infinite;
          pointer-events: none;
          opacity: ${0.1 + Math.random() * 0.3};
        `;
        
        let content = '';
        for (let j = 0; j < 20; j++) {
          content += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        stream.textContent = content;
        
        container.appendChild(stream);
      }, i * 500);
    }
  }
}

// Add custom animations including error flash
const style = document.createElement('style');
style.textContent = `
  @keyframes pixelExplosion {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes pixelFall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes pixelFade {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes matrixRain {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  
  @keyframes errorFlash {
    0% { background: rgba(255, 0, 0, 0.3); }
    100% { background: rgba(255, 0, 0, 0); }
  }
`;

document.head.appendChild(style);

// Initialize the pixel birthday experience
document.addEventListener('DOMContentLoaded', () => {
  new PixelBirthday();
});
