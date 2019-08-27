<template>
  <div class="loading-bro">
    <svg
      id="load"
      x="0px"
      y="0px"
      viewBox="0 0 150 150"
    >
      <circle
        id="loading-inner"
        cx="75"
        cy="75"
        r="60"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'loading',
};
</script>
<style scoped>
.loading-bro {
  margin: 20px auto;
  width: 80px;
}

#load {
  width: 80px;
  animation: loading 3s linear infinite;
}
#load #loading-inner {
  stroke-dashoffset: 0;
  stroke-dasharray: 300;
  stroke-width: 10;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  animation: loading-circle 2s linear infinite;
  stroke: #fc687d;
  fill: transparent;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-circle {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -600;
  }
}
</style>


