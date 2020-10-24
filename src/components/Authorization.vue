<template>
    <div>
        <v-form id="autorization">
            <v-container>
                <v-row>
                    <v-col>
                        <v-text class="title">Вход</v-text>
                        <v-text-field 
                            v-model="username"
                            label="Username"
                            required
                        ></v-text-field>
                        <v-text-field 
                            v-model="password"
                            label="Password"
                            :type="show1 ? 'text' : 'password'"
                            required
                            min=8
                        ></v-text-field>
                        <v-btn 
                           @click="loginClicked"
                        > Вход </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<style scoped>
    #autorization {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
    }
</style>
<script lang="ts">
    import  router  from "../router.js"
    
    export default ({
    mounted: ()=>{
        this.$store.dispatch("destroyTokens")
        //eslint-disable-next-line
        .then(response => {
          console.log("response")
        })
        //eslint-disable-next-line
        .catch(error=>{ 
          console.log("error")
        });
    },
    data(){
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        loginClicked() {
            this.$store
                .dispatch("retrieveTokens", {
                    username: this.username,
                    password: this.password,
                })
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    if (this.$store.getters.loggedIn)
                        router.push({ name:'data' });
                })
                // eslint-disable-next-line
                .catch(error => {
                    this.password = "";
                });
                    
            },
            getTableToRender(){
            this.$store
                .dispatch("getTableToRender")
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    //alert(response.status)
                })
                // eslint-disable-next-line no-unused-vars
                .catch(error => {
                    //alert(error.response.status)
                })
        },
        }
    })
</script>