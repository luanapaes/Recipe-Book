import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeDialog } from './edit-recipe-dialog';

describe('EditRecipeDialog', () => {
  let component: EditRecipeDialog;
  let fixture: ComponentFixture<EditRecipeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecipeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecipeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
