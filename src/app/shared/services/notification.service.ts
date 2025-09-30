import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../interfaces/recipe";

@Injectable({
    providedIn: "root"
})
export class NotificationService {
    private notificationSubject = new Subject<Recipe>();

    notification$ = this.notificationSubject.asObservable();

    sendNotification(recipe: Recipe) {
        this.notificationSubject.next(recipe);
    }
}