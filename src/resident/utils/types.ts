export type updateResidentParam = {    
    resident_id: number;
    apt_number: string;   
    first_name: string;    
    last_name: string;
    email: string;
    password: string;
    creation_date: Date;
    vehicles_allowed: number;
    visitors_allowed: number;
}