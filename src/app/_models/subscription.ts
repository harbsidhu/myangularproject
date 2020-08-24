import { NoOfEmployees } from './masterData';

export class Subscription {
    id: number;
    name: string;
    noOfEmployees: NoOfEmployees;
    isCouncil: boolean;
    isRecycler: boolean;
    amount: number;
    exGst: number;
    gst: number;
    isEnterprise: boolean;
}
