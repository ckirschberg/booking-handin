import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMember } from './../authentication/entities/boardmember';
import { Tenant } from './../authentication/entities/tenant';
import { UserEntity } from './../authentication/entities/user';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, Tenant, BoardMember])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
