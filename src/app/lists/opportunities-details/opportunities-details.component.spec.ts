import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesDetailsComponent } from './opportunities-details.component';

describe('OpportunitiesDetailsComponent', () => {
  let component: OpportunitiesDetailsComponent;
  let fixture: ComponentFixture<OpportunitiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitiesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
