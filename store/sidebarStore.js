import { reactive } from 'vue';

const state = reactive({
  showSidebar: false,
});

export const sidebarStore = {
  toggleSidebar() {
    state.showSidebar = !state.showSidebar;
    state.showSidebar
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  },
  hideSidebar() {
    state.showSidebar = false;
    document.body.classList.remove('no-scroll');
  },
  state,
};
