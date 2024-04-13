import VERSION from '@/utils/version'

export default {
  /** 环境变量 */
  APP_TITLE: process.env.MODERN_APP_TITLE,
  APP_DESCRIPTION: process.env.MODERN_APP_DESCRIPTION,
  APP_VERSION: VERSION,
  APP_AUTHOR: process.env.MODERN_APP_AUTHOR,
  APP_BASE: process.env.MODERN_BASE,
  API_BASE: process.env.MODERN_API_BASE,

  /* 缓存键名 */
  LOCAL_USER_INFO: 'userinfo',
  LOCAL_TOKEN: 'token',
}
