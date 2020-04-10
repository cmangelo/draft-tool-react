import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { PlayerRow } from './PlayerRow';

export const PlayerGroup: React.FC<{ group: IGroup, draftPlayer: Function }> = (props: { group: IGroup, draftPlayer: Function }) => {

    const allPlayersInTierDrafted = (tier: ITier) => {
        return (tier.players as Array<IPlayer>).every(player => player.drafted)
            ? "all-drafted" : ""
    }

    const createTiers = () => {
        return (props.group.tiers as Array<ITier>).map((tier: ITier) => {
            return (
                <div key={tier._id}>
                    <div className={"tier-header " + (allPlayersInTierDrafted(tier))}>
                        <div className="tier-number">
                            {
                                props.group.position === EPosition.FLEX ?
                                    <span>FLEX</span> :
                                    <span>{EPosition[props.group.position]} - Tier {tier.tierNumber}</span>
                            }
                        </div>
                        <hr />
                    </div>
                    {listPlayers(tier)}
                </div>
            )
        });
    }

    const listPlayers = (tier: ITier) => {
        return (tier.players as Array<IPlayer>).map((player: IPlayer, ind: number) => {
            return (
                <PlayerRow key={player._id} player={player} rank={tier.startingAtRank + ind} draftPlayer={props.draftPlayer}></PlayerRow>
            )
        });
    }

    return (
        <div className="Group">
            {createTiers()}
        </div>
    );
}