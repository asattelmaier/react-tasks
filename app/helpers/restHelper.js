export default {
  get: url => fetch(url)
    .then(response => response.json()),
  post: (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }),
  del: (url, data) => fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }),
  update: (url, data) => fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }),
};
