import { renderNotes } from './utils/render.js';
import { handleCreateNote } from './utils/create.js';
import { renderNotesArsip } from './utils/renderArsip.js';
import '@/assets/component.js';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;
  console.log('Halaman saat ini:', currentPage);

  if (
    currentPage.endsWith('index.html') ||
    currentPage === '/' ||
    currentPage.endsWith('/index')
  ) {
    console.log('Memanggil renderNotes()');
    renderNotes();
  }

  if (currentPage.includes('tambahListBuku')) {
    console.log('Memanggil handleCreateNote()');
    handleCreateNote();
  }

  if (currentPage.includes('arsipBuku')) {
    console.log('Memanggil renderNotesArsip()');
    renderNotesArsip();
  }
});
