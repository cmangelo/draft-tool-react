import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { IPlayer } from '../models/player.interface';
import { UserRankWidget } from './UserRankWidget';

type props = {
    player: IPlayer,
    rankPlayer: Function,
    deleteRank: Function
}

export const Player: React.FC<props> = (props: props) => {
    const { player, rankPlayer, deleteRank } = props;

    const getRiskClass = (risk: number) => {
        if (risk > 7)
            return 'high-risk';
        if (risk > 3.5)
            return 'medium-risk';
        return 'low-risk';
    }

    return (
        <div className="Player">
            <h1>
                <span>{player?.name}</span>
                <span className="position">{EPosition[player?.position]}</span>
            </h1>
            <div className="info-cells">
                <div className="cell">
                    <span className="cell-header">Team</span>
                    <span className="cell-data">{player?.team}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">ADP</span>
                    <span className="cell-data">{player?.adp}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Bye</span>
                    <span className="cell-data">{player?.bye}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Points</span>
                    <span className="cell-data">{player?.points}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Risk</span>
                    <span className={"cell-data " + getRiskClass(player?.risk)}>{player?.risk}</span>
                </div>
            </div>
            <div className="my-rank">
                <h3>My Rank</h3>
                <UserRankWidget player={player} rankPlayer={rankPlayer} deleteRank={deleteRank} size="3x"></UserRankWidget>
            </div>
            <h3>Notes</h3>
            <p>{player?.notes}</p>
        </div>
    );
}
