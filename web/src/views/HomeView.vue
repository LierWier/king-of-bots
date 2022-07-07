<template>
  <div>bot昵称：{{ bot_name }}</div>
  <div>bot战力：{{ bot_rating }}</div>
</template>

<script>

import {ref} from "vue";
import $ from "jquery";

export default {
  name: 'HomeView',
  components: {},

  setup() {
    let bot_name = ref('');
    let bot_rating = ref('');

    $.ajax({
      url: "http://localhost:3000/pk/getbotinfo",
      type: "get",
      success: (resp) => {
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      }
    })

    return {bot_name, bot_rating}
  }
}
</script>
