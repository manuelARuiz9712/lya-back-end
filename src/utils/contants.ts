export const JWT_SECRET = process.env.JWT_SECRET;
export const MQTT_URI = process.env.MQTT_URI;
export const NINJA_URI= process.env.NINJA_URI;



export const  getRandomArbitrary = (min:number, max:number):number=>{
    return Math.random() * (max - min) + min;
  }
