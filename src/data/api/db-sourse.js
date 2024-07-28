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

        static async register(username, email, password) {
            const response = await fetch(API_ENDPOINT.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            if (!response.ok) {
                const message = await response.json();
                return { error: message.message || 'Login failed' };
            }
    
            const json = await response.json();
            return json;
        }

        static async login( password, email) {
            const response = await fetch(API_ENDPOINT.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password, email }),
            });
    
            if (!response.ok) {
                const message = await response.json();
                return { error: message.message || 'Login failed' };
            }
    
            const json = await response.json();
            const token = json.token;
    
        localStorage.setItem('authToken', token);

        return json;
        }

    }

    export default DBSourse