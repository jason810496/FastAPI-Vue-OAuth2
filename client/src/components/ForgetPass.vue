<template>
    <div class="fixed block container 
top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full
     rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        style="background-color: #2D3648;">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                {{ title }}
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="handelSubmit">
                <div>
                    <input v-model="filename" type="text" name="filename"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="screen name" required="要輸檔名喔" />
                </div>
                <div class="flex justify-even">
                    <button @click="back"
                        class="mx-5 w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md"
                        style="box-sizing: border-box; background-color: #2D3648; border: 3px solid #fff;">
                        Back
                    </button>
                    <button type="submit"
                        class="mx-5 w-full text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md"
                        style="background-color: #529931;">
                        Go
                    </button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props:["title","role"],
    data() {
        return {
            filename: "",
        };
    },
    methods: {
        // ...mapMutations(['setUsername', 'setPassword', 'setIsHidden']),
        back(){
            this.$router.go(-1);
        },
        handelSubmit() {
            if( this.role == "saveAs" ){
                emitter.emit("builderAction", { action: 'saveAs' , filename :this.filename } );      
            }
            else if( this.role == "newFile" ){
                this.createMap();
            }
        },
        createMap() {
            if (this.filename != "") {
                this.$store.dispatch("formState/setCurrentState", { "currentState": "loading" });
                this.$widget.map.uploadMap(this.filename, this.$widget.map.genMap()).then((res) => {
                    console.log(res);
                    const mapinfo = { ...res }
                    this.$widget.map.loadMap(res).then((res) => {
                        this.$widget.map.convertMap(res);
                        this.$router.push({   
                            name: "Editor",
                            params: {
                                map_id: mapinfo.map_id,
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                        alert("讀取空白地圖失敗！");
                        this.$router.push({ name: "SelectMap" });
                    });
                    
                }).catch((error) => {   
                    console.log(error);
                    alert("上傳空白地圖失敗！");
                });
            }
        },
    },
};
</script>
