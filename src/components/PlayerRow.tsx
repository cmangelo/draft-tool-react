import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { UserRanking } from '../models/enums/user-ranking.enum';
import { IPlayer } from '../models/player.interface';
import { UserRankWidget } from './UserRankWidget';

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

    const draftPlayer = ($event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        $event.stopPropagation();
        if (props.draftPlayer)
            props.draftPlayer(player._id);
    }

    const selectPlayer = () => {
        if (props.selectPlayer)
            props.selectPlayer(player._id)
    }

    const renderActionButton = () => {
        if (!!props.draftPlayer)
            return (
                <button onClick={($event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => draftPlayer($event)} disabled={player.drafted}>Draft</button>
            )
        if (!!props.rankPlayer && !!props.deleteRank)
            return (
                <UserRankWidget
                    player={player}
                    rankPlayer={props.rankPlayer}
                    deleteRank={props.deleteRank}
                    size="lg">
                </UserRankWidget>
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