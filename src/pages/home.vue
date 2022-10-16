<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'

const route = useRoute()
console.log(route.path.split('/'))

const collapsed = $ref(false)
function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man')
    return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food')
    return null
  return <n-icon size="20">
    <i class="i-pixelarticons-android inline-block" />
  </n-icon>
}
function expandIcon() {
  return <i class="i-pixelarticons-chevron-down inline-block" />
}
const menuOptions: MenuOption[] = [
  {
    label: '用户管理',
    key: 'user-manager',
    children: [
      {
        label: () => <router-link to="/home/user">用户列表</router-link>,
        key: 'user-list',
      },
    ],
  },
  {
    label: '曲库相关',
    key: 'dance-dance-dance',
    children: [
      {
        label: () => <router-link to="/home/song">歌曲列表</router-link>,
        key: 'song-list',
      },
      {
        label: () => <router-link to="/home/songlist">歌单列表</router-link>,
        key: 'songlist-list',
      },
      {
        label: '歌手列表',
        key: 'arist-list',
      },
    ],
  },
]
function handleUpdateValue(key: string, item: MenuOption) {
  console.log(key)
  console.log(item)
}
</script>

<template>
  <n-layout has-sider h-full>
    <n-layout-sider
      bordered collapse-mode="width" :collapsed-width="60" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div py-8 flex justify-center items-center>
        <i i-pixelarticons-android inline-block text-4xl />
        <span v-if="!collapsed">Logo</span>
      </div>
      <n-menu
        :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
        :render-icon="renderMenuIcon" :expand-icon="expandIcon" @update:value="handleUpdateValue"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header flex gap-8 p="x-4 y-2">
        <n-icon size="20" class="cursor-pointer" @click="collapsed = !collapsed">
          <i inline-block :i-pixelarticons-float="collapsed ? 'left' : 'right'" />
        </n-icon>
        <n-breadcrumb>
          <n-breadcrumb-item>
            <n-icon size="14">
              <i inline-block i-pixelarticons-card-text />
            </n-icon>
          </n-breadcrumb-item>
          <n-breadcrumb-item>
            <n-icon size="14">
              <i inline-block i-pixelarticons-card-text />
            </n-icon>
            index
          </n-breadcrumb-item>
        </n-breadcrumb>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view />
      </n-layout-content>
      <n-layout-footer>Designed by Logs404</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped>

</style>
