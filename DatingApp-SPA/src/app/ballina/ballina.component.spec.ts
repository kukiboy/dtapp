/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BallinaComponent } from './ballina.component';

describe('BallinaComponent', () => {
  let component: BallinaComponent;
  let fixture: ComponentFixture<BallinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
