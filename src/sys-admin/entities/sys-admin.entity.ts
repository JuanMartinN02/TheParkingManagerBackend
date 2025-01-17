import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'System Admin' })
export class SysAdmin {
    @PrimaryGeneratedColumn()
    sysAdmin_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
