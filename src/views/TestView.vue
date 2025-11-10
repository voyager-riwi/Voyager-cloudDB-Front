<template>
  <div class="magical-actions-section">
    <!-- Sección de hechizos (botones) -->
    <section class="spells-section">
      <h2 class="osaka-subtitle magic-float">Magical Actions</h2>
      <div class="spells-grid">
        <button class="wand-button house-gryffindor" @click="castSpell('Expecto Patronum')">
          <span class="material-symbols-outlined">auto_awesome</span>
          <span>Expecto Patronum</span>
        </button>

        <button class="wand-button house-slytherin" @click="castSpell('Lumos')">
          <span class="material-symbols-outlined">light_mode</span>
          <span>Lumos</span>
        </button>

        <button class="wand-button house-ravenclaw" @click="castSpell('Accio')">
          <span class="material-symbols-outlined">download</span>
          <span>Accio Data</span>
        </button>

        <button class="wand-button house-hufflepuff" @click="castSpell('Protego')">
          <span class="material-symbols-outlined">shield</span>
          <span>Protego</span>
        </button>

        <button class="wand-button house-dark" @click="castSpell('Avada Kedavra')">
          <span class="material-symbols-outlined">flash_off</span>
          <span>Avada Kedavra</span>
        </button>

        <button class="wand-button house-mystery" @click="castSpell('Wingardium Leviosa')">
          <span class="material-symbols-outlined">flight</span>
          <span>Wingardium Leviosa</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
// Métodos mágicos
const castSpell = (spellName) => {
  console.log(`✨ Casting spell: ${spellName}`)

  // Aquí puedes agregar la lógica específica para cada hechizo
  switch (spellName) {
    case 'Expecto Patronum':
      // Lógica para protección
      break
    case 'Lumos':
      // Lógica para iluminar
      break
    case 'Accio':
      // Lógica para buscar datos
      break
    case 'Protego':
      // Lógica para protección
      break
    case 'Avada Kedavra':
      // Lógica para eliminar
      break
    case 'Wingardium Leviosa':
      // Lógica para levantar elementos
      break
  }
}
</script>

<style scoped>
.magical-actions-section {
  padding: 2rem;
  background: radial-gradient(circle at top, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.8));
  border-radius: 15px;
  border: 2px solid #d3a625;
  margin: 2rem 0;
}

.spells-section {
  text-align: center;
}

.spells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.wand-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-family: 'HarryP', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 60px;
}

.wand-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.wand-button:hover::before {
  left: 100%;
}

.wand-button:hover {
  transform: translateY(-3px);
  box-shadow:
    0 8px 25px rgba(255, 215, 0, 0.3),
    0 0 15px rgba(255, 215, 0, 0.5);
}

/* House-specific button colors */
.house-gryffindor {
  background: linear-gradient(135deg, #740001, #ae0001);
  color: #d3a625;
  border: 2px solid #d3a625;
}

.house-slytherin {
  background: linear-gradient(135deg, #1a472a, #2a623d);
  color: #aaaaaa;
  border: 2px solid #2a623d;
}

.house-ravenclaw {
  background: linear-gradient(135deg, #0e1a40, #222f5b);
  color: #946b2d;
  border: 2px solid #946b2d;
}

.house-hufflepuff {
  background: linear-gradient(135deg, #ecb939, #f0c75e);
  color: #372e29;
  border: 2px solid #372e29;
}

.house-dark {
  background: linear-gradient(135deg, #2c2c2c, #000000);
  color: #b30000;
  border: 2px solid #b30000;
}

.house-mystery {
  background: linear-gradient(135deg, #4b0082, #8a2be2);
  color: #ffffff;
  border: 2px solid #9370db;
}

/* Efectos de texto */
.osaka-subtitle {
  font-family: 'Osaka', sans-serif;
  font-size: 1.8rem;
  color: #ffd700;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.magic-float {
  animation: float 4s ease-in-out infinite;
}

.material-symbols-outlined {
  font-size: 1.5rem;
}

/* Animaciones */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .spells-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.8rem;
  }

  .wand-button {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    min-height: 50px;
  }

  .osaka-subtitle {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .magical-actions-section {
    padding: 1rem;
    margin: 1rem 0;
  }

  .spells-grid {
    grid-template-columns: 1fr;
  }

  .wand-button {
    flex-direction: column;
    gap: 0.3rem;
    min-height: 70px;
  }
}
</style>
