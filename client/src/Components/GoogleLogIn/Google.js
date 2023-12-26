import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp } from "firebase/app";


const app = initializeApp(firebaseConfig);


export const GoogleLogin=()=>{
const provider = new GoogleAuthProvider();

    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then( async (result) => {
        const user = result.user;
        const email=user.email;
        const name=user.displayName;
        const profilePic=user.photoURL;
        const username=user.email.split(['@'])[0];

        await fetch('/api/user/googleLogin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    username:username,
                    profilePic:profilePic,
                    // password:password,
                })
            })
            .then((res)=>{
                res.json();
                if (res.status ===400) {
                    window.location.href='/login';
                };
                if (res.status===200) {
                    window.location.href='/';
                };
            })
            .then((res)=>{
                // console.log(res.statusCode)
                if(res){
                    alert(res.message);
                    window.location.href='/';
                }

            })
            .catch((error)=>{
                alert(error.message);
            });
            // console.log({
            //     email,
            //     name,
            //     profilePic,
            //     username
            // });

      }).catch((error) => {
        // alert(error.message);
        console.log(error.message)
      });
};