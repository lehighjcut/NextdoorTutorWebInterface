import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from './tutor.model';

@Injectable()
export class TutorService {

  private static readonly ADDTUTORROUTE = '/api/tutors/add';
  private static readonly GETUTORSFORCOURSEROUTE = '/api/tutors/course';
  private static readonly GETTUTORROUTE = '/api/tutors';
  private static readonly DELETETUTORROUTE = '/api/tutors';
  private static readonly UPDATETUTORROUTE = '/api/tutors';
  private static readonly REQUESTUTORROUTE = '/api/tutors/request';

  constructor(private httpClient: HttpClient) {
  }

  addTutor(tutor: Tutor) {
    return this.httpClient.post(TutorService.ADDTUTORROUTE, tutor);
  }

  getTutorsForCourse(courseNumber: string) {
    return this.httpClient.get(TutorService.GETUTORSFORCOURSEROUTE + '/' + courseNumber);
  }

  getTutorById(tutorId: string, courseNumber: string) {
    const params = new HttpParams().set('courseNumber', courseNumber);
    return this.httpClient.get(
      TutorService.GETTUTORROUTE + '/' + tutorId,
      { params: params });
  }

  removeCurrentUserFromCourseTutor(courseNumber: string) {
    const params = new HttpParams().set('courseNumber', courseNumber);
    return this.httpClient.delete(
      TutorService.DELETETUTORROUTE,
      { params: params });
  }

  updateTutorAsCurrentUser(courseNumber: string, hourlyRate: number, pastExperience: string, notes: string,
                           successFunction: (data: any) => any, errorFunction: (data: any) => any) {
    return this.httpClient.put(
      TutorService.UPDATETUTORROUTE,
      {
        courseNumber: courseNumber, hourlyRate: hourlyRate,
        pastExperience: pastExperience, notes: notes
      }
    );
  }

  sendEmailToTutor(subject: string, message: string, tutorEmail: string, relatedCourse: string) {
    return this.httpClient.post(
      TutorService.REQUESTUTORROUTE,
      {
        subject: subject,
        message: message,
        tutorEmail: tutorEmail,
        relatedCourse: relatedCourse
      }
    );
  }
}
