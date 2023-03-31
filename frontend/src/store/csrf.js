import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "_csrf" header to the value of the 
  // "_csrf" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    // options.headers['_csrf'] = 'K1jXYgoJ-au5gjLh5MxGFZD-FT57Rr4nmkwY'
    options.headers['_csrf'] = Cookies.get('_csrf')
    
    // TfcBIvFcOYAVyGH0QkSqj2CI  

  }

  const csrfToken = Cookies.get('_csrf');

  console.log('csrfToken', csrfToken)
  console.log(options.headers['_csrf'])

  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(`http://localhost:8080${url}`, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore').then(res => {
  });
}
