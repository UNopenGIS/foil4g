---
id: geofabrik_asia_japan
provider: [Geofabrik GmbH, OpenStreetMap Contributors]
license: [ODbL-1.0]
access: split
access_note: split。Geofabrik が定義した地域ごとにファイルが分かれていて、`index-v1.json` の境界ポリゴンから地域を選べる。ファイルの中の PBF は whole (Range は 206 を返すが、範囲の索引が無い)
format: OSM PBF
size: 2,538,602,425 バイト (約 2.5GB、2026-09-27 版)
update: 毎日
url: https://download.geofabrik.de/asia/japan-latest.osm.pbf
checked: 2026-10-06
details:
  索引: https://download.geofabrik.de/index-v1.json
---

# Geofabrik Japan OpenStreetMap Data

> [[Geofabrik]] が [[OpenStreetMap]] の planet から日本の範囲を切り出して、毎日配っている [[OSM PBF]] ファイル

## 概要

ドイツの Geofabrik GmbH が配布している、日本全体の [[OpenStreetMap]] データです。
planet を毎日更新して地域ごとに分割しており、日本全体のほかに 8 つの地方 (北海道、東北、関東、中部、関西、中国、四国、九州) のファイルもあります。
地方のファイルには Shapefile (`.shp.zip`) と GeoPackage (`.gpkg.zip`) もありますが、日本全体には PBF しかありません。

`-latest` の URL は日付つきのファイル (`japan-260927.osm.pbf` など) へリダイレクトします。
大きさを HEAD で確かめるときは、リダイレクトを追う必要があります (`curl -L`)。

利用者名、利用者 ID、変更セット ID は取り除かれています。
これらを含むファイルは、OSM アカウントでログインした人だけが内部サーバーから取得できます。

## 取り出し方

Geofabrik が定義した地域ごとにファイルが分かれていて、必要な地域のファイルだけを取得できます。
地域の一覧と境界ポリゴンは `index-v1.json` にあり、2026-10-06 時点で 554 地域です。

PBF の中には範囲の索引が無いため、HTTP Range で一部だけを読み出しても、必要な範囲を選べません。
範囲を絞るには、ファイル全体を取得してから [[osmium]] などで切り出します。
日本全体は約 2.5GB あるので、小さく試すなら地方のファイル (最小は四国の約 89MB) を使います。

## 古い版と差分

- 日付つきの版は直近 7 日分、月初の版、毎年 1 月 1 日の版 (日本は 2014 年から) が残っています。
- 差分 (`.osc.gz`) が `https://download.geofabrik.de/asia/japan-updates` にあり、手元の PBF を osmium や osmosis で最新に追いつかせられます。

## 帰属表示

- © OpenStreetMap contributors

Geofabrik のサイトには「Data processed by Geofabrik GmbH and created by OpenStreetMap Contributors | License: ODbL 1.0」とあります。
Geofabrik 自身の帰属表示を別に求めているかどうかは確かめていません。

## データ処理コマンド

```bash
# ダウンロード (リダイレクトを追う)
mkdir -p ./tmp
curl -L -o ./tmp/japan-latest.osm.pbf https://download.geofabrik.de/asia/japan-latest.osm.pbf

# ファイルの情報を表示する
osmium fileinfo ./tmp/japan-latest.osm.pbf

# 範囲を切り出す (例: 東京都区部のおおよその範囲)
osmium extract -b 139.56,35.52,139.92,35.82 ./tmp/japan-latest.osm.pbf -o ./tmp/tokyo.osm.pbf

# GeoJSON に書き出す
osmium export ./tmp/tokyo.osm.pbf -f geojson -o ./tmp/tokyo.geojson

# PostGIS に取り込む
osm2pgsql -d osm_japan -H localhost -U postgres ./tmp/japan-latest.osm.pbf
```

## 関連項目

- [[Geofabrik Japan Kanto OpenStreetMap Data]]
- [[Geofabrik Monaco OpenStreetMap Data]]
- [[Geofabrik]]
- [[OpenStreetMap]]
- [[ODbL-1.0]]
- [[OSM PBF]]
- [[osmium]]
- [[osm2pgsql]]
- [[PostGIS]]

## 確認日

2026-10-06 に `index-v1-nogeom.json` を読んで確かめました。
ファイルサイズは 2026-09-27 版の値です (この日は日本全体のファイルへの HEAD がタイムアウトしました)。
