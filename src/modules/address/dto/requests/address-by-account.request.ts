import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddressByAccountRequest {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    account: string;
}