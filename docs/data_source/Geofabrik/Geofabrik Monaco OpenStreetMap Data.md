# Geofabrik Monaco OpenStreetMap Data

> [[Geofabrik]] が [[OpenStreetMap]] の planet から[[モナコ]]を切り出して、毎日配っている [[OSM PBF]] ファイル

## データソース情報

| 項目             | 内容                                                         |
| ---------------- | ------------------------------------------------------------ |
| データID         | geofabrik_europe_monaco                                      |
| ライセンス       | [[ODbL-1.0]]                                                 |
| 提供元           | [[Geofabrik]] GmbH、[[OpenStreetMap]] Contributors           |
| データ形式       | [[OSM PBF]] (ほかに Shapefile と GeoPackage)                 |
| ファイルサイズ   | 691,563 バイト (約 0.7MB、2026-10-04 版の PBF)               |
| 更新頻度         | 毎日                                                         |
| 取り出し方       | split。Geofabrik が定義した地域ごとにファイルが分かれていて、`index-v1.json` の境界ポリゴンから地域を選べる。ファイルの中の PBF は whole (Range は 206 を返すが、範囲の索引が無い) |
| URL              | https://download.geofabrik.de/europe/monaco-latest.osm.pbf   |
| 地域のページ     | https://download.geofabrik.de/europe/monaco.html             |
| 索引             | https://download.geofabrik.de/index-v1.json                  |

## 概要

ドイツの Geofabrik GmbH が配布している、モナコ公国の [[OpenStreetMap]] データです。
出どころと作り方は日本全体と同じなので、共通の説明は [[Geofabrik Japan OpenStreetMap Data]] を見てください。
索引での id は `monaco`、親は `europe`、ISO 3166-1 のコードは `MC` です。

1MB に満たない小さなファイルなので、Geofabrik の PBF を扱う手順や道具を試すのに向いています。
索引の境界は 1 つのポリゴンで、経度 7.408583 から 7.595671、緯度 43.48382 から 43.75293 の範囲にあります。
国境より一回り広く、周りの海も含む形です。

`-latest` の URL は日付つきのファイル (`monaco-261004.osm.pbf` など) へリダイレクトします。
利用者名、利用者 ID、変更セット ID は取り除かれています。

## 形式

| 形式        | URL                                                                   | 大きさ (2026-10-06 時点の latest)                 |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| PBF         | https://download.geofabrik.de/europe/monaco-latest.osm.pbf            | 691,563 バイト (`monaco-261004.osm.pbf`)          |
| Shapefile   | https://download.geofabrik.de/europe/monaco-latest-free.shp.zip       | 746,385 バイト (`monaco-261005-free.shp.zip`)     |
| GeoPackage  | https://download.geofabrik.de/europe/monaco-latest-free.gpkg.zip      | 757,266 バイト (`monaco-261005-free.gpkg.zip`)    |

- Shapefile と GeoPackage は、地物と属性を選んで変換したもので、PBF のすべてのタグは入っていません。
- 索引 (`index-v1.json`) の `urls` には `shp` はありますが `gpkg` はありません。GeoPackage の URL は地域のページから取ります。

## 古い版と差分

- 日付つきの版は直近の数日分、月初の版、毎年 1 月 1 日の版 (モナコは 2014 年から) が地域のページに並んでいます。
- 差分 (`.osc.gz`) が `https://download.geofabrik.de/europe/monaco-updates` にあります。
- 各ファイルには `.md5` があります (`monaco-latest.osm.pbf.md5`)。
- 境界ポリゴンは `https://download.geofabrik.de/europe/monaco.poly` でも配られています。

## 帰属表示

- © OpenStreetMap contributors

Geofabrik のサイトには「Data processed by Geofabrik GmbH and created by OpenStreetMap Contributors | License: ODbL 1.0」とあります。
Geofabrik 自身の帰属表示を別に求めているかどうかは確かめていません。

## データ処理コマンド

```bash
# ダウンロード (リダイレクトを追う)
mkdir -p ./tmp
curl -L -o ./tmp/monaco-latest.osm.pbf https://download.geofabrik.de/europe/monaco-latest.osm.pbf

# ファイルの情報を表示する
osmium fileinfo ./tmp/monaco-latest.osm.pbf

# GeoJSON に書き出す
osmium export ./tmp/monaco-latest.osm.pbf -f geojson -o ./tmp/monaco.geojson

# GeoPackage 版を使う
curl -L -o ./tmp/monaco-latest-free.gpkg.zip https://download.geofabrik.de/europe/monaco-latest-free.gpkg.zip
```

## 関連項目

- [[Geofabrik Japan OpenStreetMap Data]]
- [[Geofabrik Japan Kanto OpenStreetMap Data]]
- [[Geofabrik]]
- [[OpenStreetMap]]
- [[ODbL-1.0]]
- [[OSM PBF]]
- [[osmium]]
- [[モナコ]]
- [[ヨーロッパ]]
- [[オープンデータ]]

## 確認日

2026-10-06 に、`-latest` の各ファイルへの HEAD、地域のページ、`index-v1.json` (554 地域) を読んで確かめました。
この日、`-latest` の PBF は `monaco-261004.osm.pbf` へ、Shapefile と GeoPackage は `monaco-261005` の版へリダイレクトしました。
