const host_url = 'http://devless.io:6060/api/v1/service/';
const host_token = '9a9d2ec4768c7dd1718be58920a17330';

let header = {
  'content-type': 'application/json',
  'devless-token': host_token
};

const nonce = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    .catch((error) => {
      return error;
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
  updateData: (service, table, identifier, value, data) => {
    const body = {
      resource: [
        {
          name: table,
          params: [
            {
              where: identifier + "," + value,
              data: [data]
            }
          ]
        }
      ]
    };

    const url = `${host_url}${service}/db`;

    let res = requestProcessor(url, 'PATCH', body);

    return res;
  },
  deleteData: (service, table, identifier, value) => {
    const body = {
      resource: [
        {
          name: table,
          params: [
            {
              delete: true,
              where: `${identifier}=${value}`
            }
          ]
        }
      ]
    }

    const url = `${host_url}${service}/db`;
    
    let res = requestProcessor(url, 'DELETE', body);

    return res;

  },
  call: (service, method, data=[]) => {
    const body = {
      jsonrpc: "2.0",
      method: service,
      id: nonce(1, 10000000),
      params: data
    };

    const url = `${host_url}${service}/rpc?action=${method}`;

    let res = requestProcessor(url, 'POST', body);

    return res;
  },
  setToken: (token) => {
    header['devless-user-token'] = token;
    return true;
  }
}
export default Devless;
