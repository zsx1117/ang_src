/**
 * Created by szg on 09/06/2017.
 */
import {Injectable} from "@angular/core";
import {isMobile} from "../shared/config";
import {GoogleAnalytics} from '@ionic-native/google-analytics';

declare const ga;
@Injectable()
export class analytics {

  constructor(private gaMobile: GoogleAnalytics) {
  }

  eventTracking(name, category, label, value) {
    if (!isMobile) {
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: name,
        eventLabel: label,
        eventValue: value
      });
    } else {
      this.gaMobile.trackEvent(category, name, label, value).then(data => console.log(data));
    }
  }

  sendAppView(view) {
    if (isMobile) {
      this.gaMobile.trackView(view).then(data => console.log(data));
    }
  }
}
