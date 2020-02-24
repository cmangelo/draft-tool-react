import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { IPick } from '../models/pick.interface';
import { IPlayer } from '../models/player.interface';

export const DraftPickCard: React.FC<any> = (props: any) => {
    const pick = props.pick as IPick;
    const player = pick.playerObject as IPlayer;
    if (!player)
        return (
            <div className="draft-pick-card">
                <div className="top">
                    <span className="pos-team"></span>
                    <span className="round-pick">{props.round}.{props.roundPick}</span>
                </div>
            </div>
        );
    return (
        <div className={`draft-pick-card ${EPosition[player.position as number]}`}>
            <div className="top">
                <span className="pos-team">{EPosition[player.position]} - {player.team}</span>
                <span className="round-pick">{props.round}.{props.roundPick}</span>
            </div>
            <div className="bottom">
                <div className="name">
                    <span className="first-name">{player.name.split(' ')[0]}</span>
                    <span className="last-name">{player.name.split(' ')[1]}</span>
                </div>
                <span className="bye">({player.bye})</span>
            </div>
        </div>
    )
}