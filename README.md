# 電力需給チャート (Power Demand Chart)

![page1](https://user-images.githubusercontent.com/42054433/132652050-cef34bf0-7228-4a53-b6b9-dba8404c4b9d.JPG)  
![page2](https://user-images.githubusercontent.com/42054433/132651939-c1bd24d9-6d05-4913-922b-ab9f23ff22d5.JPG)   

---

## デプロイメント URL  
[http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/](http://aws-s3-tokyo.s3-website-ap-northeast-1.amazonaws.com/)

## 説明  
本プロジェクトは日本の電力需給状況を時系列で表示するチャートです。電力需給のエネルギー別内訳やヒートマップ、積み上げグラフなど、多様な視覚化を実現しています。

## データソース  
公開データであり、経済産業省資源エネルギー庁のOCCTO（電力広域的運営推進機関）から提供されています。

## サーバー  
静的サイトホスティング：AWS S3

## ビルド環境  
- Webpack  
- Babel（ES6→ES5トランスパイル）

## 継続的インテグレーション / デリバリー  
- GitHub Actions を利用

## 技術スタック・ライブラリ  
- [ECharts](https://echarts.apache.org/) : 高性能チャート描画ライブラリ  
- [jQuery](https://jquery.com/) : DOM操作、イベント管理  
- [Lodash](https://lodash.com/) : データ操作ユーティリティ  
- [Day.js](https://day.js.org/) : 軽量な日付処理ライブラリ  
- [Crossfilter](http://square.github.io/crossfilter/) : 高速データフィルタリング  
- [Math.js](https://mathjs.org/) : 数学関数ライブラリ

---

## 使い方

1. 任意の期間・エネルギー種別を選択し、「変更」ボタンをクリックしてください。  
2. チャートを切り替えたり、注釈や図例を参照しながらデータを分析できます。

---

## 開発環境セットアップ

```bash
# 依存パッケージのインストール
npm install

# ビルド実行（productionモード）
npm run build

# 開発モード（watch）
npm run build-w
```

---

## データ作成

開発中の生データ作成は以下コマンドを実行してください。

```bash
npm run create-data
```

---

## ライセンス

MIT License  