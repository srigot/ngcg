import firebase from 'firebase/app';
import * as moment from 'moment';
import { Moment } from 'moment';

export const convertToTimestamp = (date: Moment | null): firebase.firestore.Timestamp | null => {
    return date === null ? null : firebase.firestore.Timestamp.fromDate(date.toDate());
}

export const convertToDate = (timestamp: firebase.firestore.Timestamp | null): Moment | null => {
    return timestamp === null ? null : moment(timestamp.toDate());
}
