import { Company } from './company';
import { Role } from './role';

export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    jobRole: string;
    IsEnabled: boolean;
    LastLogin: Date;
    dateCreated: Date;
    company: Company;
    personalContact: string;
    UserRoles: Role[];
    token: string;
    picture: string;
    isCouncil: boolean;
}
