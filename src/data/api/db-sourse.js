    import API_ENDPOINT from "../global/endponit";


    class DBSourse {
        static async allDataSensor() {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.ALL_DATA, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async allsDataSensorPh() {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.ALL_DATA_PH, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async allsDataSensorMH3() {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.ALL_DATA_NH3, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async countDataSensor() {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.COUNT_DATA, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
            // console.log('data res', json.counts);
            return json.counts;
        }
        static async allsDataSensorWithDay( sensorType, tanggal) {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.WITH_DAY(tanggal, sensorType), {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
            console.log('data', json.data);
            return json.data;
        }
        static async rataRataDataPPMNH3( sensorType, tanggal) {
            const token = localStorage.getItem('authToken');
            const response = await fetch(API_ENDPOINT.WITH_DAY_EVERAGE(tanggal, sensorType), {
                headers: {
                    'Authorization': `${token}`
                }
            })
            const json = await response.json()
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
                return { success: false, error: errorData.message || 'Terjadi kesalahan pada server' };
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
                body: JSON.stringify({email: identifier, username: identifier, password }),
            });
    
            if (!response.ok) {
                const message = await response.json();
                return { error: message.message || 'Login gagal' };;
            }
    
            const json = await response.json();
            const token = json.token;
    
        localStorage.setItem('authToken', token);

        return json;
        }

    
    static async profile() {
        const token = localStorage.getItem('authToken');
        const response = await fetch(API_ENDPOINT.PROFILE, {
            headers: {
                'Authorization': `${token}`
            }
        })
        const json = await response.json();
        console.log('API response', json); // Inspect the full response
        
        return json.data;
    }
    static async deleteData(id) {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`${API_ENDPOINT.DELETE(id)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    console.error('Error parsing JSON response:', e);
                }
                return { success: false, error: errorData?.message || 'Failed to delete data' };
            }
    
            return { success: true };
    
        } catch (error) {
            console.error('Error during deletion:', error);
            return { success: false, error: 'An error occurred during the deletion process' };
        }
    }
    
    
    }

    export default DBSourse