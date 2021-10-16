import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as mqtt from 'mqtt';
import { getRandomArbitrary, NINJA_URI } from "utils/contants";


@Injectable()
export class MessagesService {

    client = mqtt.connect('mqtt://broker.hivemq.com')
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
        console.log({message});
        this.client.once("connect",()=>{
            this.client.publish('lyatest/[código_prueba]',message,{},error=>{
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