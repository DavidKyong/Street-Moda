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

export async function readListings() {
  const req = {
    method: 'GET',
  };
  const res = await fetch('/api/listings/', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
export async function updateListing(listingId, userId, entry) {
  const req = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: entry,
  };
  const res = await fetch(`/api/sell/${userId}/edit/${listingId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function readListing(listingId) {
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const res = await fetch(`/api/listings/${listingId}`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
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
