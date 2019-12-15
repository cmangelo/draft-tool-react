import React from 'react';

import { IPlayer } from '../models/player.interface';

export const Player: React.FC<{ player: IPlayer }> = (props: { player: IPlayer }) => {
    return (
        <div>
            <span>{props.player.name}</span>
        </div>
    )
}
