import { getNotes } from '../Api/apiHandler.js';
import { handleArsip } from './arsip.js';
import { handleDelete } from './delete.js';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text, maxWords, maxChars) => {
  if (!text || typeof text !== 'string') return ''; 
  const trimmedText = text.trim();
  const words = trimmedText.split(/\s+/);

  if (trimmedText.length > maxChars) {
    return trimmedText.slice(0, maxChars) + '...';
  }

  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }

  return trimmedText;
};

export async function renderNotes() {
  const bookListCard = document.querySelector('#bookListCard');
  const notesData = await getNotes();

  if (notesData.length === 0) {
    bookListCard.innerHTML = '<p>Tidak ada catatan.</p>';
    return;
  }

  bookListCard.innerHTML = '';
  notesData.forEach((note) => {
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
                        <button class="archv-btn">Archive</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </div>
        `;
  });

  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', handleDelete);
  });

  document.querySelectorAll('.archv-btn').forEach((button) => {
    button.addEventListener('click', handleArsip);
  });
}
