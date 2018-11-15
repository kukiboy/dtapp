import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { RedaktoAntarinComponent } from '../antaret/redakto-antarin/redakto-antarin.component';

@Injectable()
export class ParandaloHumbjeShenimesh implements CanDeactivate<RedaktoAntarinComponent> {
    canDeactivate(component: RedaktoAntarinComponent) {
        if (component.editForm.dirty) {
            return confirm('A je i sigurte? Ndryshime e fundit do te humbasin!');
        }
        return true;
    }
}
