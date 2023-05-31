import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateAddressRequest } from "./create-address.request";

export class UpdateAddressRequest extends PartialType(CreateAddressRequest) {
    @ApiProperty()
    @IsNotEmpty() @IsString()
    id: string;

    user_id?: string;
}