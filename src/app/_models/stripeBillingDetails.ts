export class Address {
    line1: string;
    city: string;
    country: string;
    postal_code: string;
    state: string;
}

export class StripeBillingDetails {
    constructor() {
        this.address = new Address();
    }
    name: string;
    address: Address;
    email: string;
    phone: string;
}
