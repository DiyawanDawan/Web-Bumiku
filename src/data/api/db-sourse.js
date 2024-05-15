    import API_ENDPOINT from "../global/endponit";

    class DBSourse {
        static async allDataSensor() {
            const response = await fetch(API_ENDPOINT.ALL_DATA)
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async allsDataSensorPh() {
            const response = await fetch(API_ENDPOINT.ALL_DATA_PH)
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async allsDataSensorMH3() {
            const response = await fetch(API_ENDPOINT.ALL_DATA_NH3)
            const json = await response.json()
            // console.log('data', json.data);
            return json.data;
        }
        static async countDataSensor() {
            const response = await fetch(API_ENDPOINT.COUNT_DATA)
            const json = await response.json()
            // console.log('data res', json.counts);
            return json.counts;
        }

        static async allsDataSensorWithDay( sensorType, tanggal) {
            const response = await fetch(API_ENDPOINT.WITH_DAY(tanggal, sensorType))
            const json = await response.json()
            console.log('data', json.data);
            return json.data;
        }
    }

    export default DBSourse