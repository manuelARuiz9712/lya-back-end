
interface ResponseInterface {
    statusCode:number,
    message:string,
    data?:any
    error?:string
}
interface QueryResult {
   status:boolean,
   msg:string,
   value:any
}
export {ResponseInterface,QueryResult}