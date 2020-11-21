<template>
  <el-container class="full-height">
    <el-header class="bg-primary flexbox align-center justify-center">
      <top-nav />
    </el-header>
    <el-container>
      <el-main class="no-padding">
        <home />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopNav from '@/components/TopNav'
import Home from '@/components/Home'

export default {
  components: {
    TopNav,
    Home
  }
}
</script>