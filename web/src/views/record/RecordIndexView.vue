<template>
  <my-card class="container mt-3">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>A</th>
        <th>B</th>
        <th>对战结果</th>
        <th>对战时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="record in records" :key="record.record.id">
        <td>
          <img :src="record.a_photo" alt="" class="record-user-photo rounded-circle">
          &nbsp;
          <span class="record-user-username">{{ record.a_username }}</span>
        </td>
        <td>
          <img :src="record.b_photo" alt="" class="record-user-photo rounded-circle">
          &nbsp;
          <span class="record-user-username">{{ record.b_username }}</span>
        </td>
        <td>
          {{ record.result }}
        </td>
        <td>
          {{ record.record.createTime }}
        </td>
        <td>
          <button
              type="button" class="btn btn-secondary btn-sm"
              @click="open_record_content(record.record.id)"
          >查看
          </button>
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
import $ from 'jquery'
import {ref} from "vue";
import router from "@/router";

export default {
  name: "RecordIndexView",
  components: {MyCard},

  setup() {
    const store = useStore()
    let current_page = 1
    let records = ref([])
    let total_records = 0
    let pages = ref([])

    const pull_page = (page) => {
      current_page = page
      $.ajax({
        url: "http://127.0.0.1:3000/record/getrecordlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token
        },
        data: {
          page
        },
        success(resp) {
          records.value = resp.records
          total_records = resp.records_count
          update_pages()
        },
        error(resp) {
          console.log(resp)
        }
      })
    }
    pull_page(current_page)

    const update_pages = () => {
      let max_pages = ~~Math.ceil(total_records / 10)
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
      let max_pages = ~~Math.ceil(total_records / 10)

      if (page >= 1 && page <= max_pages) {
        pull_page(page)
      }
    }

    const stringTo2D = (map) => {
      let g = []
      for (let i = 0, k = 0; i < 13; i++) {
        let line = []
        for (let j = 0; j < 14; j++, k++) {
          if (map[k] === '0') line.push(0)
          else line.push({
            number: i,
            is_active: i === current_page ? "active" : ""
          })
        }
        g.push(line)
      }
      return g
    }

    const open_record_content = (recordId) => {
      for (const record of records.value) {
        if (record.record.id === recordId) {
          store.commit("updateIsRecord", true)
          store.commit("updateGame", {
            map: stringTo2D(record.record.map),
            a_id: record.record.aid,
            a_sx: record.record.asx,
            a_sy: record.record.asy,
            b_id: record.record.bid,
            b_sx: record.record.bsx,
            b_sy: record.record.bsy,
          })
          // store.commit("updateSteps", {
          //   a_steps: record.record.asteps,
          //   b_steps: record.record.bsteps
          // })
          store.commit("updateRecordInfo", {
            a_photo: record.a_photo,
            b_photo: record.b_photo,
            a_username: record.a_username,
            b_username: record.b_username,
            a_steps: record.record.asteps,
            b_steps: record.record.bsteps
          })
          store.commit("updateRecordLoser", record.record.loser)
          router.push({
            name: "record_content",
            params: { recordId }
          })
          break
        }
      }
    }

    return {
      records, pages,
      click_page, open_record_content
    }
  }
}
</script>

<style scoped>
img.record-user-photo {
  width: 4vh;
}
</style>