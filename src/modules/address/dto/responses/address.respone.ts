import { Expose, Transform } from "class-transformer";
import { toString } from "src/core/helpers/cast.helper";

export class AddressResponse {
    @Expose() id: string;
    @Expose() name: string;
    @Expose() address: string;
    @Expose() phone: string;
    @Expose() details: string;
    @Transform(({ value }) => toString(value))
    @Expose() latitude: string;
    @Transform(({ value }) => toString(value))
    @Expose() longitude: string;
    @Expose() last_used_at: Date;
    @Expose() is_favorite: boolean;
}