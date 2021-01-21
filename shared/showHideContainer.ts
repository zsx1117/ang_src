/**
 * Created by szg on 06/03/2017.
 */
import {Component, ContentChild  } from '@angular/core'
import {ShowHideInput} from './directive/showHideInput'

@Component({ selector: 'show-hide-container',
  template: `<a (click)="toggleShow($event)">show/hide</a>`,
  styles: ['.show-hide {padding-right: 16px;}'],
})
export class ShowHideContainer
{
  show = false;

  @ContentChild(ShowHideInput) input: ShowHideInput;

  constructor(){}

  toggleShow()
  {
    this.show = !this.show;
    if (this.show){
      this.input.changeType("text");
    }
    else {
      this.input.changeType("password");
    }
  }
}
