import { Manager } from "src/manager/entities/manager.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'Property'}) //Nombra las tablas de la
export class Property{
    @PrimaryGeneratedColumn()
    property_id: number;

    @Column()
    name: string;

    @Column()
    reserved_parking_quantity: number;

    @Column()
    visitors_quantity: number;

    @Column()
    hours_per_visitor: number;

    @Column({ nullable: true })
    map: string;

    //Relationship with parking spots
    // @OneToMany(() => ParkingSpot, (parkingSpot) => parkingSpot.property, {
    //     cascade: true,
    // })
    // parkingSpots: ParkingSpot[]

    //Relationship with Residents
    // @OneToMany(() => Resident, (resident) => resident.property, {
    //     cascade: true,
    // })
    // residents: Resident[];

    //Relationship with Admins
    @OneToMany(() => Manager, (manager) => manager.property, {
        cascade: true,
    })
    managers: Manager[];
}
