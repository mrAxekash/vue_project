<template>
  <button class="button">
    <slot>

    </slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>

  .button {
    margin-top: 15px;
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color:  teal;
    border: 1px solid teal;
  }
</style>