# Webpack 5 i18n HTML 靜態輸出範例

> 使用 [Webpack 5+](https://webpack.js.org/) 製作程式打包，[static-i18n](https://github.com/claudetech/node-static-i18n) 做多語系設定。

---

### 啟動專案，請執行以下步驟：

##### 1. Clone repository & 安裝 package：

```bash
yarn install
```

##### 2. 安裝完畢後，啟動 Development server [http://localhost:8080](http://localhost:8080)：

```bash
npm run dev
```

##### 3. 發佈專案：

```bash
npm run build
```

> 專案發佈，會生成 Html template 於 i18n 裡，並打包到 dist

```
dist (打包後生成)
│   index.html
│   others.html
└───assets
│   └───/js
│   └───/css
│   └───/images
│
i18n (打包後生成)
│
www (主程式內容)
└───assets
│   └───images
│   └───others
│       ...
│       ...
│
└───styles
│   └───/**/*.scss
│
└───src
│   └───/**/*.ts
│   └───/**/*.js
│
└───locales (多語系文檔)
│   └───en.json
│   └───zh.json
│
│   index.html
│   others.html

```

---
