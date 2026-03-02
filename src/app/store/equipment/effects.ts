import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { loadEquipment } from "./actions";

@Injectable()
export class EquipmentEffects {
  private actions$: Actions<any> = inject(Actions);

  logLoadEquipment$ = createEffect(()=>
      this.actions$.pipe(
        ofType(loadEquipment),
        tap(() => console.log("Loading equipments ....")),
        tap(() => console.log("Equipments loading completed")),
      ),
    { dispatch: false }
  );
}
