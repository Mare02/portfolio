import { reactive } from 'vue';

const state = reactive({
  snackbarMessage: '',
  snackbarType: '',
  showSnackbar: false,
  hideSnackbarDelay: 4000,
});

export const snackbarStore = {
  dispatchSnackbar(message, type) {
    state.snackbarMessage = message;
    state.snackbarType = type;
    state.showSnackbar = true;
    setTimeout(() => {
      this.hideMessage();
    }, state.hideSnackbarDelay);
  },
  hideMessage() {
    state.showSnackbar = false;
    state.snackbarMessage = '';
    state.snackbarType = '';
  },
  state,
};
