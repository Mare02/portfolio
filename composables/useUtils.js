import { useI18n } from 'vue-i18n';
import { useWindowScroll } from '@vueuse/core';

export function useUtils() {
  const { locale } = useI18n();

  function addLineBreaks(text) {
    return text.replace(/\n/g, '<br>');
  }

  function replaceTextBetweenEscapeCharacters(text, element, className) {
    const regex = /\\([^\\]*)\\/g;
    return text.replace(regex, `<${element} class="${className}">$1</${element}>`);
  }

  function getFormattedDate(date) {
    if (!date) {
      return;
    }
    return new Date(date).toLocaleDateString(
      locale.value === 'sr' ? 'sr-Latn-RS' : 'en-US',
      { year: "numeric", month: "short" }
    );
  }

  function isScrolled(value = 80) {
    const { y } = useWindowScroll();
    return y.value > value;
  };

  const phoneNumberRegex = /^\+?\d{1,3}\d{3,14}$/;

  return {
    addLineBreaks,
    replaceTextBetweenEscapeCharacters,
    getFormattedDate,
    isScrolled,
    phoneNumberRegex,
  };
}
