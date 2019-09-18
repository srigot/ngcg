import { Injectable } from '@angular/core';
import { Conges } from '../models/conges';
import * as moment from 'moment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getListeCalendrier() {
    gapi.client.calendar.events.list({ calendarId: 'primary' }).then((res) => {
      console.log(res);
    });

  }

  insertEvent(conge: Conges): Promise<any> {
    return gapi.client.calendar.events.insert({
      calendarId: 'primary',
      ...this.getDatas(conge),
    });
  }
  updateEvent(conge: Conges): Promise<any> {
    return gapi.client.calendar.events.update({
      calendarId: 'primary',
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
    };
  }

  mettreAJourCalendrier(data: Conges): Promise<any> {
    if (data.eventId === null || data.eventId === undefined) {
      return this.insertEvent(data);
    } else {
      return this.updateEvent(data)
        .then((val) => Promise.resolve(val))
        .catch((err) => {
          if (err.status === 404) {
            return this.insertEvent(data);
          } else {
            return Promise.reject(err);
          }
        });
    }
  }


}
