/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormEleveComponent } from './formEleve.component';

describe('FormEleveComponent', () => {
  let component: FormEleveComponent;
  let fixture: ComponentFixture<FormEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
