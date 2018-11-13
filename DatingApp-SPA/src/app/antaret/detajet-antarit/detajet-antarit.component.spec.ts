/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetajetAntaritComponent } from './detajet-antarit.component';

describe('DetajetAntaritComponent', () => {
  let component: DetajetAntaritComponent;
  let fixture: ComponentFixture<DetajetAntaritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetajetAntaritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetajetAntaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
