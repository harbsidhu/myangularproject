import { Subscription } from './subscription';

export class CompanySubscription {
    id: number;
    companyId: number;
    subscriptionId: number;
    subscription: Subscription;
    startDate: Date;
    isActive: boolean;
    transationId: string;
    amount: number;
}
