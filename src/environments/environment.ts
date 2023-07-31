// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*paypal: {
    clientId: "AQUB2JKNgupOyk_nlRpSivAg7wrqAqZ5lRmeKSGh9pXlxr2XXCoIBO27EuCCScjaWp2R4QP3AuH2Jf9E",
    merchantEmail: "sb-sxjul4851054@business.example.com",
    merchantId: "VZAT7XYGHWJ8L",
   },*/
   paypal: {
    clientId: "Abg3A_wL-aXZIaNA9WB90cuSUNWQaXflTZmZskp3ukXYcDG-ePTg9vXCs3T6krh6O1mlgRPMtTkzlLmn",
    merchantEmail: "waidassociation@gmail.com",
    merchantId: "R6CF7HZYM8JQ6",
   },
  firebase : {
    apiKey: "AIzaSyA1mC9Rn9-B2ysHhmHkRZT3P93Ttq6LMDg",
    authDomain: "waida-45fae.firebaseapp.com",
    projectId: "waida-45fae",
    storageBucket: "waida-45fae.appspot.com",
    messagingSenderId: "243611437146",
    appId: "1:243611437146:web:a748fe35e6d23f27017063",
    measurementId: "G-F8HVPM87SM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
