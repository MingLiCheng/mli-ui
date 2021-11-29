---
title: Vue项目Git管理
---
# Vue项目Git管理

## git分支开发管理
xxxx

## 限制开发人员git提交
项目配置eslint和prettier后，代码基本编码格式会有很好的改善，但是部分开发人员不注意这些问题，直接将有问题的提交至仓库中，这时就需要对开发的提交进行约束。

实现此功能需要用到 husky + lint-staged
原理是使用git hook 在git的相关hook过程执行相关操作，并控制结果。

> husky: 在git hook相关阶段执行 指定命令 <br>
> lint-staged: 仅对已经进入暂存区的git文件进行操作

### 配置husky
官方提供多种安装方法 https://typicode.github.io/husky/#/?id=usage <br>

- husky-init 是一个一次性命令，用于使用 husky 快速初始化项目

```shell
  npx husky-init && npm install       # npm
  npx husky-init && yarn              # Yarn 1
  yarn dlx husky-init --yarn2 && yarn # Yarn 2
```
它将设置 husky，修改package.json并创建一个pre-commit您可以编辑的示例挂钩。默认情况下，它会npm test在您提交时运行。

该命令会在根目录创建`.husky`文件夹 内部的pre-commit文件中有`npm test` <br>
意为在commit之前执行`npm test`命令

husky 包含很多 hook（钩子），常用有：`pre-commit`、`commit-msg`、`pre-push`。这里，我们使用 `pre-commit` 来触发 ESLint 命令 <br>

修改`npm test` ----> `eslint --fix ./src --ext .vue,.js,.ts` 这样在提交执行就可以进行eslint的修复 成功可以正常commit 否则终止commit

这样有一个问题就是每次都要对项目中的src下的全部文件执行eslint --fix 为了更好的团队协作应该只检查本次修改的(add)的文件<br>

这就需要另一个工具`lint-staged`

### lint-staged
官网： https://github.com/okonet/lint-staged#readme

- 安装
```shell
yarn add lint-staged -D
```
- 配置（在 package.json里增加 lint-staged 配置项）
```javascript
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{vue,js,ts}": "eslint --fix"
  }
```
- 使用 (修改husky的pre-commit hook 触发 npx lint-staged)
```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

至此`husky`和`lint-staged`就配置好了开发人员在commit的时候就会触发钩子进行代码检查，对代码质量有较高的提升

**多人协作的项目 严禁个人我行我素**
