import { EPosition } from './enums/player.enum';
import { ITier } from './tier.interface';

export interface IGroup {
    _id: string;
    position: EPosition;
    owner: string;
    tiers: Array<string> | Array<ITier>;
}