---
id: smartmaps_global_elevation_tiles
provider: UN Smart Maps Group (UN Open GIS Initiative)
source_data: [NASADEM (ズーム 6 から 12), Global Map (ズーム 2 から 5)]
license: [CC0-1.0]
license_note: CC0
access: range
access_note: range。1 つの PMTiles で、HTTP Range (206 を確認) で必要な範囲とズームのタイルだけを読める
format: PMTiles (v3)
resolution: 2 から 12
size: 195,962,954,103 バイト (約 196GB、182.5GiB)
url: https://data.source.coop/smartmaps/gel/gel.pmtiles
docs: https://source.coop/smartmaps/gel
checked: 2026-10-06
details:
  タイル形式: WebP (可逆)、512 × 512 ピクセル
  標高の符号化: Mapbox Terrain-RGB 方式 (`-10000 + (R × 65536 + G × 256 + B) × 0.1`)
---

# SmartMaps Global Elevation Tiles

> UN Smart Maps Group が NASADEM と地球地図 (Global Map) から作った、全世界の標高を RGB に詰めた WebP タイルを 1 つにまとめた [[PMTiles]] ファイル

## 概要

UN Open GIS Initiative の UN Smart Maps Group が作った、全世界の RGB 標高タイルです。
既存の RGB 標高タイルには著作権の制約で使いにくいものがあるため、オープンデータから作り直して CC0 で公開したものです。
変換は 2022 年 10 月で、Source Cooperative に置かれたファイルの更新日は 2024-04-10 です。

ズームによって元データが変わります。

- ズーム 2 から 5: 地球地図 (Global Map, ISCGM)。北緯 85 度から南緯 85 度。
- ズーム 6 から 12: NASADEM (SRTM を ASTER GDEM と ALOS 30m DEM で補ったもの、1 秒角、約 30m)。北緯 60 度から南緯 56 度。

README の「Zoom level: 6 to 12」は NASADEM の部分の話で、ファイル全体のズームは 2 から 12 です。
README の「182.5 GB」は、バイト数を 2^30 で割った値 (GiB) です。

## 取り出し方

1 つの PMTiles ファイルなので、HTTP Range で必要なタイルだけを読み出せます。
全体は約 196GB あるので、丸ごと取得する必要はありません。
[[MapLibre]] GL JS では pmtiles プロトコルを登録すれば、`raster-dem` ソースとして直接表示できます (`encoding` は `mapbox`)。

以前のページにあった `https://beta.source.coop/smartmaps/gel/gel.pmtiles` は、ファイルではなく `https://source.coop/smartmaps/gel/gel.pmtiles` の HTML ページへリダイレクトします。
ファイルを読むには `data.source.coop` の URL を使います。

## ヘッダとメタデータの注意

PMTiles ヘッダの値が十分に埋まっていません。

- tile_type が 0 (unknown) で、tile_compression も 0 (unknown) です。中身は WebP なので、ヘッダだけで形式を判定するビューアやライブラリは扱いを誤るおそれがあります。MapLibre で使うときは、ソースの種類と `encoding` を自分で指定します。
- bounds と center がすべて 0 です。
- メタデータ JSON が `{}` で空です。出典やズームの情報は入っていません。

ヘッダの他の値は次のとおりです。

- 内部ディレクトリは gzip 圧縮、clustered。
- タイル数 (addressed) 5,085,551、エントリ数 2,744,825、中身の数 (contents) 2,705,287。中身の数がタイル数の半分ほどなので、海など同じ内容のタイルが共有されていると見られます。

## 帰属表示

データ自体は CC0 なので、帰属表示は求められていません。
出典を示す場合は、次のように書けます。

- UN Smart Maps Group (NASADEM, Global Map)

元データ (NASADEM、地球地図) 側の利用条件との関係は確かめていません。

## データ処理コマンド

```bash
# ヘッダを表示する (Range 要求だけで読める)
pmtiles show https://data.source.coop/smartmaps/gel/gel.pmtiles

# 1 枚だけ取り出す (例: 富士山を含むズーム 12 のタイル)
mkdir -p ./tmp
pmtiles tile https://data.source.coop/smartmaps/gel/gel.pmtiles 12 3626 1617 > ./tmp/fuji.webp

# 画素を標高に直す (Mapbox Terrain-RGB 方式)
python3 -c '
from PIL import Image
im = Image.open("./tmp/fuji.webp").convert("RGB")
r, g, b = im.getpixel((209, 203))
print(-10000 + (r * 65536 + g * 256 + b) * 0.1)
'

# 範囲を切り出して小さな PMTiles にする (例: 東京周辺、ズーム 12 まで)
pmtiles extract https://data.source.coop/smartmaps/gel/gel.pmtiles ./tmp/tokyo-gel.pmtiles --bbox=139.0,35.2,140.2,36.0 --maxzoom=12
```

## 関連項目

- [[UN Open GIS Initiative]]
- [[NASADEM]]
- [[Global Map]]
- [[高度データ]]
- [[PMTiles]]
- [[MapLibre]]
- [[CC0]]

## 確認日

2026-10-06 に、`data.source.coop` の README.md と `gel.pmtiles` への HEAD と Range 要求で確かめました。
ヘッダ (先頭 127 バイト)、メタデータ、データ部の先頭のタイル (`RIFF....WEBPVP8L`、可逆 WebP) を読みました。
標高の符号化は、富士山を含むズーム 12 のタイル 1 枚を復号し、山頂付近の最大値が Mapbox 方式で 3,755m になることで確かめました (Terrarium 方式では値になりません)。
タイルの大きさ (512 × 512) は、このズーム 12 の 1 枚でしか確かめていません。
`pmtiles extract` のコマンドは実行していません。
