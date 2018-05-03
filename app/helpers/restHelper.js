export default {
  httpGet: url => fetch(url)
    .then(response => response.json()),
  httpPost: (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => console.log('POST Success:', response))
    .catch(error => console.error('POST Error:', error)),
  httpDelete: (url, data) => fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .catch(error => console.error('DELETE Error:', error))
    .then(response => console.log('DELETE Success:', response)),
  httpPatch: (url, data) => fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .catch(error => console.error('PATCH Error:', error))
    .then(response => console.log('PATCH Success:', response)),
};
