import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEdit } from './products.component';

describe('ProductEdit', () => {
  let component: ProductEdit;
  let fixture: ComponentFixture<ProductEdit>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductEdit]
    });
    fixture = TestBed.createComponent(ProductEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
