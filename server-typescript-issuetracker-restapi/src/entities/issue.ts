import { Entity, PrimaryKey, Property, Enum, Collection, ManyToMany, ManyToOne, OneToMany } from '@mikro-orm/core';
import { Label } from './label';
import { Message } from './message';
import { User } from './user';

@Entity()
export class Issue {

  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property()
  title!: string;

  @Property()
  place!: string;

  @Enum()
  status: IssueStatus = IssueStatus.NEW;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @ManyToMany(() => Label, 'issues', { owner: true })
  labels = new Collection<Label>(this);

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => Message, message => message.issue)
  messages = new Collection<Message>(this);
}

export enum IssueStatus {
  NEW = 'NEW',
  DOING = 'DOING',
  DONE = 'DONE',
}
