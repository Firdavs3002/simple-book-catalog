import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { FeedbackService } from 'src/services/feedback.service';

interface Feedback {
  user_name: string;
  body: string;
  // Add more properties as needed
}


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackModal implements OnInit {
  feedbackForm: FormGroup;
  feedbackList: Feedback[] = [];
  constructor(
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<FeedbackModal>,
    private _feedbackService: FeedbackService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // _dialogRef.disableClose = true;
    this.feedbackForm = this._fb.group({
      user_name: ['', Validators.required], // Requires a value
      body: ['', Validators.required], // Minimum 3 characters
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.getFeedbacks();
    }
  }

  getFeedbacks() {
    this._feedbackService.getFeedbackList(this.data.id).subscribe({
      next: (res) => {
        console.log('res ', res);
        this.feedbackList = res;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteFeedback(feedback: any) {
    const { book_id, id } = feedback || {};
    this._feedbackService.deleteFeedback(book_id, id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Feedback deleteed', 'done');
        this.getFeedbacks();
      },
      error: console.log,
    });
  }

  //Function for insert new product and update exist product in the products from.
  onFormSubmit() {
    console.log(this.feedbackForm.value);
    if (this.feedbackForm.valid) {
      const { user_name, body } = this.feedbackForm.value;
      this._feedbackService
        .addFeedback(this.data.id, { user_name, body })
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Feedback added', 'done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }
}
