const host_url = 'https://dvshopit.herokuapp.com/api/v1/service/';
const host_token = '76b4e42f8a028374633fd3b89b9ca04d';

let header = {
  'content-type': 'application/json',
  'devless-token': host_token
};

const requestProcessor = (url, methodType, data=null) => {
  if (methodType !== 'GET') {
    data = JSON.stringify(data);
  }

  return fetch(url, {
    method: methodType,
    headers: header,
    body: data
  })
    .then(res => res.json())
    .then((resJson) => {
      return resJson;
    })
}

const Devless = {
  queryData: (service, table, params=null) => {

    let parameters  = '';

    if(params !== null){
      const innerParams = function(key, params) {
        for (var eachParam in params) {
          parameters = "&" + key + "=" + params[eachParam] + parameters;
        }
      }

      for (var key in params) {
        if (!params.hasOwnProperty(key)) { /**/ }
        if (params[key] instanceof Array) {
          innerParams(key, params[key])
        } else {
          parameters = "&" + key + "=" + params[key] + parameters;
        }
      }
    }

    const url = `${host_url}${service}/db?table=${table}${parameters}`;

    let result = requestProcessor(url, 'GET');

    return result;

  },
  addData: (service, table, data) => {
    const body = {
      resource: [
        {
          name: table,
          field: [ data ]
        }
      ]
    };

    const url = `${host_url}${service}/db`;

    let result = requestProcessor(url, 'POST', body);

    return result;
  },
  updateData: (service, table, identifier, value) => {
    const body = {
      resource: [
        {
          name: table,
          params: body
        }
      ]
    };

    const url = `${host_url}${service}/db`;

    let res = requestProcessor(url, 'PATCH', body);

    return res;
  },
  deleteData: (service, table, identifier) => {
    const body = {
      resource: [
        {
          name: table,
          params: body
        }
      ]
    }

  },
  call: (service, method, data=[]) => {

  },
  setToken: (token) => {
    header['devless-user-token'] = token;
    return true;
  }
}
export default Devless;
