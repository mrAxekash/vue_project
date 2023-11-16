<template>
  <div class="app">
    <h1>Страница с юзерами</h1>
    <my-input v-model="searchQuery"/>
    <div class="app_btns">
      <my-button @click="showDialog">
        Create user
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" >

      </my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
        @remove="removePost"
        :posts="sortedAndSearchedPosts"
        v-if="!isPostLoading"
        />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from "./components/PostList.vue";
import MyDialog from "./components/UI/MyDialog.vue";
import MyButton from "./components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "./components/UI/MySelect.vue";
import MyInput from "./components/UI/MyInput.vue";
  export default {
    components: {MyInput, MySelect, MyButton, MyDialog, PostForm, PostList},
    data() {
      return {
        posts: [ ],
        dialogVisible: false,
        searchQuery: '',
        modificatorValue: '',
        isPostLoading: false,
        selectedSort: '',
        sortOptions: [
          {value: 'title', name: 'Title'},
          {value: 'body', name: 'Description'}
        ]
      }
    },
    methods: {
      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true;
      },
      async fetchUsers() {
        try {
          this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
            this.posts = response.data

        } catch (e) {
          alert('Error')
        } finally {
          this.isPostLoading = false
        }
      }

    },
    mounted() {
      this.fetchUsers()
    },
    computed: {
      sortedPost(){
        return [...this.posts].sort((post1, post2)=> post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      },
      sortedAndSearchedPosts() {
        return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    // watch: {
    //   selectedSort(newvalue) {
    //     this.posts.sort((post1, post2) => {
    //       return post1[newvalue]?.localeCompare(post2[newvalue])
    //     })
    //   },
    //
    // }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .app {
    margin: 20px;
  }
  .app_btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }

</style>