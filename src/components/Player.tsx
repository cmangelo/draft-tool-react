import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IPlayer } from '../models/player.interface';

export const Player: React.FC<{ player: IPlayer }> = (props: { player: IPlayer }) => {
    const formatUserRank = (rank: UserRanking) => {
        switch (rank) {
            case UserRanking.AllIn:
                return 'All In';
            case UserRanking.Neutral:
                return 'Neutral';
            case UserRanking.AllOut:
                return 'All Out';
            default:
                return 'N/A';
        }
    }

    return (
        <div className="Player">
            <h1>{EPosition[props.player?.position]} - {props.player?.name}</h1>
            <div className="info-cells">
                <div className="cell">
                    <span className="cell-header">Team</span>
                    <span className="cell-data">{props.player?.team}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Bye</span>
                    <span className="cell-data">{props.player?.bye}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Points</span>
                    <span className="cell-data">{props.player?.points}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">Risk</span>
                    <span className="cell-data">{props.player?.risk}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">ADP</span>
                    <span className="cell-data">{props.player?.adp}</span>
                </div>
                <div className="cell">
                    <span className="cell-header">My Rank</span>
                    <span className="cell-data">{formatUserRank(props.player?.userRank)}</span>
                </div>
            </div>
            <h3>Notes</h3>
            <p>{props.player?.notes}</p>
        </div>
    );
}
