import { ApiCallService } from './apiCall.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceImage } from '../_models/resourceImage';
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService extends ApiCallService {
    constructor(public http: HttpClient) {
        super(http);
        this.set('/api/image/');
    }

    getImageByPath(path: string) {
        return this.http.get(this.fullUrl() + path, { responseType: 'blob', headers: this._headers });
    }

    getFullImageUrl(item: any) {
        const params = {
            bucket: environment.mediaBucketName,
            key: item.trim(),
        };
        return this.getEncodedUrl(params);
    }

    private getEncodedUrl(params: any) {
        const paramsStr = JSON.stringify(params);
        const encodedQuery = btoa(paramsStr);
        return `${environment.mediaBaseUrl}/${encodedQuery}`;
    }

    getDownsizedImageUrl(imagePath: string) {
        const params = {
            bucket: environment.mediaBucketName,
            key: imagePath.trim(),
            edits: {
                resize: {
                    width: 200,
                    height: 240,
                    fit: 'fill',
                },
            },
        };
        return this.getEncodedUrl(params);
    }

    getImagesByListing(id: number) {
        return this.getDetail(id, 'listing');
    }

    deleteImages(images) {
        // return this.http.delete(this.fullUrl(), { params: image });
        return this.http.request('delete', this.fullUrl(), {body: images});
    }
}
