import CONFIG from "./config";

const API_ENDPOINT = {
    ALL_DATA: `${CONFIG.BASE_URL}v1/api/allDataSensors`,
    ALL_DATA_PH: `${CONFIG.BASE_URL}v1/api/allsPh`,
    ALL_DATA_NH3: `${CONFIG.BASE_URL}v1/api/allsNH3`,
    COUNT_DATA: `${CONFIG.BASE_URL}v1/api/count`,
    LOGIN: `${CONFIG.BASE_URL}v1/api/login`,
    REGISTER: `${CONFIG.BASE_URL}v1/api/register`,
    PROFILE: `${CONFIG.BASE_URL}v1/api/profile`,
    ALLUSERS: `${CONFIG.BASE_URL}v1/api/allUsers`,
    DELETE_DATA: (id) => `${CONFIG.BASE_URL}v1/api/delete/${id}`,
    DELETE_USER: (id) => `${CONFIG.BASE_URL}v1/api/deleteUser/${id}`,
    UPDATE_USER: (id) => `${CONFIG.BASE_URL}v1/api/update-user/${id}`,
    USER_BY_ID: (id) => `${CONFIG.BASE_URL}v1/api/getuser-user/${id}`,
    WITH_DAY: (sensorType, tanggal) => `${CONFIG.BASE_URL}v1/api/withday?sensorType=${sensorType}&tanggal=${tanggal}`,
    WITH_DAY_EVERAGE: (sensorType, tanggal) => `${CONFIG.BASE_URL}v1/api/rataratappmnhDays?sensorType=${sensorType}&tanggal=${tanggal}`
}

export default API_ENDPOINT;