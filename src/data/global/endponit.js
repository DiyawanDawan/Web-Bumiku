import CONFIG from "./config";

const API_ENDPOINT = {
    ALL_DATA: `${CONFIG.BASE_URL}v1/api/allDataSensors`,
    ALL_DATA_PH: `${CONFIG.BASE_URL}v1/api/allsPh`,
    ALL_DATA_NH3: `${CONFIG.BASE_URL}v1/api/allsNH3`,
    WITH_DAY: (sensorType, tanggal) => `${CONFIG.BASE_URL}v1/api/withday?sensorType=${sensorType}&tanggal=${tanggal}`
}

export default API_ENDPOINT;