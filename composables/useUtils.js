import { useI18n } from 'vue-i18n';
import { useWindowScroll } from '@vueuse/core';

export function useUtils() {
  const { locale } = useI18n();
  const { y } = useWindowScroll();

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
    return y.value > value;
  };

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  return {
    addLineBreaks,
    replaceTextBetweenEscapeCharacters,
    getFormattedDate,
    isScrolled,
    isValidPhoneNumber,
  };
}
