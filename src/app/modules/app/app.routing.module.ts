import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../services/auth-guard.service';

const appRoutes: Routes = [
  {path: 'user', loadChildren: '../user/user.module#UserModule'},
  {path: '', loadChildren: '../dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
