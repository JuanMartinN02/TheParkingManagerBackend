import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Tower' })
export class Tower {
    @PrimaryGeneratedColumn()
    tower_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
