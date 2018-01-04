import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { User } from '../../shared/user/user-model/user.model';
import { ImageService } from '../../shared/image.service';
import { Subscription } from 'rxjs/Subscription';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { EditBasicInfoModalComponent } from './edit-basic-info-modal/edit-basic-info-modal.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  @ViewChild('profilePhotoRef') profilePhotoRef: ElementRef;
  @Input() user: User;
  profilePhotoRoute: string;

  newProfilePictureUploadedSubscription: Subscription;

  cropImageModalFactory: ComponentFactory<CropImageModalComponent>;
  cropImageModalComponent: ComponentRef<CropImageModalComponent>;

  editBasicInfoModalFactory: ComponentFactory<EditBasicInfoModalComponent>;
  editBasicInfoModalComponent: ComponentRef<EditBasicInfoModalComponent>;

  constructor(private imageService: ImageService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.user.profilePhotoId) {
      this.profilePhotoRoute = this.imageService.getNewProfilePhotoUrlForCurrentUser();
    }

    this.cropImageModalFactory = this.componentFactoryResolver.resolveComponentFactory(CropImageModalComponent);
    this.editBasicInfoModalFactory = this.componentFactoryResolver.resolveComponentFactory(EditBasicInfoModalComponent);
  }

  profilePhotoFileChange(event: Event) {
    const target: any = event.target;
    const fileList: FileList = target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.createCropImageComponent(file);
    }
    target.value = null;
  }

  createCropImageComponent(file: File) {
    if (this.cropImageModalComponent) {
      this.cropImageModalComponent.destroy();
    }
    this.cropImageModalComponent = this.viewContainerRef.createComponent(this.cropImageModalFactory);
    this.cropImageModalComponent.instance.file = file;
    this.newProfilePictureUploadedSubscription =
      this.cropImageModalComponent.instance.successfulUploadImageEvent.subscribe(
        () => {
          this.profilePhotoRef.nativeElement.src = this.imageService.getNewProfilePhotoUrlForCurrentUser();
        }
      );
    this.cropImageModalComponent.changeDetectorRef.detectChanges();
  }

  onEditBasicInfoClick() {
    this.createEditBasicInfoComponent();
  }

  createEditBasicInfoComponent() {
    if (this.editBasicInfoModalComponent) {
      this.editBasicInfoModalComponent.destroy();
    }
    this.editBasicInfoModalComponent = this.viewContainerRef.createComponent(this.editBasicInfoModalFactory);
    this.editBasicInfoModalComponent.instance.user = this.user;
    this.editBasicInfoModalComponent.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.newProfilePictureUploadedSubscription) {
      this.newProfilePictureUploadedSubscription.unsubscribe();
    }
  }
}
