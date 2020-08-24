import { Company } from './company';
import { ResourceListing } from './resourceListing';

export class ResourceOffer {
    id: number;
    resourceListing: ResourceListing;
    company: Company;
    offerCompany: Company;
    price: number;
    accepted: boolean;
    createdDate: Date;
    closedDate: Date;
    active: boolean;
}

