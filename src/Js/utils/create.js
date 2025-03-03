import { createNote } from '../Api/apiHandler.js';

export function handleCreateNote() {
  setTimeout(() => {
    const form = document.querySelector('form');
    const titleInput = document.querySelector('#judul');
    const bodyInput = document.querySelector('#isi');
    const customButton = document.querySelector('#submit');
    const loadingIndicator = document.querySelector('#loading');

    if (
      !form ||
      !titleInput ||
      !bodyInput ||
      !customButton ||
      !loadingIndicator
    ) {
      return;
    }

    let submitButton =
      customButton.shadowRoot?.querySelector('button') || customButton;

    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title.length < 6 || body.length < 20) {
        alert('Judul minimal 6 karakter dan isi minimal 20 karakter.');
        return;
      }

      loadingIndicator.style.display = 'block';

      try {
        await createNote(title, body);

        setTimeout(() => {
          alert('Catatan berhasil dibuat!');
          form.reset();
          loadingIndicator.style.display = 'none';
        }, 1000);
      } catch (error) {
        alert('Gagal membuat catatan. Coba lagi nanti.');
        loadingIndicator.style.display = 'none';
      }
    });
  }, 500);
}
