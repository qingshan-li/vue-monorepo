# Vue 3 + TypeScript + Vite

Vue 3 + TypeScript + Vite + pnpm + monorepo

# 放弃 npm 和 yarn 吧，全面拥抱 pnpm 吧

语法同 npm 相似，pnpm 有个优点就是重复的包不会下载

## 下载包

```
pnpm i dayjs -w
```

这个 `-w` 是必须加的。否则会因为权限报错，`-w` 主要就是将包安装扁平化，在任何路径下安装都会装在根目录下。

注意！！！切记不要在项目启动时下载包和 `pnpm i`，请先停止项目再下载。

## 启动项目

`pnpm start` 并选择你要启动的项目

## 创建项目

在 `packages/projects` 目录下使用以下命令创建项目
```
pnpm create vite <项目名称>
```

然后在 `config/project/project-list` 文件按照例子创建项目目录元素

* 把项目包的 package.json 的 name 改为 `@projects/xxx` 即可





# CSS原子化

我在其中加入了 Windi CSS，可以通过类名方式写样式

可以参考下https://antfu.me/posts/reimagine-atomic-css-zh css原子化概念

**[Windi CSS](https://cn.windicss.org/integrations/vite.html)**

class 可以参考参考
https://www.tailwindcss.cn/docs/align-items