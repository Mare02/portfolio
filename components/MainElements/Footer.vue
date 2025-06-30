<template>
  <footer class="bg-gradient-to-r from-blue-900 to-gray-800 text-white py-8 mt-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold text-white">Marko Obradović</h3>
          <p class="text-gray-400 text-sm mt-1">Web Developer</p>
        </div>

        <!-- <div class="flex items-center space-x-6">
          <a
            href="https://github.com/Mare02"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center"
            aria-label="Visit my GitHub profile"
          >
            <img
              loading="lazy"
              src="~/assets/images/socials/github-mark.png"
              alt="GitHub"
              class="w-full h-full object-contain filter brightness-0 invert"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/marko-obradovi%C4%87-18b252257/"
            target="_blank"
            rel="noopener noreferrer"
            class="w-8 h-8 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center"
            aria-label="Visit my LinkedIn profile"
          >
            <img
              loading="lazy"
              src="~/assets/images/socials/In-Blue-48.png"
              alt="LinkedIn"
              class="w-full h-full object-contain"
            />
          </a>
        </div> -->
        <Socials class="dark-icons"/>
      </div>

      <div class="border-t border-gray-700 mt-6 pt-6 text-center">
        <p class="text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Marko Obradović. {{ $t('All right reserved') }}.
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import Socials from '@/components/MainElements/Socials.vue';
</script>
