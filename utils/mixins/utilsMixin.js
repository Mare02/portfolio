export const utilsMixin = {
  methods: {
    // in text where theres no way to insert html (like nuxti18n translations)
    // finds \n in text and replaces it with <br> tag
    addLineBreaks(text) {
      return text.replace(/\n/g, '<br>');
    },
    // finds text between "\\" and inserts it in element and class
    replaceTextBetweenEscapeCharacters(text, element, className) {
      const regex = /\\([^\\]*)\\/g;
      const replacedText = text.replace(
        regex,
        `<${element} class="${className}">$1</${element}>`
      );
      return replacedText;
    },
    getFormattedDate(date) {
      if (!date) {
        return;
      }
      return new Date(date).toLocaleDateString(
        this.$i18n.locale === 'sr' ? 'sr-Latn-RS' : 'en-us',
        { year:"numeric", month:"short", day:"numeric"}
      );
    },
  }
};
