function restHelper() {
  function getHttpOptions(methodName, data) {
    return {
      method: methodName,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };
  }

  function httpGet(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok === false) {
          return Promise.reject();
        }
        return response.json();
      });
  }

  function httpPost(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, getHttpOptions('POST', data))
        .then((response) => {
          if (response.ok === false) {
            reject();
          }
          resolve();
        })
        .catch(() => reject());
    });
  }

  function httpDelete(url, data) {
    fetch(url, getHttpOptions('DELETE', data))
      .catch(error => console.error(error));
  }

  function httpPatch(url, data) {
    fetch(url, getHttpOptions('PATCH', data))
      .catch(error => console.error(error));
  }

  return {
    httpGet,
    httpPost,
    httpDelete,
    httpPatch,
  };
}

export default restHelper();
