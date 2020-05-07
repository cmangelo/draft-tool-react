import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteRanksEffect } from '../effects/deleteRank';
import { getPlayerDetailEffect } from '../effects/getPlayerDetail';
import { rankPlayerEffect } from '../effects/rankPlayer';
import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { getSelectedPlayer } from '../reducers/user-ranks';
import { screenSizes } from '../services/window';
import { UserRankWidget } from './UserRankWidget';

export const Player: React.FC = (props: any) => {
    const player = useSelector(getSelectedPlayer);
    const dispatch = useDispatch();
    const smallScreen = window.innerWidth < screenSizes.S;

    const rankPlayer = (playerId: string, ranking: UserRanking) => dispatch(rankPlayerEffect(playerId, ranking));
    const deleteRank = (playerId: string) => dispatch(deleteRanksEffect(playerId));

    //if we dont have a player but we have props.match, then we know this 
    //component is being rendered as its own route
    if (!player && !!props.match) {
        const playerId = props.match.params.playerId;
        dispatch(getPlayerDetailEffect(playerId, false));
    }

    const getRiskClass = (risk: number) => {
        if (risk > 7)
            return 'high-risk';
        if (risk > 3.5)
            return 'medium-risk';
        return 'low-risk';
    }

    const goBack = () => {
        props.history.goBack();
    }

    return (
        <div className="Player">
            <h1>
                {smallScreen && <FontAwesomeIcon icon="chevron-left" className="icon" onClick={goBack} />}
                <span className="name">{player?.name}</span>
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
