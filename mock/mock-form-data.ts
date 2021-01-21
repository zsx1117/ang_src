/**
 * Created by szg on 12/04/2017.
 */
export const MOCKFORMDATA = [
  {
    "controlType": "textbox",
    "key": "email",
    "label": "E-mail",
    "valideCheck": ["required","invalidEmail"],
    "type": "text",
    "order": 1
  },

  {
    "controlType": "textbox",
    "key": "lastName",
    "label": "LastName",
    "valideCheck": ["required"],
    "type": "text",
    "order": 2
  },

  {
    "controlType": "textbox",
    "key": "firstName",
    "label": "firstName",
    "valideCheck": ["required"],
    "type": "text",
    "order": 3
  },

  {
    "controlType": "dropdown",
    "key": "gender",
    "label": 'Gender',
    "options": [
      {"key": 1, "value": "Male"},
      {"key": 2, "value": "Female"},
    ],
    "valideCheck": ["required"],
    "order": 4
  },

  {
    "controlType":"dataTime",
    "key":'birthday',
    "label":'Birthday',
    "valideCheck": ["required"],
    "order":5
  },

  {
    "controlType": "textbox",
    "key": "mobilePhone",
    "label": "Telephone",
    "valideCheck": ["required","invalidTelephonel"],
    "type": "text",
    "maxlength":10,
    "order": 6
  },

  {
    "controlType":"textbox",
    "key":"password",
    "label":"Password",
    "order":7,
    "type":"password",
    "show":true,
    "valideCheck":['required','minlength','invalidPassword'],
    "minlength":6
  },

  {
    "controlType":"textbox",
    "key":"confirmPassword",
    "label":"Confirm Password",
    "order":8,
    "type":"password",
    "show":true,
    "valideCheck":["required"],
  },

  {
    "controlType":"captcha",
    "key":"captcha",
    "order":9,
    "label":"Captcha",
    "show":true,
    "valideCheck":['required']
  }
];

export const MOCKLOGINDATA = [
  {
    "controlType": "textbox",
    "key": "email",
    "label": "E-mail",
    "valideCheck": ["required", "invalidEmail"],
    "type": "text",
    "order": 1
  },
  {
    "controlType": "textbox",
    "key": "password",
    "label": "Password",
    "order": 2,
    "type": "password",
    "show": true,
    "valideCheck": ['required'],
  },

  {
    "controlType": "toggle",
    "key": "touchId",
    "label": "touchId",
    "order": 3,
    "color": "dark",
    "value":true
  }

];
