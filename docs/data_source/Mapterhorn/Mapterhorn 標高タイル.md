---
title: Mapterhorn 標高タイル
description: "全球と地域別の標高データをTerrarium方式のラスタタイルで配布。地図の陰影・3D地形や、標高を使った分析に利用できます。"
id: mapterhorn_terrain
provider_group: Mapterhorn
provider: Mapterhorn
source_data: Copernicus GLO-30および各国・地域の公開標高データ。詳細はattribution.jsonを参照。
categories: [地形・標高]
regions: [全世界, アジア, 日本]
formats: [PMTiles, WebP, XYZ]
license: [other]
license_note: 地形データは元データごとに異なる利用条件を持つ。コードのBSD-3-Clauseとは別。Attributionで対象地域の出典と条件を確認する。
access: range
access_note: PMTilesの索引とHTTP Rangeで必要なタイルを取得。低ズームのplanetと高ズームの地域別アーカイブを選ぶ。XYZ配信もある。
format: Terrarium方式の標高RGBを格納する512pxのWebPラスタタイル、PMTiles v3。ベクタタイルではない。
coverage: 全球の低ズームと地域別の高ズーム。配布範囲・最大ズーム・元データの解像度は地域によって異なる。
period: 固定URLの中身が更新されるため、取得した索引のversionとチェックサムを記録する。
resolution: 元データの解像度は地域によって異なる。タイルの画素数は512。最大ズームは目録で確認する。
size: "2026-10-07の目録でplanet.pmtilesは355,579,263,191バイト。全体のダウンロードを前提にしない。"
url: https://download.mapterhorn.com/
docs: https://mapterhorn.com/data-access/
checked: 2026-10-07
details:
  索引: https://download.mapterhorn.com/download_urls.json
  元データと利用条件: https://download.mapterhorn.com/attribution.json
  TileJSON: https://tiles.mapterhorn.com/tilejson.json
  確認した索引の版: "0.0.13"
---

# Mapterhorn 標高タイル

> 全球と地域別の標高データをTerrarium方式のラスタタイルで配布。地図の陰影・3D地形や、標高を使った分析に利用できます。

## 概要・内容

Mapterhornは複数の公開標高データをまとめた地形タイルです。WebP画像のRGB値に標高を格納し、PMTilesアーカイブとXYZで配布しています。道路や建物を収録するベクタベースマップとは異なります。

地図の陰影・3D地形表示や、標高差を考慮する経路の検討に使えます。分析用途では、地域ごとの元データ・解像度とタイル化による変化を確認してください。

## 取り出し方

[Data Access](https://mapterhorn.com/data-access/) の [JSON目録](https://download.mapterhorn.com/download_urls.json) に、URL、範囲、ズーム、大きさ、MD5が載っています。

- `planet.pmtiles` は低ズーム用です。今回の索引ではz0–12でした。
- z13以上は地域別のアーカイブを使い、必要な範囲と交差するファイルを目録や [Coverage](https://mapterhorn.com/coverage/) から選びます。
- 単一タイルのURLは `https://tiles.mapterhorn.com/{z}/{x}/{y}.webp` です。

今回、ブラウザから目録とTileJSONのHTTP 200、planetの先頭127バイトへのRange要求のHTTP 206を確認しました。コマンドラインの取得は確認環境で403となったため、同じ環境からのCLI抽出成功は未確認です。

## データ処理コマンド

PMTiles CLIの抽出例です。これは低ズームのみの抽出です。高ズームが必要なら、別途地域別ファイルを選んでください。

```sh
pmtiles extract --dry-run --bbox=139.6,35.5,139.9,35.8 \
  https://download.mapterhorn.com/planet.pmtiles tokyo-terrain-lowzoom.pmtiles
```

`--dry-run` で推定量を確認し、抽出する場合はこのフラグを外します。アーカイブ全体は非常に大きいため、範囲を指定せず丸ごと取得する必要はありません。

## ライセンスと帰属表示

[公式のライセンス説明](https://mapterhorn.com/) は、コードをBSD-3、地形データを複数のオープンデータ由来として区別しています。コードのライセンスをタイルに当てはめないでください。

一覧では `other` とし、[Attribution](https://mapterhorn.com/attribution/) と [元データのJSON一覧](https://download.mapterhorn.com/attribution.json) で対象地域の条件を確認します。地図ではMapterhornへの帰属表示とリンクを付け、元データが求める出典表示・利用条件にも従ってください。

## 気をつけること

- 標高の符号化はTerrariumです。Mapbox Terrain-RGBとは復号式が異なります。MapLibreで使う場合も `encoding: 'terrarium'` とTileJSONのタイルサイズを指定します。
- `planet.pmtiles` だけでは地域別の高ズームが欠けます。
- ズームと地表の解像度は同一ではありません。元データの精度は地域ごとに確認します。
- URLが固定でも中身は更新されます。再現性のため索引の版、MD5、取得日を保存します。
- ミラーが本家と同じ版・同じファイルを揃えているとは限りません。

## 関連項目

[[SmartMaps Global Elevation Tiles]]、[[NASA SRTM 標高]]

## 確認日

2026-10-07。公式説明、目録、TileJSON、ブラウザでのRange応答を確認しました。地域別ファイルの全件取得や標高の精度検証は行っていません。
