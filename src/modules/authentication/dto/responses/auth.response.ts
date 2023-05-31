import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { RegisterResponse } from "./register.response";

export class AuthResponse extends PartialType(RegisterResponse) {
    @ApiProperty()
    @Expose() access_token: string;
}
