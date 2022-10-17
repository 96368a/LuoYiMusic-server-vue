<script setup lang="tsx">
import axios from '~/api'
let data: User[] = $ref([
  { id: 1, username: 'test1', nickname: 'test111' },
])
interface User {
  id: number
  username: string
  nickname: string
}
let isloading = $ref(false)
const searchFormValue = reactive({
  name: '',
})
const pagination = reactive({
  itemCount: 0,
  page: 1,
  pageCount: 1,
  pageSize: 5,
  pageSizes: [2, 5, 10, 20, 30],
  showSizePicker: true,
  prefix({ itemCount }: any) {
    return `Total is ${itemCount}.`
  },
})
const rowKey = (row: User) => row.id
const getUsers = () => {
  isloading = true
  axios.get('/api/user/search', { params: { name: searchFormValue.name, page: pagination.page, pageSize: pagination.pageSize } }).then((res) => {
    console.log(res.data)
    data = res.data.data.users
    pagination.itemCount = res.data.data.total
  })
  isloading = false
}

const handleReset = () => {
  searchFormValue.name = ''
}
const handlePageSizeChange = (pageSize: number) => {
  console.log(pageSize)
  pagination.pageSize = pageSize
  getUsers()
}
const handlePageChange = (currentPage: number) => {
  console.log(currentPage)
  console.log(2333)
  pagination.page = currentPage
  getUsers()
}

function handleSorterChange(sorter: any) {
  console.log(sorter)
}

const options = [
  {
    label: '编辑',
    key: 'edit',
  },
  {
    label: '删除',
    key: 'del',
  },
  {
    label: '更改密码',
    key: 'changpw',
  },
]
const handleSelect = (key: string | number) => {
  console.log(key)
}
const columns = [
  {
    type: 'selection',

  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '用户名',
    key: 'username',
  },
  {
    title: '昵称',
    key: 'nickname',
  },
  {
    title: 'Action',
    key: 'action',
    render(row: string | number) {
      return <n-dropdown trigger="hover" options={options} onSelect={() => handleSelect(row)} placement="bottom-start"><n-button>操作</n-button></n-dropdown>
    },
  },
]

onMounted(() => {
  getUsers()
})
</script>

<template>
  <n-layout :native-scrollbar="true" bordered>
    <n-layout>
      <n-form
        ref="formRef" :model="searchFormValue" inline label-placement="left" label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="搜索">
          <n-input v-model:value="searchFormValue.name" placeholder="输入用户名或昵称" />
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button type="primary" @click="getUsers">
              搜索
            </n-button>
            <n-button type="warning" attr-type="reset" @click="handleReset">
              重置
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-layout>
    <n-layout>
      <n-data-table
        :columns="columns" :data="data" :pagination="pagination"
        :remote="true" :row-key="rowKey" :bordered="false" :loading="isloading"
        @update:page="handlePageChange" @update:sorter="handleSorterChange"
        @update:page-size="handlePageSizeChange"
      />
    </n-layout>
  </n-layout>
</template>

<style scoped>

</style>
