
import axios from 'axios'


export default {
      
    actions: {
       async fetchPosts(stx,limit=1){
            const res = await fetch(
               'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
            )
            const posts = await res.json();
            stx.commit('updatePost',posts)
       }
    },
    mutations: {
         updatePost(state,posts){
            state.posts = posts
         },
         createPost(state,newPost){               
            state.posts.unshift(newPost);
         }
    },
    state: {
        posts:[]
    },
    getters:{
        allPosts(state){
            console.log(state.posts)
            return state.posts;
        } 
    },

}; 