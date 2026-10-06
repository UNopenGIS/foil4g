---
title: SmartMaps OpenCelliD PMTiles
id: smartmaps_opencellid_pmtiles
provider: ['OpenCelliD (https://opencellid.org/)', UN Smart Maps Group (変換と配布)]
license: [CC-BY-SA-4.0]
access: range
access_note: range。1 つの PMTiles で、HTTP Range (206 を確認) で必要な範囲とズームのタイルだけを読める
format: [PMTiles v3 (タイルは MVT, gzip 圧縮)]
period: 2024-06-14 (属性 `updated` の最大値)
resolution: 0 から 14
size: 559,569,057 バイト (約 534MiB)
update: 更新されていません (ファイルは 2024-06-15 のまま)
url: https://data.source.coop/smartmaps/opencellid/cellid.pmtiles
checked: 2026-10-06
details:
  配布ページ: https://source.coop/smartmaps/opencellid
---

# SmartMaps OpenCelliD PMTiles

> UN Smart Maps Group が [[OpenCelliD]] の携帯電話基地局の位置データを [[PMTiles]] にして、Source Cooperative で配っているベクトルタイル

## 概要

[[OpenCelliD]] は、携帯電話基地局 (セル) の位置を利用者の観測から集めている共同プロジェクトです。
このファイルは、その全件版の CSV を UN Smart Maps Group が [[tippecanoe]] で PMTiles に変換したものです。
基地局 4,835,586 点が、全世界 (経度 -175.34 から 179.33、緯度 -54.84 から 78.23) に入っています。

Source Cooperative のリポジトリの題名は「OpenCellid PMTiles - FOIL4G (Free and Open Information Library for Geospatial)」です。
説明欄には、元データとして `data_id: opencellid_full`、`file_format: gzipped_csv`、`file_size: 105MB` と、OpenCelliD のダウンロード URL (API キーが要る) が書かれています。
つまり [[OpenCelliD 基地局位置データ]] の全件版から作ったファイルです。
リポジトリにあるのは `cellid.pmtiles` の 1 ファイルだけで、README はありません。

ファイルの `Last-Modified` は 2024-06-15 22:20:30 GMT です。
リポジトリの作成日は 2024-06-15、最終更新日は 2025-08-21 と表示されていますが、ファイル自体は作成時のままです。
OpenCelliD 本家のデータは日々更新されているので、このファイルは 2024-06-14 時点の写しとして扱います。

## 取り出し方

ファイルは 1 つだけで、HTTP Range が効きます。
HEAD は 200 で `Accept-Ranges: bytes` を返し、`curl -r 0-1023` は 206 と 1,024 バイトを返しました。
認証は要りません。
CORS も `Access-Control-Allow-Origin: *` で許可されているので、[[MapLibre GL JS]] から pmtiles プロトコルで直接表示できます。

範囲を絞って手元に取るには、`pmtiles extract` に URL と bbox を渡します。
皇居の東側 (経度 139.75 から 139.78、緯度 35.67 から 35.70) を試すと、22 タイル、約 0.9MB でした。

## 中身

ヘッダとメタデータから読み取れる内容です。

- タイル形式は MVT、タイル圧縮と内部圧縮はどちらも gzip、clustered です。
- タイル数は 1,364,455 です (addressed、entries、contents がすべて同じ値)。
- 中心は経度 139.779、緯度 35.702、ズーム 14 (東京の秋葉原付近) に設定されています。
- 生成ツールは `tippecanoe v2.28.0` です。
- 生成オプションは `tippecanoe -o a.pmtiles -f '-L{"file": "", "format": "csv"}'` で、CSV を標準入力から直接読んでいます。最大ズームなどの指定は無く、既定値の 14 です。
- メタデータに作成日時はありません。

レイヤーは `a` の 1 つだけで、ジオメトリは Point です。
メタデータの name と description も `a.pmtiles` で、中身を表す名前ではありません。
MapLibre などで `source-layer` を指定するときは `a` を使います。
ソースの `maxzoom` はデータに合わせて 14 にします。
14 より大きくすると、存在しないズーム 15 以上のタイルを読みに行くので、拡大したときに点が消えるはずです (実際の表示では確かめていません)。

ズーム 13 以下では、tippecanoe の既定の間引き (drop rate) で点が落とされています。
メタデータの `strategies` によると、ズーム 13 で 2,916,674 点、ズーム 0 で 4,835,573 点が落とされています。
全件がそろうのはズーム 14 だけです。
数を数える用途では、ズーム 14 のタイルを読む必要があります。

属性は次の 12 個です (範囲はメタデータの tilestats の最小値と最大値)。

| 属性          | 型     | 範囲や値                                          |
| ------------- | ------ | ------------------------------------------------- |
| radio         | String | CDMA、GSM、LTE、NR、UMTS の 5 種                  |
| mcc           | Number | 202 から 748 (国コード)                           |
| net           | Number | 0 から 20,002 (事業者コード)                      |
| area          | Number | 0 から 16,777,214                                 |
| cell          | Number | 0 から 59,650,502,930                             |
| unit          | Number | -1 から 511                                       |
| range         | Number | 500 から 99,488                                   |
| samples       | Number | 1 から 201                                        |
| changeable    | Number | 1 のみ                                            |
| created       | Number | 0 から 1718409244 (Unix 時刻、2024-06-14)        |
| updated       | Number | 1671062408 (2022-12-15) から 1718409542 (2024-06-14) |
| averageSignal | Number | 0 のみ                                            |

## 注意点

- `averageSignal` は全件 0、`changeable` は全件 1 で、情報を持ちません。
- `created` の最小値が 0 (1970-01-01) です。欠損が 0 で埋められていると見られますが、確かめていません。
- `updated` の最小値が 2022-12-15 で、それより古い更新日がありません。理由は確かめていません。
- `range` の最小値が 500 で、500 未満の値がありません。下限で丸められているかは確かめていません。
- `cell` は最大で約 596 億あり、32 ビット整数には収まりません。

## 帰属表示

- Cell tower data from OpenCellID (https://opencellid.org), licensed under CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).

Source Cooperative の説明欄には `license: CC-BY-SA-4.0` と `attributions: OpenCelliD, https://opencellid.org/` とあります。
OpenCelliD 本家の「License and attribution」のページ (https://docs.opencellid.org/docs/attribution) でも、データは CC BY-SA 4.0 で、上の書式の帰属表示と、変更を加えた場合はその説明を求めています。
PMTiles への変換は変更にあたるので、地図などに出すときは「PMTiles に変換」のような説明も添えます。
UN Smart Maps Group 自身の帰属表示を別に求めているかどうかは確かめていません。

## データ処理コマンド

```bash
# ヘッダとメタデータを表示する (ダウンロードしない)
pmtiles show https://data.source.coop/smartmaps/opencellid/cellid.pmtiles
pmtiles show --metadata https://data.source.coop/smartmaps/opencellid/cellid.pmtiles

# 範囲を切り出す (例: 皇居の東側)
mkdir -p ./tmp
pmtiles extract https://data.source.coop/smartmaps/opencellid/cellid.pmtiles ./tmp/cellid-tokyo.pmtiles \
  --bbox=139.75,35.67,139.78,35.70

# ファイル全体をダウンロードする (約 534MiB)
curl -o ./tmp/cellid.pmtiles https://data.source.coop/smartmaps/opencellid/cellid.pmtiles
```

## 関連項目

- [[OpenCelliD 基地局位置データ]]
- [[OpenCelliD]]
- [[UN Open GIS Initiative]]
- [[基地局]]
- [[PMTiles]]
- [[tippecanoe]]
- [[MapLibre GL JS]]
- [[CC-BY-SA-4.0]]

## 確認日

2026-10-06 に、ファイルへの HEAD と Range 要求、S3 互換の一覧、PMTiles のヘッダとメタデータ、Source Cooperative のリポジトリページ、OpenCelliD の帰属表示のページを読んで確かめました。
`pmtiles extract` は `--dry-run` で転送量を確かめただけで、実際には書き出していません。
