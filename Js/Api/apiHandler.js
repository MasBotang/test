const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// create note
export async function createNote(title, body) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });

  const data = await response.json();
  console.log(data);
}

// get notes (non-arch)
export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data Notes:', data);

    return (data?.data || []).slice(0, 12); 
  } catch (error) {
    console.error('Gagal mengambil data notes:', error);
    return [];
  }
}

// get notes (arch)
export async function getArchivedNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data yang diterima:', data);

    return data;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    return null; 
  }
}




