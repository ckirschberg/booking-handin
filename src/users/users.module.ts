import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMember } from 'src/authentication/entities/boardmember';
import { Tenant } from 'src/authentication/entities/tenant';
import { UserEntity } from 'src/authentication/entities/user';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity, Tenant, BoardMember])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
