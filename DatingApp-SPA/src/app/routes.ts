import { Routes } from '@angular/router';
import { BallinaComponent } from './ballina/ballina.component';
import { ListaAntareveComponent } from './lista-antareve/lista-antareve.component';
import { MesazhetComponent } from './mesazhet/mesazhet.component';
import { ListatComponent } from './listat/listat.component';
import { AuthGuard } from './_rojet/auth.guard';

export const appRutet: Routes = [
    // { path: 'ballina', component: BallinaComponent },
    { path: '', component: BallinaComponent },

    {
        path: '', // path: 'diqka', atehere duhet me perdor = localhost:4200/diqkaantaret
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children [
                { path: 'antaret', component: ListaAntareveComponent },
                { path: 'mesazhet', component: MesazhetComponent },
                { path: 'listat', component: ListatComponent },
        ]
    },
    // { path: '**', redirectTo: 'ballina', pathMatch: 'full' }
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
