import { reactive } from 'vue';

const state = reactive({
  showSidebar: false,
});

export const sidebarStore = {
  toggleSidebar() {
    state.showSidebar = !state.showSidebar;
    document.body.style.overflowY = state.showSidebar ? 'hidden' : 'auto';
  },
  hideSidebar() {
    state.showSidebar = false;
    document.body.style.overflowY = 'auto';
  },
  state,
};
