<template>
  <div>
    <div ref="box" class="box">Hello GSAP</div>
    <button @click="playAnim">Play</button>
    <button @click="reverseAnim">Reverse</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGsap } from '@/hooks/useGsap';
const box = ref<HTMLElement | null>(null);
const { animate, createTimeline } = useGsap();
let tl: gsap.core.Timeline;
onMounted(() => {
  if (box.value) {
    animate('from', box.value, { opacity: 0, y: -50, duration: 0.8 });
    tl = createTimeline({ paused: true });
    tl.to(box.value, { x: 100, duration: 0.5 })
      .to(box.value, { rotation: 360, duration: 0.5 });
  }
});

const playAnim = () => tl.play();
const reverseAnim = () => tl.reverse();
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background: coral;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>