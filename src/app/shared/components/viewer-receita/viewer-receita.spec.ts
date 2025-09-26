import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerReceita } from './viewer-receita';

describe('ViewerReceita', () => {
  let component: ViewerReceita;
  let fixture: ComponentFixture<ViewerReceita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewerReceita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerReceita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
