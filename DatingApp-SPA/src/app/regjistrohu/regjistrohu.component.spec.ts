/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegjistrohuComponent } from './regjistrohu.component';

describe('RegjistrohuComponent', () => {
  let component: RegjistrohuComponent;
  let fixture: ComponentFixture<RegjistrohuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegjistrohuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegjistrohuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
