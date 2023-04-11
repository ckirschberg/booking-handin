import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardMember } from './../authentication/entities/boardmember';
import { Tenant } from './../authentication/entities/tenant';
import { UserEntity } from './../authentication/entities/user';
import { Repository } from 'typeorm';
import { Role } from './role';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  @InjectRepository(BoardMember) private boardMemberRepository: Repository<BoardMember>) {}

    async findUserById(id: number) : Promise<UserEntity> {
        return this.userRepository.findOne({where: {id: id}});
    }

    async findOne(username: string): Promise<UserEntity> {
        const result = await this.userRepository.findOne({where: {username: username}, relations: {tenant: true}});
        // console.log("findOne user service", result);
        
        return result;
    }

    async create(username: string, password: string) : Promise<User> {
        return this.userRepository.save({username, password})
    }

    async create_board_member(username: string, password: string, phone: string) : Promise<BoardMember> {
        const user: User = {username, password, role: Role.Admin};
        
        const savedUser = await this.userRepository.save(user);
        const boardmember = { phone, user: savedUser }
        const savedBoardMember = await this.boardMemberRepository.save(boardmember);

        return savedBoardMember;
    }

    async create_tenant(username: string, password: string, email: string) : Promise<Tenant> {
        const user: User = {username, password};
        
        const savedUser = await this.userRepository.save(user);
        const tenant = { email, user: savedUser }
        const savedTenant = await this.tenantRepository.save(tenant);

        return savedTenant;

        // An example to retrieve data with related data. Can be used for 
        // finding one tenant or one board member.
        // const result = await this.tenantRepository.findOne({ where: 
        //     {
        //         id: savedTenant.id
        //     }, relations: {
        //         user: true
        //     }
        // }    
        // );
        // console.log("result", result);
        // return result;
        // await this.userRepository.save({username, password}); // Never save passwords in clear text!
        
    }
}
