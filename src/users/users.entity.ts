import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'address',
    nullable: false,
  })
  address: string;

  @Column({
    name: 'state',
    nullable: false,
  })
  states: string;

  @Column({
    name: 'zipcode',
    nullable: false,
  })
  zipcode: number;

  @Column({
    name: 'dob',
    nullable: false,
  })
  dob: Date;

  @Column({
    name: 'ssn',
  })
  ssn: number;

  @Column({
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;
}
