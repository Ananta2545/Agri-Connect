
import newRequest from './newRequest.js';


export const addRecord = (data) => newRequest.post('/api/records/add', data);
export const calculateMonthlySummary = (month, year) => newRequest.post('/api/records/calculate-summary', { month, year });
export const getMonthlySummary = (year) => newRequest.get(`/api/records/summary/${year}`);
