<template>
  <my-card class="container mt-3">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>玩家</th>
        <th>Rating</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" :class="$store.state.user.id === user.id ? 'myself' : ''">
        <td>
          <img :src="user.photo" alt="" class="ranklist-user-photo rounded-circle">
          &nbsp;
          <span class="ranklist-user-username">{{ user.username }}</span>
        </td>
        <td class="fw-bold">
          {{ user.rating }}
        </td>
      </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example" class="float-end">
      <ul class="pagination">
        <li class="page-item" @click="click_page(-2)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
            v-for="page in pages" :key="page.number"
            :class="'page-item ' + page.is_active"
            @click="click_page(page.number)"
        >
          <a class="page-link" href="#">{{ page.number }}</a>
        </li>
        <li class="page-item" @click="click_page(-1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </my-card>
</template>

<script>
import MyCard from "@/components/utils/MyCard";
import {useStore} from "vuex";
import {ref} from "vue";
import $ from "jquery";
export default {
  name: "RankIndexView",
  components: {MyCard},

  setup() {
    const store = useStore()
    let current_page = 1
    let users = ref([])
    let total_users = 0
    let pages = ref([])

    const pull_page = (page) => {
      current_page = page
      $.ajax({
        url: "http://127.0.0.1:3000/ranklist/getranklist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        data: {
          page
        },
        success(resp) {
          users.value = resp.users
          total_users = resp.users_count
          update_pages()
        },
        error(resp) {
          console.log(resp)
        }
      })
    }
    pull_page(current_page)

    const update_pages = () => {
      let max_pages = ~~Math.ceil(total_users / 10)
      let new_pages = []
      for (let i = current_page - 2; i <= current_page + 2; i++) {
        if (i >= 1 && i <= max_pages) {
          new_pages.push({
            number: i,
            is_active: i === current_page ? 'active' : ''
          })
        }
      }
      pages.value = new_pages
    }

    const click_page = (page) => {
      if (page === -2) page = current_page - 1
      else if (page === -1) page = current_page + 1
      let max_pages = ~~Math.ceil(total_users / 3)

      if (page >= 1 && page <= max_pages) {
        pull_page(page)
      }
    }

    return {
      users, pages,
      click_page
    }
  }
}
</script>

<style scoped>
img.ranklist-user-photo {
  width: 4vh;
}
.myself {
  background-color: lightblue;
}
</style>