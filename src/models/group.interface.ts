import { EPosition } from './enums/position.enum';
import { ITier } from './tier.interface';

export interface IGroup {
    _id: string;
    position: EPosition;
    owner: string;
    tiers: Array<string> | Array<ITier>;
}