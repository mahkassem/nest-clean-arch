import { Exclude, Expose } from "class-transformer";
import { toUrl } from "src/core/helpers/file.helper";
import { Role } from "src/infrastructure/data/enums/role.enum";

export class RegisterResponse {
    @Expose() id: string;
    @Expose() account: string;
    @Expose() name: string;
    @Exclude() private _avatar: string;
    @Expose()
    get avatar(): string {
        return toUrl(this._avatar)
    }
    @Expose() username: string;
    @Expose() email: string;
    @Expose() email_verified_at: Date;
    @Expose() phone: string;
    @Expose() phone_verified_at: Date;
    @Expose() role: Role;

    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set avatar(v: string) { this._avatar = v; }
}
