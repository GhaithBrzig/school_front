/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ComptableformComponent } from './comptableform.component';

describe('ComptableformComponent', () => {
  let component: ComptableformComponent;
  let fixture: ComponentFixture<ComptableformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComptableformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComptableformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
