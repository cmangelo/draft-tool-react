import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { draftPlayerEffect } from '../effects/draftPlayer';
import { getCurrentDraftState } from '../reducers/draft';
import { getDefenseId, getKickerId } from '../reducers/entities';

interface CurrentDraftState {
    round: number;
    overall: number;
    team: number;
}

export const DraftToolbar: React.FC = () => {
    const dispatch = useDispatch();
    const [dropdownClosed, setDropdownClosed] = useState(true);
    const draftState: CurrentDraftState = useSelector(getCurrentDraftState);
    const kickerId = useSelector(getKickerId);
    const defenseId = useSelector(getDefenseId);

    const draftKicker = () => {
        dispatch(draftPlayerEffect(kickerId));
    }

    const draftDefense = () => {
        dispatch(draftPlayerEffect(defenseId));
    }

    return (
        <div className="DraftToolbar">
            <div className="numbers" onClick={() => setDropdownClosed(!dropdownClosed)}>
                <div className="inner">
                    <p><span>Overall </span>{draftState.overall}</p>
                    <p><span>Round </span>{draftState.round}</p>
                    <p><span>Pick </span>{draftState.team}</p>
                </div>
                <FontAwesomeIcon icon="chevron-down" className={`icon ${!dropdownClosed ? 'flip' : ''}`} />
            </div>
            <div className={`buttons ${dropdownClosed ? 'closed' : ''}`}>
                <button className="defense" onClick={draftDefense}>Draft Defense</button>
                <button className="kicker" onClick={draftKicker}>Draft Kicker</button>
            </div>
        </div>
    );
}