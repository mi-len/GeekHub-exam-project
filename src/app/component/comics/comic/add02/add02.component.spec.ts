import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Add02Component } from './add02.component';

describe('Add02Component', () => {
  let component: Add02Component;
  let fixture: ComponentFixture<Add02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
