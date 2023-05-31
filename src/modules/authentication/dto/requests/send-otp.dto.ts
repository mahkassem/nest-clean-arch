import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "src/infrastructure/data/enums/role.enum";

export class SendOtpRequest {
    @ApiProperty({ required: true, description: 'Authentication usernme type', enum: ['email', 'phone'], example: 'phone', default: 'phone' })
    @IsOptional() @IsString()
    type: "phone" | "email";

    @ApiProperty({ required: true, description: 'Authentication usernme', example: '+966555554444', default: '+966555554444' })
    @IsNotEmpty() @IsString()
    username: string;

    @ApiProperty({ required: true, enum: Role, description: 'User role', example: Role.CLIENT, default: Role.CLIENT })
    @IsNotEmpty() @IsEnum(Role)
    role: Role;
}