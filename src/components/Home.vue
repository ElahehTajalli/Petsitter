<template>
  <div class="home">
    <div class="full-width flexbox align-center justify-around bg-primary">
      <div class="right">
        <b> {{ $t('pangool') }} </b>
        <span class="home-title">{{ $t('home_title') }}</span>
        <router-link :to="{ name: 'signup' }">
          <el-button class="mt-20" @click="test">
            {{ $t('signup') }}
          </el-button>
        </router-link>
      </div>
      <div>
        <img src="../assets/img/cat.svg" width="35rem">
      </div>
    </div>
    <div class="information flexbox align-center justify-center">
      <img src="../assets/img/plus.jpg">
      <div class="body">
        <b>{{ $t('body_title') }}</b>
        <span class="mt-15">‌{{ $t('body_information') }}</span>
        <span>‌{{ $t('body_information1') }}</span>
        <span>‌{{ $t('body_information2') }}</span>
        <span>‌{{ $t('body_information3') }}</span>
      </div>
    </div>
    <div class="footer">
      <img src="../assets/img/wave.jpg"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  
  methods: {
    ...mapActions([
      'handleRequest',
    ]),
    test () {
      this.handleRequest({
          name: `sources`,
          action: 'getAll',
          // data: { query: { name } }
        }).then((res) => {
          console.log(res)
          // this.loading = false
          // this.sources = res.data.list || []
        })
    }
  }
}
</script>