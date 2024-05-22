const baseURL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  const response = await fetch(baseURL);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const createPost = async (post) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const updatePost = async (post) => {
  const response = await fetch(`${baseURL}/${post.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const patchPost = async (id, data) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${baseURL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const fetchPostsByUser = async (userId) => {
  const response = await fetch(`${baseURL}?userId=${userId}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
