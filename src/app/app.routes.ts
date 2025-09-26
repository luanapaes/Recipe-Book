import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Recipes } from './pages/recipes/recipes';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        title: 'Faça Login'
    }, 
    {
        path: 'recipes',
        component: Recipes,
        title: "Página Inicial",
        canActivate: [AuthGuard]
    }
];
