import { AuditableEntity } from 'src/infrastructure/base/auditable.entity';
import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { randNum } from 'src/core/helpers/cast.helper';
import { Gender } from 'src/infrastructure/data/enums/gender.enum';
import { Role } from 'src/infrastructure/data/enums/role.enum';
import { Language } from 'src/infrastructure/data/enums/language.enum';
import { Address } from './address.entity';

@Entity()
export class User extends AuditableEntity {
  // account > unique id generator 10 numbers)
  @Factory((faker) => faker.phone.number('########'))
  @Column({ length: 8, unique: true })
  account: string;

  @Factory((faker) => faker.helpers.unique(faker.internet.domainName))
  @Column({ length: 100, unique: true })
  username: string;

  @Factory((faker, ctx) => faker.name.fullName(ctx.gender))
  @Column({ length: 100 })
  name: string;

  // @Factory((faker, ctx) => faker.internet.password())
  @Column({ nullable: true, length: 60 })
  password: string;

  @Factory((faker, ctx) => faker.internet.email(ctx.name))
  @Column({ nullable: true, length: 100 })
  email: string;

  @Factory((faker) => faker.date.future())
  @Column({ nullable: true })
  email_verified_at: Date;

  @Factory((faker) => faker.phone.number('+965#########'))
  @Column({ nullable: true, length: 20 })
  phone: string;

  @Factory((faker) => faker.date.future())
  @Column({ nullable: true })
  phone_verified_at: Date;

  @Factory((faker) => faker.internet.avatar())
  @Column({ nullable: true, length: 500 })
  avatar: string;

  @Factory((faker) => faker.helpers.arrayElement(Object.values(Gender)))
  @Column({ nullable: true, type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true, length: 500 })
  fcm_token: string;

  @Column({ type: 'enum', enum: Language, default: Language.EN })
  language: Language;

  @Column({ default: true })
  is_active: boolean;

  @Factory((faker) => faker.helpers.arrayElement([Role.CLIENT, Role.DRIVER]))
  @Column({ type: 'set', enum: Role, default: [Role.CLIENT] })
  roles: Role[];

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  addresses: Promise<Address[]>;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  // generate unique id in this pattern: ######
  private uniqueIdGenerator(): string {
    return randNum(8);
  }

  @BeforeInsert()
  generateAccount() {
    // ensure the account is unique
    if (!this.account) this.account = this.uniqueIdGenerator();
  }
}
