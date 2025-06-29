<template>
  <div
    class="fixed w-full top z-50 transition-all duration-300"
    :class="
        isScrolled(navChangeScrollDistance)
          ? 'top-0'
          : 'top-0 sm:top-6'
      "
  >
    <div
      class="w-full py-3 shadow-md bg-white"
      :class="{'2xl:top-10 sm:rounded-full sm:container sm:mx-auto sm:inset-x-0 md:shadow-xl md:shadow-blue-200': !isScrolled(navChangeScrollDistance)}"
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
            Marko Obradović
          </nuxt-link>
        </div>
        <div class="flex items-center max-md:hidden">
          <nuxt-link
            class="font-semibold mr-2"
            :to="localePath('/contact')"
          >
            <Button link class="hover:underline">
              {{ $t('Contact') }}
            </Button>
          </nuxt-link>
          <LocaleSwitcher />
        </div>
        <div class="md:hidden">
          <Button
            @click="sidebarStore.toggleSidebar"
            :class="{'bg-gray-200': showSidebar}"
            icon
          >
            <MdiIcon icon="mdiMenu" size="1.8rem"/>
          </Button>

          <Sidebar
            :show="showSidebar"
            @click-outside="sidebarStore.hideSidebar"
          >
            <template #sidebar-header>
              <span class=" section-pharagraph font-semibold">Marko Obradović</span>
              <span>{{ $t('Personal Website') }}</span>
            </template>

            <template #sidebar-content>
              <LocaleSwitcher dropdown-align="left" show-name class="pl-1.5"/>
              <div class="h-0.5 bg-gray-200 w-full"></div>

              <nuxt-link
                class="font-semibold mr-2 w-full flex items-center"
                :to="localePath('/')"
              >
                <Button
                  link
                  block
                  class="flex items-center justify-start gap-2"
                  :class="{'bg-blue-100': route.fullPath === localePath('/')}"
                >
                  <MdiIcon icon="mdiHomeOutline" size="1.8rem"/>
                  <span>{{ $t('Home') }}</span>
                </Button>
              </nuxt-link>

              <nuxt-link
                class="font-semibold mr-2 w-full flex items-center"
                :to="localePath('/contact')"
              >
                <Button
                  link
                  block
                  class="flex items-center justify-start gap-2"
                  :class="{'bg-blue-100': route.fullPath === localePath('/contact')}"
                >
                  <MdiIcon icon="mdiEmailArrowRightOutline" size="1.8rem"/>
                  <span>{{ $t('Contact') }}</span>
                </Button>
              </nuxt-link>
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
const route = useRoute();

const navChangeScrollDistance = 80;

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

