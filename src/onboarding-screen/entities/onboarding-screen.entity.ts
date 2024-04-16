
import {
    Entity,
    Column,
    OneToMany,
    BeforeInsert,
  } from 'typeorm';
import { DefaultEntity } from '@database/default.entities';

@Entity()
export class OnboardingScreen extends DefaultEntity {

    @Column() 
    order: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    img: string;

}