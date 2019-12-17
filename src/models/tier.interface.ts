export interface ITier {
    _id: string;
    tierNumber: number;
    startingAtRank: number;
    group: string;
    players: Array<string>;
}