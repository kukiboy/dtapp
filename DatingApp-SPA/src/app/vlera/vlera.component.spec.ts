/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VleraComponent } from './vlera.component';

describe('VleraComponent', () => {
  let component: VleraComponent;
  let fixture: ComponentFixture<VleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
