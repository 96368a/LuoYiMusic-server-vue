<script setup lang="tsx">
import { delSong, getSongs } from '~/api/song'
import type { SongInfo } from '~/types/song'
import AddSong from '~/components/song/AddSong.vue'
const message = useMessage()
const dialog = useDialog()

const Dropdown = (props: any) => {
  const options = [
    {
      label: '删除',
      key: 'del',
    },
  ]
  const handleDelSong = (song: SongInfo) => {
    console.log(song)
    dialog.warning({
      title: '警告',
      content: `你确定删除${song.name}吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        delSong(song).then((res) => {
          if (res.data.code === 200) {
            message.success('删除成功')
            getSongList()
          }
          else { message.error(res.data.msg) }
        })
      },
    })
  }
  const handleSelect = (key: string | number, row: SongInfo) => {
    console.log(key)

    if (key === 'del')
      handleDelSong(row)
  }
  return (<n-dropdown trigger="hover"
    options={options} onSelect={(key: string) => handleSelect(key, props.row)}
    placement="bottom-start">
    <n-button>操作</n-button></n-dropdown>)
}

let isloading = $ref(false)
const searchFormValue = reactive({
  name: '',
})
const showModal = $ref(false)
const columns = [
  {
    type: 'selection',

  },
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '歌曲名',
    key: 'name',
  },
  {
    title: '专辑名',
    key: 'album.name',
  },
  {
    title: '歌手',
    key: 'artists[0].name',
  },
  {
    title: 'Action',
    key: 'action',
    render(row: any) {
      return <Dropdown row={row}></Dropdown>
    },
  },
]
const pagination = reactive({
  itemCount: 0,
  page: 1,
  pageCount: 1,
  pageSize: 10,
  pageSizes: [2, 5, 10, 20, 30],
  showSizePicker: true,
  prefix({ itemCount }: any) {
    return `Total is ${itemCount}.`
  },
})
const rowKey = (row: SongInfo) => row.id

let data: SongInfo[] = $ref([
  { id: 1 } as SongInfo,
])
const handleReset = () => {
  searchFormValue.name = ''
}
const getSongList = () => {
  isloading = true
  getSongs(searchFormValue.name, pagination.page, pagination.pageSize).then((res) => {
    // console.log(res.data)
    data = res.data.data.data
    pagination.itemCount = res.data.data.total
  })
  isloading = false
}
const handlePageChange = (currentPage: number) => {
  // console.log(currentPage)
  pagination.page = currentPage
  getSongList()
}
const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  getSongList()
}
onMounted(() => {
  getSongList()
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
          <n-input v-model:value="searchFormValue.name" placeholder="输入歌曲名或歌手名" @keyup.enter="getSongList" />
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button type="primary" @click="getSongList">
              搜索
            </n-button>
            <n-button type="warning" attr-type="reset" @click="handleReset">
              重置
            </n-button>
            <n-button attr-type="reset" @click="showModal = !showModal">
              添加
            </n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-layout>
    <n-layout>
      <n-data-table
        :columns="columns" :data="data" :pagination="pagination" :remote="true" :row-key="rowKey"
        :bordered="false" :loading="isloading" @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />
    </n-layout>
  </n-layout>
  <AddSong v-model:show="showModal" />
</template>

<style scoped>

</style>
