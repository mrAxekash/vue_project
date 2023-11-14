<template>
    <div v-if="posts.length > 0">
      <h3>Users list</h3>
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </div>
  <h2 style="color: red" v-else>ТУТ ЗАКОНЧИЛИСЬ ПОСТЫ</h2>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>