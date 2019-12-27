import React from 'react';

import { EPlayer } from '../models/enums/player.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';

export const PlayerGroup: React.FC<{ group: IGroup }> = (props: { group: IGroup }) => {

    const createTiers = () => {
        return (props.group.tiers as Array<ITier>).map((tier: ITier) => {
            return (
                <div key={tier._id}>
                    <div className="tier-header">
                        <div className="tier-number">Tier {tier.tierNumber}</div>
                        <hr />
                    </div>
                    {listPlayers(tier)}
                </div>
            )
        });
    }

    const draftPlayer = () => {
        console.log('draft')
    }

    const listPlayers = (tier: ITier) => {
        return (tier.players as Array<IPlayer>).map((player: IPlayer, ind: number) => {
            return (
                <div key={player._id} className="player-row">
                    <span className="player-rank">{tier.startingAtRank + ind}</span>
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
        });
    }

    return (
        <div className="Group">
            {createTiers()}
        </div>
    );
}