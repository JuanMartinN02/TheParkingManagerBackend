import { Property } from "src/property/entities/property.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Parking Spot'})
export class ParkingSpot {
    @PrimaryGeneratedColumn()
    parking_id: number;

    @Column()
    parking_number: string;

    @ManyToOne(() => Property, (property) => property.parkingSpots, { onDelete: 'CASCADE' })
    property: Property;

}
