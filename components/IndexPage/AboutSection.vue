<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="flex items-center gap-10 md:gap-20 mb-10 md:mb-36">
      <h2 class="text-4xl md:text-5xl font-semibold min-w-max text-gray-900">About me</h2>
      <div class="w-full h-1 bg-gray-200"></div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-4 max-md:flex justify-center mb-10">
        <div class="w-36 md:w-80 max-w-fit rounded-2xl overflow-hidden shadow-lg">
          <img src="~/assets/images/profile.jpeg" alt="">
        </div>
      </div>
      <div class="col-span-12 md:col-span-7 md:col-start-6">
        <p class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 lg:leading-7">
          I'm a <span class="gradient-text">passionate</span> and aspiring developer that highly enjoys turning lines of code into meaningful <span class="gradient-text">solutions</span>.
        </p>
        <hr class="mt-3">
        <p class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 mt-3 lg:leading-7">
          As a tech enthusiast, I'm constantly <span class="gradient-text">exploring</span> the ever-evolving world of web development and software engineering and I am always eager to <span class="gradient-text">learn</span> and adapt.
        </p>
        <hr class="mt-3">
        <p class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 mt-3 lg:leading-7">
          My journey into the world of coding began with a <span class="gradient-text">curiosity</span> that quickly transformed into a full-blown <span class="gradient-text">passion</span>.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(
    to right,
    rgb(31 41 55) 20%,
    #7953cd 30%,
    #0190cd 70%,
    rgb(31 41 55) 80%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 500% auto;
  animation: textShine 4s ease-in-out infinite alternate;
}
@keyframes textShine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>