const firebase = require('firebase');
require('firebase/firestore');

export class Firebase{

    constructor(){

        this._config = {
            
            apiKey: "AIzaSyA_LlC0v0wfIu4UEWtw_2cqKd_btZMjpJE",
            authDomain: "whatsapp-clone-cd57a.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-cd57a.firebaseio.com",
            projectId: "whatsapp-clone-cd57a",
            storageBucket: "",
            messagingSenderId: "501580736064",
            appId: "1:501580736064:web:409359058815c968"                          
        };

        this.init();
    }

    init(){

        if(!window._initializedFirebase){
            
            firebase.initializeApp(this._config);

            firebase.firestore().settings({

                //timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }        
    }

    static db(){

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result =>{

                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({user, token});
                })
                .catch(err=>{
                    f(err);
                });
        });
    }

}