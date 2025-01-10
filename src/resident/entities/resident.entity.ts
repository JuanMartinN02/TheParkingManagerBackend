import { Property } from "src/property/entities/property.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";

@Entity({ name: 'Resident' })
export class Resident {
    @PrimaryGeneratedColumn()
    resident_id: number;

    @Column()
    apt_number: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    vehicles_allowed: number;

    @Column()
    visitors_allowed: number;

    @CreateDateColumn()
    creation_date: Date; // Auto-generated creation timestamp  

    @ManyToOne(() => Property, (property) => property.residents, { onDelete: 'CASCADE' })
    property: Property;
}
