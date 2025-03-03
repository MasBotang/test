const BASE_URL = 'https://notes-api.dicoding.dev/v2';
import { renderNotes } from './render.js';
import { renderNotesArsip } from './renderArsip.js';

export async function handleDelete(event) {
  const card = event.target.closest('.book-list-card, .book-list-card-arsip');
  const noteId = card.querySelector('.id').innerText;

  const konfirm = confirm('Apakah Anda yakin ingin menghapus catatan ini?');
  if (!konfirm) return;

  const loadingIndicator = document.querySelector('#loading');
  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(
        `Gagal menghapus catatan: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(`Gagal menghapus catatan!`);
    }

    setTimeout(() => {
      const currentPage = window.location.pathname;
      if (
        currentPage.endsWith('index.html') ||
        currentPage === '/' ||
        currentPage.endsWith('/index')
      ) {
        renderNotes();
      }
      if (currentPage.includes('arsipBuku')) {
        renderNotesArsip();
      }

      loadingIndicator.style.display = 'none';
    }, 1000);
  } catch (error) {
    console.error(
      'Terjadi kesalahan saat menghapus catatan:',
      error.message
    );
    alert('Gagal menghapus catatan. Coba lagi nanti.');
    loadingIndicator.style.display = 'none';
  }
}
