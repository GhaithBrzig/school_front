/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComptableListComponent } from './comptableList.component';

describe('ComptableListComponent', () => {
  let component: ComptableListComponent;
  let fixture: ComponentFixture<ComptableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
