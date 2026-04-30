const BASE_URL = 'http://localhost:8080/api/auth';

const apiRequest = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: result
      }
    };
  }

  return result;
};

export const loginUser = (loginData) =>{
    return apiRequest(`${BASE_URL}/login`,loginData);
};

export const registerUser = (registerData) =>{
    return apiRequest(`${BASE_URL}/user`,registerData)
};