# SmartMaps Global DEM1A 高度データ

> UN Smart Maps Group が [[国土地理院]] の基盤地図情報 1m メッシュ数値標高モデルを、標高を RGB に詰めた WebP タイルにして 1 つにまとめた [[PMTiles]] ファイル (範囲は東北地方の太平洋側の一部)

## データソース情報

| 項目             | 内容                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| データID         | smartmaps_global_dem1a                                               |
| ライセンス       | 明記なし                                                             |
| 作成者           | UN Smart Maps Group ([[UN Open GIS Initiative]])                     |
| 元データ         | [[国土地理院]] 基盤地図情報 (数値標高モデル) 1m メッシュ (標高)      |
| 測量法の承認     | 測量法に基づく国土地理院長承認 (使用) R 6JHs 133                     |
| 範囲             | 経度 140.75 から 142.10、緯度 36.86 から 40.23 (ズーム 17 のタイルの外接矩形) |
| データ形式       | [[PMTiles]] (v3)                                                     |
| タイル形式       | WebP (可逆)、512 × 512 ピクセル、RGB                                 |
| 標高の符号化     | Mapbox Terrain-RGB 方式 (`-10000 + (R × 65536 + G × 256 + B) × 0.1`) |
| ズームレベル     | 3 から 17                                                            |
| ファイルサイズ   | 2,649,174,249 バイト (約 2.65GB、2.47GiB)                            |
| 取り出し方       | HTTP Range で必要なタイルだけを読み出せる                            |
| URL              | https://data.source.coop/smartmaps/dem1a/dem1a.pmtiles               |
| 説明ページ       | https://source.coop/smartmaps/dem1a                                  |

## 概要

Source Cooperative の UN Smart Maps Group のアカウントに置かれた、日本の 1m 解像度の標高タイルです。
README の題は「PMTiles terrain tiles from dem1a by Geospatial Information Authority of Japan」で、元データは国土地理院の「基盤地図情報（数値標高モデル）１ｍメッシュ（標高）」です。
ファイルの更新日は 2024-05-30 です。

ページの名前に「Global」とありますが、全世界のデータではありません。
日本全国でもなく、実際にタイルがあるのは経度 140.75 から 142.10、緯度 36.86 から 40.23 の範囲です。
茨城県の北端から岩手県あたりまでの太平洋側にあたります。
全世界の標高タイルは [[SmartMaps Global Elevation Tiles]] (NASADEM から作ったもの) で、このファイルとは別物です。

README に書かれているのは、題、元データの名前、測量法の承認番号、デモ (https://observablehq.com/d/c0a3f48cf7111cd2) だけです。
基盤地図情報の版や基準日、変換の方法は書かれていません。
Source Cooperative の説明ページも「No Description Provided」です。

## 取り出し方

1 つの PMTiles ファイルなので、HTTP Range で必要なタイルだけを読み出せます。
[[MapLibre]] GL JS では pmtiles プロトコルを登録すれば、`raster-dem` ソースとして直接表示できます (`encoding` は `mapbox`)。

タイル数は 1,034,775 で、ほとんどが高ズームです (ズーム 17 が 774,996、16 が 194,142、15 が 48,856)。
ズーム 3 から 6 はそれぞれ 1 枚だけです。

標高 0m の画素は RGB (1, 134, 160) になります。
海と、1m DEM が無い場所が、どちらも 0m になっているのかどうかは確かめていません。
岩手県沿岸のズーム 10 のタイル 1 枚 (10/915/390) では、画素の 73% が 0m でした。

## ヘッダとメタデータの注意

PMTiles ヘッダの値が一部埋まっていません。

- bounds と center がすべて 0 です (center のズームは 3)。範囲はヘッダからは分かりません。
- メタデータ JSON は `{"description":"","format":"webp","name":"","type":"baselayer","version":"1"}` だけで、出典やライセンスは入っていません。

ヘッダの他の値は次のとおりです。

- tile_type は WebP、tile_compression は none、内部ディレクトリは gzip 圧縮、clustered。
- タイル数 (addressed) 1,034,775、エントリ数 69,875、中身の数 (contents) 63,532。同じ内容のタイルが多く共有されています。

## ライセンス

README にも Source Cooperative の説明ページにも PMTiles のメタデータにも、ライセンスの記載はありません。
書かれているのは、測量法に基づく国土地理院長の使用承認の番号 (R 6JHs 133) だけです。

国土地理院のウェブサイトのコンテンツには、特段の記載が無い限り公共データ利用規約 (第 1.0 版) (PDL1.0) が適用されます。
ただし同じ規約の説明で、基本測量成果の複製・使用には測量法に基づく申請が要る場合があると注意されています。
このファイルを再配布や改変して使うときの条件は、確かめていません。

## 帰属表示

UN Smart Maps Group が指定した帰属表示はありません。
元データについては、国土地理院の利用規約が示す例にならって、次のように書けます。

- 「基盤地図情報（数値標高モデル）１ｍメッシュ」（国土地理院）をもとに UN Smart Maps Group 作成
- 測量法に基づく国土地理院長承認（使用）R 6JHs 133

## データ処理コマンド

```bash
# ヘッダとメタデータを表示する (Range 要求だけで読める)
pmtiles show https://data.source.coop/smartmaps/dem1a/dem1a.pmtiles

# 1 枚だけ取り出す (例: 岩手県沿岸のズーム 10 のタイル)
mkdir -p ./tmp
pmtiles tile https://data.source.coop/smartmaps/dem1a/dem1a.pmtiles 10 915 390 > ./tmp/dem1a-10-915-390.webp

# 画素を標高に直す (Mapbox Terrain-RGB 方式)
python3 -c '
from PIL import Image
im = Image.open("./tmp/dem1a-10-915-390.webp").convert("RGB")
r, g, b = im.getpixel((108, 490))
print(-10000 + (r * 65536 + g * 256 + b) * 0.1)
'
```

## 関連項目

- [[SmartMaps Global Elevation Tiles]]
- [[国土地理院]]
- [[UN Open GIS Initiative]]
- [[高度データ]]
- [[RGB Elevation]]
- [[PMTiles]]
- [[MapLibre]]

## 確認日

2026-10-06 に、`data.source.coop` の README.md と `dem1a.pmtiles` への HEAD と Range 要求、Source Cooperative の説明ページ、国土地理院のコンテンツ利用規約のページで確かめました。
ヘッダ、メタデータ、内部ディレクトリ (全部で約 186KB) を読んで、ズームごとのタイル数と範囲を数えました。
標高の符号化は、ズーム 10 (10/915/390) とズーム 17 のタイルを 1 枚ずつ復号して確かめました。
Mapbox 方式で読むと 10/915/390 の最大値は 747.6m、ズーム 17 の 1 枚は -1.0m から 160.2m になります (Terrarium 方式では -32000m 台になり合いません)。
上のコマンドのうち `pmtiles show` と `pmtiles tile` は実行し、取り出したタイルが Range 要求で読んだものと同じことを確かめました。
画素 (108, 490) の値は 747.6m です。
