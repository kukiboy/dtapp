import { Routes } from '@angular/router';
import { BallinaComponent } from './ballina/ballina.component';
import { ListaAntareveComponent } from './antaret/lista-antareve/lista-antareve.component';
import { MesazhetComponent } from './mesazhet/mesazhet.component';
import { ListatComponent } from './listat/listat.component';
import { AuthGuard } from './_rojet/auth.guard';
import { DetajetAntaritComponent } from './antaret/detajet-antarit/detajet-antarit.component';
import { DetajetAntaritResolver } from './_zgjedhesit/detajet-antarit.resolver';
import { ListaAntareveResolver } from './_zgjedhesit/lista-antareve.resolver';
import { RedaktoAntarinComponent } from './antaret/redakto-antarin/redakto-antarin.component';
import { RedaktoAntarResolver } from './_zgjedhesit/redakto-antar.resolver';
import { ParandaloHumbjeShenimesh } from './_rojet/parandalo-humbje-ndryshimesh.guard';
import { ListatResolver } from './_zgjedhesit/listat.resolver';

export const appRutet: Routes = [
    // { path: 'ballina', component: BallinaComponent },
    { path: '', component: BallinaComponent },

    {
        path: '', // path: 'diqka', atehere duhet me perdor = localhost:4200/diqkaantaret
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
                { path: 'antaret', component: ListaAntareveComponent,
                resolve: { perdoruesit: ListaAntareveResolver } },
                { path: 'antaret/:id', component: DetajetAntaritComponent,
                    resolve: {perdorues: DetajetAntaritResolver} },
                { path: 'antar/redakto', component: RedaktoAntarinComponent,
                    resolve: {perdorues: RedaktoAntarResolver},
                    canDeactivate: [ParandaloHumbjeShenimesh]},
                { path: 'mesazhet', component: MesazhetComponent },
            { path: 'listat', component: ListatComponent, resolve: {perdoruesit: ListatResolver}},
        ]
    },
    // { path: '**', redirectTo: 'ballina', pathMatch: 'full' }
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
