---
title: OpenStreetMap Japan Planet PMTiles
id: openstreetmap_jp_planet_pmtiles
provider: [OSMFJ (OpenStreetMap Foundation Japan), OpenStreetMap Contributors]
license: [CC-BY-4.0, ODbL-1.0]
license_note: データは ODbL、スキーマのデザインは CC-BY 4.0 (OpenMapTiles への帰属表示が要る)
access: range
access_note: range。1 つの PMTiles で、HTTP Range (206 を確認) で必要な範囲とズームのタイルだけを読める
format: [PMTiles v3 (タイルは MVT, gzip 圧縮)]
coverage: 全世界 (経度 -180 から 180、緯度 -85.05113 から 85.05113)
period: 2026-09-28T00:00:04Z (2026-10-06 時点の版)
resolution: 0 から 14
size: 84,416,925,121 バイト (約 84GB、2026-09-28 版)
update: 毎週 (OSM Wiki の OSMFJ タイルサーバーのページによる)
url: https://tile.openstreetmap.jp/static/planet.pmtiles
checked: 2026-10-06
details:
  スキーマ: OpenMapTiles 3.16.0 (Planetiler 0.10.2 で生成)
  日付つきの URL: https://tile.openstreetmap.jp/static/planet-20260928.pmtiles
---

# OpenStreetMap Japan Planet PMTiles

> [[OSMFJ]] のタイルサーバーが静的に配っている、全世界の [[OpenStreetMap]] を OpenMapTiles スキーマのベクトルタイルにした [[PMTiles]] ファイル 1 本

## 概要

[[OSMFJ]] のタイルサーバー (tile.openstreetmap.jp) が、`/static/` の下に置いている全世界のベクトルタイルです。
OSM の planet を [[Planetiler]] で OpenMapTiles スキーマのタイルにしたもので、Shortbread ではありません。
同じタイルサーバーが XYZ で配っている [[OpenStreetMap Japan Planet ベクトルタイル]] と、スキーマの版と基準日が同じです。

`/static/` のディレクトリ一覧には `planet.pmtiles` と日付つきの `planet-20260928.pmtiles` が並んでいて、大きさと更新時刻が同じです。
`planet.pmtiles` は毎週差し替えられる名前で、古い日付の版は一覧に残っていません。
2026-09-28 には 2026-09-21 の版が置かれていたので、実際に週ごとに入れ替わっています。
再現性が要るときは、日付つきの URL を使うか、HEAD の `ETag` (2026-10-06 時点で `"6abf1d1c-13a7a40dc1"`) を記録しておきます。

## 取り出し方

サーバーは `Accept-Ranges: bytes` を返し、Range 要求に 206 で応えます。
CORS の許可ヘッダに `Range` が入っているので、ブラウザの [[MapLibre]] GL JS から pmtiles プロトコルで直接読めます。

PMTiles は先頭 127 バイトのヘッダに索引の位置が書かれています。
この版では、ルートディレクトリとメタデータが先頭から 17,857 バイトまでに収まっていて、ここを読めばズーム範囲、範囲、レイヤー構成が分かります。
葉ディレクトリ (約 96MB) とタイルデータも、必要な部分だけを Range で読めます。
約 84GB あるので、ファイル全体のダウンロードは避けます。

## メタデータ

- `version` は 3.16.0、`planetiler:version` は 0.10.2 です。
- データの基準日は `planetiler:osm:osmosisreplicationtime` (2026-09-28T00:00:04Z) で、ファイル名の日付と一致します。
- `planetiler:buildtime` (2026-03-28T14:40:55.764Z) はデータの時点ではありません。Planetiler 本体を組み立てた時刻と読めますが、確かめていません。
- レイヤーは 16 本あります: aerodrome_label、aeroway、boundary、building、housenumber、landcover、landuse、mountain_peak、park、place、poi、transportation、transportation_name、water、water_name、waterway。
- building は z13 から、poi は z11 から、housenumber は z14 だけに入っています。
- 日本語の名前は `name:ja` のほか `name:ja-Hira` と `name:ja-Latn` があります (2026-09-21 版の調査メモによる)。

## タイルサーバーとの違い

タイルサーバーのスタイル (osm-bright など) は、planet のほかに北方領土 (`hoppo`) と竹島 (`takeshima`) の overlay を重ねています。
静的配布の planet.pmtiles にはこの 2 つが入っていません。
planet.pmtiles だけで日本の地図を描くと、tile.openstreetmap.jp で見える地図と一致しない可能性があります (描き比べていません)。

## 帰属表示

- © OpenMapTiles © OpenStreetMap contributors

ファイルのメタデータの `attribution` もこの形で、それぞれ https://www.openmaptiles.org/ と https://www.openstreetmap.org/copyright へのリンクです。
OSM のデータとしては [[ODbL]] 1.0 に従います。
OpenMapTiles の LICENSE.md によると、スキーマのコードは BSD 3-Clause、地図のデザイン (look and feel) は CC-BY 4.0 で、OpenMapTiles スキーマ由来の地図には「OpenMapTiles」への帰属表示が要ります。
OSM Wiki の OSMFJ タイルサーバーのページには、ライセンスとして「CC-BY (バージョン指定は無し。コピーライト表記は「©OpenStreetMap Contributors」)」とあります。
この記述がベクトルタイルや PMTiles にも当てはまるのかは確かめていません。
tile.openstreetmap.jp のトップページにはライセンスの記載が見当たりません。

## データ処理コマンド

```bash
# ヘッダとメタデータを表示する (Range で先頭だけ読む)
pmtiles show https://tile.openstreetmap.jp/static/planet.pmtiles

# 範囲とズームを絞って切り出す (例: 東京都区部のおおよその範囲)
mkdir -p ./tmp
pmtiles extract https://tile.openstreetmap.jp/static/planet-20260928.pmtiles ./tmp/tokyo.pmtiles \
  --bbox=139.56,35.52,139.92,35.82 --maxzoom=14
```

## 関連項目

- [[OpenStreetMap Japan Planet ベクトルタイル]]
- [[OpenStreetMap Japan OSM-Bright ベクトルタイル]]
- [[OSMFJ]]
- [[OpenStreetMap]]
- [[PMTiles]]
- [[Planetiler]]
- [[MapLibre]]
- [[ODbL]]
- [[ベクトルタイル]]

## 確認日

2026-10-06 に HEAD、先頭 17,860 バイトの Range 要求、`/static/` のディレクトリ一覧、OSM Wiki の Japan/OSMFJ Tileserver のページ、OpenMapTiles の LICENSE.md を読んで確かめました。
`pmtiles` コマンドは実行していません。
