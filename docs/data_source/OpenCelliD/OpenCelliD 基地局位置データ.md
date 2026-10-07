---
title: OpenCelliD 基地局位置データ
description: "OpenCelliD が利用者の観測から推定した、世界の携帯電話基地局 (セル) の位置を CSV で配っている一括ダウンロード"
provider_group: "OpenCelliD"
categories: ["通信"]
regions: ["全世界"]
formats: ["CSV"]
id: opencellid_full
provider: [OpenCelliD (2017 年から Unwired Labs が運営), OpenCelliD の貢献者]
license: [CC-BY-SA-4.0]
access: unconfirmed
access_note: 未確認。国別と全世界のファイル、bbox で引ける API (`cell/getInArea`) があるが、どれもアクセストークンが要り、実測していない
format: CSV (gzip 圧縮)
size: 確かめていません (以前のページには 105MB とありました)
update: 毎日 (02:00 GMT までに作り直し)
url: https://opencellid.org/downloads.php
checked: 2026-10-06
details:
  列の説明: https://docs.opencellid.org/docs/downloads/database-format
---

# OpenCelliD 基地局位置データ

> [[OpenCelliD]] が利用者の観測から推定した、世界の携帯電話基地局 (セル) の位置を [[CSV]] で配っている一括ダウンロード

## 概要

OpenCelliD は、携帯電話の基地局の位置を集める共同プロジェクトです。
2008 年に始まり、2017 年からは Unwired Labs が運営しています。
トップページには、記録されたセルが 5,500 万以上、国と地域が 200 以上とあります。

利用者がアプリや機器で、近くのセルの識別子と GPS の位置を一緒に記録して送ります。
OpenCelliD はその観測からセルの位置を推定します。
そのため、位置は推定値で、実際の基地局の場所とは限りません。
1 つの物理的な基地局に、複数のセル ID が属することもあります。

観測に頼っているので、全基地局の台帳ではありません。
地域、事業者、方式 (GSM、UMTS、LTE など) によって網羅度が違います。

一括ダウンロードに入るのは、直近 18 か月に観測されたセルだけです。
それより古いセルは、API で 1 件ずつ引く必要があります。

## 取り出し方

ダウンロードページには国別のファイル、全世界のファイル、日ごとの差分があります。
どれも API アクセストークンが無いとリンクが表示されません。
アカウントを作ってトークンを発行し、ダウンロードページに入力するとリンクが出ます。
同じファイルを取得できるのは 1 日 2 回までです。

ファイルは gzip で圧縮した CSV で、範囲の索引がありません。
HTTP Range が使えるかどうかは確かめていませんが、使えたとしても必要な範囲だけを選んで読み出すことはできません。
範囲を絞るには、国別のファイルを選ぶか、取得してから絞り込みます。
国の区分は列 `mcc` (Mobile Country Code) で見分けられます。

範囲を指定して少しだけ引くなら、API の「List cells in an area」と「Count cells in an area」があります。
API は利用者ごとに 1 日 1,000 リクエストまでです。

## ファイルの列

全体のファイル `cell_towers.csv` と差分 `cell_towers_diff-*.csv.gz` は、同じ列をこの順に持ちます。

| 列            | 型      | 意味                                                                  |
| ------------- | ------- | --------------------------------------------------------------------- |
| radio         | string  | 方式 (GSM、UMTS、LTE、CDMA など)                                      |
| mcc           | integer | Mobile Country Code                                                   |
| net           | integer | Mobile Network Code (MNC)、CDMA では System Identifier (SID)           |
| area          | integer | LAC、LTE では TAC、CDMA では NID                                      |
| cell          | integer | セル ID。UMTS では RNC とセルを合わせた値、CDMA では BID              |
| unit          | integer | UMTS の PSC、LTE の PCI。GSM と CDMA では空                           |
| lon           | double  | 推定した経度 (度)                                                     |
| lat           | double  | 推定した緯度 (度)                                                     |
| range         | integer | 推定したセルの範囲 (m)                                                |
| samples       | integer | そのセルに割り当てた観測の数                                          |
| changeable    | integer | 廃止。常に 1                                                          |
| created       | integer | 初めて観測された時刻 (Unix 秒、UTC)                                   |
| updated       | integer | 最後に観測された時刻 (Unix 秒、UTC)                                   |
| averageSignal | integer | 廃止。常に 0                                                          |

推定の確からしさは `range` と `samples` で見ます。

## 更新の仕組み

全体と国別のファイルは毎日 02:00 GMT までに作り直されます。
日ごとの差分 `cell_towers_diff-*.csv.gz` は全体と同じ列を持ちます。
手元のデータを作り直すときは、差分を積み重ねるより新しい全体のファイルを取り直すよう、公式の説明は勧めています。

## 帰属表示

- Cell tower data from OpenCelliD (https://opencellid.org), licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).

ライセンスは API の結果、一括ダウンロード、日ごとの差分のすべてに及びます。
データを見せる場所 (地図の横、図のキャプション、API の応答のメタデータなど) に、OpenCelliD の名前、出典へのリンク、ライセンスへのリンクを出します。
手を加えたときは、その内容も書き添えます (例: 「座標を小数点以下 2 桁に丸めた」)。
加工したデータを配るときは、同じ CC BY-SA 4.0 で配る必要があります。
帰属表示の免除は、Unwired Labs が書面で認めた場合だけです。

## データ処理コマンド

トークンを入力したときにダウンロードページが出すリンクの形は確かめていません。
次の URL は以前のページに書かれていた形で、トークンを付けずに呼ぶとエラーの JSON が返ります。

```bash
# 1. 全世界のファイルを取得する (OPENCELLID_TOKEN に API アクセストークンを入れておく)
mkdir -p ./tmp/opencellid
curl -L -o ./tmp/opencellid/cell_towers.csv.gz \
  "https://opencellid.org/ocid/downloads?token=${OPENCELLID_TOKEN}&type=full&file=cell_towers.csv.gz"

# 2. 展開する
gunzip -c ./tmp/opencellid/cell_towers.csv.gz > ./tmp/opencellid/cell_towers.csv

# 3. 日本 (mcc 440 と 441) だけを残す
awk -F, 'NR==1 || $2==440 || $2==441' ./tmp/opencellid/cell_towers.csv > ./tmp/opencellid/cell_towers_jp.csv

# 4. CSV から GeoJSON に変換する (経度と緯度の列を指定)
ogr2ogr \
  -overwrite \
  -f GeoJSON \
  -oo X_POSSIBLE_NAMES=lon \
  -oo Y_POSSIBLE_NAMES=lat \
  -oo KEEP_GEOM_COLUMNS=NO \
  ./tmp/opencellid/cell_towers_jp.geojson \
  ./tmp/opencellid/cell_towers_jp.csv

# 5. GeoJSON から PMTiles に変換する
tippecanoe \
  -Z1 \
  -z18 \
  -pf \
  -pk \
  -P \
  -o ./tmp/opencellid/cell_towers_jp.pmtiles \
  ./tmp/opencellid/cell_towers_jp.geojson
```

以前のページにあった `https://opencellid.org/downloads/cell_towers.csv.gz` は、トークンを付けない形で、公式の説明にはない URL です。

## 関連項目

- [[SmartMaps OpenCelliD PMTiles]]
- [[OpenCelliD]]
- [[基地局]]
- [[GPS]]
- [[CC-BY-SA-4.0]]
- [[CSV]]
- [[GeoJSON]]
- [[PMTiles]]
- [[ogr2ogr]]
- [[tippecanoe]]

## 確認日

2026-10-06 にダウンロードページ (https://opencellid.org/downloads.php) とドキュメント (https://docs.opencellid.org/) の、データの形式、ダウンロードの概要、全体と差分、利用の上限、ライセンスと帰属表示のページを読んで確かめました。
トークンを持っていないので、ダウンロードの API は呼んでいません。
ファイルの大きさ、件数、国別ファイルの一覧、ダウンロードの URL の形は確かめていません。
