import {defineStore} from "pinia";
import {reactive} from "vue";

const addStore = defineStore(
    "add", ()=>{
        const addSession = reactive([]);

        const setAddInfo = (info)=> {
            addSession.value = info

            }


        return{
            addSession,
            setAddInfo
        };
    },



    {
        persist: true,
    }

);
export default addStore;