import { reactive } from 'vue';

const state = reactive({
  showSidebar: false,
});

export const sidebarStore = {
  toggleSidebar() {
    state.showSidebar = !state.showSidebar;
  },
  hideSidebar() {
    state.showSidebar = false;
  },
  state,
};
