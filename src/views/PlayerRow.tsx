import React from 'react';

import { EPlayer } from '../models/enums/player.enum';
import { IPlayer } from '../models/player.interface';

export const PlayerRow: React.FC<{ player: IPlayer, rank: number, draftPlayer: Function }> = (props: { player: IPlayer, rank: number, draftPlayer: Function }) => {
    const { player, rank } = props;

    const draftPlayer = () => {
        props.draftPlayer(player._id);
    }

    return (
        <div className={"player-row " + (player.drafted ? "drafted" : "")}>
            <span className="player-rank">{rank}</span>
            <div className="player-name">
                <div>{player.name}</div>
                <div className="player-team-info">
                    <span>{EPlayer[player.position]} - {player.team}</span>
                </div>
            </div>
            <span className="player-adp">
                <div>ADP</div>
                {player.adp}
            </span>
            <button onClick={draftPlayer}>Draft</button>
        </div>
    );
}