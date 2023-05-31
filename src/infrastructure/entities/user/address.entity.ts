import { Factory } from 'nestjs-seeder';
import { OwnedEntity } from 'src/infrastructure/base/owned.entity';
import { User } from 'src/infrastructure/entities/user/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('addresses')
export class Address extends OwnedEntity {
  @ManyToOne(() => User, (user) => user.addresses, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @Column()
  user_id: string;

  // address name e.g. home, work, etc.
  @Factory((faker) => faker.helpers.arrayElement(['home', 'work', 'other']))
  @Column({ length: 100 })
  name: string;

  // address
  @Factory((faker) => faker.address.streetAddress())
  @Column({ length: 500 })
  address: string;

  // phone
  @Factory((faker) => faker.phone.number('+218#########'))
  @Column({ length: 20, nullable: true })
  phone: string;

  // details
  @Factory((faker) => faker.address.streetAddress())
  @Column({ length: 250, nullable: true })
  details: string;

  // geometry column
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: string;

  // latitude
  @Factory((faker) => faker.address.latitude())
  @Column({ type: 'float', precision: 10, scale: 6 })
  latitude: number;

  // longitude
  @Factory((faker) => faker.address.longitude())
  @Column({ type: 'float', precision: 11, scale: 6 })
  longitude: number;

  @Column({ default: false })
  is_favorite: boolean;

  @Factory((faker) => faker.date.past())
  @Column({ nullable: true })
  last_used_at: Date;

  constructor(partial?: Partial<Address>) {
    super();
    Object.assign(this, partial);
  }

  @BeforeInsert()
  saveLocation() {
    this.location = `POINT(${this.latitude} ${this.longitude})`;
  }

  @BeforeUpdate()
  updateLocation() {
    this.location = `POINT(${this.latitude} ${this.longitude})`;
  }
}
