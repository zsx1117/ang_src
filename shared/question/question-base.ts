/**
 * Created by szg on 10/04/2017.
 */

import {Utils} from "../utils";
export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  show: boolean;
  valideCheck:string[];

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    show?: boolean,
    valideCheck?:string[]
  } = {}) {
    this.value = options.value ? options.value : null;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.show = options.show === undefined ? true : !!options.show;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.valideCheck = Utils.clone(options.valideCheck) || [];
  }
}
