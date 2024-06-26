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

开启可选的功能或者新增入口：

```bash
pnpm new
```

生产环境构建:

```bash
pnpm build
```

本地预览生产环境产物：

```bash
pnpm serve
```

更多信息详见：[Modern.js documentation](https://modernjs.dev/en).

## 介绍

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

## 构建产物

Modern.js 的默认构建配置会在 `dist` 目录产生 `html`、`static` 目录，如果是要部署到 nginx 中，推荐进行以下类似的配置：

```
location / {
  root /path/to/dist/;
  index /html/main/index.html;
  try_files $uri /html/main/index.html;
}
```

## 容器化部署

当前 Modern-UX 默认开启了 SSR，并且服务器端口为 8080，可以在 `modern.config.ts` 中更改

1. 手动地进行容器化构建和部署：

   ```bash
   docker build -t modern-ux:latest .
   docker run -itd --name modern-ux -p 80:8080 modern-ux:latest
   ```

   然后，就可以访问 `http://127.0.0.1/` 看到已经启动的服务了

2. 流水线构建

   目前仓库已经基于 Github Actions 实现了自动化流水线 CI，即自动将 master 分支的 push / PR 打包 📦 构建为 Docker Image 并提交到 Docker Hub 中。

   你可以 fork 该仓库，然后修改 `.github/workflows/ci.yml` 中的配置（改为自己的 Docker Hub Repo 或者私有的 Docker 镜像服务），同时在 Github 仓库的 Secrets 中配置 Docker Hub 的账号密码等信息，这样就可以实现和本仓库类似的 CI 能力了。

   当然，你也可以 remake 整个 CI 配置，按照自己的需求进行配置，比如：自动化部署到 Tencent TKE 中 / 部署到 AWS 云服务中等等...




🌟 更多文档正在计划中～ 如遇问题请提 issue
