import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { UsersService } from './../users/users.service';
import { UserEntity } from './../authentication/entities/user';
import { Tenant } from './../authentication/entities/tenant';
import { AuthModule } from './../authentication/auth.module';
import { BoardMember } from './../authentication/entities/boardmember';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([Problem, UserEntity, Tenant, BoardMember]), AuthModule, HttpModule],
  controllers: [ProblemsController],
  providers: [ProblemsService, UsersService]
})
export class ProblemsModule {}
