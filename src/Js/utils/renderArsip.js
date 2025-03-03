import { getArchivedNotes } from '../Api/apiHandler.js';
import { handleDelete } from './delete.js';
import { truncateText, formatDate } from './render.js';
import { handleUnarchive } from './tamplikan.js';
export async function renderNotesArsip() {
  const bookListCard = document.querySelector('#bookListCardArsip');
  if (!bookListCard) {
    console.error('Element #bookListCardArsip tidak ditemukan');
    return;
  }

  try {
    const response = await getArchivedNotes();

    if (!response || !Array.isArray(response.data)) {
      console.error('Data yang diterima bukan array:', response);
      return;
    }

    const notesDataArsip = response.data;

    if (notesDataArsip.length === 0) {
      bookListCard.innerHTML = '<p>Tidak ada catatan yang diarsipkan.</p>';
      return;
    }

    bookListCard.innerHTML = '';
    notesDataArsip.forEach((note) => {
      const truncatedTitle = truncateText(note.title, 3, 10);
      const truncatedBody = truncateText(note.body, 10, 40);

      bookListCard.innerHTML += `
                    <div class="card">
                        <span class="createdAt">${formatDate(note.createdAt)}</span>
                        <span class="status">${note.archived ? 'Archived' : 'Active'}</span>
                        <h3 class="title">
                            ${truncatedTitle} 
                            <span class="material-symbols-outlined">radio_button_partial</span>
                        </h3>
                        <p class="isi">${truncatedBody}</p>
                        <span class="id">${note.id}</span>
                        <div class="button-container">
                            <button class="tampil-btn">Tamplikan</button>
                            <button class="delete-btn">Delete</button>
                        </div>
                    </div>
            `;
    });

    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', handleDelete);
    });

    document.querySelectorAll('.tampil-btn').forEach((button) => {
      button.addEventListener('click', handleUnarchive);
    });
  } catch (error) {
    console.error('Error saat mengambil catatan arsip:', error);
  }
}
