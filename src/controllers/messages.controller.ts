import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { Request } from "express";
import { MessagesService } from "services/messages.service";

@Controller("messages")
export class AuthController {

    constructor(private readonly messageService:MessagesService){}

    
    @Post("/send")
    @UseGuards(JwtAuthGuard)
    async sendMessage(@Req() req:Request ){

        this.messageService.sendMessage((req.user as any)._id);

    }

}