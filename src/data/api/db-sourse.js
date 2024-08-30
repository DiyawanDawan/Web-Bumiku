import API_ENDPOINT from '../global/endponit';

const token = localStorage.getItem('authToken');
class DBSourse {
  static async allDataSensor() {
    const response = await fetch(API_ENDPOINT.ALL_DATA, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    // console.log('data', json.data);
    return json.data;
  }
  static async allsDataSensorPh() {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.ALL_DATA_PH, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    // console.log('data', json.data);
    return json.data;
  }
  static async allsDataSensorMH3() {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.ALL_DATA_NH3, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    // console.log('data', json.data);
    return json.data;
  }
  static async countDataSensor() {
    const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.COUNT_DATA, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    // console.log('data res', json.counts);
    return json.counts;
  }
  static async allsDataSensorWithDay(sensorType, tanggal) {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.WITH_DAY(tanggal, sensorType), {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    console.log('data', json.data);
    return json.data;
  }
  static async rataRataDataPPMNH3(sensorType, tanggal) {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(
      API_ENDPOINT.WITH_DAY_EVERAGE(tanggal, sensorType),
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    const json = await response.json();
    console.log('data', json.data);
    return json.data;
  }

  static async register(fullName, gender, username, email, password) {
    const response = await fetch(API_ENDPOINT.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        gender,
        username,
        email,
        password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || 'Terjadi kesalahan pada server',
      };
    }

    const json = await response.json();
    return json;
  }

  static async login(identifier, password) {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: identifier,
        username: identifier,
        password,
      }),
    });

    if (!response.ok) {
      const message = await response.json();
      return { error: message.message || 'Login gagal' };
    }

    const json = await response.json();
    const token = json.token;

    localStorage.setItem('authToken', token);

    return json;
  }

  static async profile() {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.PROFILE, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    console.log('API response', json); // Inspect the full response

    return json.data;
  }
  static async deleteData(id) {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_ENDPOINT.DELETE_DATA(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Mengembalikan respons JSON langsung, baik berhasil maupun gagal
      // Mengembalikan respons JSON langsung
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
  
  }

  static async deleteUser(id) {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_ENDPOINT.DELETE_USER(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Mengembalikan respons JSON langsung, terlepas dari sukses atau gagal
    return response.json();
  }

  static async allUsers() {
    // const token = localStorage.getItem('authToken');
    const response = await fetch(API_ENDPOINT.ALLUSERS, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const json = await response.json();
    console.log(json);
    return json.data;
  }
  static async updateUser(id, updateData, password) {
    const requestBody = { ...updateData };
    if (password) requestBody.password = password; // Include password if provided

    const response = await fetch(`${API_ENDPOINT.UPDATE_USER(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Ensure the token is correct
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("API Response:", data); // Log the API response

    return data;
}



static async getUserById(id) {
  try {
    const response = await fetch(API_ENDPOINT.USER_BY_ID(id), {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}
}

export default DBSourse;
