import taskValidator from './../helpers/taskValidator.js';

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
    const { isValid, notification } =
      taskValidator.validateTask(data);

    if (!isValid) {
      return Promise.reject(notification);
    }

    return fetch(url, getHttpOptions('POST', data))
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error));
  }

  function httpDelete(url, data) {
    return fetch(url, getHttpOptions('DELETE', data))
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error));
  }

  function httpPatch(url, data) {
    return fetch(url, getHttpOptions('PATCH', data))
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(error));
  }

  return {
    httpGet,
    httpPost,
    httpDelete,
    httpPatch,
  };
}

export default restHelper();
