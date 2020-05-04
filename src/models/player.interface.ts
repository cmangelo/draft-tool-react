import { UserRanking } from './enums/user-ranking.enum';

export interface IPlayer {
    _id: string;
    name: string;
    team: string;
    bye: number;
    points: number;
    risk: number;
    adp: number;
    notes: string;
    position: number;
    value: number;
    drafted: boolean;
    userRank: UserRanking;
}