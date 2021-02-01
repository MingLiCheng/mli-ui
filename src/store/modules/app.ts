/*
 * @Description:
 * @Author: mlcheng2
 * @Date: 2020-12-02 10:12:26
 */

import { VuexModule, getModule, Mutation, Action, Module } from 'vuex-module-decorators'
import store from '@/store'
export interface IAppState {
  siderMenuFoldState: boolean
}

// 动态注入存储
@Module({ dynamic: true, store, name: 'app' })
class AppState extends VuexModule implements IAppState {
  public siderMenuFoldState = false

  @Mutation
  private TOGGLE_SIDER() {
    this.siderMenuFoldState = !this.siderMenuFoldState
  }

  @Action
  public toggleSideBar() {
    this.TOGGLE_SIDER()
  }
}

export const AppModule = getModule(AppState)
