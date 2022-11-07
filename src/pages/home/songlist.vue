<script setup lang="tsx">
import { delSongList, getSongLists } from '~/api/song'
import type { SongListInfo } from '~/types/song'

const message = useMessage()
const dialog = useDialog()
// 表格数据
let isloading = $ref(false)
let tableData = $ref([{ id: 1 } as SongListInfo])
// 搜索数据
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
// 获取数据方法
const getSongList = () => {
  isloading = true
  getSongLists(searchFormValue.name, pagination.page, pagination.pageSize).then(
    (res) => {
      // console.log(res.data)
      tableData = res.data.data.data
      pagination.itemCount = res.data.data.total
    },
  )
  isloading = false
}
// 搜索组件
const SearchTool = () => {
  const handleReset = () => {
    searchFormValue.name = ''
  }
  return (
        <n-layout>
            <n-form
                ref="formRef"
                v-model={searchFormValue}
                inline
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
            >
                <n-form-item label="搜索">
                    <n-input
                        v-model:value={searchFormValue.name}
                        placeholder="输入歌曲名或歌手名"
                        onKeyUp:enter={getSongList}
                    />
                </n-form-item>

                <n-form-item>
                    <n-space>
                        <n-button type="primary" onClick={getSongList}>
                            搜索
                        </n-button>
                        <n-button type="warning" attr-type="reset" onClick={handleReset}>
                            重置
                        </n-button>
                    </n-space>
                </n-form-item>
            </n-form>
        </n-layout>
  )
}
// 表格的操作选项
const Dropdown = (props: any) => {
  const options = [
    {
      label: '删除',
      key: 'del',
    },
  ]
  const handleDelSong = (song: SongListInfo) => {
    console.log(song)
    dialog.warning({
      title: '警告',
      content: `你确定删除${song.name}吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        delSongList(song).then((res) => {
          if (res.data.code === 200) {
            message.success('删除成功')
            getSongList()
          }
          else {
            message.error(res.data.msg)
          }
        })
      },
    })
  }
  const handleSelect = (key: string | number, row: SongListInfo) => {
    if (key === 'del')
      handleDelSong(row)
  }
  return (
        <n-dropdown
            trigger="hover"
            options={options}
            onSelect={(key: string) => handleSelect(key, props.row)}
            placement="bottom-start"
        >
            <n-button>操作</n-button>
        </n-dropdown>
  )
}
// 表格组件
const TableComponent = () => {
  const columns = [
    {
      type: 'selection',
    },
    {
      title: 'ID',
      key: 'id',
    },
    {
      title: '歌单名',
      key: 'name',
    },
    {
      title: '描述',
      key: 'description',
    },
    {
      title: '创建用户',
      key: 'userId',
    },
    {
      title: '状态',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render(row: any) {
        return <Dropdown row={row}></Dropdown>
      },
    },
  ]
  const handlePageChange = (currentPage: number) => {
    pagination.page = currentPage
    getSongList()
  }
  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    getSongList()
  }
  const rowKey = (row: SongListInfo) => row.id
  return (
        <n-layout>
            <n-data-table
                columns={columns}
                data={tableData}
                pagination={pagination}
                remote={true}
                row-key={rowKey}
                bordered={false}
                loading={isloading}
                onUpdate:page={handlePageChange}
                onUpdate:page-size={handlePageSizeChange}
            />
        </n-layout>
  )
}
onMounted(() => {
  getSongList()
})
</script>

<template>
  <n-layout :native-scrollbar="true" bordered>
    <SearchTool />
    <TableComponent />
  </n-layout>
</template>

<style scoped>

</style>
