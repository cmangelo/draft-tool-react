import { IPlayer } from './player.interface';

export interface IPick {
    _id: string;
    overall: number;
    player: string;
    draft: string;
    playerObject?: IPlayer;
}