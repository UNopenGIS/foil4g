---
title: Natural Earth Coastline Data
description: "Natural Earth が 1:10m の縮尺で配っている、全世界の海岸線の Shapefile (zip)"
provider_group: "Natural Earth"
categories: ["海岸・水域"]
regions: ["全世界"]
formats: ["Shapefile"]
id: ne_10m_coastline
provider: Natural Earth (https://www.naturalearthdata.com/)
license: [public-domain]
license_note: パブリックドメイン (帰属表示は不要)
access: split
access_note: split。縮尺 (10m、50m、110m) とレイヤーごとに zip が分かれていて、必要なレイヤーだけを取れる。zip の中は whole (Range は 206 を返すが、中身を選べない)
format: [Zipped Shapefile (線, WGS84 の経緯度)]
size: 3,069,451 バイト (約 2.9MB)
update: 不定期 (配布ファイルの Last-Modified は 2021-12-08)
url: https://naciscdn.org/naturalearth/10m/physical/ne_10m_coastline.zip
docs: https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-coastline/
checked: 2026-10-06
details:
  ファイル形式: zip
  地物数: 4,133
  版: 本家のページの表示は 4.1.0、zip の中の VERSION.txt は 5.0.0-pre9
---

# Natural Earth Coastline Data

> [[Natural Earth]] が 1:10m の縮尺で配っている、全世界の海岸線の [[Shapefile]] (zip)

## 概要

Natural Earth は、地図製作者向けにパブリックドメインで配られている全世界の地図データです。
1:10m、1:50m、1:110m の 3 つの縮尺があり、このページはそのうち最も詳しい 1:10m の海岸線を扱います。

本家の説明では、主な島を含む海洋の海岸線で、陸地と水域のポリゴンと形が揃えてあります。
カスピ海は厳密には湖ですが、海岸線に含まれています。
元になったのは World Data Bank 2 で、南極の海岸は NASA の Mosaic of Antarctica から取っています。
小さな島 (rank 6 から 8) の海岸線は含まれず、別のレイヤー `ne_10m_minor_islands_coastline` に分かれています。

zip の中身は次の 7 ファイルです。

- `ne_10m_coastline.shp`、`.shx`、`.dbf`、`.prj`、`.cpg`
- `ne_10m_coastline.README.html` (本家の説明ページの写し)
- `ne_10m_coastline.VERSION.txt`

ジオメトリは線 (PolyLine) で、座標系は WGS84 の経緯度です。
属性は `featurecla`、`scalerank`、`min_zoom` の 3 列だけです。

## URL について

以前の URL `http://www.naturalearthdata.com/download/10m/physical/ne_10m_coastline.zip` は使えません。
https へ 301 でリダイレクトされたあと、404 になります。

現在の配布元は `naciscdn.org` です。
本家の説明ページのダウンロードボタンは `https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_coastline.zip` を指していて、ブラウザで開くと `naciscdn.org` の URL へリダイレクトされます。
ただし curl の既定の User-Agent では、このボタンの URL が 500 を返しました。
スクリプトから取るときは `naciscdn.org` の URL を直接指定します。

同じファイルは GitHub の `nvkelso/natural-earth-vector` リポジトリの `10m_physical/` にも、zip に固めない形で置かれています。

## 取り出し方

Natural Earth はレイヤーごとに 1 つの zip に分かれていて、必要なレイヤーの zip だけを取得できます。
`naciscdn.org` は HTTP Range に 206 で応えますが、zip の中身は deflate で圧縮された Shapefile なので、範囲を絞って一部だけを読み出すことはできません。
もっとも 1 ファイル約 2.9MB なので、丸ごと取得して困ることはありません。

`naciscdn.org` のディレクトリ (`https://naciscdn.org/naturalearth/10m/physical/`) は一覧を返しません。
レイヤーの名前は本家のダウンロードページか、GitHub のリポジトリのファイル一覧で調べます。

## 版について

版の表記が場所によって違います。

- 本家の説明ページは「version 4.1.0」と表示しています。
- zip の中の `ne_10m_coastline.VERSION.txt` は `5.0.0-pre9` です。GitHub の master にある同名のファイルも同じ値です。
- GitHub のリポジトリ全体の最新リリースは v5.1.2 (2022-05-13) です。

配布ファイルの Last-Modified は 2021-12-08 で、2022 年以降は更新されていません。

## 帰属表示

帰属表示は不要です。
Natural Earth の利用規約 (https://www.naturalearthdata.com/about/terms-of-use/) には次のようにあります。

> All versions of Natural Earth raster + vector map data found on this website are in the public domain.
> No permission is needed to use Natural Earth. Crediting the authors is unnecessary.

載せる場合に本家が勧めている文は次のとおりです。

- Made with Natural Earth.
- Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.

利用規約のページには、Natural Earth が第三者から受けたデータ利用の許諾も載っています。
それらに由来する部分に、パブリックドメインの宣言がどこまで及ぶかは確かめていません。

## データ処理コマンド

```bash
# ダウンロードして展開する
mkdir -p ./tmp
curl -L -o ./tmp/ne_10m_coastline.zip https://naciscdn.org/naturalearth/10m/physical/ne_10m_coastline.zip
unzip -o ./tmp/ne_10m_coastline.zip -d ./tmp/ne_10m_coastline

# レイヤーの情報を表示する
ogrinfo -so ./tmp/ne_10m_coastline/ne_10m_coastline.shp ne_10m_coastline

# GeoJSON に変換する
ogr2ogr -f GeoJSON ./tmp/ne_10m_coastline.geojson ./tmp/ne_10m_coastline/ne_10m_coastline.shp

# 日本周辺だけを切り出す
ogr2ogr -f GeoJSON -spat 122 20 154 46 ./tmp/coastline_japan.geojson ./tmp/ne_10m_coastline/ne_10m_coastline.shp
```

## 関連項目

- [[Natural Earth]]
- [[Shapefile]]
- [[Zipped Shapefile]]
- [[GeoJSON]]
- [[ogr2ogr]]
- [[海岸線]]
- [[地図データ]]

## 確認日

2026-10-06 に、配布元への HEAD と Range 要求で zip の大きさ、Last-Modified、中のファイルの一覧、VERSION.txt、`.dbf` の件数と列、`.prj` を読んで確かめました。
説明ページと利用規約のページも同じ日に読みました。
zip 全体はダウンロードしていないので、`ogrinfo` と `ogr2ogr` のコマンドはこのファイルで実行して確かめてはいません。
