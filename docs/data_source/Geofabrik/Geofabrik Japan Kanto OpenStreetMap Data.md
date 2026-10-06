# Geofabrik Japan Kanto OpenStreetMap Data

> [[Geofabrik]] が [[OpenStreetMap]] の planet から日本の関東地方を切り出して、毎日配っている [[OSM PBF]] ファイル

## データソース情報

| 項目             | 内容                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| データID         | geofabrik_asia_japan_kanto                                           |
| ライセンス       | [[ODbL-1.0]]                                                         |
| 提供元           | [[Geofabrik]] GmbH、[[OpenStreetMap]] Contributors                   |
| データ形式       | [[OSM PBF]] (ほかに Shapefile と GeoPackage)                         |
| ファイルサイズ   | 516,386,456 バイト (約 516MB、2026-10-04 版の PBF)                   |
| 更新頻度         | 毎日                                                                 |
| 取り出し方       | 地域ごとのファイルを丸ごと取得する (部分取得はできない)              |
| URL              | https://download.geofabrik.de/asia/japan/kanto-latest.osm.pbf        |
| 地域のページ     | https://download.geofabrik.de/asia/japan/kanto.html                  |
| 索引             | https://download.geofabrik.de/index-v1.json                          |

## 概要

ドイツの Geofabrik GmbH が配布している、日本の関東地方の [[OpenStreetMap]] データです。
出どころと作り方は日本全体と同じなので、共通の説明は [[Geofabrik Japan OpenStreetMap Data]] を見てください。
索引での id は `kanto`、親は `japan` です。

対象は東京都、神奈川県、埼玉県、千葉県、茨城県、栃木県、群馬県です。
東京都の島しょ部も含まれます。
索引の境界は 3 つのポリゴンで、経度 134.5757 から 154.4709、緯度 20.08228 から 37.15988 の範囲にあります。
伊豆諸島 (大島、八丈島)、小笠原諸島 (父島、母島)、硫黄島、南鳥島、沖ノ鳥島の座標が、この境界の内側に入ることを確かめました。
境界の外にある地物が PBF に入っていないかどうか (切り出しの細部) は確かめていません。

`-latest` の URL は日付つきのファイル (`kanto-261004.osm.pbf` など) へリダイレクトします。
大きさを HEAD で確かめるときは、リダイレクトを追う必要があります (`curl -L`)。
利用者名、利用者 ID、変更セット ID は取り除かれています。

## 形式

| 形式        | URL                                                                     | 大きさ (2026-10-06 時点の latest)            |
| ----------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| PBF         | https://download.geofabrik.de/asia/japan/kanto-latest.osm.pbf           | 516,386,456 バイト (`kanto-261004.osm.pbf`)  |
| Shapefile   | https://download.geofabrik.de/asia/japan/kanto-latest-free.shp.zip      | 1,035,026,200 バイト (`kanto-261005-free.shp.zip`) |
| GeoPackage  | https://download.geofabrik.de/asia/japan/kanto-latest-free.gpkg.zip     | 1,071,482,748 バイト (`kanto-261005-free.gpkg.zip`) |

- 日本全体には Shapefile と GeoPackage がありませんが、関東地方にはあります。
- Shapefile と GeoPackage は、地物と属性を選んで変換したもので、PBF のすべてのタグは入っていません。
- 索引 (`index-v1.json`) の `urls` には `shp` はありますが `gpkg` はありません。GeoPackage の URL は地域のページから取ります。
- 圧縮された Shapefile と GeoPackage は PBF の 2 倍ほどの大きさです。

## 取り出し方

関東地方のファイルは、日本全体 (約 2.5GB) を落とさずに関東だけを使いたいときに向きます。
PBF の中には範囲の索引が無いため、HTTP Range で一部だけを読み出しても、必要な範囲を選べません。
都県や市区町村に絞るには、ファイル全体を取得してから [[osmium]] などで切り出します。

## 古い版と差分

- 日付つきの版は直近の数日分、月初の版、毎年 1 月 1 日の版 (関東は 2018 年から) が地域のページに並んでいます。
- 差分 (`.osc.gz`) が `https://download.geofabrik.de/asia/japan/kanto-updates` にあります。
- 各ファイルには `.md5` があります (`kanto-latest.osm.pbf.md5`)。
- 境界ポリゴンは `https://download.geofabrik.de/asia/japan/kanto.poly` でも配られています。

## 帰属表示

- © OpenStreetMap contributors

Geofabrik のサイトには「Data processed by Geofabrik GmbH and created by OpenStreetMap Contributors | License: ODbL 1.0」とあります。
Geofabrik 自身の帰属表示を別に求めているかどうかは確かめていません。

## データ処理コマンド

```bash
# ダウンロード (リダイレクトを追う)
mkdir -p ./tmp
curl -L -o ./tmp/kanto-latest.osm.pbf https://download.geofabrik.de/asia/japan/kanto-latest.osm.pbf

# ファイルの情報を表示する
osmium fileinfo ./tmp/kanto-latest.osm.pbf

# 範囲を切り出す (例: 東京都区部のおおよその範囲)
osmium extract -b 139.56,35.52,139.92,35.82 ./tmp/kanto-latest.osm.pbf -o ./tmp/tokyo.osm.pbf

# GeoJSON に書き出す
osmium export ./tmp/tokyo.osm.pbf -f geojson -o ./tmp/tokyo.geojson

# GDAL の OSM ドライバで線の層だけを GeoJSON にする
ogr2ogr -f GeoJSON ./tmp/tokyo_lines.geojson ./tmp/tokyo.osm.pbf lines

# PostGIS に取り込む
osm2pgsql -d osm_kanto -H localhost -U postgres ./tmp/kanto-latest.osm.pbf
```

## 関連項目

- [[Geofabrik Japan OpenStreetMap Data]]
- [[Geofabrik Monaco OpenStreetMap Data]]
- [[Geofabrik]]
- [[OpenStreetMap]]
- [[ODbL-1.0]]
- [[OSM PBF]]
- [[osmium]]
- [[osm2pgsql]]
- [[ogr2ogr]]
- [[PostGIS]]
- [[オープンデータ]]

## 確認日

2026-10-06 に、`-latest` の各ファイルへの HEAD、地域のページ、`index-v1.json` (554 地域) を読んで確かめました。
この日、`-latest` の PBF は `kanto-261004.osm.pbf` へ、Shapefile と GeoPackage は `kanto-261005` の版へリダイレクトしました。
