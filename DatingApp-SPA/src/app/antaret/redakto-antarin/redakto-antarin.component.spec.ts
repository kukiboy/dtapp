/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RedaktoAntarinComponent } from './redakto-antarin.component';

describe('RedaktoAntarinComponent', () => {
  let component: RedaktoAntarinComponent;
  let fixture: ComponentFixture<RedaktoAntarinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedaktoAntarinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedaktoAntarinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
