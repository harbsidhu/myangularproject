import { Injectable } from '@angular/core';
import { ApiCallService } from './apiCall.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ChatMessage } from '../_models/chatMessage';

@Injectable()
export class ResourceListingService extends ApiCallService {

    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/resourcelisting/');
    }

    getResourceListingById(id: any) {
        return this.getDetail(id);
    }

    getChatMessages(listingId: any,toId: any) {
        return this.getUrl(listingId + '/chatmessages/'+ toId);
    }

    pushChatMessage(chatMessage: ChatMessage) {
        return this.post(chatMessage, chatMessage.resourceListingId + '/chatmessages')
    }

    getResourceForMarket(count: number, currentIndex: number, commIds: any, typeIds: any, searchToken: string, locationFilterType: number, locationFilterAddressId: number, locationFilterKms: number ) {
        let comms: any;
        let types: any;
        if (commIds === undefined) {
            comms = '-1';
        } else if (commIds.length > 0) {
            comms = commIds.join(', ');
        } else {
            comms = '-1';
        }

        if (typeIds === undefined) {
            types = '-1';
        } else if (typeIds.length > 0) {
            types = typeIds.join(', ');
        } else {
            types = '-1';
        }

        let params = new HttpParams();
        params = params.append('count', count.toString());
        params = params.append('currentIndex', currentIndex.toString());
        params = params.append('commids', comms);
        params = params.append('typeids', types);
        params = params.append('searchToken', searchToken);
        params = params.append('compressedimages', 'false');

        if(locationFilterType)
        params = params.append('locationFilterType', locationFilterType.toString());
       
        if(locationFilterType && locationFilterAddressId)
        params = params.append('locationFilterAddressId', locationFilterAddressId.toString());
       
        if(locationFilterType  && locationFilterKms)
        params = params.append('locationFilterKms', locationFilterKms.toString());


        return this.http.get(this.fullUrl() + 'market', { params: params, headers: this._headers });
    }

    createResourceListing(data: any) {
        return this.http.post(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
            .pipe(
                map(resp => this.extractResultBodyData(resp)),
                catchError(this.handleError),
            );
    }
    updateResourceListing(data: any) {
        return this.http.put(this.fullUrl(), data, { headers: this._headers, observe: 'response' })
            .pipe(
                map(resp => this.extractResultBodyData(resp)),
                catchError(this.handleError),
            );
    }

    markAsActive(id: any) {
        return this.put2('markresourceasactive/', id);
    }

    markAsInActive(id: any) {
        return this.put2('markresourceasinactive/', id);
    }
}
