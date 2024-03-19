import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from './core/core.service';
import { ProductService } from 'src/services/product.service';
import { FeedbackService } from 'src/services/feedback.service'; // Assuming feedback service exists
import { ProductEdit } from '../components/products/products.component';
import { FeedbackModal } from '../components/feedbackModal/feedback.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FeedbackModal } from 'src/components/feedbackModal/feedback.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-front';
  displayedColumns: string[] = [
    'author',
    'name',
    'price',
    'year',
    'language',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  feedbackList = [{ content: 'very good book', createdAt: new Date() }];
  // feedback = {
  //   content: '',
  //   createdAt: undefined,
  // };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  feedback: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _feedbackService: FeedbackService,
    private _proService: ProductService,
    private _coreService: CoreService
  ) {
    this.feedback = this._fb.group({
      content: [''],
    });
  }

  ngOnInit(): void {
    this.feedback.patchValue({
      content: '',
    });
    this.getBooksList();
    this.getFeedbackList();
  }

  //open and update the list of the products in the user sides.
  openAddEditproductForm() {
    const dialogRef = this._dialog.open(ProductEdit);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('val ', val);
        if (val) {
          this.getBooksList();
        }
      },
    });
  }

  openFeedbackForm(data: any) {
     const dialogRef = this._dialog.open(FeedbackModal, {
      data
     });
     dialogRef.afterClosed().subscribe({
       next: (val) => {
         console.log('val ', val);
       },
     });
  }

  getFeedbackList() {
    // this._feedbackService.getFeedbackList().subscribe((feedback) => {
    // this.feedbackList = [
    //   {
    //     content: 'Very good',
    //     name: 'Book 1',
    //   },
    // ];
    // });
  }

  //Seng get request to the server and update the client list of products.
  getBooksList() {
    // this.dataSource = new MatTableDataSource([
    //   {
    //     author: 'John Doe',
    //     name: 'Book 1',
    //     price: 19.99,
    //     year: 2023,
    //     language: 'English',
    //   },
    //   {
    //     author: 'Jane Smith',
    //     name: 'Book 2',
    //     price: 15.99,
    //     year: 2022,
    //     language: 'Spanish',
    //   },
    //   {
    //     author: 'Michael Jones',
    //     name: 'Book 3',
    //     price: 24.99,
    //     year: 2021,
    //     language: 'French',
    //   },
    // ]);

    this._proService.getBooksList().subscribe({
      next: (res) => {
        console.log('res ', res);
        this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  //Dekete product from the server if exist othersie print erorr.
  deleteProduct(id: number) {
    this._proService.deleteProduct(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Product deleteed', 'done');
        this.getBooksList();
      },
      error: console.log,
    });
  }

  //open the list of the products
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ProductEdit, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBooksList();
        }
      },
    });
  }
}
