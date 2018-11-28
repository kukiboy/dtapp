/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FotoRedaktorComponent } from './foto-redaktor.component';

describe('FotoRedaktorComponent', () => {
  let component: FotoRedaktorComponent;
  let fixture: ComponentFixture<FotoRedaktorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoRedaktorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoRedaktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
