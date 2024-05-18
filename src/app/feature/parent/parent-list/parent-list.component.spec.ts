/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ParentListComponent } from './parent-list.component';

describe('ParentListComponent', () => {
  let component: ParentListComponent;
  let fixture: ComponentFixture<ParentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
