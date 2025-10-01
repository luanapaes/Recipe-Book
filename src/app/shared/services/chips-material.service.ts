import { LiveAnnouncer } from "@angular/cdk/a11y";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";

@Injectable({
    providedIn: 'root'
})
export class ChipsMaterialService {
    readonly announcer = inject(LiveAnnouncer);
    currentChip = signal('');
    readonly chips = signal<string[]>([]);

    // METHODS
    add(event: MatChipInputEvent, currentChip: WritableSignal<string>): void {
        const value = (event.value || '').trim();
        if (value) {
            this.chips.update(chip => [...chip, value]);
        }
        // limpa input SEMPRE
        currentChip.set('');
    }

    remove(chipToRemove: string): void {
        this.chips.update(chips => {
            const newChips = chips.filter(chip => chip !== chipToRemove);
            if (chips.length !== newChips.length) {
                this.announcer.announce(`Removed ${chipToRemove}`);
            }
            return newChips;
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.viewValue;
        if (value) {
            this.chips.update(chips => [...chips, value]);
        }
        this.currentChip.set('');
        event.option.deselect();
    }
}