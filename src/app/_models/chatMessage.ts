export class ChatMessage {
    id?: number;
    resourceListingId: number;
    fromId: number;
    toId: number;
    timeStamp: Date;
    message: string;
}
