import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAccessComponent } from './media-access.component';

describe('MediaAccessComponent', () => {
  let component: MediaAccessComponent;
  let fixture: ComponentFixture<MediaAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
