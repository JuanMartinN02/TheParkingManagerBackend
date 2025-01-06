import { Property } from "src/property/entities/property.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Manager'})
export class Manager {
    @PrimaryGeneratedColumn()
    manager_id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Property, (property) => property.managers, { onDelete: 'CASCADE' })
    property: Property;
}
