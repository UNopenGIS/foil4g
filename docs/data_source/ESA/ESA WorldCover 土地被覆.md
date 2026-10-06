# ESA WorldCover 土地被覆

> [[欧州宇宙機関]] (ESA) が Sentinel-1 と Sentinel-2 の観測から作った、2020 年と 2021 年の全球 10m 土地被覆図 (11 区分) で、3 度四方の [[Cloud Optimized GeoTIFF]] 2,651 枚として AWS の公開バケットで配っているもの

## データソース情報

| 項目             | 内容                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------ |
| データID         | esa_worldcover                                                                             |
| 提供元           | [[欧州宇宙機関]] (ESA) の WorldCover プロジェクト。製作は ESA WorldCover consortium、AWS での配布の管理は [[VITO]] |
| 元データ         | [[Copernicus]] の Sentinel-1 (レーダー) と Sentinel-2 (光学) の観測 (各基準年の 1 月 1 日から 12 月 31 日) |
| ライセンス       | [[CC-BY-4.0]]                                                                              |
| 取り出し方       | range。3 度四方のタイルに分かれ (split)、各タイルは COG なので HTTP Range (206 を確認) で必要な範囲とオーバービューだけを読める。タイルの選択は格子ファイル (FlatGeobuf) で行う |
| データ形式       | [[Cloud Optimized GeoTIFF]] (DEFLATE 圧縮、内部タイル 1024×1024、オーバービュー 6 段)       |
| 範囲             | 全球の陸域 (南極を除く、北は 82.75 度まで)。格子の外枠は経度 -180 から 180、緯度 -60 から 84 |
| 期間             | 2020 年 (v100) と 2021 年 (v200) の 2 時点                                                 |
| 解像度または単位 | 1/12000 度 (赤道で約 10m)。値は 1 画素 1 区分のコード                                       |
| 大きさ           | Map 層の合計が v100 で 123,713,470,558 バイト、v200 で 124,027,923,380 バイト (各 2,651 ファイル)。1 タイルは 1.9MB から 185MB |
| 更新頻度         | AWS の登録ページは「Yearly」としているが、2021 年版 (2022 年 10 月公開) のあとに新しい版は出ていない |
| URL              | https://esa-worldcover.s3.eu-central-1.amazonaws.com/ (s3://esa-worldcover/)               |
| 説明ページ       | https://esa-worldcover.org/en/data-access 、https://registry.opendata.aws/esa-worldcover-vito/ |
| 技術資料         | https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/docs/WorldCover_PUM_V2.0.pdf |

## 概要

ESA の WorldCover プロジェクトが作った、全世界の土地被覆図です。
10m の格子ごとに、樹木、草地、農地、建物などの 11 区分のどれかを割り当てています。
光学衛星の Sentinel-2 に加えて、雲を透過するレーダー衛星の Sentinel-1 も使っている点が特徴です。

作り方は機械学習による推定です。
1 年分の Sentinel-1 と Sentinel-2 の観測から画素ごとの特徴量 (分位数などの統計量) を計算し、学習地点で訓練した勾配ブースティング決定木で区分を予測します。
最後に専門家ルールで複数のモデルの結果を組み合わせます。
このルールでは [[OpenStreetMap]]、Global Mangrove Watch、[[GHSL 人口・建物・都市化度|GHSL]]、World Settlement Footprint 2019 などを補助に使っていますが、技術資料によれば、それらのデータが地図にそのまま写し込まれているわけではありません。

版は 2 つあります。

| 版 | 基準年 | アルゴリズム | 学習地点と特徴量 | 公開 | 全体の正解率 (独立検証) |
|---|---|---|---|---|---|
| v100 | 2020 年 | V1.0.0 | 259,734 地点、131 特徴量 | 2021 年 10 月 | 74.4% |
| v200 | 2021 年 | V2.0.0 | 319,415 地点、115 特徴量 | 2022 年 10 月 28 日 | 76.7% |

検証はワーヘニンゲン大学 (統計的な正解率) と IIASA (空間的な正確さ) が行っています。
全体の正解率が 7 割台ということは、およそ 4 画素に 1 画素は区分が誤っている可能性があるということです。

技術資料は既知の限界として次を挙げています。

- 雲の多い地域では、Sentinel-1 を使っていても雲による偽の区分が残ることがある。
- 区分の取り違えが多い地域では、Sentinel-2 の軌道の境目や処理区画の境目が直線状の段差として見える。
- 氷河の消耗域や山の影が水域と誤って区分されることがある。
- (灌漑された) 農地と草本湿地が取り違えられることがある。
- v100 では、モンゴル西部などに地衣類・コケの偽の区分がある。

## 内容

各タイルには 2 つの層があります。

- Map: 土地被覆の区分。1 バンド、符号なし 8 ビット。
- InputQuality: 入力データの品質指標。3 バンド、符号なし 16 ビット、1/2000 度 (約 60m)。バンド 1 が Sentinel-1 の観測数、バンド 2 が Sentinel-2 の観測数、バンド 3 が雲などで捨てた Sentinel-2 観測の割合 (0 から 100)。

AWS のバケットにある InputQuality は v200 の 1 ファイル (S51W066) だけで、v100 にはありません。
全タイルの InputQuality が要るときは、VITO の Terrascope (ログインが必要) から取得する必要があります (技術資料の記載で、確かめていません)。

Map の値は次の 11 区分です。
名前と色は技術資料 (PUM V2.0) の表 3 とファイルの `legend` メタデータによります。

| コード | 区分 (英語) | 区分 | 色 (RGB) |
|---|---|---|---|
| 10 | Tree cover | 樹木 | 0, 100, 0 |
| 20 | Shrubland | 低木地 | 255, 187, 34 |
| 30 | Grassland | 草地 | 255, 255, 76 |
| 40 | Cropland | 農地 | 240, 150, 255 |
| 50 | Built-up | 建物・人工物 | 250, 0, 0 |
| 60 | Bare / sparse vegetation | 裸地・疎らな植生 | 180, 180, 180 |
| 70 | Snow and ice | 雪氷 | 240, 240, 240 |
| 80 | Permanent water bodies | 恒常的な水域 | 0, 100, 200 |
| 90 | Herbaceous wetland | 草本湿地 | 0, 150, 160 |
| 95 | Mangroves | マングローブ | 0, 207, 117 |
| 100 | Moss and lichen | コケ・地衣類 | 250, 230, 160 |

区分の定義は国連食糧農業機関 (FAO) の土地被覆分類体系 (LCCS) に従っています。
定義には誤解しやすい点があります。

- 10 (樹木) は樹冠が 10% 以上の場所で、植林地やアブラヤシ、オリーブなどの樹木作物も含みます。森林の定義とは一致しません。
- 40 (農地) は 1 年生作物だけで、多年生の木本作物は 10 や 20 になります。温室は 50 です。
- 50 (建物・人工物) には道路や鉄道も含みます。公園は含まず、廃棄物処分場や採掘地は 60 です。

欠損 (NoData) は 0 です。
タイルの中の外洋は 0 で、陸域を観測していない場所を表します。

ファイルのメタデータには、版 (`product_version`)、基準年の期間 (`time_start`、`time_end`)、ライセンス (`license=CC-BY 4.0`)、表示文 (`copyright`) が入っています。

## 取り出し方

区分は range です。
ログインもトークンも要りません。

1. 格子で必要なタイルを選びます。
   格子は `v200/2021/esa_worldcover_grid.fgb` (FlatGeobuf、516,760 バイト、2,651 地物) にあり、属性は左下隅を表す `ll_tile` (例: `N33E135`) だけです。
   FlatGeobuf は空間索引を持つので、[[GDAL]] で範囲を指定すると全体を落とさずに該当する行だけを読めます。
2. タイルの URL を組み立てます。
   ファイル名は `ESA_WorldCover_10m_<年>_<版>_<ll_tile>_Map.tif` で、`<ll_tile>` は左下隅の緯度 2 桁と経度 3 桁です (例: `S48E036` は東経 36 度から 39 度、南緯 48 度から 45 度)。
   v100 は `v100/2020/map/`、v200 は `v200/2021/map/` の下にあります。
3. タイルの中から必要な範囲だけを読みます。
   N33E135 (v200) に先頭 1,024 バイトを Range 要求すると、206 と 1,024 バイトが返りました。
   内部タイルは 1024×1024 画素 (約 10km 四方) で、オーバービューが 1/2 から 1/64 まで 6 段あるので、広い範囲を粗く見るときも全画素を読む必要はありません。
   大阪市中心部の 0.1 度四方 (1,200×1,200 画素) を `gdal_translate` で切り出すと、1.4MB でした。

そのほかの経路として次があります (いずれも動かしていません)。

- 18 個の 60 度四方の ZIP (`v200/2021/macrotiles/`、合計 124,028,381,868 バイト)。全体を落とす用途で、Range では使えません。
- AWS の登録ページは VITO の STAC API (https://services.terrascope.be/stac/) を挙げていますが、2026-10-06 には接続が切られて読めませんでした。
- Terrascope の WMS と WMTS (レイヤー `WORLDCOVER_2020_MAP`、`WORLDCOVER_2021_MAP`) は RGB の画像で、技術資料は解析には向かないとしています。

## 使いどころ

- SDGs 15.1 (森林) と 15.3 (土地の劣化): 国や流域ごとの樹木、草地、裸地の面積を同じ方法で数える出発点になります。ただし 10 は森林の定義と違うので、指標 15.1.1 の森林面積にそのまま置き換えることはできません。
- SDGs 6.6 (水に関わる生態系): 草本湿地 (90) とマングローブ (95) の分布を全球で同じ基準で見られます。
- SDGs 11.3 (都市化): 建物・人工物 (50) の広がりを 10m で見られます。人口と組み合わせるなら [[WorldPop 人口グリッド]] や [[GHSL 人口・建物・都市化度]] と重ねます。
- 人道支援と防災: 洪水や干ばつの想定範囲と重ねて、農地や人工物がどれだけ含まれるかを見積もる、平時の基準の地図として使えます。地元の土地被覆図が無い国でも同じ精度の地図が手に入ります。
- 現地調査の計画: 衛星画像だけでは区分しにくい地域で、どこに何がありそうかの当たりを付けるのに使えます。

使ってはいけない使い方もあります。

- 2020 年と 2021 年の差を土地被覆の変化として読むこと。理由は「気をつけること」に書きます。
- 個々の画素や小さな区画の区分を確定した事実として扱うこと。全体の正解率は 74.4% と 76.7% です。
- 建物の数や面積の推定。50 は道路も含む 10m の区分で、建物 1 棟ずつの形は持ちません。建物が要るときは [[Google Open Buildings]] や [[Overture Maps]] を使います。
- 2022 年以降の状況の把握。2 時点しかありません。

## ライセンスと帰属表示

ライセンスは [[CC-BY-4.0]] です。
根拠は https://esa-worldcover.org/en/data-access の License 節、技術資料 (PUM V2.0) の 5.1 節、各 GeoTIFF の `license` メタデータです。

> The ESA WorldCover product is provided free of charge, without restriction of use. For the full license information see the Creative Commons Attribution 4.0 International License.

> Publications, models and data products that make use of these datasets must include proper acknowledgement, including citing the datasets and the journal article as in the following citation.

地図に載せるときの表示文は次のとおりで、`[year]` には 2020 年版なら 2020、2021 年版なら 2021 を入れます。

> © ESA WorldCover project [year] / Contains modified Copernicus Sentinel data ([year]) processed by ESA WorldCover consortium

2021 年版なら次のようになります (v200 のファイルの `copyright` メタデータと同じ文です)。

- © ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium

出版物でデータの出所として引くときは、次の文献を挙げます。

- WorldCover 2020: Zanaga, D., Van De Kerchove, R., De Keersmaecker, W., Souverijns, N., Brockmann, C., Quast, R., Wevers, J., Grosu, A., Paccini, A., Vergnaud, S., Cartus, O., Santoro, M., Fritz, S., Georgieva, I., Lesiv, M., Carter, S., Herold, M., Li, Linlin, Tsendbazar, N.E., Ramoino, F., Arino, O., 2021. ESA WorldCover 10 m 2020 v100. https://doi.org/10.5281/zenodo.5571936
- WorldCover 2021: Zanaga, D., Van De Kerchove, R., Daems, D., De Keersmaecker, W., Brockmann, C., Kirches, G., Wevers, J., Cartus, O., Santoro, M., Fritz, S., Lesiv, M., Herold, M., Tsendbazar, N.E., Xu, P., Ramoino, F., Arino, O., 2022. ESA WorldCover 10 m 2021 v200. https://doi.org/10.5281/zenodo.7254221

データアクセスのページは「journal article」の引用も求めていますが、同じページに「A reference publication on the products is in progress」とあり、論文はまだ示されていません。
第三者データの例外は書かれていません。

## 気をつけること

- 2020 年版と 2021 年版は手法が違うので、差を変化として読めません。技術資料 (PUM V2.0) の 2.2 節は次のように書いています。

  > Since the WorldCover maps for 2020 and 2021 were generated with different algorithm versions (v100 and v200, respectively), changes between the maps should be treated with caution, as they include both changes in real land cover and changes due to the used algorithms (see Figure 3 and Figure 4). In fact, most changes between both maps are due to changes in the used algorithms.

  AWS の登録ページとデータアクセスのページにも同じ趣旨の注意があります。
  技術資料の図 4 (ウガンダの例) では、変化の大部分が v200 で農地と湿地の区分が改善したことによるものとして示されています。
- 一方で、ファイル名、ファイル形式、区分のコード、格子は両版で同じです。技術資料も製品の記述は同一としています。
- バケット直下の `readme.html` は 2020 年 v100 について書かれていて、表示文も 2020 年のものです。2021 年版を使うときは PUM V2.0 を見てください。
- 技術資料にある「Map 層は合計約 117 GB」は v100 の値です。バケットの一覧で足し合わせた実際の値は v100 で 123,713,470,558 バイト (約 115 GiB)、v200 で 124,027,923,380 バイトです。
- 座標系は EPSG:4326 (WGS 84 の緯度経度) です。1 画素は経度方向にも 1/12000 度なので、高緯度ほど東西の幅が狭くなります。面積を数えるときは画素数にそのまま 100 平方メートルを掛けず、緯度に応じて補正するか、等積図法に投影し直してください。
- オーバービューは区分の値を最頻値で間引いたものです (v100 のファイルには `OVR_RESAMPLING_ALG=MODE` とあります)。粗いズームで面積を数えると小さな区分が消えます。
- NoData は 0 です。[[GDAL]] の `gdalinfo -hist` は 0 を数えません。
- 同じ名前の別のデータと取り違えないでください。ESA には 300m の Climate Change Initiative (CCI) 土地被覆があり、凡例が違います。バケットにはその凡例に合わせた色定義 (`ESAWorldCover_ColorLegend_CCIStyle.qml`) もありますが、値は WorldCover の 11 区分のままです。
- WorldCover annual composites (Sentinel-1 と Sentinel-2 の年間合成画像、`s3://esa-worldcover-s1`、`s3://esa-worldcover-s2`) は土地被覆ではなく入力に近い画像で、1 度四方の別の格子です。

## データ処理コマンド

```bash
mkdir -p ./tmp
B=https://esa-worldcover.s3.eu-central-1.amazonaws.com

# バケットの最上位を一覧する (認証不要)
curl -s "$B/?delimiter=/"

# タイルの大きさを確かめ、Range 要求で 206 が返ることを確かめる
U=$B/v200/2021/map/ESA_WorldCover_10m_2021_v200_N33E135_Map.tif
curl -sI $U
curl -s -r 0-1023 -o /dev/null -w "%{http_code} %{size_download}\n" $U

# 格子から、ある地点 (大阪市) を含むタイルの名前を求める
ogr2ogr -f CSV /vsistdout/ /vsicurl/$B/v200/2021/esa_worldcover_grid.fgb -spat 135.5 34.7 135.5 34.7

# タイルのヘッダとメタデータを、全体を落とさずに読む
gdalinfo /vsicurl/$U

# 0.1 度四方 (1,200x1,200 画素) だけを切り出す
gdal_translate -projwin 135.45 34.75 135.55 34.65 /vsicurl/$U ./tmp/osaka.tif

# 区分ごとの画素数を数える (左が区分のコード、右が画素数。NoData の 0 は数えない)
gdalinfo -hist ./tmp/osaka.tif | awk '/buckets from/{getline; for(i=1;i<=NF;i++) if($i>0) print i-1, $i}'
```

最後のコマンドの 2026-10-06 の結果は、50 (建物・人工物) が 1,225,980 画素、80 (水域) が 118,837 画素、10 (樹木) が 41,496 画素などでした。
上のコマンドは GDAL 3.9.2 で動かして確かめました。
切り出しには約 20 秒かかりました。

## 関連項目

- [[欧州宇宙機関]]
- [[VITO]]
- [[Copernicus]]
- [[Sentinel-2]]
- [[Sentinel-1]]
- [[土地被覆]]
- [[GHSL 人口・建物・都市化度]]
- [[WorldPop 人口グリッド]]
- [[Google Open Buildings]]
- [[Overture Maps]]
- [[Cloud Optimized GeoTIFF]]
- [[GeoTIFF]]
- [[FlatGeobuf]]
- [[GDAL]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次を確かめました。

- バケットの一覧 (匿名の ListObjectsV2) で、v100 と v200 の Map がそれぞれ 2,651 ファイルであること、その合計バイト数、最小 (N78E108、1,933,572 バイト) と最大 (S21E030、185,331,883 バイト) のタイル、InputQuality が v200 の 1 ファイルだけであること、macrotiles の 18 ファイル。
- N33E135 の v100 と v200 に HEAD (v100 は 41,632,171 バイト、v200 は 36,677,894 バイト) と Range 要求 (206)。
- `gdalinfo /vsicurl/` で、両版の座標系、画素の大きさ、内部タイル、オーバービュー、NoData、メタデータ (legend、license、copyright、algorithm_version)。
- 格子の FlatGeobuf を `ogrinfo` と `ogr2ogr -spat` で読んだこと。
- 大阪市の切り出しと区分ごとの画素数、外洋の画素が 0 であること。
- 技術資料 PUM V2.0 と V1.0 (バケットの `docs/`)、`readme.html`、https://esa-worldcover.org/en/data-access 、https://registry.opendata.aws/esa-worldcover-vito/ の本文。

確かめられなかったこと:

- VITO の STAC API (https://services.terrascope.be/stac/) は 2 回試して接続を切られ、読めませんでした。
- Terrascope からの取得 (ログインが必要) は試していません。
- 検証報告書 (PVR) の中身は読んでいません。正解率はデータアクセスのページと PUM の記載です。
