import { Address } from './address';
import { User } from './user';
import { NoOfEmployees, Council, Division, SubDivision } from './masterData';
import { Status } from './status';

export class Company {
    id: number;
    abn: number ;
    abnPostCode: number;
    name: string ;
    noOfEmployees: NoOfEmployees ;
    council: Council ;
    division: Division ;
    subDivision: SubDivision ;
    recycler: boolean ;
    phone: string ;
    isRegistered: boolean;
    isInterestsRegistered: boolean;
    addresses: Address[] = [];
    users: User[] = [];
    isMigrationComplete: boolean;
    dateCreated: Date;
    status: Status;
}
