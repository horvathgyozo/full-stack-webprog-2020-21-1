import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Issue } from './issue';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  enabled: boolean = true;

  @Enum()
  role: UserRole = UserRole.User;

  @OneToMany(() => Issue, issue => issue.user)
  issues = new Collection<Issue>(this);

  @OneToMany(() => Message, message => message.user)
  messages = new Collection<Message>(this);
}

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN',
}
