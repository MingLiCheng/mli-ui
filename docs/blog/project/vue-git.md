---
title: Vue项目Git管理
---
# Vue项目Git管理

## 项目集成eslint后限制开发人员git提交
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
