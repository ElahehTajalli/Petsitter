<template>
  <div
  class="forgotpass flexbox full-height align-center justify-center">
    <div>
      <div class="logo text-center mb-15 font">
        {{ $t('pangool') }}
      </div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{ $t('forgot_password') }}</span>
        </div>
        <div>
          <el-form
          :model="sendUsernameForm"
          ref="sendUsernameForm"
          label-position="top"
          :rules="rules"
          :disabled="loading">
            <el-form-item prop="username">
              <el-input class="ltr text-right"
              :placeholder="$t('email')"
              v-model="sendUsernameForm.username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
              type="primary"
              @click="handleResetPassFormSubmit"
              :loading="loading"
              class="mt-15">
                {{ $t('send') }}
              </el-button>
              <el-button class="mt-15 mr-10" :loading="loading">
                <router-link :to="{ name: 'login' }">
                  {{ $t('go_back') }}
                </router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { email } from '@/utils/patterns'
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error(this.$i18n.t('insert_your_email')))
      } else if (!email.test(value)) {
        callback(new Error(this.$i18n.t('insert_valid_email')))
      } else {
        callback()
      }
    }
    return {
      showSuccess: false,
      loading: false,
      sendUsernameForm: {
        username: ''
      },
      forms: ['sendUsernameForm'],
      callbacks: [this.handleSendUsername],
      rules: { 
        username: [{
          validator: checkEmail,
          required: true,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleRequest'
    ]),
    disableLoading () {
      this.loading = false
    },
    handleSendUsername () {
      let formData = new FormData()
      formData.append('email', this.sendUsernameForm.username)
      this.handleRequest({
        name: 'password-reset/',
        action: 'create',
        data: formData
      }).then(() => {
        this.disableLoading()
        this.$message({
          type: 'success',
          message: this.$i18n.t('send_reset_link_please_check_your_email'),
          customClass: 'bg-success-dark'
        })
      })
      .catch(() => {
        this.$message({
          type: 'error',
          message: this.$i18n.t('email_not_exist'),
          customClass: 'bg-error-dark'
        })
        this.disableLoading()
      })
    },
    handleResetPassFormSubmit () {
      this.$refs.sendUsernameForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.handleSendUsername()
        } else {
          return false
        }
      })
    },
    handleKeyPress (e) {
      let { key } = e
      if (key === 'Enter') {
        e.preventDefault()
        this.handleResetPassFormSubmit()
      }
    }
  },
  created () {
    document.addEventListener('keypress', this.handleKeyPress)
  },
  beforeDestroy () {
    document.removeEventListener('keypress', this.handleKeyPress)
  }
}
</script>
