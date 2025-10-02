import { LiveAnnouncer } from "@angular/cdk/a11y";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";

@Injectable({
    providedIn: 'root'
})
export class CreateChipsMaterialService {
    // INGREDIENTES
    readonly announcerIngrediente = inject(LiveAnnouncer);
    currentChipIngrediente = signal('');
    readonly chipsIngrediente = signal<string[]>([]);

    // INSTRUÇÕES
    readonly announcerInstrucao = inject(LiveAnnouncer);
    currentChipInstrucao = signal('');
    readonly chipsInstrucao = signal<string[]>([]);

    // INGREDIENTES METHODS 
    addIngrediente(event: MatChipInputEvent, currentChip: WritableSignal<string>): void {
        const value = (event.value || '').trim();
        if (value) {
            this.chipsIngrediente.update(chip => [...chip, value]);
        }
        // limpa input SEMPRE
        currentChip.set('');
    }

    removeIngrediente(chipToRemoveIngrediente: string): void {
        this.chipsIngrediente.update(chips => {
            const newChips = chips.filter(chip => chip !== chipToRemoveIngrediente);
            if (chips.length !== newChips.length) {
                this.announcerIngrediente.announce(`Removed ${chipToRemoveIngrediente}`);
            }
            return newChips;
        });
    }

    selectedIngrediente(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.viewValue;
        if (value) {
            this.chipsIngrediente.update(chips => [...chips, value]);
        }
        this.currentChipIngrediente.set('');
        event.option.deselect();
    }

    // INSTRUÇÕES METHODS
    addInstrucao(event: MatChipInputEvent, currentChip: WritableSignal<string>): void {
        const value = (event.value || '').trim();
        if (value) {
            this.chipsInstrucao.update(chip => [...chip, value]);
        }
        // limpa input SEMPRE
        currentChip.set('');
    }

    removeInstrucao(chipToRemove: string): void {
        this.chipsInstrucao.update(chips => {
            const newChips = chips.filter(chip => chip !== chipToRemove);
            if (chips.length !== newChips.length) {
                this.announcerInstrucao.announce(`Removed ${chipToRemove}`);
            }
            return newChips;
        });
    }

    selectedInstrucao(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.viewValue;
        if (value) {
            this.chipsIngrediente.update(chips => [...chips, value]);
        }
        this.currentChipInstrucao.set('');
        event.option.deselect();
    }
}