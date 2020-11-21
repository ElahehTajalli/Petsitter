<template>
  <div class="topnav">
    <div class="full-height flexbox align-center justify-center">
      <b> {{ $t('pangool_plus') }} </b>
    </div>
    <div class="full-height flexbox align-center justify-end pull-right">
      <router-link :to="{ name: 'login' }">
        <el-button size="small">
          {{ $t('login') }}
        </el-button>
      </router-link>
      <div class="item flexbox align-center justify-center mr-10">
        <router-link :to="{ name: 'signup' }">
          <span>
            {{ $t('signup') }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
