import { ChildName } from '../../types/api';
import { Button } from '../Button/Button';

interface ChildItemProps {
    id: string;
    name: ChildName;
    checkedIn: boolean;
    pickupTime?: Date;
    onCheckIn: (childId: string) => void;
    onCheckOut: (childId: string) => void;
}

export const ChildItem = ({
    id,
    name,
    checkedIn,
    pickupTime,
    onCheckIn,
    onCheckOut,
}: ChildItemProps) => (
    <div key={id}>
        <p>{name.fullName}</p>
        <p>{checkedIn ? 'Checked in' : 'Checked out'}</p>
        {pickupTime && <p>Pickup time: {pickupTime.toLocaleTimeString()}</p>}
        <div className="buttons">
            <Button variant="primary" onClick={() => onCheckIn(id)}>
                <span>Check in {name.firstName}</span>
            </Button>
            <Button onClick={() => onCheckOut(id)}>
                <span>Check out {name.firstName}</span>
            </Button>
        </div>
    </div>
);
