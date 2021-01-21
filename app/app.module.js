"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
///<reference path="../../node_modules/ionic-native/dist/es5/plugins/google-plus.d.ts"/>
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var google_maps_api_wrapper_1 = require('angular2-google-maps/core/services/google-maps-api-wrapper');
var core_2 = require('angular2-google-maps/core');
var http_1 = require("@angular/http");
var angularfire2_1 = require('angularfire2');
var facebook_1 = require("@ionic-native/facebook");
var ng_recaptcha_1 = require("ng-recaptcha");
var recaptcha_forms_module_1 = require("ng-recaptcha/recaptcha/recaptcha-forms.module");
var ng2_lazyload_image_1 = require("ng2-lazyload-image");
var app_component_1 = require('./app.component');
var walkthrough_1 = require("../pages/walkthrough/walkthrough");
var login_1 = require("../pages/login/login");
var showHideInput_1 = require("../shared/directive/showHideInput");
var showHideContainer_1 = require("../shared/showHideContainer");
var DataService_1 = require("../shared/DataService");
var httpservice_1 = require("../service/httpservice");
var sign_out_service_1 = require("../service/sign-out-service");
var map_1 = require("../pages/map/map");
var main_1 = require("../pages/main/main");
var home_1 = require("../pages/home/home");
var mail_1 = require("../pages/mail/mail");
var auth_service_1 = require("../service/auth-service");
var waitmail_1 = require("../pages/waitmail/waitmail");
var product_1 = require("../pages/product/product");
var content_drawer_1 = require('../components/content-drawer/content-drawer');
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var dynamic_form_question_component_1 = require("../shared/component/form/dynamic-form-question.component");
var dynamic_form_component_1 = require("../shared/component/form/dynamic-form.component");
var register_1 = require("../pages/register/register");
var servicetest_1 = require("../pages/servicetest/servicetest");
var share_variable_service_1 = require("../service/share-variable-service");
var payment_1 = require("../pages/payment/payment");
var cart_1 = require("../pages/cart/cart");
var shippingAddress_1 = require("../pages/shippingAddress/shippingAddress");
var register2_1 = require("../pages/register2/register2");
var confirmation_1 = require("../pages/Confirmation/confirmation");
var billingAddress_1 = require("../pages/billingAddress/billingAddress");
var contact_1 = require("../pages/contact/contact");
var cgv_1 = require("../pages/CGV/cgv");
var commandDetail_1 = require("../pages/commandDetail/commandDetail");
var marker_cluster_1 = require("../pages/map/marker-cluster");
var profile_1 = require("../pages/profile/profile");
var _localstorage_1 = require("../service/$localstorage");
var core_3 = require('@ngx-translate/core');
var http_loader_1 = require('@ngx-translate/http-loader');
var analytics_1 = require("../service/analytics");
var google_analytics_1 = require("@ionic-native/google-analytics");
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, "assets/i18n/", ".json");
}
exports.HttpLoaderFactory = HttpLoaderFactory;
exports.firebaseConfig = {
    apiKey: "AIzaSyDlHJFW-HkRgI_UV8oTC_U4vwEu1MvDxGU",
    authDomain: "edfxecommerce.firebaseapp.com",
    databaseURL: "https://edfxecommerce.firebaseio.com",
    projectId: "edfxecommerce",
    storageBucket: "edfxecommerce.appspot.com",
    messagingSenderId: "909023812440"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                profile_1.ProfilePage,
                marker_cluster_1.MarkerClusterDirective,
                commandDetail_1.CommandDetail,
                cgv_1.CgvPage,
                contact_1.ContactPage,
                billingAddress_1.BillingPage,
                confirmation_1.ConfirmationPage,
                register2_1.register2,
                shippingAddress_1.ShippingPage,
                cart_1.CartPage,
                payment_1.Payment,
                servicetest_1.serviceTest,
                register_1.register,
                dynamic_form_component_1.DynamicFormComponent,
                dynamic_form_question_component_1.DynamicFormQuestionComponent,
                product_1.productPage,
                waitmail_1.waitMailPage,
                mail_1.MailPage,
                home_1.HomePage,
                main_1.MainPage,
                map_1.mapPage,
                showHideInput_1.ShowHideInput,
                showHideContainer_1.ShowHideContainer,
                login_1.login,
                app_component_1.MyApp,
                walkthrough_1.WalkThroughPage,
                content_drawer_1.ContentDrawer
            ],
            imports: [
                core_3.TranslateModule.forRoot({
                    loader: {
                        provide: core_3.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.Http]
                    }
                }),
                forms_1.ReactiveFormsModule,
                platform_browser_1.BrowserModule,
                angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
                ng2_lazyload_image_1.LazyLoadImageModule,
                recaptcha_forms_module_1.RecaptchaFormsModule,
                ng_recaptcha_1.RecaptchaModule.forRoot(),
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyDJIelrek7H4Ew9PCvbZIQLBZ3HAjkk-p4',
                    libraries: ['geometry']
                })
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                profile_1.ProfilePage,
                commandDetail_1.CommandDetail,
                cgv_1.CgvPage,
                contact_1.ContactPage,
                billingAddress_1.BillingPage,
                confirmation_1.ConfirmationPage,
                register2_1.register2,
                shippingAddress_1.ShippingPage,
                cart_1.CartPage,
                payment_1.Payment,
                servicetest_1.serviceTest,
                register_1.register,
                product_1.productPage,
                waitmail_1.waitMailPage,
                mail_1.MailPage,
                home_1.HomePage,
                main_1.MainPage,
                map_1.mapPage,
                login_1.login,
                app_component_1.MyApp,
                walkthrough_1.WalkThroughPage,
                content_drawer_1.ContentDrawer
            ],
            providers: [google_analytics_1.GoogleAnalytics, { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler }, DataService_1.DataService, google_maps_api_wrapper_1.GoogleMapsAPIWrapper, {
                    provide: httpservice_1.HttpService,
                    useFactory: function (backend, options) {
                        return new httpservice_1.HttpService(backend, options);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                }, sign_out_service_1.SignOutService, auth_service_1.AuthService, facebook_1.Facebook, share_variable_service_1.ShareVariableService, _localstorage_1.$localstorage,
                {
                    provide: analytics_1.analytics,
                    useFactory: function (gaMobile) {
                        return new analytics_1.analytics(gaMobile);
                    },
                    deps: [http_1.XHRBackend, http_1.RequestOptions]
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
