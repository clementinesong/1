# 互动文本网页原型

这是一个手机优先的静态网页原型，用于承载 5 个 scene、6 个 option、数值统计与 4 种结局判定。

## 如何填写内容

- 固定场景文本：编辑 `script.js` 中 `pages.scene1` 到 `pages.scene5` 的 `text`。
- 选项引导与选项结果：编辑 `script.js` 中 `option_*` 页面里的 `text`、`choices[].label`、`choices[].result`。
- BGM：给任意页面对象补充 `bgmSrc`，例如 `bgmSrc: "audio/scene1.mp3"`；`bgm` 字段用于页面底部显示曲名或备注。
- 分值：编辑每个选项的 `effects`，当前已按设计写入 love / madness 增减。
- 结局文案：编辑 `script.js` 中 `endings` 对象。

## 本地预览

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/`。
