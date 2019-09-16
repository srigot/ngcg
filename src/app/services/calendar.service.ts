import { Injectable } from '@angular/core';
import { Conges } from '../models/conges';

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
    const dateFinPlusUn = new Date(conge.dateFin);
    dateFinPlusUn.setDate(dateFinPlusUn.getDate() + 1);
    return gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: conge.dateDebut,
      },
      end: {
        dateTime: dateFinPlusUn,
      },
      summary: 'Congés',
    });
  }
  updateEvent(conge: Conges): Promise<any> {
    const dateFinPlusUn = new Date(conge.dateFin);
    dateFinPlusUn.setDate(dateFinPlusUn.getDate() + 1);
    return gapi.client.calendar.events.update({
      calendarId: 'primary',
      eventId: conge.eventId,
      start: {
        dateTime: conge.dateDebut,
      },
      end: {
        dateTime: dateFinPlusUn,
      },
      summary: 'Congés',
    });
  }
}
