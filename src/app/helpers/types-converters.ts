import { Timestamp } from '@angular/fire/firestore';
import moment from 'moment';
import { Moment } from 'moment';

export const convertToTimestamp = (date: Moment | null): Timestamp | null => {
    return date === null ? null : Timestamp.fromDate(date.toDate());
}

export const convertToDate = (timestamp: Timestamp | null): Moment | null => {
    return timestamp === null ? null : moment(timestamp.toDate());
}
