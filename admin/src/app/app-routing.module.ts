import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth.guard';

export const Approutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent  // Directly reference LoginComponent
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],  // Show FullComponent after login
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'  // Redirect any undefined paths to login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// export const Approutes: Routes = [
//   {
//     path: '',
//     component: FullComponent,
//     children: [
//       { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
//       },
//       {
//         path: 'about',
//         loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
//       },
//       {
//         path: 'component',
//         loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
//       }
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: '/starter'
//   }
// ];