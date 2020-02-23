export interface IDraft {
    _id: string;
    owner: string;
    numTeams: number;
    numRounds: number;
    userPosition: number;
    QBs: number;
    RBs: number;
    WRs: number;
    TEs: number;
    FLEX: number;
    BENCH: number;
    K: number;
    DEF: number;
    createdAt: Date;
    updatedAt: Date;
}