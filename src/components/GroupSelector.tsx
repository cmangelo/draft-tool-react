import React, { ChangeEvent } from 'react';

import { EPosition } from '../models/enums/position.enum';

export const GroupSelector: React.FC<{ visibleGroups: { [key: number]: boolean }, togglePositionVisible: Function }> = (props: { visibleGroups: { [key: number]: boolean }, togglePositionVisible: Function }) => {

    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value)
            props.togglePositionVisible(e.target.value);
    }

    return (
        <div className="GroupSelector">
            {Object.keys(props.visibleGroups).map((key: string) => {
                const group = parseInt(key);
                const inputId = "i" + group;
                return (
                    <div key={key}>
                        <input type="radio"
                            id={inputId}
                            value={group}
                            onChange={handleCheckbox}
                            checked={props.visibleGroups[group]} />
                        <label htmlFor={inputId}>{EPosition[group]}</label>
                    </div>
                );
            })}
        </div>
    );
}