<template>
  <footer class="bg-gray-200 dark:bg-slate-800 border-t border-gray-500 dark:text-white py-8 theme-transition">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold">Marko Obradović</h3>
          <p class="text-sm mt-1">Web Developer</p>
        </div>

        <Socials class="dark:dark-icons"/>

        <div class="flex items-center gap-4 w-36 justify-center md:justify-end">
          <nuxt-link
            class="underline text-center md:text-left"
            :to="localePath('/')"
          >
            <span>{{ $t('Home') }}</span>
          </nuxt-link>
          <div>•</div>
          <nuxt-link
            class="underline text-center md:text-left"
            :to="localePath('/contact')"
          >
            <span>{{ $t('Contact') }}</span>
          </nuxt-link>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-6 pt-6 text-center">
        <p class="text-gray-600 dark:text-gray-300 text-sm theme-transition">
          © {{ new Date().getFullYear() }} Marko Obradović. {{ $t('All right reserved') }}.
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import Socials from '@/components/MainElements/Socials.vue';
import Button from '@/components/UI/Button.vue';

const route = useRoute();
const localePath = useLocalePath();
</script>
