import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackModal } from './feedback.component';



describe('FeedbackModal', () => {
  let component: FeedbackModal;
  let fixture: ComponentFixture<FeedbackModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackModal]
    });
    fixture = TestBed.createComponent(FeedbackModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
