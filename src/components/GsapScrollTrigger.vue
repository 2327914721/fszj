<template>
  <div>
    <section class="spacer">Scroll down 👇</section>
    <div v-for="n in 6" :key="n" class="card">Card {{ n }}</div>
    <section class="spacer">Scroll up 👆</section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGsap } from '@/hooks/useGsap';

const { animateBatch, scrollTrigger } = useGsap();

onMounted(() => {
  animateBatch('.card', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    batchVars: { interval: 0.3, batchMax: 3 }
  });

  scrollTrigger('.spacer', {
    scale: 1.2,
    duration: 1,
    trigger: '.spacer',
    scrollTrigger: { scrub: true }
  });
});
</script>

<style scoped>
.spacer {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
.card {
  width: 200px;
  height: 100px;
  margin: 50px auto;
  background: coral;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>