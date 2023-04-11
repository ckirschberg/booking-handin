import { Role } from './../../users/role';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Tenant } from './tenant';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(type => Tenant, tenant => tenant.user)
	tenant: Tenant | null

  @Column({
    type:"enum", 
    enum: Role, 
    default: [Role.User]
  })
  role: Role;
}