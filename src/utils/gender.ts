import { CHILD_GENDERS } from '../constants/child';
import { ChildGender } from '../types/api';

const genderMap = {
    [CHILD_GENDERS.MALE]: 'Male',
    [CHILD_GENDERS.FEMALE]: 'Female',
    [CHILD_GENDERS.OTHER]: 'Other',
};

export const getGender = (gender: ChildGender) => {
    return genderMap[gender];
};
