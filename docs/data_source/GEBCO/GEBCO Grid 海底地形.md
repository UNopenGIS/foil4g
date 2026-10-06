---
id: gebco_grid
provider: GEBCO (General Bathymetric Chart of the Oceans、国際水路機関 と ユネスコ政府間海洋学委員会 の共同プロジェクト)。作成は Nippon Foundation-GEBCO Seabed 2030 の Global Center (英国の British Oceanographic Data Centre)、配布は英国 NERC の CEDA
source_data: 複数の格子を合成した派生物。土台は SRTM15+ V2.8 (おおむね南緯 50 度から北緯 60 度)。その上に Seabed 2030 の 4 つの地域センターがまとめた格子 (主にマルチビーム測深) を重ねる。極域の陸と氷は BedMachine Greenland v6 と BedMachine Antarctica v3、北極海は IBCAO 5.2、南大洋は IBCSO (いずれも GEBCO_2026 の場合)
license: [public-domain]
license_note: public domain (GEBCO の Terms of use。ただし出典表示などの義務つき)。CEDA の配布ディレクトリは Open Government Licence v3.0 と書く。詳しくは下の節
access: range
access_note: range。GeoTIFF は 90 度 x 90 度の 8 枚に分かれ (split)、各枚は無圧縮で 1 行 1 ストリップなので HTTP Range (206 を確認) で必要な行だけ読める。全球 netCDF は CEDA の OPeNDAP で格子の添字を指定して切り出せる
format: netCDF 4 (CF-1.6、全球 1 ファイル)、GeoTIFF (8 枚)、Esri ASCII raster (8 枚)。それぞれ zip のまとめもある
coverage: 全球 (緯度 -90 から 90、経度 -180 から 180)。陸も含む
period: 年ごとの版 (スナップショット)。最新は GEBCO_2026 (2026 年 4 月公開)。時系列ではない
resolution: 15 秒 (1/240 度、赤道で約 460m)、43,200 行 x 86,400 列。値は 16bit 符号付き整数のメートル (海は負、陸は正)、格子の中心の値
size: 'GEBCO_2026 の氷の表面の版: netCDF 7,466,018,396 バイト、GeoTIFF 1 枚 約 933MB (933,257,450 バイトなど)、GeoTIFF 8 枚の zip 4,241,629,269 バイト。TID Grid の netCDF 3,733,523,740 バイト'
update: 年 1 回 (GEBCO は「generally in July」と書くが、GEBCO_2026 は 4 月公開)
url: https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/
docs: https://www.gebco.net/data-products/gridded-bathymetry-data
checked: 2026-10-06
details:
  文書: https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/GEBCO_Grid_docmentation.pdf
  DOI: https://doi.org/10.5285/4f68d5c7-45eb-f999-e063-7086abc036fa (GEBCO_2026)
---

# GEBCO Grid 海底地形

> [[GEBCO]] (国際水路機関 IHO とユネスコ政府間海洋学委員会 IOC の共同プロジェクト) が、全球の海底地形と陸の標高を 15 秒間隔の 1 枚の格子にまとめ、毎年の版として netCDF、GeoTIFF、Esri ASCII で無料で配っている地形モデル

## 概要

GEBCO Grid は、海の深さ (水深) と陸の高さ (標高) を 1 枚の連続した格子にした、全球の地形モデルです。
GEBCO は海底地形図をつくる専門家の国際的なグループで、[[国際水路機関]] (IHO) と [[ユネスコ政府間海洋学委員会]] (IOC) の共同の枠組み (joint auspices) で動いています。
2019 年以降の格子は、日本財団と GEBCO の共同プロジェクトである [[Nippon Foundation-GEBCO Seabed 2030]] (以下 Seabed 2030) の 5 つのセンターが作っています。

作り方は、配布されている文書 (GEBCO_Grid_docmentation.pdf) によると次のとおりです。

- 土台は SRTM15+ V2.8 です。これは陸の地形と、測った海底地形と、衛星重力から推定した海底地形を合わせたデータです。
- V2.8 は SWOT 衛星の重力場データと機械学習による水深モデルを使っている、と文書は書いています。
- その上に、4 つの地域センター (南大洋、太平洋、大西洋とインド洋、北極海と北太平洋) がまとめた格子を「remove-restore」という方法で溶け込ませます。地域の格子は主にマルチビーム測深から作られています。
- 極域は、地域センターが極座標で作った格子を丸ごと重ねます。
- グリーンランドと南極の氷の表面と氷の下の地形は BedMachine から取っています。
- 北緯 60 度より北の陸は BedMachine Greenland、スバールバルの地形モデル、GMTED2010 などから取っています。

作り方の限界も、配布元がはっきり書いています。

- 実際に測った場所は海底の一部です。Seabed 2030 のサイトは「28.7% of the ocean floor now mapped」としています (2026-10-06 時点の表示)。残りは衛星重力からの推定や内挿です。
- 格子は 15 秒ですが、元の測深の細かさとは一致しません。測深の無い所の 15 秒は推定値を細かく並べたものにすぎません。
- 鉛直の基準は平均海面とみなしていますが、浅い海の一部には別の基準のデータが混ざっていると文書は書いています。

## 内容

GEBCO_2026 の配布ディレクトリには 3 種類の格子があります。

| 格子 | ディレクトリ | 値 |
| --- | --- | --- |
| 氷の表面の版 (標準) | `ice_surface_elevation/` | 標高と水深 (m)。グリーンランドと南極は氷の表面の高さ |
| 氷の下の版 | `sub_ice_topography_bathymetry/` | グリーンランドと南極だけ、氷の下の岩盤や海底の高さに置き換えたもの |
| TID Grid (Type Identifier) | `type_identifier_grid/` | 各格子の値が、どの種類の元データに基づくかの符号 |

標高の格子 (GeoTIFF と netCDF で確かめた値)。

- 変数名 `elevation`、16bit 符号付き整数、単位 m、`standard_name` は `height_above_mean_sea_level`。
- 海の深さは負、陸の高さは正です。
- 欠損値 (`_FillValue`、NoData) は -32767 です。
- 座標系は WGS 84 の経緯度 (EPSG:4326)。値は格子の中心の値です (pixel-centre registered)。
- 全球は 43,200 x 86,400 = 3,732,480,000 個の値です。
- メタデータの値の範囲は -10,930m から 8,627m です。

TID Grid の符号 (文書の Table 2 から)。

- 0: 陸
- 10 から 17: 直接の測定。10 シングルビーム、11 マルチビーム、12 地震探査、13 単発の測深、14 電子海図 (ENC) の測深、15 ライダー、16 光学センサー、17 複数の直接測定の組み合わせ
- 40 から 48: 間接の推定。40 衛星重力から予測、41 計算機による内挿、42 海図の等深線、43 ENC の等深線、44 測定と推定を合わせた既存の格子、45 航空機やヘリコプターの重力から予測、46 座礁した氷山の喫水から推定、47 着底した Argo フロートから推定、48 動物に付けた記録計による測定
- 70 から 72: 不明。70 混合元の既製の格子、71 出所不明、72 データの少ない所で格子を抑えるための制御点

TID Grid は netCDF では 1 バイトの整数、GeoTIFF では 8bit 符号付き整数で、GeoTIFF の NoData は 127 です。

このほか、北極海 (IBCAO、EPSG:3996) と南大洋 (IBCSO、EPSG:9354、500m 間隔) の極ステレオ投影の格子が、GEBCO のサイトで別に案内されています。
一部の海域には、測深のある格子だけを 100m から 400m で埋めた試験版の多重解像度格子もあります (TID Grid は無い)。
これらはこのカードでは扱いません。

## 取り出し方

区分は range です。
全球の 1 ファイルを丸ごと取らなくても、必要な範囲だけを読めます。

- GeoTIFF は 90 度 x 90 度の 8 枚に分かれています。ファイル名に範囲が入っています (例: `gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif` が東経 90 度から 180 度、北緯 0 度から 90 度で、日本を含む)。
- 1 枚は 21,600 x 21,600 画素、無圧縮、1 行 1 ストリップ (Block=21600x1) です。タイル化もオーバービューも無いので COG ではありません。
- ただしストリップの位置の表がファイルの先頭 (オフセット 43,430 から) にあるので、GDAL の `/vsicurl/` で必要な行だけを HTTP Range で読めます。`Range: bytes=0-65535` に HTTP 206 が返ることを確かめました。
- 東京湾付近 (経度 139.5 から 140.3、緯度 34.9 から 35.8) を `gdal_translate -projwin` で切り出すと、192 x 216 画素、約 90KB のファイルになりました。ただし行ごとに要求が出るため、約 1 分かかりました。
- 全球の netCDF (7.5GB) にも Range は効きます (HTTP 206、先頭は HDF5 のマジック)。ただし内部の索引を辿る必要があるので、部分読みには OPeNDAP のほうが向いています。
- CEDA の OPeNDAP (`https://dap.ceda.ac.uk/thredds/dodsC/bodc/gebco/global/gebco_2026/...`) は、配列の添字で範囲を指定して値だけを返します。TID Grid の netCDF にも同じように使えます。
- GEBCO のサイトには、範囲を指定してダウンロードする画面 (https://download.gebco.net) もあります。この画面の内部の API は呼んでいません。

認証は要りません。
CEDA の `00README_catalogue_and_licence.txt` は「Public data: access to these data is available to both registered and non-registered users.」と書いています。

## 使いどころ

- SDG 14 (海の豊かさを守ろう) の基盤データとして。Seabed 2030 は自らの使命を「actively supports UN Sustainable Development Goal 14 (SDG14)」と説明し、2021 年に国連海洋科学の 10 年 (2021-2030) の flagship programme に認められたと書いています。ターゲットの番号までは配布元は挙げていません。
このカードの見立てとしては、海洋保護区の検討 (ターゲット 14.5) や、海洋に関する科学的知識の増進 (ターゲット 14.a) の下地になる地形として使えます。
- 防災: 津波の伝わり方の計算や、高潮の計算の海底地形の入力として。ただし沿岸の浅い所は 15 秒 (約 460m) では粗く、各国の詳しい測量データが要ります。
- 人道支援: 島しょ国や沿岸の被災地の地図で、陸の標高と海の深さを 1 枚で示す背景として。
- 国際平和と海洋の境界: 大陸棚や海山などの海底地形の概観として。ただし公式の地位を示すような使い方は利用条件で禁じられています (下の節)。
- TID Grid を重ねると、どこが実測でどこが推定かが見えます。調査船の航路計画や、測深の空白域の把握に使えます。

使ってはいけない使い方もあります。

- 航海に使ってはいけません。利用条件は「The GEBCO Grid should NOT be used for navigation or for any other purpose involving safety at sea.」と書いています。
- 測深の無い所の値を、実測の水深として扱ってはいけません。TID Grid で 40 番台や 70 番台の所は推定です。
- 15 秒の格子から、それより細かい地形 (港の中の水深など) を読み取ってはいけません。

## ライセンスと帰属表示

GEBCO の Terms of use (https://www.gebco.net/data-products/gridded-bathymetry/terms-of-use、配布ファイルに同梱の GEBCO_Grid_terms_of_use.pdf と同じ文言) は次のとおりです。

> The GEBCO Grid is placed in the public domain and may be used free of charge.
> Use of the GEBCO Grid indicates that the user accepts the conditions of use and disclaimer information given below.

自由にしてよいこととして、複製、公開、配布、改変、商用利用 (「Commercially exploit The GEBCO Grid, by, for example, combining it with other information, or by including it in their own product or application」) が挙げられています。

一方で、利用者の義務も書かれています。

> Users must:
> Acknowledge the source of The GEBCO Grid. A suitable form of attribution is given in the documentation that accompanies The GEBCO Grid.
> Not use The GEBCO Grid in a way that suggests any official status or that GEBCO, or the IHO or IOC, endorses any particular application of The GEBCO Grid.
> Not mislead others or misrepresent The GEBCO Grid or its source.

つまり「public domain」と書かれていても、出典の表示と、公式の地位や推奨を装わないことが求められています。
表示が要らない CC0 のようなものと考えてはいけません。

GEBCO のサイトが示す GEBCO_2026 の表示文は次のとおりです。

> GEBCO Bathymetric Compilation Group 2026 (2026). The GEBCO_2026 Grid - a continuous terrain model for oceans and land at 15 arc-second intervals. doi:10.5285/4f68d5c7-45eb-f999-e063-7086abc036fa

配布の文書 (6.0 Data set attribution) には、短い形も書かれています。

> GEBCO Compilation Group (2026) GEBCO 2026 Grid (doi: 10.5285/4f68d5c7-45eb-f999-e063-7086abc036fa)

古い版を使うときは、その版の表示文を使います (例: GEBCO_2025 は doi:10.5285/37c52e96-24ea-67ce-e063-7086abc05f29、GEBCO_2024 は doi:10.5285/1c44ce99-0a0d-5f4f-e063-7086abc0ea0f)。

配布元の CEDA は、同じディレクトリの `00README_catalogue_and_licence.txt` で別の言い方をしています。

> Use of these data is covered by the following licence(s):
> http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
> When using these data you must cite them correctly using the citation given on the catalogue record.

英国の [[Open Government Licence v3.0]] も出典の表示を求めるライセンスです。
どちらの文言に従っても、出典の表示は必要です。

GEBCO は、配っている格子は元の測深データを内挿して作った「information product」であり、元の測深データは配っていないと書いています。
元データ (SRTM15+、BedMachine など) ごとの条件が別に付くかどうかについて、GEBCO の利用条件は触れていません。

## 気をつけること

- 版で値が変わります。同じ格子 (北緯約 36.002 度、東経約 144.002 度、日本海溝の沖) を OPeNDAP で読むと、GEBCO_2024 は -5,731m、GEBCO_2025 は -5,721m、GEBCO_2026 は -5,752m でした。使った版と DOI を必ず記録します。
- GEBCO_2026 には既知の誤りがあります。GEBCO の errata のページは、北太平洋 (北緯 10 度から 64 度) で GEBCO_2025 と GEBCO_2026 の間に水深のずれが見つかり、元データの一つの処理の問題で、将来の版で直す予定だと書いています。日本の周りもこの緯度に入ります。
- 五大湖の付近では、元データの鉛直基準の違いによる段差が報告されています。
- CEDA には `gebco_2014` から `gebco_2026` まで 9 つの版のディレクトリがあります (2015 年から 2018 年は無い)。版によってファイル名が違います (2024 は `GEBCO_2024_CF.nc`、2025 は `GEBCO_2025.nc`、2026 は `GEBCO_2026.nc`)。
- 文書のファイル名は GEBCO_2026 では `GEBCO_Grid_docmentation.pdf` (綴りが documentation でない) です。
- 「氷の表面の版」と「氷の下の版」を取り違えないでください。違うのはグリーンランドと南極だけです。
- 鉛直の基準は平均海面とみなされていますが、浅い所に別の基準のデータが混ざります。潮位や海図の基準面 (最低水面など) とは一致しません。
- GeoTIFF は 1 枚 933MB、8 枚で約 7.4GB あり、netCDF と大きさはほとんど変わりません。無圧縮だからです。
- 地理座標の格子なので、高緯度ほど 1 画素の東西の幅が狭くなります。面積や傾斜を計算するときは投影し直します。
- [[NOAA ETOPO 2022]] や [[NASA SRTM 標高]] など、似た全球の標高と水深のデータがあります。GEBCO は海の部分に Seabed 2030 の測深を取り込んでいる点が違います。NASA Blue Marble の陰影に使われている「GEBCO」は 2003 年の古い格子で、このカードの GEBCO Grid とは別物です。

## データ処理コマンド

次のコマンドは 2026-10-06 に GDAL 3.9.2 と curl で実際に動かしました。

```bash
# 大きさと更新日を確かめる (日本を含む 1 枚)
curl -sIL https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/ice_surface_elevation/geotiff/gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif

# Range 要求に 206 が返るか確かめる
curl -s -r 0-65535 -o /dev/null -w "%{http_code} %{size_download}\n" \
  https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/ice_surface_elevation/geotiff/gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif

# ダウンロードせずにヘッダとメタデータを読む
gdalinfo /vsicurl/https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/ice_surface_elevation/geotiff/gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif

# 1 点の値を読む (経度 144.0、緯度 36.0)。標高と TID
gdallocationinfo -wgs84 -valonly /vsicurl/https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/ice_surface_elevation/geotiff/gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif 144.0 36.0
gdallocationinfo -wgs84 -valonly /vsicurl/https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/type_identifier_grid/geotiff/gebco_2026_tid_n90.0_s0.0_w90.0_e180.0_geotiff.tif 144.0 36.0

# 範囲を切り出す (東京湾付近。必要な行だけを Range で読む。約 1 分)
mkdir -p ./tmp
gdal_translate -projwin 139.5 35.8 140.3 34.9 \
  /vsicurl/https://dap.ceda.ac.uk/bodc/gebco/global/gebco_2026/ice_surface_elevation/geotiff/gebco_2026_n90.0_s0.0_w90.0_e180.0_geotiff.tif \
  ./tmp/tokyo_bay.tif
gdalinfo -stats ./tmp/tokyo_bay.tif

# OPeNDAP で全球 netCDF の構造を見る
curl -s "https://dap.ceda.ac.uk/thredds/dodsC/bodc/gebco/global/gebco_2026/ice_surface_elevation/netcdf/GEBCO_2026.nc.dds"

# OPeNDAP で添字を指定して値を読む (緯度の添字 = (緯度 + 90) x 240、経度の添字 = (経度 + 180) x 240)
curl -s "https://dap.ceda.ac.uk/thredds/dodsC/bodc/gebco/global/gebco_2026/ice_surface_elevation/netcdf/GEBCO_2026.nc.ascii?elevation%5B30240:1:30241%5D%5B77760:1:77761%5D"
```

1 点の値は、標高が -5752、TID が 11 (マルチビーム) でした。
東京湾付近の切り出しは 192 x 216 画素で、最小 -2,389m、最大 362m でした。

## 関連項目

- [[GEBCO]]
- [[Nippon Foundation-GEBCO Seabed 2030]]
- [[国際水路機関]]
- [[ユネスコ政府間海洋学委員会]]
- [[British Oceanographic Data Centre]]
- [[CEDA]]
- [[SRTM15+]]
- [[IBCAO]]
- [[IBCSO]]
- [[NOAA ETOPO 2022]]
- [[NASA SRTM 標高]]
- [[NASA Blue Marble]]
- [[Natural Earth Coastline Data]]
- [[SmartMaps Global Elevation Tiles]]
- [[Open Government Licence v3.0]]
- [[SDG 14]]
- [[海底地形]]
- [[GeoTIFF]]
- [[netCDF]]
- [[OPeNDAP]]
- [[GDAL]]

## 確認日

2026-10-06 に次のことを確かめました。

- CEDA の配布ディレクトリの一覧を読み、版 (2014、2019 から 2026) と GEBCO_2026 のファイル構成を確かめました。
- 各ファイルの大きさと更新日 (2026-04-22) を HEAD で確かめました。
- 日本を含む GeoTIFF 1 枚 (標高と TID) の先頭 64KB を Range で読み、HTTP 206 と TIFF のタグ (無圧縮、1 行 1 ストリップ、標高は 16bit 符号付き、TID は 8bit 符号付きで NoData 127) を確かめました。
- `gdalinfo /vsicurl/` でメタデータを読み、`gdal_translate` で範囲の切り出し、`gdallocationinfo` で 1 点の値を確かめました。
- 全球 netCDF の先頭を Range で読み (HTTP 206、HDF5)、CEDA の OPeNDAP で GEBCO_2024、2025、2026 の同じ格子の値を読みました。
- 配布の文書 (GEBCO_Grid_docmentation.pdf) と利用条件 (GEBCO_Grid_terms_of_use.pdf)、CEDA の `00readme.txt` と `00README_catalogue_and_licence.txt` を読みました。
- gebco.net の Gridded Bathymetry Data、Terms of use、errata、Seabed 2030 のページ、seabed2030.org のトップと Our Mission、About のページを読みました。

確かめられなかったこと。

- 範囲を指定してダウンロードする画面 (download.gebco.net) は、ページが開くことだけを確かめ、内部の API は使っていません。
- 全球 netCDF と Esri ASCII は、大きさと先頭だけを確かめ、全体は取得していません。
- 元データ (SRTM15+、BedMachine など) ごとの利用条件が GEBCO Grid に及ぶかどうかは確かめていません。
- 極ステレオ投影の格子 (IBCAO、IBCSO) と多重解像度の試験版の中身は確かめていません。
