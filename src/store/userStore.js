import {defineStore} from "pinia";
import {reactive} from "vue";


const userStore = defineStore(
    "user",


    () => {


        const userSession = reactive({
            avatar:"",
            username: "",
            sex: "",
            phonenum: "",
            major: "",
            age:"",
            motto:"",
            birthday:"",
            constellation:"",
            emails:""

        });

        const setUserInfo = (info) => {
            userSession.avatar = info.avatar;
            userSession.username = info.username;
            userSession.sex = info.sex;
            userSession.phonenum = info.phonenum;
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