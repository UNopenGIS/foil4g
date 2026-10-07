---
title: USGS Landsat Collection 2
description: "USGS が Landsat 4、5、7、8、9 の 1982 年から現在までの観測を大気補正し、全球について WRS-2 のシーンごとの Cloud Optimized GeoTIFF で配っている地表反射率と地表温度 (Landsat Collection 2 Level-2)"
provider_group: "USGS"
categories: ["衛星・航空画像"]
regions: ["全世界"]
formats: ["COG", "GeoTIFF"]
id: landsat_c2
provider: USGS の EROS Center (Earth Resources Observation and Science Center)。Landsat 計画は NASA と USGS の共同事業。Microsoft Planetary Computer と AWS が写しを置いている
source_data: なし (一次データ)。同じ Collection 2 の Level-1 (大気上端の値) を USGS が大気補正したもの
license: [public-domain]
license_note: 利用の制限なし (米国政府のデータ。Landsat Data Distribution Policy)。キャプションへの「USGS/NASA Landsat Program.」の表示を求めている
access: catalog
access_note: catalog。STAC で範囲、日時、雲量、衛星、WRS-2 の path/row、品質の区分 (T1/T2) を指定してシーンを選び、1 バンド 1 ファイルの COG を取る。COG の中は HTTP Range (206 を確認) で窓読みできる。ただし無料かつアカウントなしで中身まで読めたのは Planetary Computer の経路だけ
format: Cloud Optimized GeoTIFF (1 バンド 1 ファイル、DEFLATE 圧縮、内部タイル 256x256、概観 6 段)。メタデータは MTL (txt、xml、json)
coverage: 全球 (STAC の空間範囲は経度 -180 から 180、緯度 -90 から 90)。実際に撮っているのは陸域と沿岸が中心
period: 1982-08-22 から現在まで。衛星ごとの期間は下の「内容」の節
resolution: 30m (反射率)。熱赤外の元の解像度は TM 120m、ETM+ 60m、TIRS 100m で、配布ファイルは 30m に再標本化されている。シーンごとの UTM 投影 (WGS 84)
size: Landsat 8 の 1 シーン (LC08_L2SP_107036_20260820) の全 23 ファイルで 836,955,690 バイト。赤のバンド 1 つで 84,174,498 バイト。USGS の STAC の件数は 2026-10-06 時点で地表反射率 10,335,596 シーン、地表温度 9,505,511 シーン。全体のバイト数は確かめていません
update: 毎日追加 (AWS の Registry of Open Data の記載)。撮影から公開までの日数は確かめていません
url: 'STAC (USGS): https://landsatlook.usgs.gov/stac-server (コレクション `landsat-c2l2-sr`、`landsat-c2l2-st`)'
docs: https://www.usgs.gov/landsat-missions/landsat-collection-2-level-2-science-products 、https://registry.opendata.aws/usgs-landsat/ 、https://planetarycomputer.microsoft.com/dataset/landsat-c2-l2
checked: 2026-10-06
details:
  URL: 'AWS S3 (requester pays): `s3://usgs-landsat/collection02/level-2/` (us-west-2)'
  DOI: https://doi.org/10.5066/P9IAXOVV (Landsat 4-5 TM)、https://doi.org/10.5066/P9C7I13B (Landsat 7 ETM+)、https://doi.org/10.5066/P9OGBGM6 (Landsat 8-9 OLI/TIRS)
---

# USGS Landsat Collection 2

> [[USGS]] が Landsat 4、5、7、8、9 の 1982 年から現在までの観測を大気補正し、全球について WRS-2 のシーンごとの [[Cloud Optimized GeoTIFF]] で配っている地表反射率と地表温度 (Landsat Collection 2 Level-2)

## 概要

Landsat は、1972 年から続いている米国の地球観測衛星の系列です。
[[NASA]] と [[USGS]] が共同で運営し、USGS が観測データを保管して配っています。
Collection 2 は、USGS が過去の観測を含めて全部を同じ手順で処理し直した版で、Level-1 (大気上端の値) と、それを大気補正した Level-2 があります。
このカードが扱うのは Level-2 です。

Level-2 は 2 つの製品からなります。

- 地表反射率 (Surface Reflectance、SR): 大気の影響を取り除いて、地表が日射のどれだけを反射したかを推定した値。
- 地表温度 (Surface Temperature、ST): 熱赤外のバンドから推定した地表の温度 (ケルビン)。

どちらも観測値そのものではなく、大気のモデルと補助データを使った推定です。
処理の水準は STAC の `landsat:correction` で区別され、反射率と温度の両方がある `L2SP` と、反射率だけの `L2SR` があります。
USGS の STAC で反射率と温度の件数に約 83 万シーンの差があるのは、温度を作れなかったシーンがあるためと読めます (推定です)。
2026-10-02 の Landsat 9 のシーン (LC09_L2SR_087107_20261002_02_T2) は `L2SR` で、温度のファイルがありませんでした。

1 シーンは、WRS-2 という軌道の格子の path と row 1 つ分で、約 7,750 x 7,900 画素 (30m) です。
1 機の衛星は同じ場所を 16 日ごとに撮ります。
東京付近の path 107、row 036 では、2026 年 8 月に Landsat 8 と 9 が 8 日おき (8/4、8/12、8/20、8/28) に撮っていました。

作り方の限界は次のとおりです。

- 光学と熱赤外のセンサーなので、雲の下は見えません。東京付近の 2026 年 8 月の 12 シーンのうち、雲量 50% 未満は 3 シーンでした。
- 30m の画素では、個々の建物や細い道路は見分けられません。
- 熱赤外の元の解像度は 60m から 120m です。30m のファイルになっていても、30m の細かさはありません。
- 1982 年から 1999 年は Landsat 4 と 5 だけで、地域によっては観測の回数が少ない年があります。件数の偏りは確かめていません。

## 内容

### 衛星とセンサー

STAC で衛星ごとに最も古いシーンと最も新しいシーンを探した結果です (Planetary Computer、2026-10-06)。
件数は USGS の STAC の集計 (地表反射率のコレクション) です。

| 衛星 | センサー | 最初のシーン | 最後のシーン | シーン数 |
| --- | --- | --- | --- | ---: |
| Landsat 4 | TM | 1982-08-22 | 1993-11-18 | 42,407 |
| Landsat 5 | TM | 1984-03-05 | 2012-05-05 | 2,849,307 |
| Landsat 7 | ETM+ | 1999-05-28 | 2024-01-19 | 3,252,938 |
| Landsat 8 | OLI、TIRS | 2013-03-18 | 運用中 | 3,053,484 |
| Landsat 9 | OLI-2、TIRS-2 | 2021-10-31 | 運用中 | 1,137,460 |

Landsat 1 から 3 (MSS) は Level-1 (1972-07-25 から) にはありますが、Level-2 にはありません。
Landsat 6 は打ち上げに失敗しており、どこにもありません。

### バンド (ファイル)

名前は Planetary Computer のアセット名です。
Landsat 8/9 の `coastal` は OLI だけにあり、TM と ETM+ にはありません。
熱赤外は Landsat 8/9 では `lwir11` (B10)、Landsat 4 から 7 では `lwir` です。

| アセット | 中身 | 型 | 物理量への変換 | 欠損 |
| --- | --- | --- | --- | --- |
| coastal | 沿岸エアロゾル (OLI の B1、0.44μm) | uint16 | 値 × 0.0000275 - 0.2 = 反射率 | 0 |
| blue | 青 (0.48μm) | uint16 | 同上 | 0 |
| green | 緑 (0.56μm) | uint16 | 同上 | 0 |
| red | 赤 (0.65μm) | uint16 | 同上 | 0 |
| nir08 | 近赤外 (0.86μm) | uint16 | 同上 | 0 |
| swir16 | 短波赤外 (1.6μm) | uint16 | 同上 | 0 |
| swir22 | 短波赤外 (2.2μm) | uint16 | 同上 | 0 |
| lwir11 / lwir | 地表温度 | uint16 | 値 × 0.00341802 + 149 = ケルビン | 0 |
| trad、urad、drad | 熱放射、上向き放射、下向き放射 | int16 | × 0.001 (W/(m2 sr μm)) | -9999 |
| atran | 大気透過率 | int16 | × 0.0001 | -9999 |
| emis、emsd | 射出率とその標準偏差 | int16 | × 0.0001 | -9999 |
| cdist | 雲からの距離 | int16 | × 0.01 (km) | -9999 |
| qa | 地表温度の不確かさ | int16 | × 0.01 (ケルビン) | -9999 |
| qa_pixel | 画素の品質 (雲、雲の影、雪、水などのビット) | uint16 | ビットを読む | 1 |
| qa_radsat | 飽和の品質 | uint16 | ビットを読む | なし |
| qa_aerosol | エアロゾルの品質 (OLI のみ) | uint8 | ビットを読む | 1 |
| cloud_qa、atmos_opacity | 雲の品質、大気の不透明度 (TM と ETM+ のみ) | uint8、int16 | atmos_opacity は × 0.001 | atmos_opacity は -9999 |
| ang、mtl.txt、mtl.xml、mtl.json | 角度係数、メタデータ | テキスト | | |

波長の中心は USGS の STAC の `eo:bands` の値で、Landsat 8 のものです。
変換の係数は Planetary Computer の `raster:bands` と、シーンの MTL (`REFLECTANCE_MULT_BAND_n` が 2.75e-05、`TEMPERATURE_MULT_BAND_ST_B10` が 0.00341802、`TEMPERATURE_ADD_BAND_ST_B10` が 149.0) の両方で確かめました。

USGS の STAC では、反射率と温度が別のコレクション (`landsat-c2l2-sr` と `landsat-c2l2-st`) に分かれていて、アイテム ID の末尾に `_SR` と `_ST` が付きます。
Planetary Computer では 1 つのコレクション (`landsat-c2-l2`) にまとまっています。

### シーンの属性 (STAC)

主なものは、`eo:cloud_cover` (シーン全体の雲量 %)、`landsat:cloud_cover_land` (陸の雲量 %)、`landsat:wrs_path`、`landsat:wrs_row`、`landsat:collection_category` (T1、T2、RT)、`landsat:correction` (L2SP、L2SR)、`platform`、`view:sun_elevation`、`proj:epsg` です。
USGS の STAC には、幾何精度 (`accuracy:geometric_rmse` など、メートル) も入っています。

## 取り出し方

区分は catalog です。
STAC でシーンを選び、要るバンドのファイルだけを取ります。
配布の経路は 3 つあり、検索はどれも無料ですが、中身の取得の条件が違います。

### USGS (landsatlook の STAC)

- 検索: `https://landsatlook.usgs.gov/stac-server/search` は認証なしで 200 を返しました。`query` の `eo:cloud_cover` での絞り込みも効き、`numberMatched` で件数を返します。
- 集計: `/collections/landsat-c2l2-sr/aggregate?aggregations=total_count,platform_frequency` で、全体の件数と衛星ごとの件数が取れます。
- queryables の応答は空 (`properties` が `{}`) で、絞り込める項目は宣言されていません。
- データ: アセットの URL (`https://landsatlook.usgs.gov/data/collection02/...`) は、バンドのファイルもサムネイルも MTL も、認証なしで要求すると 302 で USGS のアカウントのログイン (`ers.cr.usgs.gov`) へ転送されました。取得には USGS のアカウント (EROS Registration System) が要ります。このカードでは登録していないので、この経路で中身は読んでいません。

### AWS (requester pays)

- 同じファイルが `s3://usgs-landsat/` にあり、USGS の STAC のアセットに `alternate.s3.href` として書かれています。
- 認証なしで要求すると 403 で、本文は「Anonymous users cannot invoke requests against Requester Pays buckets. Please authenticate.」でした。
- requester pays のバケットなので、取得には AWS のアカウントが要り、転送量は取得する側に課金されます。このカードでは使っていません。

### Microsoft Planetary Computer

- 検索: `POST https://planetarycomputer.microsoft.com/api/stac/v1/search` は認証なしで 200 を返しました。queryables は 27 項目で、雲量、path/row、品質の区分、衛星で絞れます。
- データ: Azure Blob (`landsateuwest.blob.core.windows.net`) に置かれています。署名なしで要求すると 409 (`PublicAccessNotPermitted`) で、1 バイトも読めません。
- 署名: `GET https://planetarycomputer.microsoft.com/api/sas/v1/token/landsat-c2-l2` が、アカウントなしで SAS トークンを返しました。有効期間は約 45 分です。URL の後ろに `?` とトークンを付けると、Range 要求に 206 が返りました。
- コレクションには、アイテムのメタデータを月ごとに分けた GeoParquet (`abfs://items/landsat-c2-l2.parquet`) もあります。これは読んでいません。

### COG の中の窓読み

赤のバンドの COG は、7751 x 7891 画素、DEFLATE 圧縮、256 x 256 の内部タイルで、6 段の概観 (3876 から 122 画素) を持っていました。
そのため [[gdal_translate]] の `/vsicurl/` で、必要な範囲だけを Range 要求で読めます。
東京湾付近の 15km 四方 (500 x 500 画素) の赤のバンドを切り出すと、約 500KB でした。

## 使いどころ

40 年を超える同じ手順の時系列があることが、このデータの一番の特徴です。

- 森林と土地の劣化 (SDG 15.1.1、15.3.1): 1980 年代からの森林の減少や回復、土地被覆の変化を 30m で追う。
- 水域 (SDG 6.6.1): 湖、湿地、河川の水面の広がりの長期の変化を比べる。
- 都市の広がり (SDG 11.3.1): 市街地の拡大を数十年の単位で見る。人口のデータと合わせて土地の消費の割合を求める材料になります。
- 都市の暑さ: 地表温度で、夏の市街地と緑地の温度の差を見る。
- 防災と人道支援 (仙台防災枠組、SDG 13.1): 洪水の浸水域や山火事の焼失域を、発災前後の画像の比較で大まかに把握する。過去の災害の範囲を後から調べることにも使えます。
- 難民や避難民のキャンプの広がりを、数年の単位で大まかに見る。

使ってはいけない使い方もあります。

- 30m の画素では、個々の建物の被害、車両、人の集まりは判定できません。人道支援や国際平和の場面で、個別の建物や人について結論を出す根拠にしないでください。
- 同じ場所の撮影は最短でも数日おきで、雲の下は見えません。発災直後の状況把握をこのデータだけに頼らないでください。
- 地表温度は推定値で、気温ではありません。熱中症の危険度などを地表温度だけで語らないでください。
- 衛星やセンサーが変わると、同じ場所でも値が少しずれます。長期の変化を見るときは、センサーの切り替わりを変化と取り違えないようにしてください。

## ライセンスと帰属表示

USGS の Landsat のデータには、利用の制限がありません。
根拠は Landsat Data Distribution Policy (USGS と NASA、2008 年) で、USGS の STAC のコレクションの `license` がこの文書を指しています。
https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/atoms/files/Landsat_Data_Policy.pdf

> E. The USGS places no restrictions on users of Landsat data products obtained from the USGS or on users who create and sell or otherwise distribute products derived from Landsat products originally distributed by the USGS. However, such products are not to be licensed or placed under copyright unless the original Landsat data are digitally merged with other data or are otherwise altered significantly.

同じ文書は、表示の文言も決めています。

> D. When Landsat images, or portions thereof, obtained from the USGS are published or electronically posted, the following attribution is to be used in a caption: "USGS/NASA Landsat Program."

求められる表示は次のとおりです。

- 画像を載せるときのキャプション: USGS/NASA Landsat Program.
- データを引用するときは、上の DOI を挙げる。例: Landsat 8-9 OLI/TIRS Collection 2 Level-2 Science Products, U.S. Geological Survey, https://doi.org/10.5066/P9OGBGM6

各シーンの MTL にも `"ORIGIN": "Image courtesy of the U.S. Geological Survey"` と書かれています。

AWS の Registry of Open Data の記載は、次のとおりです。

> There are no restrictions on Landsat data downloaded from the USGS; it can be used or redistributed as desired. We do request that you include a statement of the data source when citing, copying, or reprinting USGS Landsat data or images.

気をつける点があります。

- 方針の E は、Landsat のデータをほぼそのまま再配布するものに、ライセンスや著作権を付けることを認めていません。他のデータと合わせたり大きく加工したりしたものだけが例外です。
- Planetary Computer の STAC のコレクションの `license` は `proprietary` です。STAC の規約では SPDX の識別子に当てはまらないときにこの値を使うので、利用の制限があるという意味ではありません。license リンクの題名は「Public Domain」で、USGS の災害対応ポータル (HDDS) のデータ方針のページを指しています。このページは Landsat 専用の文書ではありません。
- USGS の Level-2 の製品ページ (2026-09-30 の調査メモの引用) は、「There are no restrictions on the use of Landsat products.」と書き、USGS への謝辞の表示は「not a requirement」としています。2026-10-06 にはこのページを読めなかったので、自分では確かめていません。
- Planetary Computer の利用規約は確かめていません。

## 気をつけること

- 品質の区分: `T1` は幾何精度の基準を満たしたシーン、`T2` は満たさないシーンです。時系列で並べるときは `T1` に絞るのが安全です。東京付近の 2026 年 8 月の 12 シーンのうち 1 シーン (Landsat 8、2026-08-27、path 108、row 035) が `T2` で、雲量も 99.92% でした。最新のシーンには暫定の `RT` もあると STAC の属性の説明から読めますが、件数は確かめていません。
- 値は整数のままです。係数を掛けずに使うと、反射率も温度も桁がずれます。反射率は -0.2 から 1.6 の範囲を取りうるので、負の値や 1 を超える値が出ても異常とは限りません。
- 欠損は反射率と温度で 0、補助の層で -9999 です。シーンの外周 (斜めの撮影範囲の外) も欠損で埋まっています。
- 雲量 (`eo:cloud_cover`) はシーン全体の割合です。注目する範囲の雲は `qa_pixel` で画素ごとに確かめてください。
- 座標系はシーンごとの UTM で、隣り合うシーンでもゾーンが違うことがあります。モザイクにするときは投影を揃えてください。南極など極域のシーンの投影は確かめていません。
- Landsat 7 は 2003 年に走査線の補正器 (SLC) が壊れ、それ以降のシーンには縞状の欠けがあることが広く知られています。今回は配布元の説明では確かめていません。
- アイテム ID の違い: USGS の STAC は `LC08_L2SP_107036_20260820_20260824_02_T1_SR` (処理日と `_SR` を含む)、Planetary Computer は `LC08_L2SP_107036_20260820_02_T1` (処理日を含まない) です。同じシーンでも ID の文字列は一致しません。
- 取り違えやすい別のデータ:
  - Collection 1: 古い処理の版で、USGS は Collection 2 に置き換えています。Collection 1 の配布の状況は確かめていません。
  - Level-1 (`landsat-c2l1`): 大気補正をしていない大気上端の値です。
  - Analysis Ready Data (`landsat-c2ard-sr` など): 同じ Collection 2 を別の格子のタイルに並べ直したもので、USGS の STAC で別のコレクションになっています。範囲は確かめていません。
  - [[NASA HLS 衛星画像]]: Landsat 8/9 と Sentinel-2 を 30m の同じ格子に揃えたもので、2013 年からです。Landsat 4 から 7 は入っていません。

## データ処理コマンド

2026-10-06 に実際に動かして確かめたコマンドです。
curl、jq、GDAL 3.9.2 (`gdal_calc.py` を含む) を使います。
アカウントも課金も要りません。

```bash
# 1. USGS の STAC で、東京付近の 2026 年 8 月の雲量 50% 未満のシーンを探す
curl -s -X POST https://landsatlook.usgs.gov/stac-server/search \
  -H 'Content-Type: application/json' \
  -d '{"collections":["landsat-c2l2-sr"],"bbox":[139.56,35.52,139.92,35.82],"datetime":"2026-08-01T00:00:00Z/2026-08-31T23:59:59Z","query":{"eo:cloud_cover":{"lt":50}},"limit":50}' \
  | jq -r '.features[] | [.id, .properties.platform, .properties["eo:cloud_cover"], .properties["landsat:collection_category"]] | @tsv'

# 2. コレクション全体の件数を衛星ごとに数える
curl -s "https://landsatlook.usgs.gov/stac-server/collections/landsat-c2l2-sr/aggregate?aggregations=total_count,platform_frequency" | jq .aggregations

# 3. Planetary Computer で同じシーンの赤のバンドの URL を得る
ITEM=https://planetarycomputer.microsoft.com/api/stac/v1/collections/landsat-c2-l2/items/LC08_L2SP_107036_20260820_02_T1
RED=$(curl -s "$ITEM" | jq -r .assets.red.href)

# 4. アカウントなしで SAS トークンを得る (約 45 分で切れる)
TOKEN=$(curl -s https://planetarycomputer.microsoft.com/api/sas/v1/token/landsat-c2-l2 | jq -r .token)

# 5. Range 要求に 206 が返ることを確かめる
curl -s -r 0-1023 -o /dev/null -w '%{http_code}\n' "${RED}?${TOKEN}"

# 6. COG のヘッダを読む (大きさ、投影、欠損、概観)
gdalinfo "/vsicurl/${RED}?${TOKEN}"

# 7. 東京湾付近の 15km 四方だけを切り出す (座標は UTM 54N のメートル)
mkdir -p ./tmp
gdal_translate -projwin 385000 3935000 400000 3920000 "/vsicurl/${RED}?${TOKEN}" ./tmp/red_window.tif

# 8. 反射率に直して統計を見る
gdal_calc.py -A ./tmp/red_window.tif --outfile=./tmp/red_reflectance.tif \
  --calc="A*0.0000275-0.2" --type=Float32 --NoDataValue=-9999 --quiet
gdalinfo -stats ./tmp/red_reflectance.tif
```

8 の結果は、反射率の最小 -0.013、最大 0.704、平均 0.014 (海が大半なので小さい)、有効な画素 59.84% でした。
切り出した範囲の一部がシーンの撮影範囲の外にあり、そこは欠損になっています。

## 関連項目

- [[NASA HLS 衛星画像]]
- [[NASA SRTM 標高]]
- [[ArcGIS World Imagery 衛星画像タイル]]
- [[USGS]]
- [[NASA]]
- [[Landsat]]
- [[Microsoft Planetary Computer]]
- [[AWS]]
- [[STAC]]
- [[Cloud Optimized GeoTIFF]]
- [[gdal_translate]]
- [[GDAL]]
- [[パブリックドメイン]]

## 確認日

2026-10-06 に次のことを確かめました。

- USGS の STAC (landsatlook) で、コレクションの一覧、`landsat-c2l2-sr` と `landsat-c2l2-st` の説明、東京付近の 2026 年 8 月の検索 (12 シーン、雲量 50% 未満は 3 シーン)、件数の集計を読みました。
- USGS の STAC のアセットの URL に認証なしで要求し、302 で USGS のログインへ転送されることを確かめました。
- AWS の `usgs-landsat` に認証なしで要求し、requester pays のため 403 になることを確かめました。AWS の Registry of Open Data のページで、ライセンスの記載と更新頻度を読みました。
- Planetary Computer の STAC で、コレクションの説明、`raster:bands`、queryables、同じ範囲と期間の検索 (12 シーン)、衛星ごとの最初と最後のシーンを確かめました。アカウントなしの SAS トークンで、1 シーンの全ファイルの大きさを HEAD で、赤のバンドの COG の構造を `gdalinfo` で、MTL の係数を読みました。
- Landsat Data Distribution Policy の PDF (画像だけの 3 ページ) を取得し、文字を読み取って、E と D の文言を画像と見比べて確かめました。

確かめられなかったことは次のとおりです。

- www.usgs.gov のページ (Level-2 の製品ページ、HDDS のデータ方針、著作権とクレジットのページ、データ引用のページ) は、curl では 403、ほかの取得手段では 60 秒の時間切れで、2 回ずつ試して読めませんでした。製品ページの「There are no restrictions」と「not a requirement」の文言は、2026-09-30 の調査メモの引用によります。
- 撮影から公開までの日数、全体のバイト数、Planetary Computer の利用規約、Collection 1 の配布の状況、Analysis Ready Data の範囲、極域のシーンの投影は確かめていません。
- USGS と AWS の経路でファイルの中身は読んでいません (アカウントと課金が要るため)。
