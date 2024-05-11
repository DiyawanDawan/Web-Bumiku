    import API_ENDPOINT from "../global/endponit";

    class DBSourse {
        static async allDataSensor() {
            const response = await fetch(API_ENDPOINT.ALL_DATA)
            const json = await response.json()
            console.log('data', json.data);
            return json.data;
        }
    }

    export default DBSourse