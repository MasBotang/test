const BASE_URL = 'https://notes-api.dicoding.dev/v2';
import { renderNotes } from './render.js';

export async function handleArsip(event) {
  const card = event.target.closest('.book-list-card');
  const noteId = card.querySelector('.id').innerText;

  const konfirmasi = confirm('Arsipkan catatan ini?');
  if (!konfirmasi) return;

  const loadingIndicator = document.querySelector('#loading');
  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengarsipkan catatan: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(`Gagal mengarsipkan catatan: ${data.message}`);
    }

    setTimeout(async () => {
      await renderNotes();
      loadingIndicator.style.display = 'none'; 
    }, 1000);
  } catch (error) {
    console.error('Error:', error.message);
    loadingIndicator.style.display = 'none'; 
  }
}
