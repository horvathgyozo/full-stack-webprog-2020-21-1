import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Issue } from './issue';
import { User } from './user';

@Entity()
export class Message {
  @PrimaryKey()
  id!: number;

  @Property()
  text!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @ManyToOne(() => Issue)
  issue!: Issue;

  @ManyToOne(() => User)
  user!: User;
}
