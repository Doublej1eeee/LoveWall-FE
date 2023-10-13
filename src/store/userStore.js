import {defineStore} from "pinia";
import {reactive} from "vue";


const userStore = defineStore(
    "user",


    () => {


        const userSession = reactive({

            username: "",
            sex: "",
            telephone: "",
            major: "",
            age:"",
            motto:"",
            birthday:"",
            constellation:"",
            emails:""

        });

        const setUserInfo = (info) => {
            userSession.username = info.username;
            userSession.sex = info.sex;
            userSession.telephone = info.telephone;
            userSession.major = info.major;
            userSession.age = info.age;
            userSession.motto = info.motto;
            userSession.birthday = info.birthday;
            userSession.constellation = info.constellation;
            userSession.emails=info.emails;
        };




        return {
            userSession,
            setUserInfo
        };
    },




    {
        persist: true
    }
);

export default userStore;