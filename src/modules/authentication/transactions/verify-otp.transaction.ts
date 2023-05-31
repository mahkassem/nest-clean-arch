import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTransaction } from 'src/core/base/database/base.transaction';
import { jwtSignOptions } from 'src/core/setups/jwt.setup';
import { Otp } from 'src/infrastructure/entities/auth/otp.entity';
import { UserService } from 'src/modules/user/user.service';
import { DataSource } from 'typeorm';
import { VerifyOtpRequest } from '../dto/requests/verify-otp.dto';
import { AuthResponse } from '../dto/responses/auth.response';

@Injectable()
export class VerifyOtpTransaction extends BaseTransaction<
  VerifyOtpRequest,
  AuthResponse
> {
  constructor(
    dataSource: DataSource,
    @InjectRepository(Otp) private readonly otpsRepo: typeof Otp,
    @Inject(ConfigService) private readonly _config: ConfigService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {
    super(dataSource);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    req: VerifyOtpRequest
  ): Promise<AuthResponse> {
    try {
      // find otp
      const otp = await this.otpsRepo.findOneBy({
        type: req.type,
        username: req.username,
        code: req.code,
      });
      if (!otp) throw new BadRequestException('message.invalid_code');
      if (otp.isExpired()) throw new BadRequestException('message.code_expired');

      // find the user
      const user = await this.userService.findOne({ [req.type]: req.username });
      if (!user || (user && !user.roles.includes(req.role)))
        throw new BadRequestException('message.invalid_credentials');

      // delete otp
      await this.otpsRepo.remove(otp);

      // update user ${req.type}_verified_at if not verified
      if (!user[`${req.type}_verified_at`]) {
        user[`${req.type}_verified_at`] = new Date();
        await this.userService.update(user);
      }

      if (!user) throw new BadRequestException('message.invalid_credentials');
      const payload = { username: user.username, sub: user.id };

      return {
        ...user,
        access_token: this.jwtService.sign(payload, jwtSignOptions(this._config)),
      };
    } catch (error) {
      throw new BadRequestException(
        this._config.get('app.env') !== 'prod' ?
          error :
          'message.invalid_credentials',
      );
    }
  }
}
