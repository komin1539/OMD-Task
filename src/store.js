import Vue from "vue";
import Vuex from "vuex";
import { http } from "./http-constants";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem("accessToken") || null,
        tableToRender: localStorage.getItem("tableToRender") || null,
    },
    getters: {
        loggedIn(state) {
            return state.accessToken != null;
        },
        getAccessToken(state) {
            if (state.accessToken!=null)
                return state.accessToken;
            else 
                return null;
        },
        getTable(state) {
            if (state.tableToRender!=null){
                return state.tableToRender;
            }
            else {
                return 'table = null';
            }
        }
    },
    mutations: {
        retrieveTokens(state, data) {
            state.accessToken = data.accessToken;
        },
        destroyTokens(state){
            state.accessToken = null;
        },
        destroyTable(state){
            state.tableToRender = null;
        },
        getTableToRender(state, data){
            state.tableToRender = data.tableToRender;
        }
    
    },
    actions: {
        retrieveTokens(context, credentials) {
            return new Promise((resolve, reject) => {
                http
                    .post("user/token/", {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then(response => {
                        const accessToken = response.data.token;
                        localStorage.setItem("accessToken", accessToken);
                        context.commit("retrieveTokens", {
                            accessToken
                        });
                        console.log(localStorage.getItem("accessToken"))
                        resolve(response);
                    })
                    .catch(error => {
                        alert("Введены неверные данные")
                        reject(error);
                    });
            });
        },
        destroyTokens(context){
                return new Promise(()=>{
                    localStorage.removeItem("accessToken");
                    context.commit("destroyTokens")
                });
            
        },
        destroyTable(context){
            return new Promise(()=>{
                localStorage.removeItem("tableToRender");
                context.commit("destroyTable")
            });
        
        },
        saveTableToServer() {
            return new Promise((resolve, reject) => {
                http
                    .post("data/", 
                    { 
                        headers: {
                            Authorization: 'JWT '+ localStorage.getItem('accessToken'),
                        },
                    },
                        {data: localStorage.getItem('tableToRender')},
                    )
                    .then(response => {
                        resolve(response);
                        })
                    .catch(error => {
                        reject(error);
                });
            })
        },
        getTableToRender(context) {
            return new Promise((resolve, reject)=>{
                http
                    .get("data/", {
                            headers: {
                                Authorization:'JWT '+ localStorage.getItem('accessToken')
                            }
                    })
                    .then(response => {
                        const tableToRender = response.data;
                        localStorage.removeItem('tableToRender')
                        localStorage.setItem("tableToRender", JSON.stringify(tableToRender));
                        context.commit("getTableToRender", {
                            tableToRender
                        });
                        resolve(response);                        
                    })
                    .catch(error => {
                        reject(error);
                    })
            })

        },
    }
});