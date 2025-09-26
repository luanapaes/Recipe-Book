import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../interfaces/recipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewer-receita',
  imports: [MatDialogActions, MatDialogClose, MatButtonModule
  ],
  templateUrl: './viewer-receita.html',
  styleUrl: './viewer-receita.css'
})
export class ViewerReceita implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { receita: Recipe }) { }
  receita!: Recipe;

  ngOnInit(): void {
    this.receita = this.data.receita
  }
}
