import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheCarteComponent } from './affiche-carte.component';

describe('AfficheCarteComponent', () => {
  let component: AfficheCarteComponent;
  let fixture: ComponentFixture<AfficheCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheCarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
