import { useI18n } from 'vue-i18n';

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

  return { addLineBreaks, replaceTextBetweenEscapeCharacters, getFormattedDate };
}
