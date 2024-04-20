/* eslint-disable @typescript-eslint/no-empty-function */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxFileDropModule } from 'ngx-file-drop';
import { GoogleMapsModule } from '@angular/google-maps';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CountdownModule } from 'ngx-countdown';
import { AppComponent } from './app.component';
import { PropertycardComponent } from './property/property-card/property-card..component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/authService';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxPaginationModule } from 'ngx-pagination'; 
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'


import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PhotoEditorComponent } from './property/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FamilydocsComponent } from './FamilyDocuments/familydocs/familydocs.component';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorInterceptorService } from './services/httperor-interceptor.service';
import { CallbackComponent } from './callback/callback.component';
import { SubscriptionComponent } from './Subscription/Subscription.component';


  const appRoutes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'familydocuments', component: FamilydocsComponent},
  {path: 'buy-property', component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'property-detail/:id', component: PropertyDetailComponent, resolve: {prp: PropertyDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: 'callback/:id', component: CallbackComponent, resolve: {prp2: PropertyDetailResolverService}},
  {path: 'subscrption', component: SubscriptionComponent},
  {path: '**', component: PropertyListComponent}
  
]

const dialogMock = {
  close: () => { }
  };


@NgModule({
  
  declarations: [			
    AppComponent,
    PropertycardComponent,
    PropertyListComponent,
    FamilydocsComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserRegisterComponent,
      UserLoginComponent,
      FilterPipe,
      
      SortPipe,
      PhotoEditorComponent,
      CallbackComponent,
      SubscriptionComponent,
      SubscriptionComponent
   ],
  
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    BrowserModule, 
    CountdownModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    NgxGalleryModule,
    NgxFileDropModule,
    MatCheckboxModule,
    BrowserModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    GoogleMapsModule,
    NgxPaginationModule,
    MatTabsModule,
    FileUploadModule
  ],

  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: dialogMock },
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // },

    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},

    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    HousingService,
    AlertifyService,
    AuthService,
    PropertyDetailResolverService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
