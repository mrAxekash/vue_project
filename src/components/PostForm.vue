<template>
  <form @submit.prevent>
    <h4>Post name</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Title"  />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Description"/>
    <my-button @click="createPost" >
      Create
    </my-button>
<!--    <button @click="createPost" class="button">Create</button>-->
  </form>
</template>

<script>


export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost(){
      this.post.id = Date.now();
      this.$emit('create', this.post,)
      this.post = {
        title: '',
        body: '',
      }
    },
    inputTitle(e) {
      this.title = e.target.value;
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>