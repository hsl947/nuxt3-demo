import { sendEmailCode } from '@/api/user.js'
import { ref, onMounted, getCurrentInstance } from 'vue'

export default (downNum = 60) => {
  const { proxy } = getCurrentInstance()

  const sendBtnText = ref('')
  const countdown = ref(downNum)
  const sending = ref(false)
  const sent = ref(false)

  onMounted(() => {
    sendBtnText.value = '发送验证码'
  })

  //这里省略调用发送短信接口逻辑,省略禁止点击逻辑
  const sendCode = (p) => {
    if (sending.value || sent.value) return

    sending.value = true
    // sendBtnText.value = '发送中...'

    sendEmailCode(p)
      .then((res) => {
        sending.value = false
        if (res.code !== 0) {
          sendBtnText.value = '发送验证码'
          return
        }

        sent.value = true
        sendBtnText.value = `${countdown.value}s`

        // 倒计时开始
        const timer = setInterval(() => {
          countdown.value--
          sendBtnText.value = `${countdown.value}s`
          // 清除倒计时
          if (countdown.value === 0) {
            clearInterval(timer)
            sending.value = false
            sent.value = false
            sendBtnText.value = '发送验证码'
            countdown.value = downNum
          }
        }, 1000)
      })
      .catch(() => {
        sending.value = false
        sent.value = false
        sendBtnText.value = '发送验证码'
      })
  }
  return { sendBtnText, sendCode, sending, sent }
}
