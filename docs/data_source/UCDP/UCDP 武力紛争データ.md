# UCDP 武力紛争データ

> [[Uppsala Conflict Data Program]] (UCDP) が配っている、世界の組織的暴力の出来事を 1 件 1 行で位置つきにまとめた UCDP Georeferenced Event Dataset (GED)

## データソース情報

| 項目             | 内容                                                            |
| ---------------- | --------------------------------------------------------------- |
| データID         | ucdp_ged_23_1                                                   |
| 版               | 26.1 (2026-10-06 時点の最新)                                    |
| ライセンス       | [[CC-BY-4.0]] (論文の引用が求められる)                          |
| 提供元           | [[Uppsala Conflict Data Program]] (ウプサラ大学 平和・紛争研究学部) |
| データ形式       | [[Zipped CSV]]                                                  |
| ファイルサイズ   | 39,122,522 バイト (約 39MB、展開後の CSV は 273,992,720 バイト) |
| 期間             | 1989-01-01 から 2025-12-31                                      |
| 更新頻度         | 年 1 回 (版番号の上 2 桁が年)                                   |
| 取り出し方       | 全世界・全期間のファイルを丸ごと取得する (部分取得はできない)   |
| URL              | https://ucdp.uu.se/downloads/ged/ged261-csv.zip                 |
| コードブック     | https://ucdp.uu.se/downloads/ged/ged261.pdf                     |

データID は以前の版 (23.1) の名前のままですが、中身は上の版を指します。

## 概要

スウェーデンのウプサラ大学の [[Uppsala Conflict Data Program]] が作っている、武力紛争の出来事のデータです。
組織的な主体が別の組織的な主体か民間人に武力を使い、特定の場所と日付で 1 人以上が直接死亡した出来事を 1 件として、村や町の単位の位置、日の単位の日付、死者数の推定を持ちます。
暴力の種類 (`type_of_violence`) は、1 が国家が当事者の紛争、2 が国家の関わらない紛争、3 が民間人への一方的な暴力です。

zip の中は `GEDEvent_v26_1.csv` が 1 つだけで、UTF-8 のカンマ区切り、見出し行つきです。
列は 49 個で、位置は次の列にあります。

- `latitude`、`longitude`: 緯度と経度 (WGS84)
- `geom_wkt`: 同じ点の WKT (`POINT (経度 緯度)`)
- `where_prec`: 位置の精度 (1 が正確な地点、4 以上は州や国の代表点)

死者数は `best` (最良推定)、`low`、`high` と、内訳の `deaths_a`、`deaths_b`、`deaths_civilians`、`deaths_unknown` です。
日付は `date_start` と `date_end` で、精度は `date_prec` にあります。

調査メモによれば 26.1 は 417,968 行です (行数は自分では数えていません)。
UCDP は過去の出来事も版ごとに直すので、分析には版番号を必ず書きます。

## 取り出し方

GED は全世界・全期間を 1 つにまとめたファイルしかありません。
zip の中の CSV は圧縮されていて、行や地域や年の索引も無いため、HTTP Range で一部だけを読み出しても必要な行を選べません。
約 39MB なので、丸ごと取得してから絞り込みます。

同じ版の Stata (`ged261-dta.zip`)、R (`ged261-rds.zip`)、Excel (`ged261-xlsx.zip`) もありますが、どれも全体を 1 つにしたものです。
API (https://ucdp.uu.se/apidocs/) で絞って取得できるかもしれませんが、アクセストークンが要り、試していません。

## 古い版と速報版

- 現行の版は https://ucdp.uu.se/downloads/ に、古い版は https://ucdp.uu.se/downloads/olddw.html にあります。
- 古い版も同じ規則の URL で取得できます (例: 23.1 は https://ucdp.uu.se/downloads/ged/ged231-csv.zip、26,587,114 バイト)。
- 現行のページには、月ごとの速報版 (UCDP Candidate Events Dataset、`downloads/candidateged/GEDEvent_v26_0_8.csv` など) も並んでいます。

## 気をつけること

- `gwnoa` には `2;200;900` のように `;` で区切った複数の値が入る行があります。型を先頭の数行から推定すると数値と判定され、途中で読み込みが止まることがあります。
- `low <= best <= high` が成り立たない行があります (調査メモによれば 26.1 で 5,075 行)。
- `where_prec` が 4 以上の行は州や国の代表点なので、点の位置に意味がありません。空間で集計する前に精度で絞ります。

## 帰属表示

ダウンロードのページには次のようにあります (原文は 2 つをダッシュでつないだ 1 文です)。

> All datasets are free of charge and licensed under CC BY 4.0

> you are free to use and redistribute them provided you cite the relevant publications listed with each dataset.

CC BY 4.0 の表示 (UCDP, Uppsala University、ライセンス名と URL、元データへのリンク、改変したならその旨) に加えて、GED 26.1 の欄が挙げる次の論文を引用します。

- Davies, Shawn, Therése Pettersson and Magnus Öberg (2026) Organized violence 1989–2025, and violent political protests. Journal of Peace Research. https://doi.org/10.1093/jopres/xjag046
- Sundberg, Ralph and Erik Melander (2013) Introducing the UCDP Georeferenced Event Dataset. Journal of Peace Research 50(4).

コードブックの表紙は、場合によってコードブック自体 (Högbladh 2026) の引用も求めています。

## データ処理コマンド

```bash
# ダウンロード
mkdir -p ./tmp/ucdp.uu.se
curl -L -o ./tmp/ucdp.uu.se/ged261-csv.zip https://ucdp.uu.se/downloads/ged/ged261-csv.zip

# 展開する (中身は GEDEvent_v26_1.csv の 1 つ)
unzip -o ./tmp/ucdp.uu.se/ged261-csv.zip -d ./tmp/ucdp.uu.se

# PostGIS に取り込む
# AUTODETECT_SIZE_LIMIT=0 で全行から型を推定する (gwnoa を文字列にするため)
ogr2ogr \
  -overwrite \
  -f PostgreSQL PG:"dbname=tileserv user=postgres password=postgres host=localhost port=54321" \
  -oo AUTODETECT_TYPE=YES \
  -oo AUTODETECT_SIZE_LIMIT=0 \
  -oo X_POSSIBLE_NAMES=longitude \
  -oo Y_POSSIBLE_NAMES=latitude \
  -a_srs EPSG:4326 \
  -lco FID=id \
  -nln ucdp_ged \
  --config PG_USE_COPY YES \
  ./tmp/ucdp.uu.se/GEDEvent_v26_1.csv

# GeoJSON に書き出す
ogr2ogr \
  -overwrite \
  -f GeoJSON \
  -oo X_POSSIBLE_NAMES=longitude \
  -oo Y_POSSIBLE_NAMES=latitude \
  -a_srs EPSG:4326 \
  ./tmp/ucdp.uu.se/GEDEvent_v26_1.geojson \
  ./tmp/ucdp.uu.se/GEDEvent_v26_1.csv

# PMTiles に変換する (tippecanoe 2.17 以降)
tippecanoe \
  -Z1 \
  -z18 \
  -pf \
  -pk \
  -o ./tmp/ucdp.uu.se/GEDEvent_v26_1.pmtiles \
  ./tmp/ucdp.uu.se/GEDEvent_v26_1.geojson
```

PMTiles にしたものは [[SmartMaps Uppsala 紛争データ PMTiles]] にあります。

## 関連項目

- [[Uppsala Conflict Data Program]]
- [[SmartMaps Uppsala 紛争データ PMTiles]]
- [[武力紛争]]
- [[平和研究]]
- [[CC-BY-4.0]]
- [[Zipped CSV]]
- [[CSV]]
- [[GeoJSON]]
- [[PMTiles]]
- [[PostGIS]]
- [[PostgreSQL]]
- [[ogr2ogr]]
- [[tippecanoe]]
- [[EPSG:4326]]

## 確認日

2026-10-06 に確かめました。

- `ged261-csv.zip` と `ged261.pdf` の大きさは HEAD の応答の値です (zip の Last-Modified は 2026-06-08 19:54:24 GMT)。
- zip の中のファイル名と展開後の大きさは、zip の末尾の目録を Range 要求で読んで確かめました。CSV の列名は、zip の先頭 64KB を Range 要求で取って展開した見出し行で確かめました。
- ライセンス、引用、古い版と速報版の URL は https://ucdp.uu.se/downloads/ を読んで確かめました。
- 行数、`low`、`best`、`high` の食い違いの行数は調査メモの値で、自分では数えていません。
- コマンドは実行していません。
