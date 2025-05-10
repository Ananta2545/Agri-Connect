
import { io } from 'socket.io-client';


const socket = io('https://weather-xgyu.onrender.com');
// const socket= io('http://localhost:8000');

export default socket;
