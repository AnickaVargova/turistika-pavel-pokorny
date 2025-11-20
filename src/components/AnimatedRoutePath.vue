<template>
  <svg class="route-path" viewBox="0 0 400 300" aria-hidden="true">
    <!-- Animated dashed path -->
    <path
      :d="pathData"
      stroke="white"
      stroke-width="2"
      fill="none"
      stroke-dasharray="5,5"
      class="animated-path"
    />

    <!-- Start pin -->
    <g class="pin start-pin">
      <circle :cx="startPoint.x" :cy="startPoint.y" r="12" fill="#ef4444" />
      <path
        :d="`M ${startPoint.x} ${startPoint.y - 20} L ${startPoint.x} ${startPoint.y - 5}`"
        stroke="white"
        stroke-width="2"
      />
    </g>

    <!-- End pin -->
    <g class="pin end-pin">
      <circle :cx="endPoint.x" :cy="endPoint.y" r="12" fill="#ef4444" />
      <path
        :d="`M ${endPoint.x} ${endPoint.y - 20} L ${endPoint.x} ${endPoint.y - 5}`"
        stroke="white"
        stroke-width="2"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  startPoint: {
    type: Object,
    default: () => ({ x: 200, y: 50 }),
  },
  endPoint: {
    type: Object,
    default: () => ({ x: 240, y: 250 }),
  },
});

const pathData = computed(() => {
  const { x: x1, y: y1 } = props.startPoint;
  const { x: x2, y: y2 } = props.endPoint;

  // Create curved path with control points
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return `M ${x1},${y1} Q ${midX + 50},${midY} ${midX},${midY + 50} Q ${
    midX - 30
  },${midY + 100} ${x2},${y2}`;
});
</script>

<style scoped>
.route-path {
  position: absolute;
  top: 50%;
  right: 15%;
  width: 200px;
  height: 300px;
  transform: translateY(-50%);
  opacity: 0.8;
  pointer-events: none;
}

.animated-path {
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}

.pin {
  animation: bounce 2s ease-in-out infinite;
}

.end-pin {
  animation-delay: 1s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Hide on smaller screens */
@media (max-width: 1024px) {
  .route-path {
    display: none;
  }
}
</style>

