# NASA SRTM 標高

> [[NASA]] が 2000 年 2 月のスペースシャトルのレーダー観測 (SRTM) から作った、北緯 60 度から南緯 56 度の陸地の標高データ (SRTM v3 と、処理し直した [[NASADEM]]) で、1 度四方のタイルに分けて [[LP DAAC]] (要ログイン)、[[OpenTopography]] と [[Microsoft Planetary Computer]] (ログイン不要) から配られているもの

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | nasa_srtm |
| 提供元           | [[NASA]] ([[Jet Propulsion Laboratory]] の SRTM プロジェクト)。配布は [[LP DAAC]]。複製の配布に [[OpenTopography]] と [[Microsoft Planetary Computer]] |
| 元データ         | なし (一次データ)。ただし SRTM v3 の欠測は ASTER GDEM v2、GMTED2010、NED で、NASADEM の欠測は ASTER GDEM と ALOS AW3D30 などで埋めてある |
| ライセンス       | NASA の一般方針で [[CC0]] (個別ページは「openly shared, without restriction」)。CGIAR-CSI 版は別条件で再配布不可 |
| 取り出し方       | split。1 度四方のタイルに分かれ、ファイル名 (南西隅の緯度経度) か、Planetary Computer の [[STAC]] の bbox 検索でタイルを選ぶ。OpenTopography と Planetary Computer の GeoTIFF は Range に 206 を返すので、タイルの中も range で部分読みできる |
| データ形式       | LP DAAC は HGT (16 bit 整数、big-endian) の zip。OpenTopography は [[GeoTIFF]] (DEFLATE、512 x 512 の内部タイル)。Planetary Computer は [[Cloud Optimized GeoTIFF]] |
| 範囲             | 北緯 60 度から南緯 56 度の陸地 (LP DAAC の記載で地球の陸地の約 80%)。NASADEM には北緯 60 度から 61 度の行のタイルもある |
| 期間             | 2000-02-11 から 2000-02-21 の観測 (11 日間) |
| 解像度または単位 | 1 秒 (約 30m、SRTMGL1 と NASADEM) と 3 秒 (約 90m、SRTMGL3)。値は標高 (m、EGM96 ジオイド基準) |
| 大きさ           | OpenTopography の GeoTIFF の合計で、SRTM 1 秒 135,122,864,564 バイト (14,280 枚)、SRTM 3 秒 19,451,183,487 バイト (14,280 枚)、NASADEM 136,059,553,142 バイト (14,520 枚)。東京を含む 1 タイルは SRTM 1 秒 10,623,899 バイト、NASADEM 10,517,920 バイト |
| 更新頻度         | なし。SRTM v3 は 2015-09-02 更新、NASADEM は 2020-02-13 公開のまま |
| URL              | https://opentopography.s3.sdsc.edu/raster/SRTM_GL1/ (SRTM v3 1 秒)、https://opentopography.s3.sdsc.edu/raster/NASADEM/ (NASADEM)、https://planetarycomputer.microsoft.com/api/stac/v1/collections/nasadem (NASADEM の STAC) |
| 説明ページ       | https://lpdaac.usgs.gov/products/srtmgl1v003/ 、https://lpdaac.usgs.gov/products/nasadem_hgtv001/ 、https://portal.opentopography.org/raster?opentopoID=OTSRTM.082015.4326.1 、https://doi.org/10.5069/G93T9FD9 |

## 概要

Shuttle Radar Topography Mission (SRTM) は、2000 年 2 月 11 日に打ち上げられたスペースシャトル Endeavour の STS-99 ミッションで、11 日間レーダー干渉によって地表の高さを測った観測です。
[[NASA]] と米国の NGA が中心になり、OpenTopography のページはほかに「International Agencies」を協力者に挙げています。
同じ観測から何度も作り直された版があり、このカードでは今いちばん使われる 2 つを扱います。

- SRTM v3 (SRTMGL1、SRTMGL3): 以前の版にあった欠測 (void) を埋めることを主な目的にした版です。LP DAAC は「Missing data or voids were filled with ASTER Global Digital Elevation Model (GDEM) Version 2, the Global Multi-resolution Terrain Elevation Data 2010 (GMTED2010), or the National Elevation Dataset (NED)」と書いています。1 秒 (SRTMGL1) と 3 秒 (SRTMGL3) があります。
- NASADEM (NASADEM_HGT v001): SRTM の元のレーダーデータを処理し直した版で、LP DAAC が 2020 年 2 月 13 日に公開しました。ICESat のレーザー高度計の地上基準点で位置と高さを補正し、ジオイド基準に変え、欠測は ASTER GDEM と ALOS PRISM の AW3D30 と補間で埋めた、と LP DAAC は書いています。1 秒だけです。

どちらも 1 回きりの観測から作った「2000 年 2 月の地形」で、その後の地形の変化は入っていません。
レーダーは地表そのものではなく、植生や建物の上面で返った高さも測ってしまうと一般に知られています (今回読んだ配布元の文書では確かめていません)。
そのため森林や市街地では、地面より高い値になっている所があると考えて使ってください。

foil4g の [[SmartMaps Global Elevation Tiles]] は、ズーム 6 から 12 の部分を NASADEM から作っています。
ウェブ地図に地形を出すだけならそちらの PMTiles が使え、値そのものを解析に使うならこのカードの GeoTIFF を使う、という分け方になります。

## 内容

1 タイルは 1 度四方で、1 バンドの標高 (16 bit 符号付き整数、単位 m) です。

| 版 | 1 タイルの画素数 | 画素の大きさ | タイル数 |
|---|---|---|---|
| SRTM v3 1 秒 (SRTMGL1) | 3,601 x 3,601 | 1/3600 度 | LP DAAC 14,297 / OpenTopography 14,280 |
| SRTM v3 3 秒 (SRTMGL3) | 1,201 x 1,201 | 1/1200 度 | LP DAAC 14,297 / OpenTopography 14,280 |
| NASADEM | 3,601 x 3,601 | 1/3600 度 | LP DAAC 14,520 / OpenTopography 14,520 |

- 画素は点 (`AREA_OR_POINT=Point`) として扱われ、四辺の 1 行 1 列が隣のタイルと重なります。そのため 1 秒のタイルは 3,600 ではなく 3,601 画素です。
- ファイル名は南西隅の緯度経度です (SRTM は `N35E139`、NASADEM は `NASADEM_HGT_n35e139`)。北緯 35 度から 36 度、東経 139 度から 140 度のタイルになります。
- 欠測値は -32768 と宣言されています。東京を含む N35E139 では、SRTM 1 秒も NASADEM も -32768 の画素は 0 個でした (どちらも欠測を埋めた版のため)。
- 海は 0 m です。同じタイルで 0 の画素が SRTM 1 秒 3,703,203 個、NASADEM 3,716,317 個 (全 12,967,201 個のうち約 29%) ありました。
- 負の値もあります。同じタイルで最小は SRTM 1 秒 -76 m、NASADEM -86 m でした。
- 同じ観測でも版で値が違います。同じタイルの最大は SRTM 1 秒 1,731 m、NASADEM 1,719 m でした。
- LP DAAC の NASADEM_HGT には、標高のほかに、各画素の元になった場面の数と出どころを示す NUM 層と、水域マスクがあります (記載)。SRTM v3 の出どころは SRTMGL1N などの別製品になっています (記載)。OpenTopography と Planetary Computer の GeoTIFF は標高の 1 バンドだけです。

## 取り出し方

区分は split です。
1 度四方のタイルに事前に分割されていて、欲しい場所のファイル名を緯度経度から組み立てれば、目録を引かずに 1 枚を取れます。
最小単位は 1 タイルで、東京を含むタイルは約 10MB (1 秒) と約 1.5MB (3 秒) です。
陸がわずかしかないタイルは数十 KB です (OpenTopography の最小は SRTM 1 秒 53,914 バイト、NASADEM 47,787 バイト)。

配布の経路ごとに、認証の要否と部分読みの可否が違います。

| 経路 | 版 | ログイン | 2026-10-06 の結果 |
|---|---|---|---|
| OpenTopography の公開バケット `https://opentopography.s3.sdsc.edu/raster/` | SRTM v3 1 秒 (`SRTM_GL1/`)、3 秒 (`SRTM_GL3/`)、NASADEM (`NASADEM/NASADEM_be/`) | 不要 | HEAD 200、`Accept-Ranges: bytes`、Range 0-1023 に 206。S3 互換の一覧も匿名で取れた |
| Planetary Computer の `nasadem` コレクション | NASADEM | 不要。ただし匿名で取れる SAS トークンが要る | トークン無しは 409。トークン付きで Range 0-1023 に 206 |
| LP DAAC (`data.lpdaac.earthdatacloud.nasa.gov`) | SRTMGL1、SRTMGL3、NASADEM_HGT (HGT の zip) | 要 (Earthdata Login) | GET は `urs.earthdata.nasa.gov` へ 302 で飛ばされ 401。ここでは登録していないので中身は確かめていない |
| OpenTopography の Global DEM API (切り出し) | SRTM、NASADEM など | 要 (API キー) | 試していない |

OpenTopography のバケットには、全タイルをまとめた VRT (`SRTM_GL1/SRTM_GL1_srtm.vrt` 6,236,931 バイト、`NASADEM/NASADEM_be.vrt` 6,472,343 バイト) もあります。
[[GDAL]] で VRT を開いて緯度経度の範囲を指定すると、該当するタイルの必要な部分だけを Range で読んで切り出せます。
東京都区部のあたり (経度 139.6 から 139.9、緯度 35.5 から 35.8) を切り出すと 1,080 x 1,080 画素になりました (約 98 秒かかりました)。
3 秒のタイルは `SRTM_GL3/SRTM_GL3_srtm/North/North_30_60/N35E139.tif` のように、南北と緯度帯のフォルダに分かれています。

Planetary Computer は STAC で絞れます。
`https://planetarycomputer.microsoft.com/api/stac/v1/search?collections=nasadem&bbox=139.6,35.6,139.8,35.8` は `NASADEM_HGT_n35e139` の 1 件を返しました。
アセットの href (`https://nasademeuwest.blob.core.windows.net/nasadem-cog/v001/NASADEM_HGT_n35e139.tif`) は、`https://planetarycomputer.microsoft.com/api/sas/v1/token/nasademeuwest/nasadem-cog` から取ったトークンを付けないと読めません。
トークンはアカウント無しで取れ、有効期限は取得から約 45 分でした。
このファイルの先頭 1MiB は OpenTopography の `NASADEM_HGT_n35e139.tif` と同じバイト列で、大きさも同じでした (Planetary Computer の STAC は OpenTopography を processor に挙げています)。

## 使いどころ

標高は多くの分析の土台になる層で、北緯 60 度より南ならほぼどの国でも同じ品質のものが無料で使えます。

- 防災 (SDGs 11.5、13.1、仙台防災枠組): 低地の洗い出し、河川の流域や水の流れる向きの計算、傾斜からの土砂災害の危険箇所の大まかな絞り込み。
- 水 (SDGs 6): 流域界と水系網の作成、貯水池の候補地の検討。
- 人道支援: 避難所や仮設キャンプの候補地を傾斜と低地で絞る、道路が通れそうな経路の検討、無線の中継地点の見通し計算。
- 陸の生態系 (SDGs 15): 山地の範囲を標高と起伏から区分する。
- 地図: 陰影起伏や等高線の作成。ウェブ地図の表示用には [[SmartMaps Global Elevation Tiles]] があります。

使ってはいけない使い方もあります。

- 垂直方向の誤差が数 m あり、値が版で変わる (上の例で最大値が 12 m 違う) ので、数十 cm から 1 m の差を問う浸水深や海面上昇の評価には足りません。
- 2000 年 2 月の地形なので、その後の地すべり、採掘、埋め立て、ダム湖、都市開発は反映されていません。
- 森林や建物の上面を含みうるので、地盤の高さそのものとして扱わないでください。
- 北緯 60 度より北 (北欧、ロシア、カナダ、アラスカの大部分) は SRTM v3 にありません。
- 海は 0 m なので、海底の深さには使えません ([[GEBCO Grid 海底地形]] や [[NOAA ETOPO 2022]] を使います)。

## ライセンスと帰属表示

NASA の Data Use and Citation Guidance (https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/data-use-guidance) は次のように書いています。

> Unless the content is marked with a use restriction or license, data provided from a NASA-led mission are licensed as Creative Commons Zero (CC0). While there are no restrictions on the use of these data, data users are very strongly urged to cite the data used in their work products.

SRTMGL1 と NASADEM の LP DAAC の製品ページには、個別の制限ではなく「This dataset is openly shared, without restriction, in accordance with the EOSDIS Data Use and Citation Guidance」とあります。
NASA の CMR のメタデータも、ライセンスとしてこの方針のページを指しています。
SRTM の個別ページに「CC0」の文字は無く、上の一般方針が当たるという読み方になります。

求められる引用は次のとおりです (LP DAAC の製品ページの記載)。

- NASA JPL (2013). NASA Shuttle Radar Topography Mission Global 1 arc second [Dataset]. NASA Land Processes Distributed Active Archive Center. https://doi.org/10.5067/MEASURES/SRTM/SRTMGL1.003
- NASA JPL (2020). NASADEM Merged DEM Global 1 arc second V001 [Dataset]. NASA Land Processes Distributed Active Archive Center. https://doi.org/10.5067/MEASURES/NASADEM/NASADEM_HGT.001
- 3 秒の DOI は https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL3.003 です。

経路ごとの書き方の違いもあります。

- OpenTopography のページは「Use License : Not Provided」としたうえで、「By accessing data via OpenTopography you agree to acknowledge OpenTopography and the dataset source」と書き、OpenTopography の DOI (SRTM 1 秒は https://doi.org/10.5069/G9445JDF 、NASADEM は https://doi.org/10.5069/G93T9FD9) を含む引用を求めています。OpenTopography から取ったときは、NASA の引用に加えてこれを書きます。
- Planetary Computer の STAC は `license` を `proprietary` とし、LP DAAC の引用の方針のページへリンクしています。CC0 とは書いていません。

CGIAR-CSI の「SRTM 90m Digital Elevation Data v4」(https://srtm.csi.cgiar.org/) は、同じ SRTM から CIAT が独自の補間で欠測を埋めた別のデータで、条件が大きく違います。
その disclaimer のページは次のように書いています。

> Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT.

CC0 でもパブリックドメインでもなく、許可無く再配布できません。
ファイル名も `SRTM_38_03` のような別の体系なので、NASA の版と取り違えないでください。

## 気をつけること

- 版を書き分けてください。「SRTM」とだけ書かれたデータは v1、v2.1、v3、NASADEM、CGIAR v4 のどれでもありえます。v1 と v2.1 には欠測 (-32768) が残っています (今回は取得していません)。
- 範囲の北端が経路で違って見えます。LP DAAC の範囲は SRTM も NASADEM も北緯 60 度までですが、NASADEM には北緯 60 度から 61 度の行のタイル (`n60`) が 256 枚あり、Planetary Computer と OpenTopography の範囲は北緯 61 度までです。`NASADEM_HGT_n60e010` は全画素に値がありました。この行を何で埋めたかは確かめていません。SRTM v3 の `N60E010` は OpenTopography にありません。
- 座標系は WGS84 の緯度経度 (EPSG:4326)、高さは EGM96 ジオイドからの高さです (OpenTopography は EPSG:5773 と表示)。GPS の楕円体高と比べるときはジオイド高を足し引きします。OpenTopography には楕円体高に直した `SRTM_GL1_Ellip/` もあります (中身は確かめていません)。
- 隣り合うタイルは端の 1 行 1 列が重なります。つなぐときは VRT やモザイクで重複を処理してください。
- 海は 0 m です。0 で海と陸を分けると、海抜 0 m 付近の低地と区別できません。
- LP DAAC の HGT はヘッダの無い big-endian の整数列です。GDAL なら自動で読めますが、自分でバイト列を読むときは注意してください。
- SRTM v3 のタイル数は、LP DAAC (14,297) と OpenTopography (14,280) で 17 枚違いました。理由は確かめていません。
- AWS Open Data の Terrain Tiles にある `skadi/` (例 `https://s3.amazonaws.com/elevation-tiles-prod/skadi/N35/N35E139.hgt.gz`) は SRTM と同じ名前と形の HGT ですが、海に別の海底地形データが入った合成データで、SRTM そのものではありません。

## データ処理コマンド

2026-10-06 に GDAL 3.9.2 と curl で動かしたものです。

```bash
mkdir -p ./tmp

# 1 タイルの大きさと Range 対応を確かめる (SRTM v3 1 秒、東京を含むタイル)
curl -sIL https://opentopography.s3.sdsc.edu/raster/SRTM_GL1/SRTM_GL1_srtm/N35E139.tif
curl -s -r 0-1023 -o ./tmp/head.bin -w '%{http_code} %{size_download}\n' \
  https://opentopography.s3.sdsc.edu/raster/SRTM_GL1/SRTM_GL1_srtm/N35E139.tif

# バケットの中を一覧する (S3 互換、匿名)
curl -s "https://opentopography.s3.sdsc.edu/raster?list-type=2&delimiter=/&prefix=SRTM"
curl -s "https://opentopography.s3.sdsc.edu/raster?list-type=2&max-keys=3&prefix=NASADEM/NASADEM_be/"

# ダウンロードせずに中身の情報を見る
gdalinfo /vsicurl/https://opentopography.s3.sdsc.edu/raster/SRTM_GL1/SRTM_GL1_srtm/N35E139.tif
gdalinfo /vsicurl/https://opentopography.s3.sdsc.edu/raster/SRTM_GL3/SRTM_GL3_srtm/North/North_30_60/N35E139.tif
gdalinfo /vsicurl/https://opentopography.s3.sdsc.edu/raster/NASADEM/NASADEM_be/NASADEM_HGT_n35e139.tif

# 全体の VRT から範囲だけを切り出す (例: 東京都区部のあたり)
gdal_translate -projwin 139.6 35.8 139.9 35.5 \
  /vsicurl/https://opentopography.s3.sdsc.edu/raster/SRTM_GL1/SRTM_GL1_srtm.vrt ./tmp/tokyo.tif
gdalinfo -stats ./tmp/tokyo.tif

# Planetary Computer: STAC で NASADEM のタイルを探し、匿名トークンを付けて読む
curl -s "https://planetarycomputer.microsoft.com/api/stac/v1/search?collections=nasadem&bbox=139.6,35.6,139.8,35.8" \
  | jq -r '.features[].assets.elevation.href'
TOKEN=$(curl -s https://planetarycomputer.microsoft.com/api/sas/v1/token/nasademeuwest/nasadem-cog | jq -r .token)
gdalinfo "/vsicurl/https://nasademeuwest.blob.core.windows.net/nasadem-cog/v001/NASADEM_HGT_n35e139.tif?${TOKEN}"
```

OpenTopography のサーバーは遅いことがあり、10MB のタイル 1 枚の取得に 1 分以上かかりました。
途中で切れたら `curl -C - -o ファイル名 URL` で続きから取れます。

## 関連項目

- [[NASA]]
- [[Jet Propulsion Laboratory]]
- [[LP DAAC]]
- [[OpenTopography]]
- [[Microsoft Planetary Computer]]
- [[NASADEM]]
- [[SmartMaps Global Elevation Tiles]]
- [[NOAA ETOPO 2022]]
- [[GEBCO Grid 海底地形]]
- [[高度データ]]
- [[GeoTIFF]]
- [[Cloud Optimized GeoTIFF]]
- [[STAC]]
- [[GDAL]]
- [[CC0]]

## 確認日

2026-10-06 に次のことを確かめました。

- OpenTopography のバケットに HEAD と Range 0-1023 を送り、200 と 206 を確かめました。S3 互換の一覧を全件たどって、SRTM 1 秒、3 秒、NASADEM のタイル数と合計の大きさを数えました。
- `gdalinfo /vsicurl/` で 3 つの版の N35E139 の画素数、画素の大きさ、欠測値、圧縮を読みました。SRTM 1 秒と NASADEM の N35E139 は丸ごと取得し、最小、最大、-32768、0、負の画素を数えました。`NASADEM_HGT_n60e010` は概観画像からの近似の統計だけを取りました。
- VRT から範囲を切り出す `gdal_translate -projwin` を動かしました。
- Planetary Computer の STAC のコレクションと検索、匿名トークンの取得、トークン無しの 409 とトークン付きの 206 を確かめ、先頭 1MiB を OpenTopography の同じタイルと比べました。
- NASA CMR でコレクション ID、DOI、範囲、期間、グラニュール数、N35E139 の zip の大きさ (SRTMGL1 8.46189MB、SRTMGL3 1.09992MB、NASADEM 8.63923MB) を読みました。LP DAAC のファイルへの GET が Earthdata Login へ飛ばされて 401 になることを確かめました。
- LP DAAC の製品ページ 2 つ、NASA の Data Use and Citation Guidance、OpenTopography のデータセットページ 2 つ、CGIAR-CSI の disclaimer と FAQ のページを読みました。

確かめていないことは次のとおりです。

- LP DAAC の HGT の中身 (ログインが要るため)。NUM 層と水域マスクは記載を読んだだけです。
- OpenTopography の Global DEM API (API キーが要るため)。
- CGIAR-CSI 版のファイル。
- 垂直精度の数値、植生や建物の影響についての公式の記述。
- タイル数が LP DAAC と OpenTopography で 17 枚違う理由と、NASADEM の北緯 60 度から 61 度の行の作り方。
