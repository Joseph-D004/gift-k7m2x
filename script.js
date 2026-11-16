/**
 * "THE KEEPSAKE" · Interactive Digital Story for Precious (Nerat)
 * Vanilla JavaScript · Lightweight · Cinematic Mobile-First Experience
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. SLIDE DECK ENGINE & CHAPTER NAVIGATION
  // =========================================================
  const slides = document.querySelectorAll('.slide-card');
  const progressSegments = document.querySelectorAll('.progress-bar-segment');
  const chapterIndicator = document.getElementById('chapterIndicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');

  let currentSlide = 0;
  const totalSlides = slides.length;

  const updateDeck = (newIndex) => {
    if (newIndex < 0 || newIndex >= totalSlides) return;

    // Transition slides
    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev-out');
      if (idx === newIndex) {
        slide.classList.add('active');
        // Reset scroll position inside slide
        slide.scrollTop = 0;
      } else if (idx < newIndex) {
        slide.classList.add('prev-out');
      }
    });

    // Update progress bars
    progressSegments.forEach((segment, idx) => {
      segment.classList.remove('completed', 'current');
      if (idx < newIndex) {
        segment.classList.add('completed');
      } else if (idx === newIndex) {
        segment.classList.add('current');
      }
    });

    // Update Chapter indicator text
    if (chapterIndicator) {
      chapterIndicator.textContent = `0${newIndex + 1} / 0${totalSlides}`;
    }

    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = (newIndex === 0);
    if (nextBtn) {
      if (newIndex === totalSlides - 1) {
        nextBtn.innerHTML = `<span>End</span>`;
        nextBtn.disabled = true;
      } else {
        nextBtn.innerHTML = `
          <span>Next</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        `;
        nextBtn.disabled = false;
      }
    }

    currentSlide = newIndex;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateDeck(currentSlide - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateDeck(currentSlide + 1));
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => updateDeck(1));
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => updateDeck(0));
  }

  // Keyboard navigation (desktop convenience)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      updateDeck(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      updateDeck(currentSlide - 1);
    }
  });

  // Touch swipe support (Mobile friendly)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    // Ensure horizontal swipe is dominant and significant
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swipe left -> Next
        updateDeck(currentSlide + 1);
      } else {
        // Swipe right -> Prev
        updateDeck(currentSlide - 1);
      }
    }
  };

  // Initialize first slide
  updateDeck(0);

  // =========================================================
  // 2. POLAROID STACK CYCLE (Chapter 01 - Our Story)
  // =========================================================
  const polaroids = document.querySelectorAll('.polaroid-card');
  const nextPolaroidBtn = document.getElementById('nextPolaroidBtn');
  const polaroidCounter = document.getElementById('polaroidCounter');
  let currentPolaroid = 0;

  const cyclePolaroids = () => {
    currentPolaroid = (currentPolaroid + 1) % polaroids.length;

    polaroids.forEach((card, idx) => {
      card.classList.remove('current', 'next', 'behind');
      if (idx === currentPolaroid) {
        card.classList.add('current');
      } else if (idx === (currentPolaroid + 1) % polaroids.length) {
        card.classList.add('next');
      } else {
        card.classList.add('behind');
      }
    });

    if (polaroidCounter) {
      polaroidCounter.textContent = `Photo ${currentPolaroid + 1} of ${polaroids.length}`;
    }
  };

  if (nextPolaroidBtn) {
    nextPolaroidBtn.addEventListener('click', cyclePolaroids);
  }

  // Tapping polaroid directly also cycles
  const stackContainer = document.getElementById('polaroidStack');
  if (stackContainer) {
    stackContainer.addEventListener('click', cyclePolaroids);
  }

  // =========================================================
  // 3. PHOTO LIGHTBOX MODAL
  // =========================================================
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  const openPhoto = (src, alt) => {
    if (!lightbox || !lightboxImg || !src) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Memory Photo';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closePhoto = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  const filmFrames = document.querySelectorAll('.film-frame');
  filmFrames.forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      if (img && img.dataset.loaded !== 'false') {
        openPhoto(img.src, img.alt);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closePhoto);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closePhoto);

  // =========================================================
  // 4. CELEBRATION WISH & SPARKLE BURST (Chapter 05)
  // =========================================================
  const celebrateBtn = document.getElementById('celebrateBtn');
  const wishToast = document.getElementById('wishToast');

  if (celebrateBtn && wishToast) {
    celebrateBtn.addEventListener('click', () => {
      wishToast.style.display = 'block';
      celebrateBtn.style.display = 'none';
      createCelebrationBurst();
    });
  }

  // =========================================================
  // 5. AMBIENT CANVAS & GOLDEN STARDUST
  // =========================================================
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.6;
      this.speedY = -(Math.random() * 0.4 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.4 ? '212, 175, 103' : '216, 155, 149'; // gold or rose
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.5)`;
      ctx.fill();
    }
  }

  // Populate floating dust
  for (let i = 0; i < 28; i++) {
    particles.push(new Particle());
  }

  // Celebration burst when tapping the wish
  const createCelebrationBurst = () => {
    for (let i = 0; i < 45; i++) {
      const p = new Particle();
      p.x = width / 2;
      p.y = height / 2 + 80;
      p.speedX = (Math.random() - 0.5) * 5;
      p.speedY = (Math.random() - 0.7) * 6;
      p.size = Math.random() * 3 + 1.2;
      p.opacity = 1;
      particles.push(p);
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  };
  animate();

  // =========================================================
  // 6. AMBIENT AUDIO SYNTHESIZER (Pure Web Audio API)
  // Generates a soft, warm, meditative ambient pad without any files
  // =========================================================
  const soundToggle = document.getElementById('soundToggle');
  const soundLabel = document.getElementById('soundLabel');
  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let oscillators = [];

  const startAmbientSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3); // Soft, comfortable volume

    // Warm, calming F-major chord frequencies (F3, A3, C4, E4)
    const notes = [174.61, 220.0, 261.63, 329.63];

    notes.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle'; // Warm, soft sound
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start();
      oscillators.push(osc);
    });

    masterGain.connect(audioCtx.destination);
    isPlaying = true;
    soundToggle.classList.add('playing');
    if (soundLabel) soundLabel.textContent = 'Mute';
  };

  const stopAmbientSound = () => {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
      setTimeout(() => {
        oscillators.forEach(osc => osc.stop());
        oscillators = [];
        isPlaying = false;
      }, 1500);
    }
    soundToggle.classList.remove('playing');
    if (soundLabel) soundLabel.textContent = 'Sound';
  };

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      if (!isPlaying) {
        startAmbientSound();
      } else {
        stopAmbientSound();
      }
    });
  }

  // =========================================================
  // 7. MISSING IMAGE FALLBACK HANDLING
  // =========================================================
  const allImages = document.querySelectorAll('img');

  allImages.forEach(img => {
    img.addEventListener('error', function () {
      this.dataset.loaded = 'false';
      const filename = this.getAttribute('src') || 'photo';
      const parent = this.parentElement;

      // Opening screen hero photo fallback
      if (this.id === 'openingPhoto') {
        const bgWrapper = document.querySelector('.slide-bg-wrapper');
        if (bgWrapper) {
          bgWrapper.style.background = 'radial-gradient(circle at 50% 30%, #302420 0%, #120F0E 100%)';
        }
        this.style.display = 'none';
        return;
      }

      this.style.display = 'none';
      const fallbackBox = document.createElement('div');
      fallbackBox.className = 'img-fallback-box';
      fallbackBox.innerHTML = `
        <span class="img-fallback-icon">📷</span>
        <span class="img-fallback-name">${filename}</span>
      `;
      parent.appendChild(fallbackBox);
    });

    img.addEventListener('load', function () {
      this.dataset.loaded = 'true';
    });
  });

});
