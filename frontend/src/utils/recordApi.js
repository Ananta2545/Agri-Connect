
import newRequest from './newRequest.js';


export const addRecord = (data) => newRequest.post('/records/add', data);
export const calculateMonthlySummary = (month, year) => newRequest.post('/records/calculate-summary', { month, year });
export const getMonthlySummary = (year) => newRequest.get(`/records/summary/${year}`);
