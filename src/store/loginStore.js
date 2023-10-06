import {defineStore} from "pinia";
import {ref} from "vue";

const loginStore = defineStore(
    "login",



    ()=>{
        const loginSession =ref(false);//状态
        const setLogin = (loginNewsession)=>{
            loginSession.value=loginNewsession;

        };//改变状态的方法

        return{
            loginSession,
            setLogin
        };
    },



    {
        persist: true,
    }

    );
export default loginStore;