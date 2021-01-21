///<reference path="../../node_modules/ionic-native/dist/es5/plugins/google-plus.d.ts"/>
import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {XHRBackend, RequestOptions, Http} from "@angular/http";
import { AngularFireModule } from 'angularfire2';
import {Facebook} from "@ionic-native/facebook";
import {RecaptchaModule} from "ng-recaptcha";
import {RecaptchaFormsModule} from "ng-recaptcha/recaptcha/recaptcha-forms.module";
import {LazyLoadImageModule} from "ng2-lazyload-image";


import { MyApp } from './app.component';
import {WalkThroughPage} from "../pages/walkthrough/walkthrough";
import {login} from "../pages/login/login";
import {ShowHideInput} from "../shared/directive/showHideInput";
import {ShowHideContainer} from "../shared/showHideContainer";
import {DataService} from "../shared/DataService";
import {HttpService} from "../service/httpservice";
import {SignOutService} from "../service/sign-out-service";
import {mapPage} from "../pages/map/map";
import {MainPage} from "../pages/main/main";
import {HomePage} from "../pages/home/home";
import {MailPage} from "../pages/mail/mail";
import {AuthService} from "../service/auth-service";
import {waitMailPage} from "../pages/waitmail/waitmail";
import {productPage} from "../pages/product/product";
import { ContentDrawer } from '../components/content-drawer/content-drawer';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {DynamicFormQuestionComponent} from "../shared/component/form/dynamic-form-question.component";
import {DynamicFormComponent} from "../shared/component/form/dynamic-form.component";
import {register} from "../pages/register/register";
import {serviceTest} from "../pages/servicetest/servicetest";
import {ShareVariableService} from "../service/share-variable-service";
import {Payment} from "../pages/payment/payment";
import {CartPage} from "../pages/cart/cart";
import {ShippingPage} from "../pages/shippingAddress/shippingAddress";
import {register2} from "../pages/register2/register2";
import {ConfirmationPage} from "../pages/Confirmation/confirmation";
import {BillingPage} from "../pages/billingAddress/billingAddress";
import {ContactPage} from "../pages/contact/contact";
import {CgvPage} from "../pages/CGV/cgv";
import {CommandDetail} from "../pages/commandDetail/commandDetail";
import {MarkerClusterDirective} from "../pages/map/marker-cluster";
import {ProfilePage} from "../pages/profile/profile";
import {$localstorage} from "../service/$localstorage";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {analytics} from "../service/analytics";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
export const firebaseConfig = {
  apiKey: "AIzaSyDlHJFW-HkRgI_UV8oTC_U4vwEu1MvDxGU",
  authDomain: "edfxecommerce.firebaseapp.com",
  databaseURL: "https://edfxecommerce.firebaseio.com",
  projectId: "edfxecommerce",
  storageBucket: "edfxecommerce.appspot.com",
  messagingSenderId: "909023812440"
};
@NgModule({
  declarations: [
    ProfilePage,
    MarkerClusterDirective,
    CommandDetail,
    CgvPage,
    ContactPage,
    BillingPage,
    ConfirmationPage,
    register2,
    ShippingPage,
    CartPage,
    Payment,
    serviceTest,
    register,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    productPage,
    waitMailPage,
    MailPage,
    HomePage,
    MainPage,
    mapPage,
    ShowHideInput,
    ShowHideContainer,
    login,
    MyApp,
    WalkThroughPage,
    ContentDrawer
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    ReactiveFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    LazyLoadImageModule,
    RecaptchaFormsModule,
    RecaptchaModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJIelrek7H4Ew9PCvbZIQLBZ3HAjkk-p4',
      libraries: ['geometry']
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [
    ProfilePage,
    CommandDetail,
    CgvPage,
    ContactPage,
    BillingPage,
    ConfirmationPage,
    register2,
    ShippingPage,
    CartPage,
    Payment,
    serviceTest,
    register,
    productPage,
    waitMailPage,
    MailPage,
    HomePage,
    MainPage,
    mapPage,
    login,
    MyApp,
    WalkThroughPage,
    ContentDrawer
  ],
  providers: [GoogleAnalytics,{provide: ErrorHandler, useClass: IonicErrorHandler},DataService,GoogleMapsAPIWrapper,{
    provide: HttpService,
    useFactory: (backend: XHRBackend, options: RequestOptions) => {
      return new HttpService(backend, options);
    },
    deps: [XHRBackend, RequestOptions]
  },SignOutService,AuthService,Facebook,ShareVariableService,$localstorage,
    {
      provide: analytics,
      useFactory: (gaMobile: GoogleAnalytics) => {
        return new analytics(gaMobile);
      },
      deps: [XHRBackend, RequestOptions]
    }
   ]
})
export class AppModule {}
