<script setup lang="tsx">
import { getUsers as apigetUsers, delUser } from '~/api'
import EditUser from '~/components/user/EditUser.vue'
import type { UserInfo } from '~/types'
let data: UserInfo[] = $ref([
  { id: 1, username: 'test1', nickname: 'test111' } as UserInfo,
])
const message = useMessage()
const dialog = useDialog()

let user = $ref({} as UserInfo)
let mode = $ref('add')
let isloading = $ref(false)
let showModal = $ref(false)
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
const rowKey = (row: UserInfo) => row.id
const getUsers = () => {
  isloading = true
  apigetUsers(searchFormValue.name, pagination.page, pagination.pageSize).then((res) => {
    // console.log(res.data)
    data = res.data.data.users
    pagination.itemCount = res.data.data.total
  })
  isloading = false
}
const handleAddUser = () => {
  mode = 'add'
  showModal = true
  user = {} as UserInfo
}
const handleEditUser = (data: UserInfo) => {
  mode = 'edit'
  user = data
  showModal = true
}
const handleDelUser = (data: UserInfo) => {
  dialog.warning({
    title: '警告',
    content: '你确定删除？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      delUser(data).then((res) => {
        if (res.data.code === 200) {
          message.success('删除成功')
          getUsers()
        }
        else { message.error(res.data.msg) }
      })
    },
  })
}

const handleChangePW = (data: UserInfo) => {
  mode = 'changpw'
  user = data
  showModal = true
  console.log(data)
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
  // console.log(currentPage)
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
    label: '设为管理员',
    key: 'setadmin',
  },
  {
    label: '更改密码',
    key: 'changpw',
  },
]

const handleSelect = (key: string | number, row: UserInfo) => {
  console.log(key)
  if (key === 'edit')
    handleEditUser(row)
  else if (key === 'del')
    handleDelUser(row)
  else if (key === 'changpw')
    handleChangePW(row)
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
    title: '是否管理员',
    key: 'is_admin',
    render(row: UserInfo) {
      return <span>{row.is_admin ? '是' : '否'}</span>
    },
  },
  {
    title: 'Action',
    key: 'action',
    render(row: any) {
      return (<n-dropdown trigger="hover"
      options={options} onSelect={(key: string) => handleSelect(key, row)}
      placement="bottom-start">
      <n-button>操作</n-button></n-dropdown>)
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
            <n-button attr-type="reset" @click="handleAddUser">
              添加
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
  <EditUser v-model:show="showModal" :mode="mode" :user="user" @refresh="getUsers" />
</template>

<style scoped>

</style>
