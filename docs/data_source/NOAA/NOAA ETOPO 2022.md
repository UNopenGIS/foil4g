---
id: noaa_etopo_2022
provider: NOAA NCEI (National Centers for Environmental Information)
source_data: [GEBCO 2022 (海の水深の土台), Copernicus DEM 30m と FABDEM (陸の標高), BedMachine (氷床の下の岩盤), GMRT, NOAA の沿岸 DEM (CUDEM ほか) など 13 の層を重ねた合成物]
license: [CC0-1.0]
license_note: CC0 1.0 (NCEI の ISO メタデータに明記)。ただし元データの GEBCO の利用条件は出典の表示を求めている (下のライセンスの節を参照)
access: split
access_note: split。15 秒は 15 度四方のタイル (ice surface 288 枚、bedrock 62 枚) に分かれていて、ファイル名の北西の角の緯度経度で選べる。1 枚の中は range (HTTP Range に 206、256 x 256 画素の内部タイル) で窓読みできる。netCDF は THREDDS の OPeNDAP で添字を指定して一部だけ取れる
format: GeoTIFF (float32、Deflate 圧縮、256 x 256 の内部タイル、オーバービューなし) と netCDF4 (CF-1.5)。中身は同じ
coverage: 全世界 (経度 -180 から 180、緯度 -90 から 90)
period: 単一時点の地形。ISO メタデータの時間範囲は 1998-01-01 から 2022-09-01 (元データの取得期間)
resolution: 15 秒 (約 460m)、30 秒、60 秒 (1 分)。値は EGM2008 ジオイド高に対するメートル
size: 15 秒 ice surface は 1 枚 2.1MB から 36MB、全 288 枚で約 5.2GB (一覧の丸めた表示値を足した概算)。30 秒全球 1 枚は surface 1,585,813,987 バイト、bed 1,624,895,430 バイト。60 秒全球 1 枚は surface 465,969,062 バイト、bed 478,386,633 バイト (いずれも GeoTIFF、HEAD の Content-Length)
update: 不定期 (ISO メタデータは asNeeded)。ファイルは 2022-10-04 から更新されていない
url: https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/
docs: https://www.ncei.noaa.gov/products/etopo-global-relief-model
checked: 2026-10-06
details:
  netCDF (THREDDS): https://www.ngdc.noaa.gov/thredds/catalog/global/ETOPO2022/
  利用者ガイド: https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/docs/1.2%20ETOPO%202022%20User%20Guide.pdf
  DOI: https://doi.org/10.25921/fd45-gt74
---

# NOAA ETOPO 2022

> [[NOAA]] の [[NCEI]] (米国環境情報センター) が、陸の標高と海底の水深を 1 つにつないだ全球の格子を、15 秒、30 秒、60 秒の 3 つの解像度で、[[GeoTIFF]] と [[netCDF]] で [[CC0]] として配っているもの

## 概要

ETOPO (Earth TOPOgraphy) は、NOAA が ETOPO5 (5 分)、ETOPO2 (2 分)、ETOPO1 (1 分) と続けてきた全球の地形格子です。
ETOPO 2022 はその後継で、解像度を 15 秒に上げ、陸と海と氷床の下を継ぎ目なくつないでいます。
説明ページは 2026-10-06 時点で「Current Version: ETOPO 2022」としています。

NOAA が自分で測ったデータではありません。
利用者ガイドの出典表には 13 の層 (layer source id 1 から 13) が並び、それぞれの役割が書かれています。

- 海の水深の土台は GEBCO 2022 (id 1) で、極地方の氷の下の海底は GEBCO 2022 の sub-ice 版 (id 2) です。
- 海の水深は、NOAA の河口 DEM と地域 DEM (id 3、4)、GMRT v4.0 (id 5)、BlueTopo (id 6)、メキシコ湾の BOEM (id 7)、ShallowBathy Everywhere (id 8) で置き換えられている所があります。
- 陸の標高は Copernicus DEM 30m (id 9) と、森林と建物を取り除いた FABDEM (id 10) です。
- 氷床の下の岩盤は BedMachine (id 11、南極 v2 とグリーンランド v4) です。
- 大きな湖の水深は GEBCO の湖の水深 (id 12)、米国とその領土は NOAA の CUDEM (id 13) です。

陸の元データは、NASA の ICESat-2 (2021 年の 1 年分の光子) と比べて精度を順位づけしたと書かれています。
一方で海の元データについては、GEBCO のように測深を寄せ集めたものは精度を独立に測るのが難しく、解像度、質、古さで主観的に順位づけしたとあります。
利用者ガイドは、最終的な鉛直精度の評価は「まだ集計中で、改訂版で公開する」としていますが、2026-10-06 時点のガイドは 2022-10-13 の Rev 1.2 のままです。

作り方から来る限界があります。

- 地表は bare-earth (植生と建物を除いた地面) を目指しています。木の高さや建物の高さは入っていません。
- 15 秒の 1 画素は約 460m 四方の平均的な値なので、山頂や海溝の底は実際より低く (浅く) なります。富士山 (3,776m) は最大でも 3,681.4m でした。
- 海の大部分は GEBCO 2022 そのものです。測深の無い海域は GEBCO と同じく、衛星重力からの推定や内挿で埋められています。

## 内容

1 つの格子に 1 つのバンドです。
配布物は 5 種類の面 (ファイル名の接尾辞) に分かれています。

| 接尾辞 | 中身 | 型と欠損値 | 15 秒の枚数 | 30 秒と 60 秒 |
| ------ | ---- | ---------- | ----------: | ------------- |
| `_surface` | ice surface。氷床の上面を含む地表の標高と、海底と湖底の水深 | float32、NoData -99999 | 288 | 全球 1 枚 |
| `_bed` | bedrock。氷床の下の岩盤 (氷床の無い所は surface と同じ値) | float32、NoData -99999 | 62 | 全球 1 枚 |
| `_surface_sid` | 各画素の値をどの元データ (layer source id 1 から 13) から取ったか | Byte、NoData 0 | 288 | なし |
| `_bed_sid` | bed の各画素の元データ | Byte、NoData 0 | 62 | なし |
| `_geoid` | EGM2008 ジオイド高 (WGS84 楕円体からの高さ) | float32 | 288 | 全球 1 枚 |

- 値はメートルで、上向きが正です。陸は正、海底は負です。
- 欠損値は -99999 ですが、利用者ガイドは「この値はどの格子にも入っていない」と書いています。日本を含むタイル (`N45E135`) では有効な画素が 100% でした。
- 15 秒タイルは 3600 x 3600 画素、30 秒全球は 43200 x 21600 画素、60 秒全球は 21600 x 10800 画素です。
- 画素は面 (AREA_OR_POINT=Area、node_offset=1) で、セルの境界が 15 秒の格子線に一致します。
- 30 秒と 60 秒は 15 秒から縮小したもので、sid はありません。
- bed の 62 枚は北緯 90 度帯 8 枚、75 度帯 5 枚、60 度帯 3 枚と、南緯 60 度帯 22 枚、75 度帯 24 枚で、グリーンランドと南極だけです。

日本を含む 15 秒タイル (`ETOPO_2022_v1_15s_N45E135`、北緯 30 から 45 度、東経 135 から 150 度) の sid を数えると、GEBCO 2022 (1) が 9,201,512 画素、GMRT (5) が 2,068,036 画素、FABDEM (10) が 1,690,389 画素、Copernicus DEM (9) が 63 画素でした。
このタイルの陸 (値が正の画素、約 13%) は、ほぼ FABDEM から来ています。
値の範囲は -9,842m から 3,681.4m でした。

## 取り出し方

区分は split で、1 枚の中は range です。

15 秒は 15 度四方のタイルに事前に分割されています。
ファイル名は `ETOPO_2022_v1_15s_N45E135_surface.tif` のように、北西 (左上) の角の緯度と経度です。
`N45E135` は北緯 45 度から 30 度、東経 135 度から 150 度を覆います。
surface の 288 枚は緯度 12 帯 x 経度 24 列で全球を覆います。

GeoTIFF は HEAD に `accept-ranges: bytes` を返し、`Range: bytes=0-1023` の要求に 206 で 1,024 バイトを返しました。
先頭はリトルエンディアンの TIFF (`II*`) で、最初の IFD がファイルの先頭 (オフセット 8) にあります。
GeoTIFF は 256 x 256 画素の内部タイルに分かれているので、[[GDAL]] の `/vsicurl/` で必要な窓だけを読めます。
60 秒全球 1 枚 (約 466MB) からベンガル湾 (東経 80 から 100 度、北緯 5 から 24 度、1200 x 1140 画素) を切り出すと、HTTP の要求は 12 回で、約 6.7 秒で終わりました。
ただしオーバービューは入っておらず、[[Cloud Optimized GeoTIFF]] とは名乗っていません。
広い範囲を粗く見たいときは、15 秒から自分で縮小するより、30 秒か 60 秒の全球 1 枚を窓読みするほうが向いています。

netCDF は THREDDS サーバーで配られています (例えば 15 秒 surface の目録は 288 件)。
HTTPServer (`/thredds/fileServer/`) は Range に 206 を返し、OPeNDAP (`/thredds/dodsC/`) は変数 `z` を添字で切り出せます。
netCDF の `lat` は南から北へ増える順で、GeoTIFF の行の向き (北から南) と逆です。

このほかに、説明ページから Grid Extract という対話的な地図で範囲を選んで取得する画面があります。
画面の裏の API は呼んでいないので、確かめていません。

認証は要りません。

## 使いどころ

- 防災、特に津波: 利用者ガイドは、主な利用者を沿岸の災害と津波のモデルを作る人としています。陸と海が同じ格子と同じ鉛直基準にあるので、海岸線をまたぐ計算 (遡上の粗い見積もりなど) の土台にできます (仙台防災枠組、SDGs 目標 11 のターゲット 11.5 と目標 13 のターゲット 13.1)。
- 海洋 (SDGs 目標 14): 海底地形の概観、海山や海溝、大陸棚の範囲の把握に使えます。
- 人道支援と国際平和: 国境をまたぐ全球の地形を 1 つのライセンスで扱えるので、国連機関の地図の背景 (陰影起伏) や、標高帯ごとの人口の集計に使えます。
- 気候と雪氷: bed 版で、氷床の厚さ (surface と bed の差) を粗く見積もれます。

使ってはいけない使い方もあります。

- 航海に使わないでください。ISO メタデータは「Not to be used for navigation」と明記しています。
- 15 秒 (約 460m) より細かい地形の判断、例えば建物単位の浸水や、斜面単位の土砂災害の判定には粗すぎます。陸の細かい標高は [[NASA SRTM 標高]] や Copernicus DEM を使います。
- 測深の無い海域の水深は推定です。その値を測った水深として扱わないでください (sid が GEBCO の画素は、GEBCO の TID 格子を見ないと測深か推定か分かりません)。

## ライセンスと帰属表示

NOAA は ETOPO 2022 を [[CC0]] 1.0 で権利放棄しています。
根拠は NCEI が公開している ISO メタデータ (https://data.noaa.gov/waf/NOAA/NESDIS/NGDC/MGG/DEM/iso/xml/etopo_2022.xml) の `otherConstraints` です。

> These data were produced by NOAA and are not subject to copyright protection in the United States. NOAA waives any potential copyright and related rights in these data worldwide through the Creative Commons Zero 1.0 Universal Public Domain Dedication (CC0-1.0).

> SPDX License: Creative Commons Zero v1.0 Universal (CC0-1.0)

米国内で著作権の対象にならないだけでなく、米国外を含む世界に対して権利を放棄しています。
利用者ガイドも「freely available to use for all private, academic, or commercial purposes」と書いています。

表示は義務ではありませんが、同じメタデータが次の引用を求めています。

> Cite as:NOAA National Centers for Environmental Information. 2022: ETOPO 2022 15 Arc-Second Global Relief Model. NOAA National Centers for Environmental Information. https://doi.org/10.25921/fd45-gt74 . Accessed [date].

元データの条件には注意が要ります。
NOAA の CC0 は NOAA が持ちうる権利の放棄で、元データの提供者が付けた条件まで消すものかどうかは、メタデータからは読み取れません。
ISO メタデータには GEBCO の名前が 1 度も出てきません (元データとの対応は利用者ガイドを読んで初めて分かります)。

- GEBCO の利用条件 (https://www.gebco.net/data-products/gridded-bathymetry/terms-of-use) は、GEBCO Grid とそこから派生した情報製品について「public domain」としつつ、「Users must: Acknowledge the source of The GEBCO Grid.」と出典の表示を求めています。ETOPO の海の大部分は GEBCO 2022 なので、GEBCO の表示も併記するのが安全です (これは推奨で、NOAA の要請ではありません)。
- 陸の大部分を占める FABDEM と Copernicus DEM の利用条件は、2026-10-06 には確かめていません (FABDEM の配布元ページは 2 回とも応答がありませんでした)。

表示の例です。

- NOAA National Centers for Environmental Information (2022). ETOPO 2022 15 Arc-Second Global Relief Model. https://doi.org/10.25921/fd45-gt74
- (海の水深を使うとき) GEBCO Compilation Group (2022) GEBCO 2022 Grid

## 気をつけること

- 鉛直基準は EGM2008 ジオイド高 (EPSG:3855) で、平均海面のおおよその近似です。GeoTIFF の座標系は `WGS 84 + EGM2008 height` (EPSG:9518) の複合座標系として読めます。WGS84 楕円体高 (GNSS の高さなど) にするには、`_geoid` タイルの値を足します (利用者ガイドの式: ETOPO Elevation (EGM2008) + GEOID = WGS84 Elevation)。
- ice surface と bedrock を取り違えないでください。氷床の無い所では同じ値ですが、グリーンランドと南極では氷の厚さの分だけ違います。15 秒の bed は 62 枚しかなく、全球 1 枚の 15 秒 bed は配られていません。
- ファイル名の緯度は北の端 (上端) です。`N45E135` を北緯 45 度から始まると思い込むと、1 段ずれます。
- 欠損値 -99999 は float32 です。整数に変換すると、深い海の値と区別しにくくなります。
- netCDF の `lat` は昇順 (南から北) です。GeoTIFF と同じ行番号で読むと上下が逆になります。
- THREDDS の目録の説明文 (documentation) は、ETOPO 2022 の目録なのに ETOPO1 の説明と引用文献のままです。引用には ISO メタデータの「Cite as」を使います。
- 海の値は GEBCO 2022 の時点のものです。GEBCO はその後も毎年新しい格子を出しています (2026-10-06 時点の最新は GEBCO_2026 Grid)。新しい測深を反映した海底地形が要るときは [[GEBCO Grid 海底地形]] を使います。
- 前の版の ETOPO1 (1 分、2009 年) も同じ説明ページから配られています。ファイル名と解像度で区別します。

[[GEBCO Grid 海底地形]] との違いを、2026-10-06 に確かめられた範囲でまとめます。

| | ETOPO 2022 | GEBCO Grid |
| --- | --- | --- |
| 作る組織 | NOAA NCEI | GEBCO (IHO と IOC の合同事業) |
| 最新版 | ETOPO 2022 (2022-10 から更新なし) | GEBCO_2026 Grid (毎年、例年 7 月に更新) |
| 海の水深 | GEBCO 2022 を土台に、GMRT や NOAA の沿岸 DEM などで一部を置き換え | GEBCO 自身の編集 |
| 陸の標高 | Copernicus DEM と FABDEM (bare-earth) | 確かめていません |
| 鉛直基準 | EGM2008 (ジオイド高の格子も配布) | 平均海面を前提に編集 (浅い海では別の基準のデータが混ざると GEBCO 自身が注記) |
| 解像度 | 15 秒、30 秒、60 秒 | 15 秒 |
| 分割と形式 | 15 度四方の GeoTIFF と netCDF、30 秒と 60 秒は全球 1 枚 | 全球 1 ファイルの netCDF、または 90 度四方の 8 タイル (GeoTIFF、Esri ASCII)、zip で配布 |
| 元データの種別 | 元データの名前の格子 (sid) | 元データの種類の格子 (TID) |
| ライセンス | CC0 1.0 | public domain、ただし出典の表示が必須 |

## データ処理コマンド

以下はすべて 2026-10-06 に実際に動かしたものです。

```bash
# 大きさと Range 対応を確かめる (日本を含む 15 秒タイル)
curl -sI https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/15s/15s_surface_elev_gtif/ETOPO_2022_v1_15s_N45E135_surface.tif

# ダウンロードせずに構造を読む
export GDAL_DISABLE_READDIR_ON_OPEN=EMPTY_DIR
gdalinfo /vsicurl/https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/15s/15s_surface_elev_gtif/ETOPO_2022_v1_15s_N45E135_surface.tif

# 15 秒タイルから東京湾の周りだけを切り出す (96 x 144 画素)
mkdir -p ./tmp
gdal_translate -projwin 139.6 35.8 140.0 35.2 \
  /vsicurl/https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/15s/15s_surface_elev_gtif/ETOPO_2022_v1_15s_N45E135_surface.tif \
  ./tmp/tokyobay.tif
gdalinfo -stats ./tmp/tokyobay.tif

# 60 秒の全球 1 枚からベンガル湾だけを窓読みする (1200 x 1140 画素)
gdal_translate -projwin 80 24 100 5 \
  /vsicurl/https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/60s/60s_surface_elev_gtif/ETOPO_2022_v1_60s_N90W180_surface.tif \
  ./tmp/bengal.tif

# netCDF を OPeNDAP で 3 x 3 画素だけ取る (富士山の山頂付近、lat は南から数える)
curl -sg "https://www.ngdc.noaa.gov/thredds/dodsC/global/ETOPO2022/15s/15s_surface_elev_netcdf/ETOPO_2022_v1_15s_N45E135_surface.nc.ascii?z[1286:1288][894:896]"

# 元データの番号 (sid) の画素数を数える (sid タイルは約 150KB)
curl -s -o ./tmp/sid.tif https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/15s/15s_surface_sid_gtif/ETOPO_2022_v1_15s_N45E135_surface_sid.tif
python3 -c "
from osgeo import gdal; import numpy as np
gdal.UseExceptions()
a = gdal.Open('./tmp/sid.tif').ReadAsArray()
print(dict(zip(*[x.tolist() for x in np.unique(a, return_counts=True)])))
"
```

## 関連項目

- [[GEBCO Grid 海底地形]]
- [[GEBCO]]
- [[NASA SRTM 標高]]
- [[NASA Blue Marble]]
- [[Natural Earth Coastline Data]]
- [[SmartMaps Global Elevation Tiles]]
- [[Copernicus DEM]]
- [[FABDEM]]
- [[NOAA]]
- [[NCEI]]
- [[DEM]]
- [[GeoTIFF]]
- [[netCDF]]
- [[Cloud Optimized GeoTIFF]]
- [[GDAL]]
- [[gdalinfo]]
- [[gdal_translate]]
- [[CC0]]
- [[津波]]

## 確認日

2026-10-06 に次のことを確かめました。

- 配布ディレクトリの一覧 (https://www.ngdc.noaa.gov/mgg/global/relief/ETOPO2022/data/) を読み、5 種類の面と解像度ごとのファイル数を数えました。
- 30 秒と 60 秒の全球ファイル 6 枚と、15 秒タイル 1 枚に HEAD を送り、大きさと `accept-ranges: bytes` を確かめました。15 秒タイルの全体の大きさは、一覧の丸めた表示値を足した概算です。
- `gdalinfo` と `/vsicurl/` で、15 秒タイル (surface、bed、sid) と 30 秒、60 秒の全球ファイルの構造を読みました。日本を含むタイルは全体を読んで統計を取りました (約 18MB)。
- THREDDS の目録 (catalog.xml) で netCDF の件数と大きさを、OPeNDAP の DDS と DAS で変数と属性を読み、3 x 3 画素を取りました。netCDF の HTTPServer に Range 要求を送り、206 と HDF5 の先頭のバイト列を確かめました。
- NCEI の ISO メタデータでライセンスと引用と時間範囲を、利用者ガイド (Rev 1.2) で元データの表と命名規則を読みました。
- GEBCO の格子のページと利用条件のページを読みました。

確かめられなかったことです。

- FABDEM と Copernicus DEM の利用条件 (FABDEM の配布元ページは 2 回とも応答がありませんでした)。
- GEBCO Grid の陸の部分の元データ。
- Grid Extract の画面で取得できる形式と範囲の上限。
- 30 秒と 60 秒の netCDF の中身 (目録の大きさだけ見ました)。
- 鉛直精度の数値 (利用者ガイドは未公表としています)。
