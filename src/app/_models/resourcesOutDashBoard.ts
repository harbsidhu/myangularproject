import { ResourceListing } from './resourceListing';
import { ResourceOutOfferDTO } from './resourceOutOfferDTO';

export class ResourceOutDashboard {
    resourceListing: ResourceListing;
    attributes: Array<string>;
    resourceOffers: Array<ResourceOutOfferDTO>;
    attributeString: string;
    price: number;
}
