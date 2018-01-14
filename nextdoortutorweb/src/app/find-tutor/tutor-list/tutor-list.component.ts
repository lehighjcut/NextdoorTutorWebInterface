import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { Tutor } from '../../shared/tutor/tutor-model/tutor.model';
import { UserSessionService } from '../../shared/user-session/user-session.service';
import { DataNeededToFormEmailToTutor } from './email-tutor-modal/DataNeededToFormEmailToTutor';
import { EmailTutorModalComponent } from './email-tutor-modal/email-tutor-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { TutorService } from '../../shared/tutor/tutor.service';
import { User } from '../../shared/user/user-model/user.model';
import { DynamicComponentGenerator } from '../../shared/dynamic-component-generator';
import { OverallTutorReviewSummary } from '../../shared/tutor/reviews/overall-tutor-review-summary.model';
import { OverallTutorReviewSummarySortService } from './overall-tutor-review-summary-sort.service';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss']
})
export class TutorListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() summaries: OverallTutorReviewSummary[];

  currentUser: User;
  currentUserSubscription: Subscription;

  dynamicEmailTutorComponentGenerator: DynamicComponentGenerator<EmailTutorModalComponent>;

  constructor(public userSessionService: UserSessionService,
              private overallTutorReviewSummarySortService: OverallTutorReviewSummarySortService,
              private tutorService: TutorService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    this.currentUser = this.userSessionService.getCurrentUser();
    this.currentUserSubscription = this.userSessionService.getCurrentUserObservable().subscribe(
      (user: User) => this.currentUser = user
    );
    this.dynamicEmailTutorComponentGenerator = new DynamicComponentGenerator<EmailTutorModalComponent>(
      this.componentFactoryResolver, this.viewContainerRef, EmailTutorModalComponent
    );
  }

  onSortAscendingClick() {
    this.overallTutorReviewSummarySortService.sortAscending(this.summaries);
  }

  onSortDescendingClick() {
    this.overallTutorReviewSummarySortService.sortDescending(this.summaries);
  }

  onSortByHourlyRateClick() {
    this.overallTutorReviewSummarySortService.sortByHourlyRate(this.summaries);
  }

  onSortByGradeClick() {
    this.overallTutorReviewSummarySortService.sortByGrade(this.summaries);
  }

  onSortByAverageOverallReviewClick() {
    this.overallTutorReviewSummarySortService.sortByAverageOverAllCourses(this.summaries);
  }

  onSortByAverageCourseReviewClick() {
    this.overallTutorReviewSummarySortService.sortByAverageForCourse(this.summaries);
  }

  ngAfterViewInit() {
    $('.collapsible').collapsible();
    $('input.character-count').characterCounter();
    $('textarea.character-count').characterCounter();
  }

  onBookTutor(event: Event, email: string, courseNumber: string, name: string) {
    event.preventDefault();
    event.stopPropagation();
    const emailTutorData: DataNeededToFormEmailToTutor = {
      tutorEmail: email,
      courseNumber: courseNumber,
      tutorName: name
    };
    this.createEmailTutorModalComponent(emailTutorData);
  }

  instructorEndorseTutor(event: Event, tutorId: string, tutorCourseNumber: string, tutor: Tutor, instructorName: string) {
    event.preventDefault();
    event.stopPropagation();
    this.tutorService.giveInstructorEndorsement(tutorId, tutorCourseNumber).subscribe(
      (isSuccessful: boolean) => {
        if (isSuccessful) {
          tutor.instructorNameWhoEndorsed = instructorName;
        } else {
          Materialize.toast(
            'Failed to endorse tutor. Make sure you check with Jordan Cutler that you are registered as an instructor',
            3000);
        }
      },
      (error) => {
        Materialize.toast(
          'Failed to endorse tutor. Make sure you check with Jordan Cutler that you are registered as an instructor',
          3000);
      }
    );
  }

  removeInstructorEndorsement(event: Event, tutorId: string, tutorCourseNumber: string, tutor: Tutor, instructorName: string) {
    event.preventDefault();
    event.stopPropagation();
    if (tutor.instructorNameWhoEndorsed !== instructorName) {
      Materialize.toast('You are not allowed to remove a different professor endorsement', 3000);
      return false;
    }
    this.tutorService.removeInstructorEndorsement(tutorId, tutorCourseNumber).subscribe(
      (isSuccessful: boolean) => {
        if (isSuccessful) {
          tutor.instructorNameWhoEndorsed = null;
        } else {
          Materialize.toast('Failed to remove endorsement. Make sure you are the instructor who gave the endorsement', 3000);
        }
      },
      (error) => {
        Materialize.toast('Failed to remove endorsement. Make sure you are the instructor who gave the endorsement', 3000);
      }
    );
  }

  createEmailTutorModalComponent(emailTutorData: DataNeededToFormEmailToTutor) {
    this.dynamicEmailTutorComponentGenerator.destroyComponentIfExists();
    this.dynamicEmailTutorComponentGenerator.createComponent();
    this.dynamicEmailTutorComponentGenerator.getComponentInstance().emailTutorData = emailTutorData;
    this.dynamicEmailTutorComponentGenerator.addComponentToDom();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
