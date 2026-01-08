import axios from 'axios'

const axiosPlugin = {
  install(app) {
    app.config.globalProperties.$http = axios
    app.provide('axios', axios)
  }
}

export default axiosPlugin