---
id: fao_agera5_monthly
provider: 国際連合食糧農業機関 (FAO) の地理空間データ基盤 GISMGR (ワークスペース `C3S`)
source_data: Copernicus Climate Change Service (C3S) が ECMWF を通じて作る AgERA5 (Agrometeorological indicators from 1979 to present derived from reanalysis、DOI 10.24381/cds.6c68c9bb)。AgERA5 は ERA5 再解析を元にしている
license: [CC-BY-SA-4.0, CC-BY-4.0]
license_note: FAO のカタログでは、降水量と基準蒸発散量が CC-BY-SA-4.0、最高気温と最低気温が CC-BY-4.0。元の AgERA5 は Copernicus の配布元で CC-BY-4.0
access: range
access_note: range。1 か月 1 変数が 1 つの COG で、ファイル名の年月でファイルを選び、HTTP Range (206 を確認) で必要な範囲の 256 x 256 タイルだけを読める
format: [Cloud Optimized GeoTIFF (Float32 1 バンド, LZW 圧縮, 256 x 256 タイル, 概観 4 段)]
coverage: 全球 (経度 -180 から 180 度、緯度 -90 から 90 度)。値があるのは陸だけで、海は欠損値
period: 1979-01 から 2026-08 まで (各 572 か月、2026-10-06 時点)
resolution: 0.1 度 (3600 x 1800 格子、EPSG:4326)。月ごと
size: 4 変数の GeoTIFF の合計 25,815,935,505 バイト (約 25.8GB)。1 ファイルは降水量で約 6.9MB、ほか 3 つで約 12MB から 14MB
update: 毎月 (FAO のカタログの値。2026-08 の月のファイルが 2026-09-08 に置かれていた)
url: https://storage.googleapis.com/fao-gismgr-c3s-data/DATA/C3S/MAPSET/ (Google Cloud Storage)、https://data.apps.fao.org/static/data/c3s/MAPSET/ (FAO のサーバー)
docs: https://data.apps.fao.org/catalog/iso/36a3a273-cbb2-438a-bfb5-5758b1bf5e36 (降水量)、https://data.apps.fao.org/catalog/iso/c91430cc-681e-4ca8-a5f4-8c97dc92c547 (基準蒸発散量)、https://data.apps.fao.org/catalog/iso/66e22621-a62c-4c92-a2a2-57cce04ac991 (最高気温)、https://data.apps.fao.org/catalog/iso/55e81992-6f0a-4d67-acd1-98b10b0fcdcc (最低気温)
checked: 2026-10-06
details:
  元データの説明: https://cds.climate.copernicus.eu/datasets/sis-agrometeorological-indicators
---

# FAO AgERA5 農業気象データ

> [[国際連合食糧農業機関]] (FAO) が、[[Copernicus Climate Change Service]] の農業気象データ [[AgERA5]] を月ごとに集計し、降水量、基準蒸発散量、最高気温、最低気温の 4 つを全球の陸について 0.1 度格子の [[Cloud Optimized GeoTIFF]] で配っているもの

## 概要

AgERA5 は、ECMWF の再解析 [[ERA5]] の 1 時間ごとの地表の値を、農業や農業生態のモデルの入力に使いやすい日ごとの値にまとめたデータです。
Copernicus Climate Change Service (C3S) の委託で ECMWF が作り、Copernicus の Climate Data Store で配っています。
作り方は、ERA5 を 0.1 度の格子に内挿し、ECMWF の高解像度の予報モデル (HRES、0.1 度) で学習した格子ごと変数ごとの回帰式で、細かい地形や海岸線に合わせて補正するものです。
日の区切りは各地の現地時間です。

FAO はこの日ごとの AgERA5 を取り込み、GISMGR というラスターの配布基盤で、日、旬 (10 日)、月、年の単位にまとめて配っています。
このカードが扱うのは、そのうちの月ごとの 4 つです。

- 降水量 (`AGERA5-PF-M`): 日ごとの降水量の月合計。
- 基準蒸発散量 (`AGERA5-ET0-M`): AgERA5 の変数から、FAO Irrigation and Drainage Paper 56 の FAO Penman-Monteith 式で計算したもの。FAO のカタログでは「AgERA5 derived」と書かれ、作り手として FAO の [[AQUASTAT]] が挙がっています。
- 最高気温 (`AGERA5-TMAX-AVG-M`): 地上 2m の日最高気温の、その月の平均。
- 最低気温 (`AGERA5-TMIN-AVG-M`): 地上 2m の日最低気温の、その月の平均。

作り方から来る限界があります。
値は観測所の観測そのものではなく、モデルと観測を組み合わせた再解析の推定値です。
0.1 度 (赤道で約 11km) の格子の平均なので、谷や斜面ごとの違い、都市のヒートアイランド、局地的な豪雨は表せません。
回帰式で細かくしているのは地形の効果であり、0.1 度の観測があるわけではありません。

FAO が使っている AgERA5 の版 (1.1 か 2.0 か) は、FAO のカタログにもファイルにも書かれておらず、確かめていません。
Copernicus の配布元では、2026-06 に 1.1 の更新を止め、2.0 だけを毎日更新すると告知しています。

## 内容

4 つとも、1 か月 1 ファイルの 1 バンドのラスターです。
値は縮尺や切片を掛けずにそのまま使えます (GISMGR の説明で scale 1、offset 0)。

| コード | 中身 | 単位 | ファイル数 |
| ------ | ---- | ---- | ---------- |
| `AGERA5-PF-M` | 降水量の月合計 | mm/月 | 572 |
| `AGERA5-ET0-M` | 基準蒸発散量の月合計 | mm/月 | 572 |
| `AGERA5-TMAX-AVG-M` | 日最高気温の月平均 | ケルビン (K) | 572 |
| `AGERA5-TMIN-AVG-M` | 日最低気温の月平均 | ケルビン (K) | 572 |

- ファイル名は `C3S.<コード>.<YYYY-MM>.tif` です。年月が GISMGR の次元 `SHARED:MONTH` の値になります。
- 各 GeoTIFF の横に、同じ名前の `.json` (次元の値だけを書いた小さな説明) があります。
- 欠損値は -9999 です。海は欠損値です。2026-08 の降水量では、全格子のうち値があるのは 36.92% でした。
- 気温はケルビンです。摂氏にするには 273.15 を引きます。
- 南極大陸にも値があります。

例として、2026-08 のアディスアベバ付近 (東経 38.75 度、北緯 9.0 度) の値は、降水量 527.15mm、基準蒸発散量 100.91mm、最高気温 292.15K (19.0 度)、最低気温 283.28K (10.1 度) でした。

## 取り出し方

区分は range です。

ファイルは月と変数ごとに分かれているので、まず年月と変数でファイルを選びます。
ファイルの一覧は、Google Cloud Storage の公開の一覧 API (`storage/v1/b/fao-gismgr-c3s-data/o?prefix=...`) で取れます。
年月はファイル名に入っているので、一覧を取らずに URL を組み立てることもできます。

各ファイルは COG (`LAYOUT=COG`) で、256 x 256 のタイルと 4 段の概観を持っています。
`storage.googleapis.com` と `data.apps.fao.org/static/data/` のどちらも、Range 要求に 206 を返しました。
そのため GDAL の `/vsicurl/` で、必要な範囲のタイルだけを読めます。
エチオピアの範囲 (東経 33 から 48 度、北緯 3 から 15 度、150 x 120 格子) を切り出したときに読んだのは、3 回の要求で計 172,255 バイトでした。
最小単位は 1 タイル (256 x 256 格子、約 25.6 度四方) です。

認証は要りません。
GISMGR の公開 API で `C3S` ワークスペースの DATA バケットの公開範囲を問い合わせると `ALL USERS` (インターネットの誰でも読める) が返りました。

ブラウザから直接読むときは、配り先で CORS の扱いが違います。
`data.apps.fao.org/static/data/` は `access-control-allow-origin: *` を返しましたが、`storage.googleapis.com` は返しませんでした。

FAO が公開している入口と、そうでないものを分けておきます。

- FAO のデータカタログ (CKAN) の API `https://data.apps.fao.org/catalog/api/3/action/...` は公開の API です。ライセンスや説明はここから読めます。
- GISMGR の API `https://data.apps.fao.org/gismgr/api/v2/catalog/...` は、FAO が「GISMGR 2.0 - API Reference」(2022) で公開している API です。ワークスペース、スタイル、データの公開範囲を読むのに認証は要らないと書かれています。ただし、ここで使ったマップセット (`/mapsets/AGERA5-PF-M`) の端点は、その 2022 年の文書には載っていません (ワークスペースの応答のリンクからたどれます)。
- データカタログには、WMTS (`https://data.apps.fao.org/map/wmts/wmts?...`) と WMS (`https://io.apps.fao.org/geoserver/wms/C3S/...`) の入口も載っています。地図の表示用で、値を取り出す用途には GeoTIFF を使います。WMTS と WMS には問い合わせていません。
- FAO の地図画面 (Hand-in-Hand Geospatial Platform など) が内部で呼んでいる API は使っていません。

## 使いどころ

- SDG 2 (飢餓をゼロに): 作物の生育期の降水量と気温を、平年 (例えば 1991 年から 2020 年の同じ月の平均) と比べて、干ばつや高温の地域を国や州の単位で見つけるのに使えます。1979 年からの月の値がそろっているので、平年値を自分で計算できます。
- SDG 6.4 (水の利用効率): 基準蒸発散量から降水量を引いた値は、灌漑で補う水の量のおおまかな目安になります。作物ごとの蒸発散量には、作物係数を掛ける必要があります。
- SDG 13.1 (気候に関係する災害への強靭さ): 人道支援の現場で、乾季や雨季の異常を全球で同じ方法で比べる材料になります。観測所の少ない国でも、隙間のない格子で値があります。
- 気候の長期の傾向を、農業の地帯ごとにまとめる下調べに使えます。

使ってはいけない使い方もあります。

- 圃場や村の単位の判断には粗すぎます。0.1 度の格子は約 11km 四方です。
- 月の値なので、洪水の警報や、数日の熱波の判定には使えません。
- 再解析の推定値なので、観測所の記録の代わりにはなりません。山地の降水量には特に注意が要ります (下の気をつけることを参照)。
- 保険の支払いや補償の根拠など、一格子の値で結果が決まる使い方には、観測所や別のデータとの照合が要ります。

## ライセンスと帰属表示

FAO のデータカタログ (CKAN の `license_id`) の値は次のとおりです。

- 降水量 (月): CC-BY-SA-4.0
- 基準蒸発散量 (月): CC-BY-SA-4.0
- 最高気温 (月平均): CC-BY-4.0
- 最低気温 (月平均): CC-BY-4.0

ライセンスの原文は、カタログの記録ごとに書き方が違います。
最高気温と最低気温は次のとおりです。

> This work is made available under the Creative Commons Attribution 4.0 International licence (CC-BY-4.0)

基準蒸発散量は次のとおりです。

> License: Attribution-ShareAlike 4.0 International
> • The dataset contains modified Copernicus Climate Change Service information [1979-to date];
> Neither the European Commission nor ECMWF is responsible for any use that may be made of the Copernicus information or data it contains.

降水量の記録は、license_id が CC-BY-SA-4.0 なのに、本文は Copernicus のライセンスの文面で、最後に CC BY-SA 4.0 へのリンクが付いています。

> Where the Licensee communicates or distributes Copernicus Products to the public, the Licensee shall inform the recipients of the source by using the following or any similar notice:
> • 'Generated using Copernicus Climate Change Service information [Year]'

元の AgERA5 は、Copernicus の Climate Data Store のカタログ API で `license` が `CC-BY-4.0` です。
FAO の配布のうち降水量と基準蒸発散量に継承 (SA) の条件が付いている理由は、FAO のカタログに書かれていません。
迷ったときは、より厳しい CC-BY-SA-4.0 の条件 (改変したものを同じライセンスで配る) に従うのが安全です。

表示文の例です。

- 降水量と基準蒸発散量: Precipitation flux / Reference evapotranspiration (Global - Monthly - ~10 km) - AgERA5, FAO, CC BY-SA 4.0. Contains modified Copernicus Climate Change Service information [1979-2026].
- 最高気温と最低気温: Average Maximum / Minimum Air Temperature (Global - Monthly - ~10 km) - AgERA5, FAO, CC BY 4.0. Generated using Copernicus Climate Change Service information [2026].

元データを引用するときは、DOI 10.24381/cds.6c68c9bb を挙げます。

## 気をつけること

- 気温はケルビンです。摂氏と取り違えないでください。
- FAO のカタログで、AgERA5 の製品どうしのライセンスはそろっていません。例えば年の最高気温は CC-BY-SA-4.0、年の最低気温は「Other (Open)」、月の気温は CC-BY-4.0 です。製品ごとにカタログの記録を確かめてください。
- 最低気温のカタログの来歴 (lineage) は「derived from AGERA5-TMAX」と書かれていますが、GISMGR の説明では「derived from AGERA5-TMIN」です。カタログの写し間違いと見られます。
- 基準蒸発散量のカタログの説明には「global land areas, excluding Antarctica」とありますが、2026-08 のファイルでは南極大陸 (東経 0 度、南緯 80 度) にも値 (1.006mm) がありました。
- カタログの降水量の記録は配布形式を NetCDF-4 としていますが、実際のファイルは GeoTIFF です。
- エチオピア北部の高地の数格子 (東経 38.35 度、北緯 12.85 度付近) に、1 か月 1,000mm を超える降水量が複数の年の 8 月に現れました (2026-08 は 2,842mm)。観測と照合していないので誤りとは断定しませんが、山地の極端な値は外れ値として確かめてから使ってください。2026-08 の全球の最大値は 3,384mm でした。
- 海は欠損値 (-9999) なので、海岸の格子は陸と海の境目の扱いで欠けることがあります。AgERA5 の陸と海の境は ECMWF HRES のものです。
- GISMGR には同じ変数の日、旬、年の版 (`AGERA5-PF`、`AGERA5-PF-D`、`AGERA5-PF-A` など) と、湿度、風速、日射の版もあります。コードの末尾 (`-M` が月) で区別します。
- `-latest` のような固定名は無く、新しい月は新しいファイルとして足されます。過去の月が差し替えられることがあるかは確かめていません。
- Copernicus 側の AgERA5 は日ごとの NetCDF で、変数名や単位が FAO の GeoTIFF と違います。Copernicus から取るには Climate Data Store のアカウントが要ります (登録はしていません)。

## データ処理コマンド

2026-10-06 に GDAL 3.9.2、curl、jq で実際に動かしたコマンドです。
全部で 30 秒ほどかかりました。

```bash
# 説明 (GISMGR の公開カタログ API。単位と次元の規則が分かる)
curl -s https://data.apps.fao.org/gismgr/api/v2/catalog/workspaces/C3S/mapsets/AGERA5-PF-M \
  | jq '.response | {caption, measureUnit, dimensions, dimensionMembers}'

# 2026 年のファイルの一覧 (Google Cloud Storage の公開の一覧 API)
curl -s "https://storage.googleapis.com/storage/v1/b/fao-gismgr-c3s-data/o?prefix=DATA/C3S/MAPSET/AGERA5-PF-M/C3S.AGERA5-PF-M.2026&fields=items(name,size)" \
  | jq -r '.items[] | select(.name | endswith(".tif")) | "\(.size)\t\(.name)"'

# Range 要求に 206 が返るか
URL=https://storage.googleapis.com/fao-gismgr-c3s-data/DATA/C3S/MAPSET/AGERA5-PF-M/C3S.AGERA5-PF-M.2026-08.tif
curl -s -r 0-1023 -o /dev/null -w "%{http_code}\n" "$URL"

# COG の構造を見る (ヘッダだけを読む)
export GDAL_DISABLE_READDIR_ON_OPEN=EMPTY_DIR
gdalinfo /vsicurl/$URL | grep -E "Size is|Pixel Size|LAYOUT|Block=|NoData|Overviews"

# エチオピアの範囲 (東経 33〜48 度、北緯 3〜15 度) だけを切り出す
mkdir -p ./tmp
gdal_translate -q -projwin 33 15 48 3 /vsicurl/$URL ./tmp/ethiopia_pf_2026-08.tif
gdalinfo -stats ./tmp/ethiopia_pf_2026-08.tif | grep -E "Size is|STATISTICS_(MEAN|VALID_PERCENT)"

# 1 地点 (アディスアベバ付近) の 4 変数の値。気温はケルビン
for M in AGERA5-PF-M AGERA5-ET0-M AGERA5-TMAX-AVG-M AGERA5-TMIN-AVG-M; do
  printf "%s\t" "$M"
  gdallocationinfo -valonly -wgs84 \
    /vsicurl/https://storage.googleapis.com/fao-gismgr-c3s-data/DATA/C3S/MAPSET/$M/C3S.$M.2026-08.tif 38.75 9.0
done
```

## 関連項目

- [[国際連合食糧農業機関]]
- [[AQUASTAT]]
- [[Copernicus Climate Change Service]]
- [[ECMWF]]
- [[AgERA5]]
- [[ERA5]]
- [[再解析]]
- [[基準蒸発散量]]
- [[干ばつ]]
- [[食料安全保障]]
- [[Cloud Optimized GeoTIFF]]
- [[GDAL]]
- [[EPSG:4326]]
- [[CC-BY-4.0]]
- [[CC-BY-SA-4.0]]
- [[Natural Earth Coastline Data]]

## 確認日

2026-10-06 に次のことを確かめました。

- ライセンス、説明、来歴、更新頻度は、FAO のデータカタログの CKAN API (`package_search` と `package_show`) で 4 つの記録を読んで確かめました。4 つの説明ページが 200 を返すことも確かめました。
- 単位、次元、ファイル名の規則は、GISMGR の公開 API のワークスペース `C3S` とマップセット 4 つの説明で確かめました。DATA バケットの公開範囲 (`ALL USERS`) も同じ API で確かめました。どの端点が認証なしで使えるかは、FAO の「GISMGR 2.0 - API Reference」(2022、FAO Knowledge Repository の PDF) で確かめました。
- ファイルの数、期間、大きさ、更新日時は、Google Cloud Storage の公開の一覧 API で 4 つのマップセットのファイルを全部数えて確かめました。
- Range 対応 (206)、CORS、COG の構造は、2026-08 のファイルへの HEAD、Range 要求、`gdalinfo /vsicurl/` で確かめました。値は 4 変数の 2026-08 を数か所で読み、降水量は 2024-08、2025-08、2026-06、2026-07 も一地点で読みました。
- 元データの出所、ライセンス (CC-BY-4.0)、DOI、版の告知は、Copernicus の Climate Data Store のカタログ API (`/api/catalogue/v1/collections/sis-agrometeorological-indicators`) とそのお知らせで確かめました。

確かめられなかったことは次のとおりです。

- FAO が使っている AgERA5 の版 (1.1 か 2.0 か) は確かめていません。
- 過去の月のファイルが差し替えられることがあるかは確かめていません。
- 降水量と基準蒸発散量に継承 (SA) の条件が付いている理由は確かめていません。
- エチオピア北部の大きな降水量が誤りかどうかは、観測と照合しておらず確かめていません。
- WMTS と WMS の入口は動かしていません。
