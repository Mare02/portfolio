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

  function createContactEmailTemplate(data) {
    return `
      <div>
        <h1>${data.sender} has contacted you</h1>
        <p>Someone has contacted you via your personal website contact form.</p>
        <ul>
          <li>
            <h3>Message:</h3>
            <p>${data.message}</p>
          </li>
          <hr>
          <li>
            <h3>Sender email:</h3>
            <p>${data.sender}</p>
          </li>
          <hr>
          <li>
            <h3>Sent at:</h3>
            <p>${data.sentAt}</p>
          </li>
        </ul>
      </div>
    `
  }

  return {
    addLineBreaks,
    replaceTextBetweenEscapeCharacters,
    getFormattedDate,
    createContactEmailTemplate,
  };
}
