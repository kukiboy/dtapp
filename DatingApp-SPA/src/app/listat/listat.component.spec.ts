/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListatComponent } from './listat.component';

describe('ListatComponent', () => {
  let component: ListatComponent;
  let fixture: ComponentFixture<ListatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
