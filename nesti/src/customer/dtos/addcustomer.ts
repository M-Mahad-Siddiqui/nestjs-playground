import { IsNumber, IsString } from "class-validator";

export class AddCustomerDto {
    @IsString()
    name: string;
    @IsNumber()
    age: number;
}