import { useState } from 'react';
import { ChildGender, ChildName } from '../../types/api';
import { Button } from '../Button/Button';
import { TimePicker } from '../TimePicker/TimePicker';
import { nowTimeString } from '../../utils/time';
import styles from './ChildItem.module.scss';
import { Loader } from '../Loader/Loader';
import { ChildActions } from './partials/ChildActions/ChildActions';

interface ChildItemProps {
    id: string;
    name: ChildName;
    checkedIn: boolean;
    gender: ChildGender;
    pickupTime?: Date;
    onCheckIn: (childId: string, pickupTime: Date) => void;
    onCheckOut: (childId: string) => void;
}

export const ChildItem = ({
    id,
    name,
    checkedIn,
    pickupTime,
    onCheckIn,
    onCheckOut,
}: ChildItemProps) => {
    return (
        <>
            <div className={styles.info}>
                <h2 className={styles.name}>{name.fullName}</h2>
                <span>{checkedIn ? 'Checked in' : 'Checked out'}</span>
            </div>
            <ChildActions
                id={id}
                checkedIn={checkedIn}
                pickupTime={pickupTime}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
            />
        </>
    );
};
