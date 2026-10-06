# NASA Blue Marble

> [[NASA Earth Observatory]] が [[MODIS]] の観測から作った、2004 年の 12 か月それぞれの雲の無い全球トゥルーカラー合成画像 (Blue Marble: Next Generation) を、陰影なし・地形陰影つき・地形と水深の陰影つきの 3 版、8km・2km・500m の 3 解像度で、JPEG と [[GeoTIFF]] で配っているもの

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | nasa_blue_marble |
| 提供元           | [[NASA Earth Observatory]] ([[NASA]] Goddard Space Flight Center)。作成者は Reto Stöckli |
| 元データ         | [[MODIS]] の地表面反射率 MOD09A1 と土地被覆 MOD12Q1。陰影つきの版は、陰影に [[SRTM]] (60S から 60N)、[[GTOPO30]] (60N より北と SRTM の欠損の穴埋め)、RAMP II (60S より南)、[[GEBCO]] 1 分格子 (海底) を使っている |
| ライセンス       | 米国内では著作権の対象にならない NASA のコンテンツ (NASA Images and Media Usage Guidelines)。利用時に「NASA Earth Observatory」の表示を求めている |
| 取り出し方       | range。GeoTIFF はサーバーが Range に 206 を返し、行ごとのストリップ (21600x1 画素) なので、GDAL の /vsicurl/ で必要な範囲だけを読める (ハワイ島 1.3 x 1.4 度で約 7.1MB)。500m はさらに月ごと 8 枚 (A1 から D2) に分割されている。JPEG は whole |
| データ形式       | JPEG (8bit RGB) と GeoTIFF (8bit RGB、DEFLATE 圧縮、EPSG:4326)。旧サイトには PNG も残っている |
| 範囲             | 全球 (経度 -180 から 180、緯度 -90 から 90) |
| 期間             | 2004 年 1 月から 12 月の月別合成 (12 か月) |
| 解像度または単位 | 15 秒 (500m 版、赤道で約 463m)、60 秒 (2km 版)、240 秒 (8km 版)。値は表示用の RGB で、物理量ではない |
| 大きさ           | 地形と水深の陰影つき、2004 年 8 月の 1 か月分で、500m の 8 枚の GeoTIFF が合計 3,266,445,239 バイト、JPEG が合計 420,820,616 バイト。最小は 8km 全球 JPEG の 2,308,163 バイト |
| 更新頻度         | なし (2005 年に公開された 2004 年の製品。配布ファイルの Last-Modified は 2025-12-16 で、置き場所の移転によるもの) |
| URL              | https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography-bathymetry/ (地形と水深の陰影つきの配布ページ) |
| 説明ページ       | https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/ |
| 技術文書         | https://assets.science.nasa.gov/content/dam/science/esd/eo/content-feature/bluemarble/bmng.pdf |

## 概要

Blue Marble: Next Generation (BMNG) は、NASA Earth Observatory が 2005 年に公開した、雲の無い地球の見た目を 1 か月ごとに合成した画像です。
衛星 Terra の [[MODIS]] が 2004 年に観測した 8 日合成の地表面反射率 (MOD09A1) から、雲や雲の影に汚れた値を自動で除き、欠けた所を時間方向と空間方向に補間して、月ごとの雲の無い画像にしています。
説明ページは「Blue Marble: Next Generation offers a year's worth of monthly composites at a spatial resolution of 500 meters」と書いています。
12 か月分あるので、温帯の植生の芽吹きと枯れ、熱帯の乾季と雨季、北半球の積雪の広がりと後退が見えます。

版は 3 つあります。

- Base Map: 陰影なし。ファイル名は `world.2004MM.*`
- Base Map + Topography: 陸の地形の陰影つき。ファイル名は `world.topo.2004MM.*`
- Base Map + Topography + Bathymetry: 陸の地形と海底の水深の陰影つき。ファイル名は `world.topo.bathy.2004MM.*`

このほかに、陰影の元になった標高と水深を灰色の濃淡にした画像 (Topography and Bathymetry Maps、`gebco_08_rev_elev_*` と `gebco_08_rev_bath_*`) も同じサイトで配られています。

作り方の限界を、説明ページと技術文書は次のように書いています。

- 開けた水面にはまだ「ノイズ」が残っている。
- 熱帯の低地では、雨季の雲が多すぎて 1 か月のうちに雲の無い値が得られない画素がある。
- 深い海は元データに入っておらず、一様な青で塗られている。浅い沿岸の観測とうまく混ぜられていないので、境目が不自然に見えることがある。
- 積雪の期間が 3、4 か月より短い所では、雪と雲を完全には区別できていない。
- 水域には季節変化が入っていない。農地は作付けによって季節の変化が連続しないので、補間の前提に合わないことがある。
- 正弦図法から緯度経度への 2 回の投影変換で、小さな位置のずれが入りうる。

## 内容

各ファイルは 3 バンドの 8bit RGB 画像です。
値は人の目に自然に見えるように調整した色で、反射率などの物理量に戻すことはできません。
欠損を表す値はありません (欠けた所は補間で埋め、深い海は一様な色で塗っています)。

1 か月、1 版あたり、次の 10 個の画像が JPEG と GeoTIFF の 2 形式で置かれています。

| 名前 | 画素数 | 1 画素 | 範囲 |
| ---- | ------ | ------ | ---- |
| `3x5400x2700` | 5400 x 2700 | 240 秒 (約 8km) | 全球 |
| `3x21600x10800` | 21600 x 10800 | 60 秒 (約 2km) | 全球 |
| `3x21600x21600.A1` | 21600 x 21600 | 15 秒 (約 500m) | 北緯 90 度から 0 度、西経 180 度から 90 度 |
| `3x21600x21600.B1` | 同上 | 同上 | 北緯 90 度から 0 度、西経 90 度から 0 度 |
| `3x21600x21600.C1` | 同上 | 同上 | 北緯 90 度から 0 度、東経 0 度から 90 度 |
| `3x21600x21600.D1` | 同上 | 同上 | 北緯 90 度から 0 度、東経 90 度から 180 度 |
| `3x21600x21600.A2` | 同上 | 同上 | 0 度から南緯 90 度、西経 180 度から 90 度 |
| `3x21600x21600.B2` | 同上 | 同上 | 0 度から南緯 90 度、西経 90 度から 0 度 |
| `3x21600x21600.C2` | 同上 | 同上 | 0 度から南緯 90 度、東経 0 度から 90 度 |
| `3x21600x21600.D2` | 同上 | 同上 | 0 度から南緯 90 度、東経 90 度から 180 度 |

GeoTIFF はファイル名の末尾に `_geo` が付きます (`world.topo.bathy.200408.3x21600x21600.A1_geo.tif` など)。
12 か月 x 3 版 x 10 画像 x 2 形式で、720 ファイルになる計算です (ページのリンクから数えた推定で、全部の存在は確かめていません)。

地形と水深の陰影つき、2004 年 8 月の 500m のパネルの大きさ (HEAD の Content-Length) です。

| パネル | JPEG (バイト) | GeoTIFF (バイト) |
| ------ | ------------: | ---------------: |
| A1 | 54,280,546 | 408,007,930 |
| B1 | 54,137,687 | 427,810,557 |
| C1 | 89,081,015 | 728,943,740 |
| D1 | 69,167,032 | 520,084,962 |
| A2 | 24,328,476 | 147,798,707 |
| B2 | 47,001,732 | 350,725,694 |
| C2 | 39,324,538 | 327,500,377 |
| D2 | 43,499,590 | 355,573,272 |
| 合計 | 420,820,616 | 3,266,445,239 |

全球の画像は、8km の JPEG が 2,308,163 バイト、GeoTIFF が 19,829,594 バイト、2km の JPEG が 27,216,225 バイト、GeoTIFF が 256,157,444 バイトです。
海が多く陸の模様が少ないパネル (A2、南太平洋) ほど小さく、ユーラシアを含む C1 が最大です。

GeoTIFF の中身は gdalinfo で次のとおりでした (A2、2004 年 8 月)。

- 座標系は WGS 84 の緯度経度 (EPSG:4326)、画素の大きさは 0.004166666667 度。
- 圧縮は DEFLATE、画素インターリーブ、ブロックは 21600 x 1 (1 行ずつのストリップ)。
- バンドは Red、Green、Blue の 3 つで、型は Byte。

## 取り出し方

区分は range です。

assets.science.nasa.gov のサーバーは `accept-ranges: bytes` を返し、`Range: bytes=0-1023` に HTTP 206 で 1,024 バイトを返しました。
CORS も許可しています (`access-control-allow-origin: *`)。

GeoTIFF は 1 行ごとのストリップで、行ごとの位置がヘッダに書かれているので、[[GDAL]] の `/vsicurl/` で必要な行だけを読めます。
2004 年 8 月の A1 パネル (408,007,930 バイト) からハワイ島 (西経 156.1 度から 154.8 度、北緯 18.9 度から 20.3 度) を切り出すと、6 回の Range 要求で 7,143,424 バイトを読み、312 x 336 画素の GeoTIFF ができました。
ただしストリップはパネルの幅いっぱい (経度 90 度分) なので、東西に狭い範囲でも、必要な緯度の行は 90 度分まるごと読みます。
読む量は経度の幅ではなく緯度の幅で決まります。

JPEG は途中から伸長できないので、1 枚を全部取得するしかありません (whole)。
分割の単位は月 (12)、版 (3)、解像度 (3)、500m ではさらにパネル (8) で、名前を指定して必要なものだけを取得できます。

認証は要りません。

## 使いどころ

主な使いどころは、地図や可視化の背景です。

- 全球や大陸規模の地図、地球儀、スライド、展示で、雲の無い自然な色の地球を背景に置く。
- 人道支援や防災の報告書の地図で、対象地域の地形の雰囲気 (砂漠、森林、山地、積雪) を一目で伝える背景にする。
- 12 か月分あるので、季節による植生や積雪の違いを見せる教材にする。説明ページも教育での利用を勧めています。

SDGs の目標やターゲットの指標を計算する材料としての役立ちは弱いです。
値は表示用に調整した RGB で、反射率や植生指数などの物理量ではありません。
2004 年の 1 年分だけで、その後の都市の広がり、森林の減少、氷河の後退、海岸線の変化は入っていません。
観測として土地被覆や変化を測りたいときは、[[NASA HLS 衛星画像]] や [[USGS Landsat Collection 2]] のような、物理量を持ち、今も更新されているデータを使ってください。

使ってはいけない使い方の例です。

- 2004 年の画像を「現在の状況」として示すこと。
- 色から土地被覆の面積や植生の量を数え、統計として報告すること。
- 雪と雲の取り違えや補間が残る画素を、その月の実際の観測として扱うこと。
- 陰影つきの版の陰影から標高や水深を読み取ること (陰影は見た目のためのもので、標高や水深が要るなら [[NASA SRTM 標高]]、[[NOAA ETOPO 2022]]、[[GEBCO Grid 海底地形]] を使う)。
- 国境や海岸線の位置の根拠にすること (画像には境界が入っておらず、画素の位置にも小さなずれがありうる)。

## ライセンスと帰属表示

BMNG の説明ページの Credits 節は、作成者と求める表示を次のように書いています。

> Blue Marble: Next Generation was produced by Reto Stöckli, NASA Earth Observatory (NASA Goddard Space Flight Center). [...] Anyone using or republishing Blue Marble: Next Generation please credit "NASA Earth Observatory."

ライセンスの名前は付いていません。
NASA 全体の NASA Images and Media Usage Guidelines (https://www.nasa.gov/nasa-brand-center/images-and-media/) は次のように書いています。

> NASA content – images, audio, video, and media files used in the rendition of 3-dimensional models, such as texture maps and polygon data in any format – generally are not subject to copyright in the United States. You may use this material for educational or informational purposes, including photo collections, textbooks, public exhibits, computer graphical simulations and Internet Web pages.

> NASA content used in a factual manner that does not imply endorsement may be used without needing explicit permission. NASA should be acknowledged as the source of the material.

商用利用については、NASA の推奨や後援を示唆しないことを条件にしています。

> If the NASA material is to be used for commercial purposes, including advertisements, it must not explicitly or implicitly convey NASA's endorsement of commercial goods or services.

まとめると、BMNG は米国内では著作権の対象にならない (米国内で public domain に当たる) NASA の画像で、使うときは「NASA Earth Observatory」と表示することが求められています。
CC0 のような世界に向けた権利放棄の宣言ではなく、米国外での扱いについて NASA は何も書いていません。
同じ指針のページの冒頭には「The NASA Insignia, Logotype, identifiers, and imagery are not in the public domain.」という一文もあります。
文脈からは NASA の記章やロゴに関する画像を指していると読めますが、「imagery」の範囲は書かれていません。
BMNG がこの一文に当たるかどうかは確かめていません。

求められる表示文は次のとおりです。

- NASA Earth Observatory

技術文書は論文としての引用も示しています。

- R. Stöckli, E. Vermote, N. Saleous, R. Simmon and D. Herring (2005). The Blue Marble Next Generation - A true color earth dataset including seasonal dynamics from MODIS. Published by the NASA Earth Observatory.

陰影つきの版には、陰影の元データとして SRTM、GTOPO30、RAMP II、GEBCO (Centenary Edition of the GEBCO Digital Atlas、2003 年) が入っています。
陰影は画像に焼き込まれた見た目で、元の標高や水深の値は取り出せませんが、元データそれぞれの利用条件や表示の要請が陰影つきの画像にも及ぶかどうかは確かめていません。
特に GEBCO 2003 年版の当時の利用条件は確かめていません。
慎重を期すなら、陰影つきの版では「NASA Earth Observatory」に加えて GEBCO などの元データを併記するのが安全です (これは推奨で、配布元の要請ではありません)。
灰色の水深の画像 (Topography and Bathymetry Maps) のページには「Imagery by Jesse Allen, NASA's Earth Observatory, using data from the General Bathymetric Chart of the Oceans (GEBCO) produced by the British Oceanographic Data Centre.」と表示が書かれています。

## 気をつけること

- 版の取り違えに注意してください。ファイル名の `world`、`world.topo`、`world.topo.bathy` で陰影の有無が変わります。月は `2004MM` の部分です。
- 「500m」と書かれていますが、実際の画素は 15 秒で、赤道で約 463m です。緯度経度の等間隔格子なので、高緯度ほど東西方向の実距離は短くなり、極に近い所は引き伸ばされて見えます。
- 座標系は WGS 84 の緯度経度 (EPSG:4326) です。Web メルカトルの地図に重ねるときは投影変換が要り、北緯 85 度より北と南緯 85 度より南は切れます。
- 解像度の名前を取り違えやすいです。`3x5400x2700` は 8km (240 秒)、`3x21600x10800` が 2km (60 秒) です。
- JPEG には位置情報が入っていません。位置合わせが要るときは `_geo.tif` を使うか、上の表の範囲からワールドファイルを作ります。
- 置き場所が何度か変わっています。2026-10-06 時点で配布ページのリンク先は assets.science.nasa.gov です。旧サイト eoimages.gsfc.nasa.gov の `imagerecords` にも PNG と JPEG が残っています (例: 2004 年 8 月の A1 の PNG、284,592,743 バイト、HTTP 200)。旧 NEO (neo.gsfc.nasa.gov) の URL は science.nasa.gov の HTML ページへ転送されるので、ダウンローダーが画像の代わりに HTML を保存してしまうことがあります。
- 技術文書が挙げている 500m 全球の生バイナリ (`3x86400x43200.bin.gz`) や陰影用の標高データ (`srtm_ramp2.world.86400x43200.bin.gz`、`gebco_bathy.21601x10801.bin.gz`) は、今の配布ページにはリンクがありません。今も取れるかは確かめていません。
- 深い海は一様な青で、海の色や水深の観測ではありません。
- 名前の似た別の製品があります。2002 年の初代 Blue Marble (4 か月合成、1km)、夜の地球の Black Marble、宇宙から撮った一枚写真の「ブルー・マーブル」(1972 年、アポロ 17 号) とは別物です。

## データ処理コマンド

以下は 2026-10-06 に実際に動かしたものです (GDAL 3.9.2)。

```bash
# 大きさと Range 対応を確かめる (地形と水深の陰影つき、2004 年 8 月、500m の A1 パネル)
B=https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-topography-bathymetry/august/world.topo.bathy.200408
curl -sIL -m 60 -A "Mozilla/5.0" "$B.3x21600x21600.A1_geo.tif"
curl -s -m 60 -A "Mozilla/5.0" -r 0-1023 -o /dev/null -w '%{http_code} %{size_download}\n' "$B.3x21600x21600.A1_geo.tif"

# GeoTIFF のヘッダを、ファイルを落とさずに読む
export CPL_VSIL_CURL_ALLOWED_EXTENSIONS=.tif GDAL_HTTP_USERAGENT="Mozilla/5.0" GDAL_DISABLE_READDIR_ON_OPEN=EMPTY_DIR
gdalinfo "/vsicurl/$B.3x21600x21600.A2_geo.tif"

# 範囲を切り出す (例: ハワイ島。約 7MB を読んで 312 x 336 画素の GeoTIFF になる)
mkdir -p ./tmp
gdal_translate -projwin -156.1 20.3 -154.8 18.9 "/vsicurl/$B.3x21600x21600.A1_geo.tif" ./tmp/hawaii.tif

# 1 点の色を読む
gdallocationinfo -wgs84 ./tmp/hawaii.tif -155.5 19.6
```

全球を見るだけなら、8km の JPEG (`$B.3x5400x2700.jpg`、2,308,163 バイト) を `curl -L -O` で取得すれば足ります (大きさは HEAD で確かめ、取得そのものは動かしていません)。

## 関連項目

- [[NASA Earth Observatory]]
- [[NASA]]
- [[MODIS]]
- [[NASA HLS 衛星画像]]
- [[USGS Landsat Collection 2]]
- [[NASA SRTM 標高]]
- [[NOAA ETOPO 2022]]
- [[GEBCO Grid 海底地形]]
- [[Natural Earth Coastline Data]]
- [[GeoTIFF]]
- [[GDAL]]
- [[衛星画像]]
- [[ラスターデータ]]

## 確認日

2026-10-06 に次を確かめました。

- science.nasa.gov の BMNG の説明ページ、3 つの版の配布ページ、Topography and Bathymetry Maps のページを取得し、本文 (Limitations、Credits) と配布ファイルのリンクを読みました。
- 技術文書 (bmng.pdf、2005 年 10 月 17 日付) で、格子の間隔、8 枚のパネルの範囲、ファイル形式、陰影の元データ、注意点、引用文を確かめました。
- 地形と水深の陰影つき、2004 年 8 月の全 8 パネルと全球 2 枚について、JPEG と GeoTIFF の大きさを HEAD で確かめました。2004 年 1 月の A1 の GeoTIFF も HTTP 200 (398,897,007 バイト) でした。
- Range 要求に 206 が返ることと、`/vsicurl/` での部分読み出し (読んだバイト数は GDAL のデバッグ出力から数えました) を確かめました。
- NASA Images and Media Usage Guidelines の本文を読みました (ページの最終更新 2026-08-13)。

確かめられなかったことです。

- 12 か月 x 3 版のすべてのファイルが取得できるか (確かめたのは 2004 年 8 月の地形と水深の陰影つきの版と、2004 年 1 月の A1 だけです)。
- 陰影の元データ (SRTM、GTOPO30、RAMP II、GEBCO 2003 年版) の利用条件が陰影つきの画像に及ぶかどうか。
- 指針のページの「imagery are not in the public domain」が BMNG を含むかどうか。
- 技術文書が挙げる生バイナリと標高データが今も配布されているか。
