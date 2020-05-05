import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IPlayer } from '../models/player.interface';

type props = {
    player: IPlayer,
    rank: number,
    selected?: boolean,
    draftPlayer?: Function,
    selectPlayer?: Function,
    rankPlayer?: Function,
    deleteRank?: Function
};

export const PlayerRow: React.FC<props> = (props: props) => {
    const { player, rank } = props;

    const draftPlayer = () => {
        if (props.draftPlayer)
            props.draftPlayer(player._id);
    }

    const selectPlayer = () => {
        if (props.selectPlayer)
            props.selectPlayer(player._id)
    }

    const rankPlayer = (rank: UserRanking, $event?: any) => {
        $event.stopPropagation();
        if (!props.rankPlayer || !props.deleteRank) return;
        if (props.player.userRank !== rank) {
            props.rankPlayer(player._id, rank)
        } else {
            props.deleteRank(player._id);
        }
    }

    const renderActionButton = () => {
        if (!!props.draftPlayer)
            return (
                <button onClick={draftPlayer} disabled={player.drafted}>Draft</button>
            )
        if (!!props.selectPlayer)
            return (
                <div className="rank-options">
                    <FontAwesomeIcon icon={player.userRank === UserRanking.AllIn ? "check-square" : "square"} size="lg" className="all-in" onClick={($event) => rankPlayer(UserRanking.AllIn, $event)} />
                    <FontAwesomeIcon icon={player.userRank === UserRanking.Neutral ? "check-square" : "square"} size="lg" className="neutral" onClick={($event) => rankPlayer(UserRanking.Neutral, $event)} />
                    <FontAwesomeIcon icon={player.userRank === UserRanking.AllOut ? "check-square" : "square"} size="lg" className="all-out" onClick={($event) => rankPlayer(UserRanking.AllOut, $event)} />
                </div>
            )
    }

    return (
        <div className={"player-row " +
            (!!props.selectPlayer ? "clickable " : "") +
            (!!props.draftPlayer && player.drafted ? "drafted " : "") +
            (!!props.selectPlayer && props.selected ? "selected" : "")}
            onClick={selectPlayer}>
            <span className={`player-rank ${!!props.draftPlayer ? UserRanking[player.userRank] : ''}`}>{rank}</span>
            <div className={`player-name `}>
                <div>{player.name}</div>
                <div className="player-team-info">
                    <span>{EPosition[player.position]} - {player.team}</span>
                </div>
            </div>
            <span className="player-adp">
                <div>ADP</div>
                {player.adp}
            </span>
            {renderActionButton()}
        </div>
    );
}