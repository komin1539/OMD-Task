<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-text class="display-1">OMD-Task</v-text>
      <v-btn text small @click="logoutClicked" id="logout" v-if ='loggedIn'>ВЫЙТИ</v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style scoped>
    #logout{
        margin-left: auto; 
    }
</style>
    
<script>
import router from './router';

export default {
  name: 'App',

  computed: {
      loggedIn: function(){
        return this.$store.getters.loggedIn;
      }
    },

  methods: {
    logoutClicked() {
        this.$store.dispatch("destroyTokens")
        //eslint-disable-next-line
        .then(response => {
          console.log("response")
        })
        //eslint-disable-next-line
        .catch(error=>{ 
          console.log("error")
        });
        this.$store.dispatch("destroyTable")
        //eslint-disable-next-line
        .then(response => {
          console.log("response")
        })
        //eslint-disable-next-line
        .catch(error=>{ 
          console.log("error")
        });
          router.push({name: 'authorization'});
    },
  }
};
</script>
