/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesazhetComponent } from './mesazhet.component';

describe('MesazhetComponent', () => {
  let component: MesazhetComponent;
  let fixture: ComponentFixture<MesazhetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesazhetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesazhetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
