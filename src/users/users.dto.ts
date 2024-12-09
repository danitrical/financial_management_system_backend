import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  states: string;

  @ApiProperty({})
  @IsNumber()
  @IsNotEmpty()
  zipcode: number;

  @ApiProperty({})
  @IsOptional()
  @IsDate()
  dob: Date;

  @ApiProperty({})
  @IsNumber()
  ssn: number;

  @ApiProperty({})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  password: string;
}
