import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/infrastructure/entities/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _config: ConfigService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: _config.get('app.key'),
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOneBy({ id: payload.sub });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
