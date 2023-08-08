export async function readListing() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/listings', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function SigningUp(userData) {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };
  const res = await fetch('/api/auth/sign-up', req);
  if (!res.ok) {
    throw new Error(`fetch Error ${res.status}`);
  }
  return await res.json();
}

export async function readUserListings(userId) {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/sell/${userId}`, req);
  console.log(userId);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readShoeListing() {
  const req = {
    method: 'GET',
  };
  const res = await fetch('/api/shoes', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readApparelListing() {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch('/api/apparels', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readShoesListId(listingId) {
  const req = {
    method: 'GET',
  };
  const res = await fetch(`/api/shoes/${listingId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readApparelsListId(listingId) {
  const req = {
    method: 'GET',
  };
  const res = await fetch(`/api/apparels/${listingId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function addListing(newListing) {
  console.log('newListing', newListing);
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: newListing,
  };
  const res = await fetch('/api/sell/new-listing', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function updateListing(entry) {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(entry),
  };
  const res = await fetch(`/api/entries/${entry.entryId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function removeListing(listingId) {
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/sell/${listingId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
}
