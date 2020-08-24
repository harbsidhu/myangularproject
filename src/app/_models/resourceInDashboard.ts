import { ResourceListing } from './resourceListing';
import { ResourceInOfferDTO } from './resourceInOfferDTO';

export class ResourceInDashboard {
    resourceListing: ResourceListing;
    attributes: Array<string>;
    resourceOffers: Array<ResourceInOfferDTO>;

    attributeString: string;

    price: number;

}