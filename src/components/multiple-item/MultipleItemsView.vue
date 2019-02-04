<template>
  <h1>Hello {{item_name}}</h1>
</template>

<script>
export default {
  props: {
    item_name: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log("hello");
  }
};
</script>
