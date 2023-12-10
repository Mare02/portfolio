<template>
  <div class="scroll-indicator"></div>
</template>

<style scoped>
.scroll-indicator {
	width: 30px;
	height: 40px;
	border: 2px solid gray;
	border-radius: 60px;
  position: absolute;
  overflow: hidden;
}
.scroll-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: gray;
  border-radius: 50%;
  opacity: 1;
  animation: wheel 2s infinite;
  -webkit-animation: wheel 2s infinite;
}

@media (max-width: 768px) {
  .scroll-indicator {
    border: none;
    box-shadow: none;
    overflow: visible;
  }
  .scroll-indicator::before {
    animation-direction: reverse;
    background: white;
    border: 2px solid gray;
    width: 30px;
    height: 30px;
    top: 0px;
  }
}

@keyframes wheel {
	to {
		opacity: 0;
		top: 40px;
	}
}

@-webkit-keyframes wheel {
	to {
		opacity: 0;
		top: 40px;
	}
}
</style>