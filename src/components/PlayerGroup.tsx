import React from 'react';

import { EPosition } from '../models/enums/position.enum';
import { IGroup } from '../models/group.interface';
import { IPlayer } from '../models/player.interface';
import { ITier } from '../models/tier.interface';
import { PlayerRow } from './PlayerRow';

type props = {
    group: IGroup,
    selectedPlayer?: string;
    draftPlayer?: Function,
    selectPlayer?: Function,
    rankPlayer?: Function,
    deleteRank?: Function
};

export const PlayerGroup: React.FC<props> = (props: props) => {

    const allPlayersInTierDrafted = (tier: ITier) => {
        return !!props.draftPlayer && (tier.players as Array<IPlayer>).every(player => player.drafted)
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
                <PlayerRow key={player._id}
                    player={player}
                    rank={tier.startingAtRank + ind}
                    draftPlayer={props.draftPlayer}
                    selectPlayer={props.selectPlayer}
                    rankPlayer={props.rankPlayer}
                    deleteRank={props.deleteRank}
                    selected={props.selectedPlayer === player._id}>
                </PlayerRow>
            )
        });
    }

    return (
        <div className="Group">
            {createTiers()}
        </div>
    );
}