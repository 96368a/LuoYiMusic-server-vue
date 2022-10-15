<script setup lang="tsx">
import type { MenuOption } from 'naive-ui'

const collapsed = $ref(false)
function renderMenuLabel(option: MenuOption) {
  if ('href' in option) {
    return h(
      'a',
      { href: option.href, target: '_blank' },
      option.label as string,
    )
  }
  return option.label as string
}
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
        label: '用户列表',
        key: 'user-list',
      },
    ],
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
          },
          {
            label: '羊男',
            key: 'sheep-man',
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
            href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]
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
        :render-label="renderMenuLabel" :render-icon="renderMenuIcon" :expand-icon="expandIcon"
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
