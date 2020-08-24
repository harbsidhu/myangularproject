import { Council } from './masterData';
import { Suburb } from './suburb';

export class PostCode {

    id: number;
    postalcode: number;
    council: Council;
    suburbs: Array<Suburb> = new Array;
}