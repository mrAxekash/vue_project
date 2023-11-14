<template>
  <div class="app">
    <h1>Страница с юзерами</h1>
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
        :posts="posts"
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
  export default {
    components: {MySelect, MyButton, MyDialog, PostForm, PostList},
    data() {
      return {
        posts: [ ],
        dialogVisible: false,
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
    }
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