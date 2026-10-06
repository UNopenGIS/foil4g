---
id: openstreetmap_jp_planet
provider: [OSMFJ (OpenStreetMap Foundation Japan), OpenStreetMap Contributors]
license: [CC-BY-4.0, ODbL-1.0]
license_note: データは ODbL、スキーマのデザインは CC-BY 4.0 (OpenMapTiles への帰属表示が要る)
access: split
access_note: split。XYZ のタイル 1 枚が単位で、必要なズームと位置のタイルだけを取る。広い範囲は Planet PMTiles から range で切り出す
format: [XYZ の ベクトルタイル (MVT, 拡張子は `.pbf`)]
coverage: 全世界 (経度 -180 から 180、緯度 -85.05113 から 85.05113)
period: 2026-09-28T00:00:04Z (2026-10-06 時点)
resolution: 0 から 14
update: 毎週 (OSM Wiki の OSMFJ タイルサーバーのページによる)
url: https://tile.openstreetmap.jp/data/planet/{z}/{x}/{y}.pbf
checked: 2026-10-06
details:
  スキーマ: OpenMapTiles 3.16.0 (Planetiler 0.10.2 で生成)
  TileJSON: https://tile.openstreetmap.jp/data/planet.json
---

# OpenStreetMap Japan Planet ベクトルタイル

> [[OSMFJ]] のタイルサーバーが XYZ で配信している、全世界の [[OpenStreetMap]] を OpenMapTiles スキーマにした [[ベクトルタイル]]

## 概要

[[OSMFJ]] のタイルサーバー (tile.openstreetmap.jp、TileServer GL) が配信している全世界のベクトルタイルです。
OSM の planet を [[Planetiler]] で OpenMapTiles スキーマのタイルにしたものです。
TileJSON の `basename` は `planet.mbtiles` で、サーバーは [[MBTiles]] から配信しています。

同じタイルサーバーの `/static/` には、スキーマの版と基準日が同じ [[OpenStreetMap Japan Planet PMTiles]] も置かれています。
両者が同じ Planetiler の出力から作られたのかは確かめていません。

## 取り出し方

TileJSON (TileJSON 3.0.0) に、タイルの URL、範囲、ズーム範囲、レイヤー構成 (`vector_layers`) が書かれています。
[[MapLibre]] GL JS のスタイルでは、`tiles` を手で書くより、ソースの `url` に TileJSON を指定するほうが確実です。

レイヤーは 16 本あります: aerodrome_label、aeroway、boundary、building、housenumber、landcover、landuse、mountain_peak、park、place、poi、transportation、transportation_name、water、water_name、waterway。

広い範囲をまとめて取りたいときは、タイルを XYZ で連続して取らず、[[OpenStreetMap Japan Planet PMTiles]] から Range で切り出します。
tile.openstreetmap.jp は有志が運営する公開サーバーなので、一括取得で負荷をかけないようにします。

## 北方領土と竹島の overlay

タイルサーバーには planet のほかに `hoppo` (北方領土) と `takeshima` (竹島) のベクトルタイルがあり、TileJSON はそれぞれ次の URL です。

- https://tile.openstreetmap.jp/data/hoppo.json
- https://tile.openstreetmap.jp/data/takeshima.json

[[OpenStreetMap Japan OSM-Bright ベクトルタイル]] などのスタイルは、この 2 つを planet に重ねています。
planet のタイルだけを使うと、これらの島の扱いがタイルサーバーの地図と変わる可能性があります (描き比べていません)。

## 帰属表示

- © OpenMapTiles © OpenStreetMap contributors

TileJSON の `attribution` もこの形で、それぞれ https://www.openmaptiles.org/ と https://www.openstreetmap.org/copyright へのリンクです。
OSM のデータとしては [[ODbL]] 1.0 に従い、OpenMapTiles スキーマ由来の地図には OpenMapTiles への帰属表示が要ります (OpenMapTiles の LICENSE.md による)。
OSM Wiki の OSMFJ タイルサーバーのページには、ライセンスとして「CC-BY (バージョン指定は無し。コピーライト表記は「©OpenStreetMap Contributors」)」とあります。
この記述がベクトルタイルにも当てはまるのかは確かめていません。

## 関連項目

- [[OpenStreetMap Japan Planet PMTiles]]
- [[OpenStreetMap Japan OSM-Bright ベクトルタイル]]
- [[OSMFJ]]
- [[OpenStreetMap]]
- [[ベクトルタイル]]
- [[MBTiles]]
- [[Planetiler]]
- [[MapLibre]]
- [[PBF]]
- [[ODbL]]

## 確認日

2026-10-06 に TileJSON (`planet.json`) を 1 回読み、OSM Wiki の Japan/OSMFJ Tileserver のページを読んで確かめました。
タイルそのものは取得していません。
