import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeDialog } from './create-recipe-dialog';

describe('CreateRecipeDialog', () => {
  let component: CreateRecipeDialog;
  let fixture: ComponentFixture<CreateRecipeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
