import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';

export const routes: Routes = [
    {path: '', redirectTo: 'user-dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: "register", component: RegisterComponent},
    {path: 'user-dashboard', component: UserDashboardComponent },
    {path: 'contact', component: ContactComponent},
    {path: 'about', component: AboutComponent}, 
    {path: 'admin-dashboard', component: AdminDashboardComponent
    },
    {path: "admin-category", component: AdminCategoryComponent}

    //{ path: 'product-details/:id', component: ProductDetailComponent },
];
