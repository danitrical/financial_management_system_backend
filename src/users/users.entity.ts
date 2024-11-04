import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    name: 'address',
  })
  address: string;

  @Column({
    name: 'state',
  })
  states: string;

  @Column({
    name: 'zipcode',
  })
  zipcode: number;

  @Column({
    name: 'dob',
  })
  dob: Date;

  @Column({
    name: 'ssn',
    length: 9,
  })
  ssn: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;
}
