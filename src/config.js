import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCpisJPMYpqARZVFaQlLi0sQOCcHfkvYt0",
    authDomain: "intelligent-medical-consultant.firebaseapp.com",
    databaseURL: "https://intelligent-medical-consultant-default-rtdb.firebaseio.com",
    projectId: "intelligent-medical-consultant",
    storageBucket: "intelligent-medical-consultant.appspot.com",
    messagingSenderId: "528957668935",
    appId: "1:528957668935:web:f865d5cdab5eaf728bfb62",
    measurementId: "G-S5EW291D6V"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
