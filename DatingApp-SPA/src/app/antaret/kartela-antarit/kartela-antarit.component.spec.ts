/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KartelaAntaritComponent } from './kartela-antarit.component';

describe('KartelaAntaritComponent', () => {
  let component: KartelaAntaritComponent;
  let fixture: ComponentFixture<KartelaAntaritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KartelaAntaritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KartelaAntaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
