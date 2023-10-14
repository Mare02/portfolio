<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="flex items-center gap-10 md:gap-20 mb-10 md:mb-36">
      <div class="w-full h-1 bg-gray-200"></div>
      <h2 class="text-4xl md:text-5xl font-semibold min-w-max text-gray-900">About me</h2>
      <div class="w-full h-1 bg-gray-200"></div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-4 max-md:flex justify-center mb-10">
        <div class="w-48 md:w-80 max-w-fit rounded-2xl overflow-hidden shadow-lg">
          <img src="~/assets/images/profile.jpeg" alt="">
        </div>
      </div>
      <div class="col-span-12 md:col-span-7 md:col-start-6">
        <p class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 lg:leading-7">
          Welcome to my corner of the internet! I'm a passionate and aspiring developer that highly enjoys turning lines of code into meaningful solutions.
        </p>
        <p class="text-xl lg:text-2xl 2xl:text-3xl font-semibold text-gray-800 mt-5 lg:leading-7">
          My journey into the world of coding began with a curiosity that quickly transformed into a full-blown passion.
        </p>
        <div class="pl-9 mt-10">
          <p class="text-lg xl:text-xl 2xl:text-2xl italic font-semibold relative text-gray-600 quote-text">
            Settle on the type of person you want to be and stick to it, whether alone or in company. - <span class=" not-italic font-bold">Marcus Aurelius</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.quote-text::before {
  content: "\201C";
  font-size: 80px;
  height: 20px;
  line-height: 0.78;
  line-height: 1;
  position: absolute;
  top: -20px;
  left: -50px;
  z-index: 1;
  font-family: sans-serif, serif;
  color: #ccc;
}
</style>