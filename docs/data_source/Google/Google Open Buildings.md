# Google Open Buildings

> [[Google Research]] が、アフリカ、南アジア、東南アジア、中南米・カリブの約 5,800 万 km2 について、衛星画像から機械学習で推定した建物のポリゴン (v1〜v3、CSV) と、建物の有無・件数・高さの年ごとのラスタ (2.5D Temporal、2016〜2023 年、GeoTIFF) を Google Cloud Storage で配っているデータ

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | google_open_buildings |
| 提供元           | [[Google Research]] (Open Buildings チーム、ガーナのアクラの拠点が中心) |
| 元データ         | なし (一次データ)。ポリゴンは Google が使う解像度 50cm の高解像度衛星画像から、2.5D Temporal は [[Sentinel-2]] (Copernicus) の画像から推定したもの。元の画像は配っていない |
| ライセンス       | [[CC-BY-4.0]] と [[ODbL-1.0]] の二重ライセンス。利用者がどちらか一方を選んで、その条件で使う |
| 取り出し方       | ポリゴンは split (S2 セル レベル 4 で 333 本、レベル 6 で 3,330 本。1 本の CSV.gz の中は whole)。2.5D Temporal は range (S2 セルと年でフォルダが分かれ、各 GeoTIFF はタイル化とオーバービューつきで部分読みできる) |
| データ形式       | ポリゴンと点は gzip 圧縮の CSV (幾何は WKT)。2.5D Temporal は 3 バンド Float32 の [[GeoTIFF]]。ほかに [[Google Earth Engine]] の FeatureCollection と ImageCollection |
| 範囲             | ポリゴン v3 は 111 の国と地域、2.5D Temporal は 112 の国と地域 (アフリカ、南アジア、東南アジア、中南米・カリブ)。日本、欧州、米国本土、カナダ、中国、ロシア、オーストラリアは含まれない。v3 の分割タイルの外接矩形は緯度 -59.97〜39.98 度 |
| 期間             | ポリゴン v3 は 2023 年 5 月に推論した 1 時点 (画像の撮影時期は場所ごとに違い、数年前の画像のこともある)。2.5D Temporal は 2016〜2023 年の毎年 (各年 6 月 30 日前後の画像から推論) |
| 解像度または単位 | ポリゴンは建物 1 棟が 1 行。2.5D Temporal は画素 0.5m だが実効解像度は約 4m |
| 大きさ           | ポリゴン v3 の CSV.gz 333 本で 178.26GB (1 本 393 バイト〜8.42GB、中央値 145MB)。点 v3 は 333 本で 48.12GB。2.5D Temporal の GeoTIFF は 1 本 10MB〜1GB 程度 (全体の合計は数えていない) |
| 更新頻度         | 不定期。v1 (2021 年 4 月)、v2 (2022 年 8 月)、v3 (2023 年 5 月) と版を出してきたが、v3 のファイルは 2023-06-23 から更新されていない。2.5D Temporal は v1 のみ (GeoTIFF の更新日は 2024-10-31) |
| URL              | ポリゴン: `gs://open-buildings-data/` (https://storage.googleapis.com/open-buildings-data/)。2.5D Temporal: `gs://open-buildings-temporal-data/v1/` |
| 説明ページ       | https://sites.research.google/gr/open-buildings/ と https://sites.research.google/gr/open-buildings/temporal/ |
| 索引             | https://openbuildings-public-dot-gweb-research.uw.r.appspot.com/public/tiles.geojson (ポリゴン v3 の 333 タイルの範囲と URL) |

## 概要

Google Research が、建物の輪郭が地図に載っていない地域のために作った建物データです。
プロジェクトはガーナにある Google の拠点を中心に、アフリカと Global South を対象にしています。
同じ名前の下に、作り方も形も違う 2 つのデータがあります。

1 つ目は建物のポリゴン (Open Buildings v1〜v3) です。
解像度 50cm の高解像度衛星画像から深層学習のモデルで建物の屋根を検出し、1 棟ずつの輪郭にしました。
v3 は 18 億件、推論した面積は 5,800 万 km2 で、v2 (3,910 万 km2、アフリカ、南アジア、東南アジア) と v1 (1,940 万 km2、アフリカ) に中南米・カリブを足し、精度を上げた版です。
建物の種類、住所、高さ、階数は持っていません。

2 つ目は 2.5D Temporal Dataset です。
無料で公開されている Sentinel-2 の画像 (各年 6 月 30 日の前後 16 枚ずつ、計 32 枚) から、画素ごとに建物の有無、建物の件数、建物の高さを推定したラスタで、2016 年から 2023 年まで毎年あります。
対象地域はポリゴン v3 と同じだと本家は書いています。
ポリゴンが 1 時点の高解像度の結果なのに対し、こちらは解像度が粗い代わりに年ごとの変化を追えます。

どちらも機械学習による推定で、作り方から来る限界があります。

- ポリゴンには、岩や植生を建物と誤る誤検出と、見落としの両方があります。くっついて建つ建物の区切り、数画素しかない小さな建物、自然の材料で建てた建物は苦手です。
- 高層建物は屋根を検出しているので、画像の撮影角度によって位置がずれます。
- 画像の新しさは場所によって違い、数年前の画像しかない所や、画像が無い所もあります。
- 紛争地などの危険な地域は、住民を守るために意図的に除かれています。除外の一覧は公開されておらず、変わることがあります。
- 2.5D Temporal の高さの誤差 (平均絶対誤差 1.5m) は北米、欧州、日本でしか測られていません。対象地域 (Global South) での評価は主に定性的で、高い建物では大きく外れることがあると本家は書いています。

## 内容

### ポリゴン版と点版 (v3)

CSV の 1 行が建物 1 棟です。
列は次の 6 つです (2026-10-06 に `32b_buildings.csv.gz` を読んで確かめました)。

| 列 | 意味 |
| --- | --- |
| `latitude`, `longitude` | ポリゴンの重心の緯度と経度 (WGS84) |
| `area_in_meters` | ポリゴンの面積 (m2) |
| `confidence` | モデルの確信度。0.65〜1.0 (0.65 未満は配布前に落としてある) |
| `geometry` | 建物の輪郭。WKT の POLYGON または MULTIPOLYGON。ポリゴン版だけにあり、点版には無い |
| `full_plus_code` | 重心の Plus Code |

件数は約 18 億件です。
閾値表の `building_count` を合計すると 1,848,201,804 件でした。
欠損を表す値はありません。
建物が無いところは行が無いだけです。

`confidence` の意味は場所によって違います。
閾値表 `v3/score_thresholds_s2_level_4.csv` (75,976 バイト、312 行) は、S2 セルごとに精度 80%、85%、90% を得るための `confidence` の閾値と、その閾値を超える建物の数を持っています。
精度 90% の閾値を超える建物は合計 524,531,299 件で、全体の 28.4% でした。
閾値はセルによって 0.65〜1.0 と大きく違います。

バケットの中身は次のとおりです (2026-10-06 に JSON API で一覧しました。GB は 10 の 9 乗バイト)。

| 置き場所 | 本数 | 合計 |
| --- | ---: | ---: |
| `v3/polygons_s2_level_4_gzip/` | 333 | 178.26GB |
| `v3/polygons_s2_level_6_gzip_no_header/` (ヘッダー行なし) | 3,330 | 175.53GB |
| `v3/polygons_s2_level_4/` (非圧縮) | 333 | 本家の記載なし。確かめていません |
| `v3/polygons_single_csv/` (全件 1 本) | 1 | 確かめていません |
| `v3/points_s2_level_4_gzip/` | 333 | 48.12GB |
| `v3/points_s2_level_6_gzip_no_header/` | 3,330 | 確かめていません |
| `v2/polygons_s2_level_4_gzip/` | 205 | 78.27GB |
| `v1/polygons_s2_level_4_gzip/` | 135 | 49.80GB |

### 2.5D Temporal 版

`v1/geotiffs/{S2 トークン}_{年}_06_30/tile_{ID}.tif` の形で置かれています。
1 本は 25,000 x 25,000 画素、画素 0.5m (12.5km 四方) で、座標系は UTM (タイルごとに違う EPSG:326xx または 327xx) です。
3 バンドとも Float32 で、NoData は -99 です。

| バンド | 名前 | 意味 |
| --- | --- | --- |
| 1 | `building_fractional_count` | 画素あたりの建物の件数 (小数)。範囲で合計すると建物の数の推定になる |
| 2 | `building_height` | 地面からの建物の高さ (m)。100m で打ち切り。建物でない画素は 0 |
| 3 | `building_presence` | 建物がある確信度 (0〜1)。較正されていない |

`building_presence` は較正されていないので、0.8 は「80% の確率で建物」という意味ではありません。
本家は、高さを使うときは `building_presence` が低い画素を隠すように求めています。

試しにナイロビ中心部 (UTM 37S、2km 四方) の 2023 年を 4m に間引いて読むと、高さの最大は 98.06m、`building_presence` の平均は 0.16 でした。
`v1/manifests/` には Earth Engine に取り込むための JSON があり、各タイルの URI とアフィン変換が入っています。

## 取り出し方

### ポリゴンと点 (CSV.gz) は split

GCS は Range 要求に 206 を返します (2026-10-06 に最大の `39f_buildings.csv.gz`、8,423,792,523 バイトで確かめました)。
ただし gzip は 1 本の連続した流れなので、途中のバイトから展開することはできず、ファイルの中の一部だけを狙って取ることはできません。
範囲を絞る手がかりは分割のほうです。
v3 は S2 セル レベル 4 で 333 本 (最小 393 バイト、中央値 145MB、最大 8.42GB)、レベル 6 で 3,330 本 (中央値 9.2MB、最大 1.72GB) に分かれています。
どのセルのファイルを取ればよいかは `tiles.geojson` (250KB、333 地物、属性は `tile_id`、`tile_url`、`size_mb`) で決められます。
レベル 6 の分割には索引のファイルが見当たりません。

認証は要りません。
国や任意の範囲で切り出す例は、本家が Colab のノートブック (`open_buildings_download_region_polygons.ipynb`) で示しています (Colab を動かすには Google アカウントが要ります)。
[[HDX]] には、HDX のチームが 20 か国分を国別にまとめたものがあると本家は案内しています (中身は確かめていません)。

### 2.5D Temporal (GeoTIFF) は range

GeoTIFF はタイル化 (512 x 512 のブロック、DEFLATE 圧縮) され、オーバービューを 14 段持っています。
`curl -r 0-3` は 206 と `II*\0` を返し、GDAL の `/vsicurl/` で必要な範囲と解像度だけを読めます。
1GB あるナイロビのタイルから 2km 四方を 4m で読むのにかかったのは約 9 秒でした。
年と S2 セルでフォルダが分かれていますが、どの座標がどのタイルかを引く索引は `v1/manifests/` の JSON (UTM ゾーンと年ごと、1 本 0.2〜4MB) だけです。
地域と期間を指定して取る例は、本家の Colab ノートブック (`open_buildings_temporal_download_region_geotiffs.ipynb`) にあります。

### Earth Engine

ポリゴンは `GOOGLE/Research/open-buildings/v3/polygons`、2.5D Temporal は `GOOGLE/Research/open-buildings-temporal/v1` として [[Google Earth Engine]] にあります。
Earth Engine には登録が要るので、確かめていません。

### 第三者による PMTiles (foil4g が使っているもの)

foil4g の `src/components/Datasets/GoogleOpenBuildings/source.ts` は、Source Cooperative で Chris Holmes が公開している v3 の [[PMTiles]] を表示に使っています。

- URL: `https://data.source.coop/cholmes/google-open-buildings/google-open-buildings.pmtiles`
- 130,580,275,345 バイト (約 131GB)、更新日 2023-09-28。Range に 206、CORS は `access-control-allow-origin: *`。
- PMTiles v3、MVT、ズーム 0〜15、レイヤーは `buildings` の 1 つ。属性は `area_in_meters` と `confidence` だけで、`full_plus_code` と重心の緯度経度は落としてある。
- 作成は tippecanoe v2.25.0 (`--drop-densest-as-needed --coalesce-densest-as-needed`)。低いズームでは建物が間引かれ、まとめられている。
- ナイロビ中心部 (経度 36.80〜36.84、緯度 -1.30〜-1.27) をズーム 15 まで `pmtiles extract` すると、31 回の要求、7.9MB で取れ、ズーム 15 の建物は 54,631 件だった。

`source.ts` は `minzoom: 2`、`maxzoom: 18` としていますが、ファイルが持つのはズーム 15 までです。
MapLibre の source の `maxzoom` は「タイルがある最大のズーム」の意味なので、ファイルに合わせて 15 にするのが筋です。
ズーム 16 以上でどう表示されるかは、ブラウザで確かめていません。

## 使いどころ

- 人口の推定 ([[SDGs]] 目標 17.18、17.19): 国勢調査が古い地域で、建物の数と面積を [[WorldPop 人口グリッド]] などの人口推定の材料にできます。
- 人道支援と防災 (目標 11.5、13.1、仙台防災枠組): 洪水、地震、サイクロンの被災範囲に入る建物の数を数え、影響を受ける世帯の規模を見積もれます。UNHCR は避難民の地域で世帯調査の標本を作るのに使ったと本家は紹介しています。
- 電化と基礎サービスの計画 (目標 3.8、4.a、7.1): 建物の分布から、未電化の集落や、学校や診療所から遠い集落を探せます。本家は Uganda のエネルギー省の電化計画、IEA のエネルギー需要の推定、ワクチン接種の計画を例に挙げています。
- 都市化の把握 (目標 11.1、11.3): 2.5D Temporal の年ごとの件数と高さから、2016 年以降に市街地がどこへ広がったかを追えます。
- 住所の無い地域の住所付け: 各建物の Plus Code を、住所の仕組みの立ち上げに使えます。
- [[OpenStreetMap]] への取り込み: ODbL を選べば OSM に取り込めます。本家は、人が確かめること、地元の知識と合わせること、精度 90% の閾値より低い建物を落としてから始めることを勧めています。

使ってはいけない使い方もあります。

- 日本、欧州、北米など対象外の地域の分析には使えません。そこに建物が無いのではなく、データが無いだけです。
- 紛争地などは除かれているので、「建物が無い = 人がいない」と読んではいけません。紛争の被害の把握や避難民の数の推定に使うときは特に注意が要ります。
- ポリゴンは 1 時点 (しかも場所ごとに撮影時期が違う) なので、ある日付の建物の有無の証拠にはなりません。
- 2.5D Temporal の高さは実効 4m 解像度の推定で、Global South では精度が測られていません。1 棟ごとの高さや階数、構造の判断には使えません。
- 建物の用途 (住居か、倉庫か、学校か) は分かりません。

## ライセンスと帰属表示

ポリゴン版と 2.5D Temporal 版の両方が、[[CC-BY-4.0]] と [[ODbL-1.0]] の二重ライセンスです。
どちらか一方を利用者が選び、選んだほうの条件だけに従います。
両方の条件を同時に満たす必要はありません。

本家の FAQ (ポリゴン版) の原文です。

> The data is shared under the Creative Commons Attribution (CC BY-4.0) license and the Open Data Commons Open Database License (ODbL) v1.0 license. As the user, you can pick which of the two licenses you prefer and use the data under the terms of that license.

二重にした理由として、本家は次のように書いています。

> We wanted to make the data compatible for ingestion by those working with ODbL-licensed datasets (namely the OpenStreetMap community) while enabling people who don't use ODbL licensing to use it under the terms of the CC BY-4.0 license.

選び方の目安は次のとおりです。

- OpenStreetMap に取り込む、または ODbL のデータ (OSM、Microsoft の建物データなど) と混ぜたデータベースを作って配るなら、ODbL 1.0 を選びます。その場合、作ったデータベースを公開するときは ODbL で公開すること (share-alike) が求められます。
- それ以外の用途 (分析、地図の画像、論文、自分のデータとの組み合わせ) で、派生物に share-alike を課したくないなら、CC BY 4.0 を選びます。帰属表示をすれば、派生物のライセンスは自由に決められます。

第三者が加工したものは、条件が本家と違うことがあります。
Source Cooperative の cholmes 版 (上の PMTiles を含む) は README に本家と同じ二重ライセンスを書いています。
一方、Google と Microsoft の建物を混ぜた VIDA の版などは ODbL だけになっています (このカードでは確かめていません。使う前にそれぞれの README を読んでください)。

2.5D Temporal には、Sentinel-2 の利用について次の表記があります。

> We have leveraged Copernicus Sentinel data (2016-2023) processed by the European Space Agency.

本家は決まった帰属表示の文を示していません。
CC BY 4.0 を選ぶ場合は、例えば次のように表示します。

- ポリゴン: Google Open Buildings v3 (Google Research), CC BY 4.0, https://sites.research.google/gr/open-buildings/
- 2.5D Temporal: Google Open Buildings 2.5D Temporal Dataset (Google Research), CC BY 4.0. Contains modified Copernicus Sentinel data (2016-2023).

本家は、役に立ったときは技術報告を引用するよう求めています。

- ポリゴン: W. Sirko, S. Kashubin, M. Ritter, A. Annkah, Y.S.E. Bouchareb, Y. Dauphin, D. Keysers, M. Neumann, M. Cisse, J.A. Quinn. Continental-scale building detection from high resolution satellite imagery. arXiv:2107.12283, 2021.
- 2.5D Temporal: W. Sirko, E.A. Brempong, J.T.C. Marcos, A. Annkah, A. Korme, M.A. Hassen, K. Sapkota, T. Shekel, A. Diack, S. Nevo, J. Hickey, J.A. Quinn. High-Resolution Building and Road Detection from Sentinel-2. arXiv:2310.11622, 2023.

両ページとも、損害について責任を負わない旨の免責の文 (英語、大文字) を脚注に付けています。

## 気をつけること

- 版: v1、v2、v3 は同じバケットに残っています。URL の `v3` を `v1` や `v2` に変えると旧版になります。版ごとに範囲も精度も違うので、混ぜないでください。
- 対象国の一覧が 2 つのページで違います。2.5D Temporal の一覧にはマリ (MLI) とチャド (TCD) があり、ポリゴン v3 の一覧にはありません。逆に英領ヴァージン諸島 (VGB) はポリゴン v3 の一覧にだけあります。
- 一覧には、プエルトリコ (PRI)、米領ヴァージン諸島 (VIR)、マヨット (MYT)、フォークランド諸島 (FLK) などの海外領土が含まれます。一方、パキスタン、アフガニスタン、イラン、イエメン、シリア、南スーダン、リビア、ミャンマー、パプアニューギニアは一覧にありません。
- 本家の「1 ファイル最大 7.8GB」は実測で 8.42GB (8,423,792,523 バイト) でした。2 の 30 乗を 1GB とすると本家の値に合います。合計の 178GB は 10 の 9 乗で合います。
- 閾値表は 312 行で、タイルは 333 本です。21 本の小さいタイル (例えば `32b`) には閾値がありません。
- `level_6_gzip_no_header` にはヘッダー行がありません。列の順はレベル 4 のファイルと同じだと仮定して読んでください (確かめていません)。
- 座標系: CSV は WGS84 の経緯度 (WKT)。2.5D Temporal の GeoTIFF はタイルごとに UTM のゾーンが違うので、広い範囲を 1 枚にするときは再投影が要ります。
- 2.5D Temporal は年ごとにフォルダの数が違い (13,693〜13,988)、全部のセルに 8 年分そろっているわけではありません。2016 年と 2017 年は Sentinel-2 の画像が少なく、値が不安定です。年の間で少し位置がずれ、タイルの境目に継ぎ目が出ます。太陽光パネル、農業用のハウス、岩、雪を建物と誤ることがあります。
- Google マップの建物とは同じではありません。一部は同じモデルから来ていますが、全体は別の集合です。
- [[Overture Maps]] の buildings や、Microsoft の Global ML Building Footprints と混ぜた版には、Google の建物が一部含まれます。取り違えると、ライセンスと件数を誤ります。
- 上の PMTiles の tilestats の件数は 1,808,276,459 件で、本家の閾値表の合計 (1,848,201,804 件) と合いません。差の理由は確かめていません。

## データ処理コマンド

2026-10-06 に GDAL 3.9.2 と pmtiles コマンドで動かして確かめました。

```bash
mkdir -p ./tmp

# ポリゴン v3 の分割タイルの一覧 (範囲、URL、MB) を取る
curl -s -o ./tmp/tiles.geojson https://openbuildings-public-dot-gweb-research.uw.r.appspot.com/public/tiles.geojson

# 大きさと Range 対応を確かめる
curl -sI https://storage.googleapis.com/open-buildings-data/v3/polygons_s2_level_4_gzip/32b_buildings.csv.gz

# いちばん小さいタイルの 1 本 (12,230 バイト、134 棟) を GeoPackage にする
ogr2ogr -f GPKG ./tmp/32b.gpkg \
  /vsigzip//vsicurl/https://storage.googleapis.com/open-buildings-data/v3/polygons_s2_level_4_gzip/32b_buildings.csv.gz \
  -oo GEOM_POSSIBLE_NAMES=geometry -oo KEEP_GEOM_COLUMNS=NO -oo AUTODETECT_TYPE=YES \
  -a_srs EPSG:4326 -nln buildings

# confidence で絞って数える
ogrinfo -q ./tmp/32b.gpkg -sql "SELECT COUNT(*), MIN(confidence) FROM buildings WHERE confidence >= 0.8"

# セルごとの精度の閾値表を取る
curl -s -o ./tmp/score_thresholds.csv https://storage.googleapis.com/open-buildings-data/v3/score_thresholds_s2_level_4.csv

# 2.5D Temporal: ナイロビ中心部のタイル (2023 年) のヘッダーを読む
gdalinfo /vsicurl/https://storage.googleapis.com/open-buildings-temporal-data/v1/geotiffs/182f4_2023_06_30/tile_CmHtoB8DB3g.tif

# 2km 四方 (UTM 37S の座標) を 4m に間引いて取り出し、3 バンドの統計を見る
gdal_translate -projwin 256000 9858000 258000 9856000 -tr 4 4 \
  /vsicurl/https://storage.googleapis.com/open-buildings-temporal-data/v1/geotiffs/182f4_2023_06_30/tile_CmHtoB8DB3g.tif \
  ./tmp/nairobi_2023.tif
gdalinfo -stats ./tmp/nairobi_2023.tif

# 第三者の PMTiles (foil4g が表示に使っているもの) のヘッダーを見て、ナイロビ中心部だけ取り出す
pmtiles show https://data.source.coop/cholmes/google-open-buildings/google-open-buildings.pmtiles
pmtiles extract https://data.source.coop/cholmes/google-open-buildings/google-open-buildings.pmtiles \
  ./tmp/nairobi.pmtiles --bbox=36.80,-1.30,36.84,-1.27 --maxzoom=15
ogrinfo -so ./tmp/nairobi.pmtiles -oo ZOOM_LEVEL=15 buildings
```

`v1/manifests/` の JSON から座標に合うタイルを探す手順 (`uriPrefix` とタイルの相対パスをつなぐ) は、Python で 1 回だけ試しました。
コマンドとしては載せていません。

## 関連項目

- [[Google Research]]
- [[Google Earth Engine]]
- [[Sentinel-2]]
- [[OpenStreetMap]]
- [[Overture Maps]]
- [[GHSL 人口・建物・都市化度]]
- [[WorldPop 人口グリッド]]
- [[Kontur Population]]
- [[ESA WorldCover 土地被覆]]
- [[HDX]]
- [[SDGs]]
- [[PMTiles]]
- [[GeoTIFF]]
- [[GeoPackage]]
- [[CC-BY-4.0]]
- [[ODbL-1.0]]

## 確認日

2026-10-06 に次のことを確かめました。

- 本家の 2 つのページ (ポリゴン版と 2.5D Temporal 版) を取得し、説明、列、版の歴史、FAQ、ライセンスの文言、対象国の一覧を読みました。対象国の一覧は 2 つのページで突き合わせ、JPN、USA、欧州の国が無いことを確かめました。
- `gs://open-buildings-data/` を GCS の JSON API で匿名で一覧し、v1〜v3 の主な置き場所の本数と合計を数えました。最大のファイルに HEAD と Range 要求 (206) を出しました。
- `32b_buildings.csv.gz` と閾値表と `tiles.geojson` を丸ごと取得して読みました。`tiles.geojson` の外接矩形に、東京、大阪、パリ、ベルリン、マドリード、ニューヨークを含むものはありませんでした。
- 2.5D Temporal のバケットの最上位、1 フォルダの中身、マニフェスト 2 本を読み、GeoTIFF 3 本のヘッダーと、ナイロビの 2km 四方の値を GDAL で読みました。
- foil4g の `source.ts` の PMTiles に HEAD、Range、`pmtiles show`、`pmtiles extract` をかけ、Source Cooperative の README のライセンスの節を読みました。

確かめられなかったことは次のとおりです。

- Earth Engine の 2 つのアセット (登録が要るため)。
- HDX の 20 か国分の中身。
- `v3/polygons_s2_level_4/`、`polygons_single_csv/`、`points_s2_level_6_gzip_no_header/` の合計の大きさと、2.5D Temporal のファイル数と合計の大きさ。年ごとのフォルダ数は以前の調査の値で、この日は数え直していません。
- 除外された紛争地などの範囲。
- foil4g の地図がズーム 16 以上でどう表示されるか。
