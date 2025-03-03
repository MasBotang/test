const BASE_URL = 'https://notes-api.dicoding.dev/v2';
import { renderNotesArsip } from './renderArsip.js';

export async function handleUnarchive(event) {
  const card = event.target.closest('.book-list-card-arsip');

  if (!card) {
    console.error('Elemen kartu tidak ditemukan!');
    return;
  }

  const noteIdElement = card.querySelector('.id');
  if (!noteIdElement) {
    console.error('Elemen ID tidak ditemukan di kartu!');
    return;
  }

  const noteId = noteIdElement.innerText;
  const konfirm = confirm(
    'Apakah Anda yakin ingin mengembalikan catatan ini dari arsip?'
  );
  if (!konfirm) return;

  const loadingIndicator = document.querySelector('#loading');
  loadingIndicator.style.display = 'block';

  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(
        `Gagal mengembalikan catatan: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error('Gagal mengembalikan catatan!');
    }

    setTimeout(async () => {
      await renderNotesArsip();
      loadingIndicator.style.display = 'none'; 
    }, 1000);
  } catch (error) {
    console.error(
      'Terjadi kesalahan saat mengembalikan catatan:',
      error.message
    );
    loadingIndicator.style.display = 'none';
  }
}
