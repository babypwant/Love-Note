import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.credentials = 'include';

  if (options.method.toUpperCase() !== 'GET') {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      options.headers['XSRF-TOKEN'] = csrfToken;
    }
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;
  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore')
    .then(res => res.json()) // Parse the JSON response body
    .then(data => {
      const csrfToken = data.csrfToken;
      Cookies.set('XSRF-TOKEN', csrfToken);
      console.log('XSRF-TOKEN:', Cookies.get('XSRF-TOKEN')); // Log the value of the cookie
    });
}
