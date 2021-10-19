import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as mqtt from 'mqtt';
import { getRandomArbitrary, MQTT_URI, NINJA_URI } from "utils/contants";


@Injectable()
export class MessagesService {

    clientHost = 'mqtt://test.mosquitto.org';
  
    constructor(private httpService: HttpService){
      
    
    }

    private  getRandomMessage():Promise<string>{

        return new Promise(resolve=>{

            this.httpService.get(`${NINJA_URI}/fact?max_length=${getRandomArbitrary(30,100)}`).subscribe(response=>{
                resolve(response.data.fact);
        })

        })
  



    }
    

    sendMessage(userId){

       return new Promise( async resolve=>{

        let message = JSON.stringify({
            message:await this.getRandomMessage(),
            userId
        });
       let  client = mqtt.connect(this.clientHost);
        console.log("on connect data ");
        client.once("connect",()=>{
            console.log("conecct data ");
            client.publish('lyatest/angulo',message,{},error=>{
                console.log("sending data ");
                client.end();
                if (error){
                    resolve({
                        msg:"error al enviar el mensaje",
                        status:false
                    });
                }
               
                resolve({
                    msg:"mensaje enviado",
                    status:true
                });
                
            })
        });
      
        
       });

    }
}