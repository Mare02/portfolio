<template>
  <div
    class="fixed w-full top z-50 transition-all duration-300"
    :class="
      isMounted && isScrolled(navChangeScrollDistance)
        ? 'top-0'
        : 'top-0 sm:top-6'
      "
  >
    <div
      class="w-full py-3 shadow-md bg-white dark:bg-slate-800 theme-transition"
      :class="{'2xl:top-10 sm:rounded-full sm:container sm:mx-auto sm:inset-x-0 md:shadow-xl md:shadow-blue-200 dark:md:shadow-cyan-900': isMounted && !isScrolled(navChangeScrollDistance)}"
    >
      <div class="container px-4 md:px-10 mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <nuxt-link
            class="rounded-full overflow-hidden border-2 border-gray-300 flex"
            :to="localePath('/')"
          >
            <img
              class="w-10 h-10 aspect-square object-cover"
              src="@/assets/images/profile.jpeg"
              alt="profile"
              loading="lazy"
            >
          </nuxt-link>
          <nuxt-link :to="localePath('/')" class="leading-5 font-semibold section-pharagraph-small">
            {{ config.full_name }}
          </nuxt-link>
        </div>
        <div class="flex items-center max-md:hidden">
          <nuxt-link
            class="mr-2"
            :to="localePath('/projects')"
          >
            <Button class="hover:underline">
              {{ $t('My projects') }}
            </Button>
          </nuxt-link>
          <nuxt-link
            class="mr-2"
            :to="localePath('/contact')"
          >
            <Button class="hover:underline">
              {{ $t('Contact') }}
            </Button>
          </nuxt-link>
          <LocaleSwitcher />
          <ThemeSwitcher class="ml-2"/>
        </div>
        <div class="md:hidden">
          <Button
            @click="sidebarStore.toggleSidebar"
            :class="{'bg-gray-200 dark:bg-slate-700': showSidebar}"
            icon
          >
            <MdiIcon icon="mdiMenu"/>
          </Button>

          <Sidebar
            :show="showSidebar"
            @click-outside="sidebarStore.hideSidebar"
          >
            <template #sidebar-header>
              <div class="flex items-center gap-2">
                <div class="rounded-full overflow-hidden border-2 border-gray-300 flex">
                  <img
                    class="w-12 h-12 aspect-square object-cover"
                    src="@/assets/images/profile.jpeg"
                    alt="profile"
                    loading="lazy"
                  >
                </div>
                <div class="flex flex-col section-pharagraph-small">
                  <span class="font-semibold">{{ config.full_name }}</span>
                  <span class="text-base">{{ $t('Personal Website') }}</span>
                </div>
              </div>
            </template>

            <template #sidebar-content>
              <LocaleSwitcher dropdown-align="left" show-name/>
              <div class="h-0.5 bg-gray-200 w-full"></div>

              <nuxt-link
                class="mr-2 w-full flex items-center"
                :to="localePath('/')"
              >
                <Button
                  link
                  block
                  class="flex items-center justify-start gap-2 theme-transition"
                  :class="{'bg-blue-100 dark:bg-blue-900': route.fullPath === localePath('/')}"
                >
                  <MdiIcon icon="mdiHomeOutline"/>
                  <span>{{ $t('Home') }}</span>
                </Button>
              </nuxt-link>

              <nuxt-link
                class="mr-2 w-full flex items-center"
                :to="localePath('/contact')"
              >
                <Button
                  link
                  block
                  class="flex items-center justify-start gap-2 theme-transition"
                  :class="{'bg-blue-100 dark:bg-blue-900': route.fullPath === localePath('/contact')}"
                >
                  <MdiIcon icon="mdiEmailArrowRightOutline"/>
                  <span>{{ $t('Contact') }}</span>
                </Button>
              </nuxt-link>

              <nuxt-link
                class="mr-2 w-full flex items-center"
                :to="localePath('/projects')"
              >
                <Button
                  link
                  block
                  class="flex items-center justify-start gap-2 theme-transition"
                  :class="{'bg-blue-100 dark:bg-blue-900': route.fullPath === localePath('/projects')}"
                >
                  <MdiIcon icon="mdiHammer"/>
                  <span>{{ $t('My projects') }}</span>
                </Button>
              </nuxt-link>
              <div class="absolute bottom-5 left-7">
                <ThemeSwitcher/>
              </div>
            </template>
          </Sidebar>
        </div>
      </div>
    </div>

    <Snackbar v-if="showSnackbar"/>
  </div>
</template>

<script setup>
import { snackbarStore } from '~/store/snackbarStore.js';
import { sidebarStore } from '~/store/sidebarStore.js';
const { isScrolled } = useUtils();
const localePath = useLocalePath();
import Snackbar from '@/components/UI/Snackbar.vue';
import Sidebar from '@/components/MainElements/Sidebar.vue';
import Button from '@/components/UI/Button.vue';
import LocaleSwitcher from '@/components/UI/LocaleSwitcher.vue';
import ThemeSwitcher from '@/components/UI/ThemeSwitcher.vue';
import config from '@/data/config.json';

const route = useRoute();

const navChangeScrollDistance = 80;

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

const showSnackbar = computed(() => {
  return snackbarStore.state.showSnackbar;
});

const showSidebar = computed(() => {
  return sidebarStore.state.showSidebar;
});

watch(
  () => route.name,
  () => {
    sidebarStore.hideSidebar();
  }
);
</script>

