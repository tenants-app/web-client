import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import {GroupsComponent} from './groups/groups.component';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import {FormsModule} from '@angular/forms';
import {GroupDialogComponent} from './groups/group-dialog/group-dialog.component';
import {GroupComponent} from './groups/group/group.component';
import {InvitationDialogComponent} from './groups/invitation-dialog/invitation-dialog.component';
import {GroupJoinComponent} from './groups/group-join/group-join.component';
import {MembersComponent} from './groups/members/members.component';
import {BillsComponent} from './groups/bills/bills.component';
import { ShoppingComponent } from './groups/shopping/shopping.component';
import { CreateShoppingListComponent } from './groups/create-shopping-list/create-shopping-list.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        GroupsComponent,
        GroupDialogComponent,
        GroupComponent,
        InvitationDialogComponent,
        GroupJoinComponent,
        MembersComponent,
        BillsComponent,
        ShoppingComponent,
        CreateShoppingListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('token');
                },
                whitelistedDomains: ['localhost:3000']
            }
        })
    ],
    providers: [AuthInterceptor,
        AuthGuard,
        GuestGuard],
    bootstrap: [AppComponent],
    entryComponents: [
        GroupDialogComponent,
        InvitationDialogComponent,
    ],
})
export class AppModule {
}
