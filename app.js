/**
 * Created by terje on 05.02.2017.
 */
(function () {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyBD1MKewYxTLslcyEAsDYDEPWelu2PGipA",
        authDomain: "innlogging-46cb2.firebaseapp.com",
        databaseURL: "https://innlogging-46cb2.firebaseio.com",
        storageBucket: "innlogging-46cb2.appspot.com",
        messagingSenderId: "399572551149"
    };
    firebase.initializeApp(config);

    //Hente fra html-fil
    const txtEpost = document.getElementById("txtEpost");
    const txtPassord = document.getElementById("txtPassord");
    const btnLoggInn = document.getElementById("btnLoggInn");
    const btnRegistrer = document.getElementById("btnRegistrer");
    const btnLoggUt = document.getElementById("btnLoggUt");
    const btnGoogle = document.getElementById("btnGoogle");

    //Hendelseslyttere
    btnLoggInn.addEventListener("click", e=>{
        //Henter epost og passord.
        const epost = txtEpost.value;
        const passord = txtPassord.value;
        const auth = firebase.auth();

        //Registrer
        const loefte = auth.signInWithEmailAndPassword(epost, passord);
        loefte.catch(e=> console.log(e.message));
    } );

    btnRegistrer.addEventListener("click",e=>{
        const epost = txtEpost.value;
        const passord = txtPassord.value;
        const auth = firebase.auth();

        //Registrer
        const loefte = auth.createUserWithEmailAndPassword(epost, passord);
        loefte.catch(e=> console.log(e.message));
    });

    btnLoggUt.addEventListener("click",e=>{
        firebase.auth().signOut();
    });
    //Legg til sanntidslytter
    firebase.auth().onAuthStateChanged(fireBaseUser=>{
        if(fireBaseUser){
            console.log(fireBaseUser);
            btnLoggUt.classList.remove("gjem");
        }
        else{
            console.log("ikke logget inn.");
            btnLoggUt.classList.add("gjem");
        }
    });

    //Google autentisering
    var provider = new firebase.auth.GoogleAuthProvider();

    btnGoogle.addEventListener("click",e=>{
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    });

}());
