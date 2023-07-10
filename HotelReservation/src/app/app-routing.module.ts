import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"booking", component:BookingComponent},
  {path:"bookings-list", component:BookingsListComponent},
  {path:"", redirectTo:"/dashboard", pathMatch:"full"},
  {path:"**", redirectTo:"/dashboard", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
