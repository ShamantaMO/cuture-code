import { PartialType } from "@nestjs/swagger";
import { UserRegisterDoc } from "src/docs/user-register.doc";



export class UpdateUserDoc extends PartialType(UserRegisterDoc){
    
}