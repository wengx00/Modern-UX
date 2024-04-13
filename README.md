# Modern-UX

> 基于 Modern.js 和 Material-UI 的 React 应用模版

## 启动

安装依赖:

```bash
pnpm install
```

## 快速开始

在 Dev 模式下运行:

```bash
pnpm dev
```

Enable optional features or add a new entry:

```bash
pnpm new
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

For more information, see the [Modern.js documentation](https://modernjs.dev/en).

## Introduction

- 基于字节跳动 Web Infra 开源的 modern.js Web 工程体系解决方案

- 使用 React 全家桶，包括 React-Redux、React-Router 等

- 使用 Material-UI 组件库，详见 [Material UI 文档](https://mui.com/material-ui/all-components/)

- 使用基于 Rust 开发的，比 Webpack 快 10 倍的 Rspack（同样是字节跳动 Web Infra 团队的开源产品）

- 得益于 modern.js 框架的能力，可以同构地实现 SSR、CSR、SSG

  > - SSR: Server Side Render 服务端渲染
  > - CSR: Client Side Render 客户端渲染
  > - SSG: Static Site Generators 静态站点生成

## 语义化版本

项目基于 `package.json` 进行语义化版本区分，在构建 / 开发模式下会自动读取其中的 `version` 属性，并且在项目目录中的 `/src/utils/version.ts` 中自动生成相同的版本信息。

在应用中获取当前版本号的方式有两种：

1. 获取 `/src/utils/constants` 默认导出的常量配置中的 `APP_VERSION` 属性 [Recommend]

2. 直接使用 `/src/utils/version` 的默认导出 [Not Recommend]

## 数据获取

为了在 SSR、CSR、SSG 获得同构的数据获取能力，推荐借助 Modern.js 提供的 `useDataLoader()` hook 来进行页面数据拉取（详见 [Modern.js 文档](https://modernjs.dev/)）

然而，除了初始化页面相关的数据拉取，其他的所有接口调用都建议通过 `/src/hooks/useApi` 提供的 `useApi` hook来进行

## 表单控制

Material UI 并没有提供开箱即用的表单整体控制能力（比如 Ant Design 中提供的 Validate、自动注入等能力）

为此，Modern-UX 专门基于 Material-UI 开发了类似的开箱即用的表单控制能力，详见 `/src/components/Form/*` 中 📦 的：

- `Form`: 表单顶层逻辑控件，使用观察者 👀 模式和类似 Redux 的方式提供一个表单数据仓库，📦 封装了表单校验等能力

- `FormItem`: 劫持其子组件（Material UI的表单控件，比如 `TextField`）提供数据注入等能力

- `HelperItem`: 主要针对 Material-UI 中的 `Checkbox` 等需要 Controller 的组件提供一层适配 `FormItem` 的封装

如果你不想使用开箱即用的 `FormItem`，那么也可以使用 `/src/hooks/useFormItem` 中提供的 `useFormItem` hook 自定义一个船新的 FormItem


🌟 更多文档正在计划中～ 如遇问题请提 issue
