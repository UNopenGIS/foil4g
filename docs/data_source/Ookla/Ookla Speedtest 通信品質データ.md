---
title: "Ookla Speedtest 通信品質データ"
description: "Speedtestの実測から固定・携帯回線の速度と遅延をタイルごとに集計した全球データ。通信環境の地域差を分析できます。"
id: "ookla_speedtest"
provider_group: "Ookla"
provider: "Ookla"
categories: ["通信"]
regions: ["全世界"]
formats: ["Parquet", "Shapefile"]
license: ["CC-BY-NC-SA-4.0"]
access: "range"
access_note: "公開S3のParquetはHTTP Rangeに対応。固定・携帯、年、四半期で分割。空間条件による読込削減は行グループ構成に依存する。"
format: ["Parquet", "Shapefile"]
coverage: "世界の測定がある場所。全タイルを一様に測定しているわけではない。"
period: "2019年以降、四半期単位。例は2026年第2四半期のmobile。"
url: "https://registry.opendata.aws/speedtest-global-performance/"
docs: "https://github.com/teamookla/ookla-open-data"
checked: "2026-10-07"
details: {"参考資料": "study-geoai-algo-py/docs/datasets/ookla-speedtest/README.md", "確認範囲": "2026-10-07に公式案内・利用条件と本文に記載した配布応答を確認。全国の実データの全件読込は未実施。"}
---

# Ookla Speedtest 通信品質データ

> Speedtestの実測から固定・携帯回線の速度と遅延をタイルごとに集計した全球データ。通信環境の地域差を分析できます。

## 概要・内容

Speedtest by Ooklaの測定を、ズーム16のWebメルカトルタイルごとに集計したデータです。固定回線と携帯回線を分け、下り・上り速度、遅延、測定数・端末数を持ちます。人口や基地局分布と重ねた通信環境の分析に向いています。

## 取り出し方・データ処理コマンド

匿名で読めるS3バケット `ookla-open-data` に、回線種別・年・四半期ごとのParquetとShapefile ZIPがあります。今回、以下のParquetのRange要求にHTTP 206を確認しました。

```sh
curl -fL -r 0-1023 'https://ookla-open-data.s3.us-west-2.amazonaws.com/parquet/performance/type=mobile/year=2026/quarter=2/2026-04-01_performance_mobile_tiles.parquet' -o ookla-header.bin
```

列を選ぶならDuckDBなどのParquet対応ツールを使います。元のParquetの形状はWKTの `tile` 列であり、GeoParquetとは限りません。

## ライセンスと帰属表示

[AWS登録ページ](https://registry.opendata.aws/speedtest-global-performance/) の条件はCC BY-NC-SA 4.0です。非営利条件と継承条件があります。登録ページの引用例に従い、対象期間・アクセス日・提供者を記載します。

## 気をつけること

- 測定をした端末と場所に偏りがあります。測定数 (`tests`) の少ないタイルの平均を、地域の通信品質全体とみなさないようにします。
- 地理的なタイル単位の集計なので、個々の基地局や利用者の位置ではありません。
- Range対応でも、空間条件に応じて少量だけ読めるとは限りません。元ファイルの行グループが粗いと多くの行を読みます。
- [[OpenCelliD 基地局位置データ]] と組み合わせる場合も、両者の観測時点・地域の偏りを確認します。

## 確認日

2026-10-07。配布応答は本文の例で確認しました。全国の全件数・精度・処理時間は今回測定していません。
