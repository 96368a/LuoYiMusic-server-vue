<template>
  <n-message-provider>
    <n-dialog-provider>
      <div font-sans text="center gray-700 dark:gray-200" h-full>
        <router-view />
        <!-- <Footer /> -->
      </div>
    </n-dialog-provider>
  </n-message-provider>
</template>
