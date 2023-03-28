import { Injectable } from '@angular/core';
import { Conges } from '../models/conges';
import * as moment from 'moment';

declare const gapi: any;

const CALENDAR_ID = 'primary';
const COLOR_ID = '2';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  getListeCalendrier() {
    gapi.client.calendar.events.list({ calendarId: CALENDAR_ID }).then((res) => {
      console.log(res);
    });

  }

  insertEvent(conge: Conges): Promise<any> {
    return gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      ...this.getDatas(conge),
    });
  }
  updateEvent(conge: Conges): Promise<any> {
    return gapi.client.calendar.events.update({
      calendarId: CALENDAR_ID,
      eventId: conge.eventId,
      ...this.getDatas(conge),
    });
  }

  private getDatas(conge: Conges): any {
    const dateFinPlusUn = moment(conge.dateFin).add(1, 'days');
    return {
      start: {
        dateTime: conge.dateDebut.toDate(),
      },
      end: {
        dateTime: dateFinPlusUn.toDate(),
      },
      summary: 'Congés' + (conge.previsionnel ? ' - prévisionnel' : ''),
      colorId: COLOR_ID,
    };
  }

  async mettreAJourCalendrier(data: Conges): Promise<any> {
    if (data.eventId === null || data.eventId === undefined) {
      return this.insertEvent(data);
    } else {
      try {
        const val = await this.updateEvent(data);
        return await Promise.resolve(val);
      } catch (err) {
        if (err.status === 404) {
          return this.insertEvent(data);
        } else {
          return Promise.reject(err);
        }
      }
    }
  }


}
