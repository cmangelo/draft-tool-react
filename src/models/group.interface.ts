import { ITier } from './tier.interface';

export interface IGroup {
    _id: string;
    position: any;
    owner: string;
    tiers: Array<string> | Array<ITier>;
}