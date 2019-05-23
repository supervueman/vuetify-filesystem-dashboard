/**
 * @module requestData
 * @function
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} params
 * @var {String} access_token
 * @var {Object} requestData
 * @var {Boolean} isData
 * @var {Boolean} isParams
 * @var {Boolean} isAccessToken
 * @var {Boolean} isId
 * @return {Object}
 */
export default (method, url, data, params) => {
  const access_token = localStorage.getItem('access_token');
  const isData = data !== '' && data !== undefined;
  const isParams = params !== '' && params !== undefined;
  const isAccessToken = access_token !== '' && access_token !== undefined;

  const requestData = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (isData) {
    requestData.data = data;
    const isId = data.id === '' || data.id === undefined;
    if (isId) {
      delete data.id;
    }
  }
  if (isParams) {
    requestData.params = params;
  }
  if (isAccessToken) {
    requestData.headers.Authorization = access_token;
  }

  return requestData;
}
