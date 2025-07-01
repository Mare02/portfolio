<template>
  <footer class="bg-gradient-to-r from-blue-900 to-gray-800 dark:from-indigo-900 dark:to-teal-900 text-white py-8 theme-transition">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold text-white">Marko Obradović</h3>
          <p class="text-gray-400 text-sm mt-1">Web Developer</p>
        </div>

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
