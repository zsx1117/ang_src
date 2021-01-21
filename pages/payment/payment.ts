/**
 * Created by szg on 19/04/2017.
 */
import {Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {NavController, Loading, LoadingController, Events, NavParams} from 'ionic-angular';
import {PayService} from "../../service/pay-service";
import {cardMap} from "../../shared/config";
import {HttpService} from "../../service/httpservice";
// declare const paypal;
declare const braintree;
@Component({
  selector: 'page-pay',
  templateUrl: 'payment.html',
  providers: [PayService]
})
export class Payment implements OnInit {
  @ViewChild('paypalButton') paypalButton: ElementRef;

  hFInstance: any;
  loading: Loading;
  token: string = null;
  cardSrc = cardMap["default"];
  numberLabelShow: string = "showNotLabel";
  numberErrorShow: string = "showNotError";
  dateLabelShow: string = "showNotLabel";
  dateErrorShow: string = "showNotError";
  cvvLabelShow: string = "showNotLabel";
  cvvErrorShow: string = "showNotError";
  showLoad:any;
  disLoad:any;
  payAmount:any;

  constructor(public http: HttpService,public events: Events,public navParams:NavParams,public navCtrl: NavController, public payService: PayService, private ref: ChangeDetectorRef,private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.payAmount = this.navParams.data["amount"];
  }

  ionViewWillLeave(){
    if(this.loading) {
      this.loading.dismiss().catch(err=>console.log(err));
    }
    this.showLoad.unsubscribe();
    this.disLoad.unsubscribe();
  }

  ionViewDidLoad() {
    this.showLoad=this.http.loadPushObservable.subscribe((data)=>{
      if(data){
        this.showLoading();
      }
    });
    this.disLoad=this.http.dismissObservable.subscribe((data)=>{
      if(data&&this.loading){
        this.loading.dismiss();
      }
    });
    this.payService.getToken().then((data)=>{
      if(data.hasOwnProperty("status")){
        console.log(data);
      }
      else{
        this.pay(data);
        this.payPal(data);
      }

    }); //todo develop
    // this.pay("sandbox_qpf8g6pv_sxvnrfbf6y7q22pk");
  }


  pay(token) {
    this.showLoading();
    braintree.client.create({
      authorization: token
    }, (clientErr, clientInstance) => {
      if (clientErr) {
        console.log(clientErr);
        // Handle error in client creation
        return;
      }

      braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            // 'font-size': '14pt'
          },
          'input.invalid': {
            'color': 'red'
          },
          'input.valid': {
            'color': 'green'
          },
          'input:focus+label': {
            'background-color': '#eee'
          },
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: 'Card Number'
          },
          cvv: {
            selector: '#cvv',
            // placeholder: '123'
            placeholder: 'CVV'
          },
          expirationDate: {
            selector: '#expiration-date',
            // placeholder: '10/2019'
            placeholder: 'Expiration Date'
          }
        },
      }, (hostedFieldsErr, hostedFieldsInstance) => {
        this.loading.dismiss();
        if (hostedFieldsErr) {
          console.log(hostedFieldsErr);
          // Handle error in Hosted Fields creation
          return;
        }
        hostedFieldsInstance.on('focus', event => {
          event.fields[event.emittedBy].container.parentNode.classList.add("bdColor");
        });

        hostedFieldsInstance.on('notEmpty', event => {
          switch (event.emittedBy) {
            case "number":
              this.numberLabelShow = "showLabel showNotLabel";
              break;
            case "expirationDate":
              this.dateLabelShow = "showLabel showNotLabel";
              break;
            case "cvv":
              this.cvvLabelShow = "showLabel showNotLabel";
          }
          this.ref.detectChanges();
        });

        hostedFieldsInstance.on('empty', event => {
          switch (event.emittedBy) {
            case "number":
              this.numberLabelShow = "showNotLabel";
              break;
            case "expirationDate":
              this.dateLabelShow = "showNotLabel";
              break;
            case "cvv":
              this.cvvLabelShow = "showNotLabel";
          }
          this.ref.detectChanges();
        });

        hostedFieldsInstance.on('blur',  (event)=> {
          event.fields[event.emittedBy].container.parentNode.classList.remove("bdColor");
          switch (event.emittedBy) {
            case "number":
              this.numberErrorShow = "showNotError";
              break;
            case "expirationDate":
              this.dateErrorShow = "showNotError";
              break;
            case "cvv":
              this.cvvErrorShow = "showNotError";
          }
          this.ref.detectChanges();

        });
        hostedFieldsInstance.on('cardTypeChange', (event)=> {
          if (event.cards.length === 1) {
            this.cardSrc = cardMap[event.cards[0].type];
          } else {
            this.cardSrc = cardMap["default"];
          }
          this.ref.detectChanges();
        });

        this.hFInstance = hostedFieldsInstance;

        hostedFieldsInstance.on('inputSubmitRequest', () => {
          this.onSubmit();
        });
      });
    });
  }

  showLoading()
  {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    console.log("Show loading");
  }

  payPal(token){
    let paypalButtonInstance = this.paypalButton.nativeElement;
    braintree.client.create({
      authorization: token
    },  (clientErr, clientInstance)=> {

      if (clientErr) {
        console.error('Error creating client:', clientErr);
        return;
      }

      braintree.paypal.create({
        client: clientInstance
      },  (paypalErr, paypalInstance)=> {

        if (paypalErr) {
          console.error('Error creating PayPal:', paypalErr);
          return;
        }
        paypalButtonInstance.addEventListener('click', (event)=> {
          paypalButtonInstance.disabled = true;
          this.showLoading();
          paypalInstance.tokenize({
            // flow: 'checkout',
            flow:'vault',
            amount: this.payAmount,
            currency: 'EUR',
            intent: 'sale',
            enableShippingAddress: false,
            // shippingAddressEditable: true,
            // shippingAddressOverride: {
            //   recipientName: 'Scruff McGruff',
            //   line1: '1234 Main St.',
            //   line2: 'Unit 1',
            //   city: 'Chicago',
            //   countryCode: 'US',
            //   postalCode: '60652',
            //   state: 'IL',
            //   phone: '123.456.7890'
            // }
          }, (tokenizeErr, payload)=> {
            this.loading.dismiss();
            paypalButtonInstance.disabled = false;
            if (tokenizeErr) {
              switch (tokenizeErr.code) {
                case 'PAYPAL_POPUP_CLOSED':
                  console.error('Customer closed PayPal popup.');
                  break;
                case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
                  console.error('PayPal tokenization failed. See details:', tokenizeErr.details);
                  break;
                case 'PAYPAL_FLOW_FAILED':
                  console.error('Unable to initialize PayPal flow. Are your options correct?', tokenizeErr.details);
                  break;
                default:
                  console.error('Error!', tokenizeErr)
              }
            }else{
              let paymentInfo = {};
              paymentInfo["nonce"] = payload.nonce;
              paymentInfo["payment"] = "PayPal: " + payload.details.email;
              this.sendPaymentInfo(paymentInfo);
              // this.payService.sendNonce(payload.nonce).then((result) => {
              //   if(result&&result["status"] == 200 ){
              //     console.log("success");
              //   }
              // });
            }
          });
        }, false);
      });
    });
  }

  sendPaymentInfo(paymentInfo){
    this.events.publish('paymentInfo',paymentInfo);
    this.navCtrl.pop();
  }



  onSubmit() {
    let state = this.hFInstance.getState();
    for (let i of Object.keys(state["fields"])) {
      if (!state["fields"][i]["isValid"]) {
        switch (i) {
          case "number":
            this.numberErrorShow = "showError showNotError";
            break;
          case "expirationDate":
            this.dateErrorShow = "showError showNotError";
            break;
          case "cvv":
            this.cvvErrorShow = "showError showNotError";
        }
      }
    }
    this.ref.detectChanges();


    if (this.hFInstance) {
      //noinspection TypeScriptValidateJSTypes
      this.hFInstance.tokenize((tokenizeErr, payload) => {
        if (tokenizeErr) {
          switch (tokenizeErr.code) {
            case 'HOSTED_FIELDS_FIELDS_EMPTY':
              console.error('All fields are empty! Please fill out the form.');
              break;
            case 'HOSTED_FIELDS_FIELDS_INVALID':
              console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
              break;
            case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
              console.error('Tokenization failed server side. Is the card valid?');
              break;
            case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
              console.error('Network error occurred when tokenizing.');
              break;
            default:
              console.error('Something bad happened!', tokenizeErr);
          }
        } else {
          let paymentInfo = {};
          paymentInfo["nonce"] = payload.nonce;
          paymentInfo["payment"] = payload.type + " **** **" + payload.details["lastTwo"];
          this.sendPaymentInfo(paymentInfo);
          console.log(payload);
          console.log('Got nonce:', payload.nonce);
          // this.payService.sendNonce(payload.nonce).then((result) => {
          //   if(result&&result["status"] == 200 ){
          //     console.log("success");
          //   }
          // });
        }
      });
    }
  }

}
