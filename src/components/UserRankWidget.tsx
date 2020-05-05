import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { UserRanking } from '../models/enums/user-ranking.enum';
import { IPlayer } from '../models/player.interface';

type props = {
    size: 'lg' | '3x',
    player: IPlayer,
    rankPlayer: Function,
    deleteRank: Function
}

export const UserRankWidget: React.FC<props> = (props: props) => {
    const { player, size } = props;

    const rankPlayer = (rank: UserRanking, $event: any) => {
        $event.stopPropagation();
        if (props.player.userRank !== rank) {
            props.rankPlayer(player._id, rank)
        } else {
            props.deleteRank(player._id);
        }
    }

    return (
        <div className="UserRankWidget">
            <FontAwesomeIcon
                icon={player?.userRank === UserRanking.AllIn ? "check-square" : "square"}
                size={size}
                className="all-in"
                onClick={($event) => rankPlayer(UserRanking.AllIn, $event)} />
            <FontAwesomeIcon
                icon={player?.userRank === UserRanking.Neutral ? "check-square" : "square"}
                size={size}
                className="neutral"
                onClick={($event) => rankPlayer(UserRanking.Neutral, $event)} />
            <FontAwesomeIcon
                icon={player?.userRank === UserRanking.AllOut ? "check-square" : "square"}
                size={size}
                className="all-out"
                onClick={($event) => rankPlayer(UserRanking.AllOut, $event)} />
        </div>
    )
}