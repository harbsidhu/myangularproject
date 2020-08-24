import { ResourceListing } from './resourceListing';
import { Company } from './company';

export class ResourceListingWithOfferCount {
    resourceListing: ResourceListing;
    offerCount: number;
    companyDetails: Company;
    closedTransactionCount: number;
}
