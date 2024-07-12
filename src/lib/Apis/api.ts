const baseUrl = 'https://intechsol-developer.co/jobfinder/api/';
// interface postApiwithObject{
//     url:string;

// }
const methodwithHeaders = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
const postApiWithSimplePayload = async (payload: any) => {
  //   console.log('payload of login', payload);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      //   methodwithHeaders,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    // console.log('response', json);
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postApiwithFormData = async (payload: any, data: any) => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const postApiWithFormDataWithToken = async (payload: any, data: any) => {
  console.log('paayload off other api', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getApiwithToken = async (payload: any) => {
  // console.log('payload home', payload);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.token}`,
      },
      // body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const getApiwithOutToken = async (payload: any) => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${payload.token}`,
      },
      // body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export {
  postApiWithSimplePayload,
  postApiWithFormDataWithToken,
  postApiwithFormData,
  getApiwithToken,
  getApiwithOutToken,
};
