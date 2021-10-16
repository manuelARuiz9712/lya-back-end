import { ApiProperty } from "@nestjs/swagger";
import { ResponseInterface } from "interfaces/response.interface";


export class ResponseDto implements ResponseInterface {

    @ApiProperty({description:"codigo de estado de la respuesta"})
    statusCode: number;

    @ApiProperty({description:"Descripcion de la respuesta"})
    message: string;
    
    @ApiProperty({required:false,description:"Datos esperados de la solicitud"})
    data?: any;
    
    @ApiProperty({required:false,description:"Respuesta basica"})
    error?: string;

}