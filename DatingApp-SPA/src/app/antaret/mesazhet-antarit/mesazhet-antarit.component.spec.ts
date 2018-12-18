/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MesazhetAntaritComponent } from './mesazhet-antarit.component';

describe('MesazhetAntaritComponent', () => {
  let component: MesazhetAntaritComponent;
  let fixture: ComponentFixture<MesazhetAntaritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesazhetAntaritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesazhetAntaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
