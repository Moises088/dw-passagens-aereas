import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFlightComponent } from './account-flight.component';

describe('AccountFlightComponent', () => {
  let component: AccountFlightComponent;
  let fixture: ComponentFixture<AccountFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountFlightComponent]
    });
    fixture = TestBed.createComponent(AccountFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
