---
id: nasa_hls
provider: NASA (処理は Marshall Space Flight Center の IMPACT チーム、保管と配布は LP DAAC)。Microsoft Planetary Computer が写しを置いている
source_data: L30 は USGS の Landsat 8/9 Collection 2 L1TP (USGS Landsat Collection 2)、S30 は ESA の Sentinel-2 L1C。どちらも大気上端の Level-1 を入力にしている
license: [CC0-1.0]
license_note: NASA の方針では「印が無ければ CC0」。STAC の表記は `proprietary`。S30 の入力の Sentinel-2 には Copernicus の条件が付く (下の節を参照)
access: catalog
access_note: catalog。STAC で範囲、日時、雲量、コレクション (L30 / S30) を指定してアイテム (1 回の撮影の MGRS タイル 1 枚) を選び、1 バンド 1 ファイルの COG を取る。COG の中は HTTP Range (206 を確認) で窓読みできる
format: [Cloud Optimized GeoTIFF (1 バンド 1 ファイル, DEFLATE 圧縮, 内部タイル 256x256, 概観 4 段)]
coverage: 南極を除く全球の陸域と主な島。北緯 82 度より北は対象外
period: L30 は 2013-04-11 から、S30 は 2015-11-28 から現在まで (CMR の値)。Planetary Computer が宣言する期間は 2020-01-01 から
resolution: 30m (全バンドを 30m に再標本化)。UTM 投影、MGRS タイル 1 枚は 109.8 km 四方で 3660 x 3660 画素
size: 1 アイテムの全ファイルで L30 が 225,079,728 バイト (16 ファイル)、S30 が 276,465,191 バイト (18 ファイル)。1 バンドは約 18MB から 24MB。2026-10-06 時点の CMR の件数は L30 が 16,102,344、S30 が 22,064,489 グラニュール。全体のバイト数は確かめていません
update: 継続的に追加。撮影から LP DAAC で使えるまで 1 日から 2 日 (利用者ガイド)、Planetary Computer への反映はそれより遅れる
url: 'STAC (Planetary Computer): https://planetarycomputer.microsoft.com/api/stac/v1 (コレクション `hls2-l30`、`hls2-s30`)'
docs: https://doi.org/10.5067/HLS/HLSL30.002 、https://doi.org/10.5067/HLS/HLSS30.002 、利用者ガイド https://lpdaac.usgs.gov/documents/1698/HLS_User_Guide_V2.pdf
checked: 2026-10-06
details:
  URL: 'STAC (NASA CMR): https://cmr.earthdata.nasa.gov/stac/LPCLOUD (コレクション `HLSL30_2.0`、`HLSS30_2.0`)'
---

# NASA HLS 衛星画像

> [[NASA]] が Landsat 8/9 と Sentinel-2A/B/C の観測を同じ 30m の格子に揃えて作り、[[LP DAAC]] と [[Microsoft Planetary Computer]] から全球の陸域 (南極を除く) について [[Cloud Optimized GeoTIFF]] で配っている地表反射率の衛星画像 (Harmonized Landsat and Sentinel-2、HLS v2.0)

## 概要

HLS は、Landsat 8/9 の OLI と Sentinel-2A/B/C の MSI という 2 系統の光学センサーを、1 つのセンサーのように時系列で扱えるように揃えた地表反射率のデータです。
NASA が USGS と協力して進めている事業で、配布は NASA の [[LP DAAC]] (Land Processes Distributed Active Archive Center) が担っています。

製品は 2 つあります。

- L30: Landsat 8/9 由来。OLI の地表反射率と TIRS の輝度温度。
- S30: Sentinel-2A/B/C 由来。MSI の地表反射率。

どちらも次の処理を同じ手順でかけ、同じ MGRS タイル、同じ 30m の画素に載せています。

- 大気補正 (LaSRC)
- 雲と雲の影の判定 (Fmask)
- Landsat を Sentinel-2 の MGRS 格子へ再標本化
- 視線方向の違いを補正する BRDF 補正 (天底視の反射率 NBAR にする)
- Sentinel-2 の波長帯を OLI に合わせる補正 (S30 のみ、レッドエッジ、水蒸気、巻雲の各バンドを除く)

利用者ガイドは、組み合わせると全球の陸域を平均 1.6 日ごとに観測できると書いています。
Planetary Computer の説明文は「every 2-3 days」と書いています。
衛星 1 機ごとの回帰日数は、Landsat が 16 日 (8 号と 9 号を合わせて 8 日)、Sentinel-2 が 10 日です。

作り方の限界は次のとおりです。

- 光学センサーなので、雲の下は見えません。東京付近の 2026 年 8 月では、HLS の 23 アイテムのうち雲量 50% 未満は 4 件でした。
- 30m は Sentinel-2 の可視域 (10m) より粗く、Sentinel-2 の細かさは失われています。
- L30 の熱赤外 (B10、B11) は大気補正をしていない輝度温度です。
- Landsat 7 は入力に入っていません。

## 内容

1 アイテムは、1 回の撮影の MGRS タイル 1 枚です。
ファイル名は `HLS.L30.T54SVE.2026232T011534.v2.0.B04.tif` のように、製品、タイル番号、撮影の年と通日と UTC 時刻、版、バンドの順に並びます。

### L30 (Landsat 8/9)

| バンド | 名前 | 波長 (μm、利用者ガイド) | 単位と型 | 尺度 | 欠損 |
| --- | --- | --- | --- | --- | --- |
| B01 | Coastal Aerosol | 0.43 - 0.45 | 反射率、int16 | 0.0001 | -9999 |
| B02 | Blue | 0.45 - 0.51 | 反射率、int16 | 0.0001 | -9999 |
| B03 | Green | 0.53 - 0.59 | 反射率、int16 | 0.0001 | -9999 |
| B04 | Red | 0.64 - 0.67 | 反射率、int16 | 0.0001 | -9999 |
| B05 | NIR Narrow | 0.85 - 0.88 | 反射率、int16 | 0.0001 | -9999 |
| B06 | SWIR 1 | 1.57 - 1.65 | 反射率、int16 | 0.0001 | -9999 |
| B07 | SWIR 2 | 2.11 - 2.29 | 反射率、int16 | 0.0001 | -9999 |
| B09 | Cirrus | 1.36 - 1.38 | 大気上端反射率、int16 | 0.0001 | -9999 |
| B10 | Thermal Infrared 1 | 10.60 - 11.19 | 輝度温度 (℃)、int16 | 0.01 | -9999 |
| B11 | Thermal Infrared 2 | 11.50 - 12.51 | 輝度温度 (℃)、int16 | 0.01 | -9999 |

### S30 (Sentinel-2A/B/C)

| バンド | 名前 | 波長 (μm、利用者ガイド) |
| --- | --- | --- |
| B01 | Coastal Aerosol | 0.43 - 0.45 |
| B02 | Blue | 0.45 - 0.51 |
| B03 | Green | 0.53 - 0.59 |
| B04 | Red | 0.64 - 0.67 |
| B05 | Red-Edge 1 | 0.69 - 0.71 |
| B06 | Red-Edge 2 | 0.73 - 0.75 |
| B07 | Red-Edge 3 | 0.77 - 0.79 |
| B08 | NIR Broad | 0.78 - 0.88 |
| B8A | NIR Narrow | 0.85 - 0.88 |
| B09 | Water Vapor | 0.93 - 0.95 |
| B10 | Cirrus | 1.36 - 1.38 |
| B11 | SWIR 1 | 1.57 - 1.65 |
| B12 | SWIR 2 | 2.11 - 2.29 |

S30 の 13 バンドはすべて反射率、int16、尺度 0.0001、欠損 -9999 です。
B09 と B10 (S30) は BRDF 補正をしていない大気上端反射率です。

同じバンド番号でも、L30 と S30 で中身が違います。
例えば近赤外 (狭帯域) は L30 では B05、S30 では B8A で、S30 の B05 はレッドエッジです。
SWIR 1 は L30 の B06 と S30 の B11、巻雲は L30 の B09 と S30 の B10 です。
同じ番号で揃っているのは B01 から B04 だけです。

### 共通の層

- Fmask: 品質の 1 バイト (uint8、欠損 255)。ビット 1 が雲、2 が雲や影の隣接 (5 画素の膨張)、3 が雲の影、4 が雪と氷、5 が水、6 と 7 がエアロゾルの濃さ (00 気候値、01 低、10 中、11 高) です。ビット 0 (巻雲) は利用者ガイドでは「予約、v2.0 では未使用」です。
- SZA、SAA、VZA、VAA: 太陽天頂角、太陽方位角、観測天頂角、観測方位角 (度、uint16、尺度 0.01、欠損 40,000)。
- 確認画像 (`.jpg`、1000 x 1000 の真色)、メタデータ (`.cmr.xml`)、大きさとチェックサム (`.json`)。

1 つの COG の中には、撮影時刻、元の Landsat シーン ID、雲量 (`cloud_coverage`)、タイル内の有効範囲の割合 (`spatial_coverage`)、使った LaSRC と Fmask の版などがタグで入っています。

## 取り出し方

区分は catalog です。
2 つの STAC で、範囲 (bbox)、日時、コレクションを指定してアイテムを探し、要るバンドのファイルだけを取ります。
どちらの STAC も検索に認証は要りません。
`query` に `{"eo:cloud_cover": {"lt": 50}}` を入れた雲量の絞り込みも、両方で効きました。

### NASA (LP DAAC、Earthdata Cloud)

- 検索: CMR-STAC (`https://cmr.earthdata.nasa.gov/stac/LPCLOUD/search`) と CMR の検索 API は、認証なしで使えます。CMR-STAC の応答は `context.matched` で件数を返します。
- データ: アイテムの各バンドの URL (`https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/...`) は、認証なしで要求すると 302 で Earthdata Login (`urs.earthdata.nasa.gov`) へ転送されます。取得には Earthdata のアカウントが要ります。このカードでは登録していないので、この経路で中身は読んでいません。
- 確認画像 (`lp-prod-public/...jpg`) だけは認証なしで取得できました。
- 同じデータは AWS の us-west-2 の S3 (`lp-prod-protected`) にもあると STAC に書かれています。直接読むにも Earthdata の一時資格情報が要ると読めますが、確かめていません。
- NASA は AppEEARS (範囲を指定して切り出す画面) と Earthdata Search も配布の入口に挙げています。どちらも Earthdata のアカウントが要ると見られますが、確かめていません。

### Microsoft Planetary Computer

- 検索: `POST https://planetarycomputer.microsoft.com/api/stac/v1/search` は認証なしで 200 を返します。応答に総件数は入らず、ページをたどって数えます。
- データ: Azure Blob (`hls2euwest.blob.core.windows.net`) に置かれています。署名なしで要求すると 409 (`PublicAccessNotPermitted`) で、1 バイトも読めません。
- 署名: `GET https://planetarycomputer.microsoft.com/api/sas/v1/token/hls2-l30` (S30 は `hls2-s30`) が、アカウントなしで SAS トークンを返します。有効期間は約 45 分です。URL の後ろに `?` とトークンを付けると、Range 要求に 206 が返りました。
- トークンの発行口は、ときどき 504 (`upstream request timeout`) を返しました。再試行すると取れます。
- コレクションには、アイテムのメタデータを週ごとに分けた GeoParquet (`abfs://items/hls2-l30.parquet`) もあります。これは読んでいません。

### COG の中の窓読み

COG は先頭に索引 (IFD) があり、256 x 256 の内部タイルと 4 段の概観 (1830、915、458、229 画素) を持っています。
そのため [[gdal_translate]] の `/vsicurl/` で、必要な範囲だけを Range 要求で読めます。
東京の約 3km 四方 (89 x 112 画素) の B04 を切り出すと、約 22KB でした。

## 使いどころ

- 農業と食料安全保障 (SDG 2.4): 作物の生育を NDVI などの時系列で追う。2 系統の衛星を合わせるので、雲の多い時期でも 1 系統だけより観測の機会が増えます。
- 森林と土地の劣化 (SDG 15.1、15.2、15.3): 伐採、植生の回復、土地被覆の変化を 30m で見る。
- 水域 (SDG 6.6): 湖や湿地、河川の水面の広がりを、時系列で比べる。
- 都市の広がり (SDG 11.3): 市街地の拡大を年単位で見る。
- 防災と人道支援 (SDG 13.1、仙台防災枠組): 洪水の浸水域、山火事の焼失域、干ばつの影響を、発災前後の画像の比較で大まかに把握する。撮影から 1 日から 2 日で使えるので、数日単位の状況把握には使えます。

使ってはいけない使い方もあります。

- 30m の画素では、個々の建物の被害や道路の寸断は判定できません。
- 雲の下は見えないので、雨季の洪水の最中は撮れていないことが多いです。発災直後の状況把握を HLS だけに頼らないでください。
- 熱赤外 (L30 の B10、B11) は大気補正していない輝度温度なので、地表面温度として扱わないでください。
- 南極、海洋、北緯 82 度より北は入っていません。
- 雲量はタイル全体の割合です。注目する範囲の雲は Fmask で画素ごとに確かめてください。

## ライセンスと帰属表示

ライセンスの表記は、見る場所で食い違います。

1. STAC (Planetary Computer) のコレクションの `license` は `proprietary` です。STAC の規約では、SPDX の識別子に当てはまらないときにこの値を使います。中身が「利用制限あり」という意味だとは限りません。license リンクは LP DAAC の Data Citation and Policies (`https://lpdaac.usgs.gov/data/data-citation-and-policies/`) を指しています。
2. そのリンクと、CMR の `UseConstraints` が指す Data Use Policy (`https://earthdata.nasa.gov/earth-observation-data/data-use-policy`) は、どちらも NASA Earthdata の Data Use Guidance (`https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/data-use-guidance`) に転送されます。CMR の `AccessConstraints` は null です。

Data Use Guidance の本文は次のとおりです。

> Unless the content is marked with a use restriction or license, data provided from a NASA-led mission are licensed as Creative Commons Zero (CC0). While there are no restrictions on the use of these data, data users are very strongly urged to cite the data used in their work products.

同じページに、NASA 以外のデータについての一文もあります。

> Non-NASA data available through the ESDIS project is subject to the license arrangements of the sponsoring organization. Users are encouraged to validate the source and associated use permissions.

読み取れることは次のとおりです。

- HLS のデータセットそのものに CC0 と明記されているわけではありません。「印が無ければ CC0」という既定値を当てはめた結果です。
- S30 の入力は ESA の Sentinel-2 です。Planetary Computer の STAC も、S30 の提供者に ESA (producer) を挙げています。上の「Non-NASA data」の一文から、S30 には Copernicus の条件も付くと読めます。
- Copernicus の Sentinel データの利用条件 (Legal notice on the use of Copernicus Sentinel Data and Service Information) は、複製、配布、改変を自由に認めたうえで、配布するときに出所を示すことを求めています。改変したデータには「Contains modified Copernicus Sentinel data [Year]」と表示します。
- L30 の入力の Landsat 8/9 は NASA と USGS の共同のミッションです。USGS 側の条件は [[USGS Landsat Collection 2]] を見てください。この 2 つの条件が L30 にどう重なるかは、NASA の文書には書かれていません。
- Planetary Computer の利用規約 (`https://planetarycomputer.microsoft.com/terms`) は JavaScript で描かれるページで、本文を確かめていません。

求められる表示は次のとおりです。
引用は義務ではありませんが、NASA は強く勧めています。
以下の文は、CMR に登録された引用情報 (著者、題名、発行者、公開日 2021-08-24、DOI) から組み立てたものです。

- L30: Neigh, C., Ju, J., Roger, J.-C., Skakun, S., Vermote, E., Claverie, M., Dungan, J., Yin, Z., Freitag, B., Justice, C. (2021). HLS Operational Land Imager Surface Reflectance and TOA Brightness Daily Global 30m v2.0. NASA Land Processes Distributed Active Archive Center. https://doi.org/10.5067/HLS/HLSL30.002
- S30: 同じ著者 (2021). HLS Sentinel-2 Multi-spectral Instrument Surface Reflectance Daily Global 30m v2.0. NASA Land Processes Distributed Active Archive Center. https://doi.org/10.5067/HLS/HLSS30.002
- S30 を使った成果を配るとき: Contains modified Copernicus Sentinel data [撮影年]

## 気をつけること

- 2 つの配布元で、収録範囲が同じではありません。東京付近の 2026 年 8 月では、NASA の CMR-STAC が 23 件、Planetary Computer が 20 件を返しました。Planetary Computer に無かった 3 件はすべて S30 (8 月 24 日の 2 件と 8 月 31 日の 1 件) で、うち 2 件は雲量 20 と 30 の晴れた画像でした。
- Planetary Computer は 2020 年より前をほとんど持っていません。同じ範囲の 2018 年から 2019 年は、CMR の 331 件に対して Planetary Computer は 18 件でした。宣言している期間 (2020-01-01 から) と合います。古い時期が要るときは NASA の経路を使います。
- Planetary Computer への反映は NASA より遅れます。2026-10-06 時点で Planetary Computer の最新のアイテムは 2026-10-02 で、CMR には 2026-10-04 のアイテムがありました。
- Planetary Computer の STAC では、L30 の B01 と B02 の中心波長が 0.48 と 0.44 になっています。利用者ガイドでは B01 (Coastal Aerosol) が 0.43 から 0.45、B02 (Blue) が 0.45 から 0.51 で、STAC の値は入れ替わっていると見られます。
- 利用者ガイドは Fmask 4.7 と書いていますが、2026 年 8 月のファイルのタグは `Fmask v5.0.1`、STAC の `processing:software` も同じでした。時期によって雲の判定の版が違う可能性があります。
- 南半球の UTM は、偽北距 0 で Y 座標を負にする USGS の流儀です。ファイルの投影情報が南半球でも北半球の EPSG になっている既知の誤りがあります。L30 の角度の層だけは偽北距 1,000 万 m で書かれています (2026 年 4 月の既知の問題の一覧)。
- 一部のファイルに `scale_factor` と `offset` が入っていません。反射率は常に 0.0001 倍してください。
- 反射率が -0.2 を下回る画素 (明るい建物や雪の隣など) は欠損 (-9999) にされています。エアロゾルのビット 6 と 7 が両方 1 の画素は捨てるよう、NASA が勧めています。
- ファイル名の日付は UTC です。オーストラリア東部やニュージーランドでは、現地の日付より 1 日前になります。
- L30 には同じ撮影の重複がまれにあります (2023 年に USGS が Landsat 9 を再処理し、時刻がわずかに変わったため)。
- 2021 年の 2 から 3 か月、Fmask が標高と水面のデータなしで動いていて、水域と山岳の判定が悪くなっています。
- 2021 年 8 月より前の S30 は、Sentinel-2 の位置精度が低い時期の入力から作られています。利用者ガイドは「30m の画素の半分以内なので多くの用途には問題ない」としています。
- 取り違えやすい別のデータとして、10m の Sentinel-2 L2A、Landsat Collection 2 の Level-2 地表反射率、HLS v1.4 (HDF 形式、旧版) があります。HLS は 2 系統を 30m に揃えたもので、どちらの原本とも画素の値は一致しません。
- 既知の問題の全体は、LP DAAC の HLS_v2.0_L30_known_issues_April2026.pdf と HLS_v2.0_S30_known_issues_April2026.pdf にあります。

## データ処理コマンド

2026-10-06 に、下のコマンドを上から順に動かして確かめました。
`curl`、`jq`、GDAL 3.9.2 を使います。
アカウントは要りません。

```bash
# 1. Planetary Computer の STAC で、東京付近の 2026 年 8 月、雲量 50% 未満のアイテムを探す
curl -s -X POST https://planetarycomputer.microsoft.com/api/stac/v1/search \
  -H 'Content-Type: application/json' \
  -d '{"collections":["hls2-l30","hls2-s30"],"bbox":[139.56,35.52,139.92,35.82],"datetime":"2026-08-01T00:00:00Z/2026-08-31T23:59:59Z","query":{"eo:cloud_cover":{"lt":50}},"limit":100}' \
  | jq -r '.features[] | [.id, .properties["eo:cloud_cover"], .assets.B04.href] | @tsv'

# 2. SAS トークンを取る (アカウント不要、約 45 分で切れる。504 が返ることがあるので再試行する)
TOKEN=$(curl -sf --retry 3 --retry-all-errors https://planetarycomputer.microsoft.com/api/sas/v1/token/hls2-l30 | jq -r .token)

# 3. 1 バンドの COG のヘッダを読む (Range 要求で先頭だけ読む)
B04=https://hls2euwest.blob.core.windows.net/hls2/L30/54/S/VE/2026/08/20/HLS.L30.T54SVE.2026232T011534.v2.0/HLS.L30.T54SVE.2026232T011534.v2.0.B04.tif
gdalinfo "/vsicurl/${B04}?${TOKEN}" | grep -E 'Size is|Pixel Size|Type=|NoData|Scale|cloud_coverage'

# 4. 経緯度で範囲を指定して、その部分だけを取り出す (約 3km 四方、約 22KB)
mkdir -p ./tmp
gdal_translate -projwin_srs EPSG:4326 -projwin 139.90 35.72 139.93 35.69 \
  "/vsicurl/${B04}?${TOKEN}" ./tmp/hls_b04_window.tif
gdalinfo -stats ./tmp/hls_b04_window.tif | grep -E 'Size is|STATISTICS_(MINIMUM|MAXIMUM|MEAN)'

# 5. 同じ範囲の Fmask を取り出して、値の分布を見る
FMASK=${B04%.B04.tif}.Fmask.tif
gdal_translate -projwin_srs EPSG:4326 -projwin 139.90 35.72 139.93 35.69 \
  "/vsicurl/${FMASK}?${TOKEN}" ./tmp/hls_fmask_window.tif
gdalinfo -hist ./tmp/hls_fmask_window.tif

# 6. NASA の CMR-STAC で同じ範囲を探す (検索は認証なし)
curl -s "https://cmr.earthdata.nasa.gov/stac/LPCLOUD/search?collections=HLSL30_2.0,HLSS30_2.0&bbox=139.56,35.52,139.92,35.82&datetime=2026-08-01T00:00:00Z/2026-08-31T23:59:59Z&limit=100" \
  | jq -r '.features[] | [.id, .properties["eo:cloud_cover"]] | @tsv'

# 7. NASA の確認画像 (真色 JPEG) は認証なしで取れる
curl -sL -o ./tmp/browse.jpg https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/HLSL30.020/HLS.L30.T54SVE.2026232T011534.v2.0/HLS.L30.T54SVE.2026232T011534.v2.0.jpg

# 8. NASA のバンドのファイルは Earthdata Login へ転送される (302)
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' \
  https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-protected/HLSL30.020/HLS.L30.T54SVE.2026232T011534.v2.0/HLS.L30.T54SVE.2026232T011534.v2.0.B04.tif
```

手順 4 の結果は 89 x 112 画素で、値は 62 から 4218 (反射率 0.0062 から 0.4218) でした。
手順 5 の Fmask の値は 64 (エアロゾル低、晴れ)、96 (64 に水のビット 32 を足したもの)、128 (エアロゾル中、晴れ) などでした。
Earthdata のアカウントを使って NASA から本体を取る手順は、動かしていません。

## 関連項目

- [[USGS Landsat Collection 2]]
- [[NASA SRTM 標高]]
- [[NASA Blue Marble]]
- [[ArcGIS World Imagery 衛星画像タイル]]
- [[NASA]]
- [[LP DAAC]]
- [[Microsoft Planetary Computer]]
- [[Sentinel-2]]
- [[Landsat]]
- [[STAC]]
- [[Cloud Optimized GeoTIFF]]
- [[GeoTIFF]]
- [[gdalinfo]]
- [[gdal_translate]]
- [[CC0]]
- [[衛星画像]]
- [[ラスターデータ]]

## 確認日

2026-10-06 に次のことを確かめました。

- Planetary Computer の STAC のコレクション (`hls2-l30`、`hls2-s30`) を読み、ライセンスの表記、提供者、期間、アセットを確かめました。
- 東京付近 (bbox 139.56,35.52,139.92,35.82、2026 年 8 月) を Planetary Computer と NASA の CMR-STAC で検索し、件数と雲量の絞り込みを比べました。
- 署名なしの要求が 409、SAS トークン付きの Range 要求が 206 になることを確かめました。トークンの発行口が 504 を返すことがありました。
- L30 1 件と S30 1 件の全ファイルの大きさを、署名付きの HEAD で数えました。
- gdalinfo で B04、B10、VZA、Fmask の型、尺度、欠損、タグを読みました。
- NASA の CMR でコレクションのメタデータ (期間、DOI、引用、ライセンスのリンク) とグラニュールの件数を確かめました。
- NASA の本体ファイルが Earthdata Login へ転送されること、確認画像は認証なしで取れることを確かめました。
- LP DAAC の HLS v2.0 利用者ガイド (PDF) と、2026 年 4 月の既知の問題の一覧 (L30、S30) を読みました。
- NASA Earthdata の Data Use Guidance と、Copernicus の Sentinel データの利用条件 (PDF) を読みました。

確かめられなかったことは次のとおりです。

- Earthdata のアカウントが要る経路 (本体のダウンロード、S3 の直接読み出し、AppEEARS) は使っていません。
- Planetary Computer の利用規約の本文は読めていません。
- HLS 全体のバイト数は確かめていません。
- USGS の Landsat の条件が L30 にどう重なるかは確かめていません。
- Planetary Computer の GeoParquet (`abfs://`) は読んでいません。
