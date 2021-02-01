/*
 * @Description: 项目全局的设置相关标识变量
 * @Author: mlcheng2
 * @Date: 2020-12-02 09:59:17
 */
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import antdvThemeVariables from '@/assets/styles/theme.less'

export interface ISettingsState {
  theme: string
  siderMenuFoldState: boolean
}

// 动态注入存储
@Module({ dynamic: true, store, name: 'settings' })
export class Settings extends VuexModule implements ISettingsState {
  public siderMenuFoldState = false
  public theme = antdvThemeVariables.theme

  @Mutation
  private CHANGE_SETTING(payload: { key: string; value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      ;(this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string; value: any }) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
