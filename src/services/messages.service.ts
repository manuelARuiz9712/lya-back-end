import { Injectable } from "@nestjs/common";
import * as mqtt from 'mqtt';


@Injectable()
export class MessagesService {

    client
    constructor(){
        this.client = mqtt.connect('mqtt://broker.hivemq.com');
    }

    getRandomMessage(){
        
    }

    sendMessage(body:string,userId){

       return new Promise(resolve=>{

        this.client.once("connect",()=>{
            this.client.publish('garage/connected', 'true')
        });
        
       });

    }
}