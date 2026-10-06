---
id: openstreetmap_jp_osm_bright
provider: [OSMFJ (OpenStreetMap Foundation Japan), OpenStreetMap Contributors]
license: [CC-BY-4.0, ODbL-1.0]
license_note: データは ODbL、スキーマのデザインは CC-BY 4.0 (OpenMapTiles への帰属表示が要る)
access: split
access_note: style.json 自体は whole (約 47KB)。参照するタイルは XYZ で、1 枚ずつ必要な分だけ取る split
format: Vector Tile Style JSON (MapLibre Style Spec の version 8)
size: 46,841 バイト (style.json、2026-10-06 時点)
url: https://tile.openstreetmap.jp/styles/osm-bright/style.json
checked: 2026-10-06
details:
  レイヤー数: '121'
---

# OpenStreetMap Japan OSM-Bright ベクトルタイル

> [[OSMFJ]] のタイルサーバーが配っている、OpenMapTiles の OSM Bright を元にした [[MapLibre]] 用のスタイル JSON

## 概要

[[OSMFJ]] のタイルサーバー (tile.openstreetmap.jp、TileServer GL) にあるスタイルの 1 つで、識別子は `osm-bright` です。
style.json の `name` は `Bright`、`id` は `bright` で、`metadata` に OpenMapTiles の OSM Bright を元にしたことを示すキー (`openmaptiles:mapbox:owner` が `openmaptiles`) があります。
データそのものではなく、次のソース、フォント、スプライトを組み合わせて地図を描くための設定です。

| 種類       | URL                                                                     |
| ---------- | ----------------------------------------------------------------------- |
| ソース     | `openmaptiles`: https://tile.openstreetmap.jp/data/planet.json          |
| ソース     | `takeshima`: https://tile.openstreetmap.jp/data/takeshima.json          |
| ソース     | `hoppo`: https://tile.openstreetmap.jp/data/hoppo.json                  |
| glyphs     | https://tile.openstreetmap.jp/fonts/{fontstack}/{range}.pbf             |
| sprite     | https://tile.openstreetmap.jp/styles/osm-bright/sprite                  |

ソースの `openmaptiles` は [[OpenStreetMap Japan Planet ベクトルタイル]] です。
`takeshima` と `hoppo` は竹島と北方領土の overlay で、planet の上に重ねています。
ソースはすべて TileJSON の `url` で指定されているので、タイルの URL やズーム範囲はスタイルを書き換えずにサーバー側で変わりえます。

文字のフォントは `migu1c-regular`、`migu2m-regular`、`migu2m-bold` の 3 つです。
glyphs のサーバーにこのフォント名が無いと文字が出ないので、別のサーバーへ移すときはフォントも揃えます。

タイルサーバーには、このほかに `osm-bright-ja`、`osm-bright-en`、`maptiler-basic-ja`、`maptiler-basic-en`、`maptiler-toner-ja` などのスタイルもあります。
それぞれ GL Style、TileJSON、WMTS、XYZ (ラスタ) で配信されています。

## 取り出し方

[[MapLibre]] GL JS では `style` に style.json の URL を渡すだけで使えます。
タイルは表示している範囲とズームの分だけ取られます。

広い範囲のデータを手元に持ちたいときは、スタイル経由でタイルを集めず、[[OpenStreetMap Japan Planet PMTiles]] から切り出します。
tile.openstreetmap.jp は有志が運営する公開サーバーなので、一括取得で負荷をかけないようにします。

## 帰属表示

- © OpenMapTiles © OpenStreetMap contributors

ソースの TileJSON (`planet.json`) の `attribution` がこの形です。
OSM のデータとしては [[ODbL]] 1.0 に従い、OpenMapTiles スキーマ由来の地図には OpenMapTiles への帰属表示が要ります (OpenMapTiles の LICENSE.md による)。
OSM Wiki の OSMFJ タイルサーバーのページには、ライセンスとして「CC-BY (バージョン指定は無し。コピーライト表記は「©OpenStreetMap Contributors」)」とあります。
このスタイル JSON そのもののライセンスは確かめていません。

## データ処理コマンド

```bash
# style.json を取得して、ソース・glyphs・sprite を確かめる
curl -s https://tile.openstreetmap.jp/styles/osm-bright/style.json | jq '{sources, glyphs, sprite}'
```

## 関連項目

- [[OpenStreetMap Japan Planet ベクトルタイル]]
- [[OpenStreetMap Japan Planet PMTiles]]
- [[OSMFJ]]
- [[OpenStreetMap]]
- [[ベクトルタイル]]
- [[Vector Tile Style JSON]]
- [[MapLibre]]
- [[ODbL]]

## 確認日

2026-10-06 に style.json を 1 回読み、tile.openstreetmap.jp のトップページと OSM Wiki の Japan/OSMFJ Tileserver のページを読んで確かめました。
スプライト、フォント、タイルは取得していません。
