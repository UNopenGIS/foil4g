# GHSL 人口・建物・都市化度

> [[欧州委員会]]の[[共同研究センター]] (JRC) が、全世界の人口 (GHS-POP)、建物の面積 (GHS-BUILT-S)、都市化度の区分 (GHS-SMOD) を 1975 年から 2030 年まで 5 年ごとの格子にして、[[GeoTIFF]] の zip で配っている Global Human Settlement Layer (GHSL)

## データソース情報

| 項目 | 内容 |
| --- | --- |
| データID | ghsl |
| 提供元 | [[欧州委員会]] [[共同研究センター]] (JRC)。[[Copernicus]] 緊急管理サービスの一部として公開 |
| 元データ | 衛星画像 (Sentinel-2 の 2018 年合成画像、Landsat)、[[CIESIN]] の Gridded Population of the World v4.11 の国勢調査の値、国連 World Population Prospects 2022 と World Urbanization Prospects 2018 を JRC が加工したもの |
| ライセンス | [[CC-BY-4.0]] (配布サーバーの `copyright.txt` に明記) |
| 取り出し方 | split。製品・エポック・解像度・投影法ごとに 1 ファイルで、モルワイデ図法のものはさらに 1,000km 四方の 375 タイルに分かれる。タイルはタイル区画の Shapefile で緯度経度から選べる。zip なので Range で中を部分読みすることはできない |
| データ形式 | zip に入った [[GeoTIFF]] (1 バンド)。GHS-SMOD は色表 (`.clr`) と、都市の中心部などの境界の Shapefile も付く |
| 範囲 | 全世界 (モルワイデ図法の範囲 x ±18,041,000m、y ±9,000,000m) |
| 期間 | 1975 年から 2030 年まで 5 年ごとの 12 エポック。2025 年と 2030 年は推計。別の版 (GHS-WUP R2025A) は 2100 年まで |
| 解像度または単位 | GHS-POP は 100m・1km (モルワイデ) と 3 秒・30 秒 (WGS84)。GHS-BUILT-S は同じ 4 種と 2018 年だけ 10m。GHS-SMOD は 1km と 30 秒。値は人数 (POP)、平方メートル (BUILT-S)、区分コード (SMOD) |
| 大きさ | 2020 年の全球 1 ファイル: GHS-POP 1km 322,293,568 バイト、100m 5,097,074,334 バイト、30 秒 482,351,880 バイト、3 秒 12,554,406,149 バイト。GHS-BUILT-S 1km 152,527,564 バイト、100m 2,036,312,871 バイト、10m (2018 年) 32,708,182,978 バイト。GHS-SMOD 1km 35,853,870 バイト。タイル 1 枚は GHS-POP 1km で 2〜3MB 程度 |
| 更新頻度 | 不定期の版 (リリース) ごと。R2023A のファイルの Last-Modified は 2025-01-27 |
| URL | https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL/ |
| 説明ページ | https://human-settlement.emergency.copernicus.eu/datasets.php |
| 技術資料 | GHSL Data Package 2023 (doi:10.2760/098587)。各 zip に `GHSL_Data_Package_2023_light.pdf` として同梱 |

## 概要

GHSL は、人が住み、建物を建てている場所を全世界で同じ方法で格子に表したデータの集まりです。
このカードでは、主な 3 つの製品の R2023A 版を扱います。

- GHS-BUILT-S: 格子の中の建物 (屋根のある構造物) の面積です。Sentinel-2 の 2018 年合成画像を機械学習で分類して 10m の建物率を作り、Landsat の過去の画像から 1975 年以降の変化を推定しています。住宅以外 (NRES) の面積も別のファイルで配っています。
- GHS-POP: 格子の中の居住人口です。国勢調査の区域ごとの人数 (GPW v4.11) を、建物の体積 (GHS-BUILT-V) を目安に格子へ割り振っています。全体の人数は国連の World Population Prospects 2022 に合わせてあります。
- GHS-SMOD: 1km の格子を、人口密度と人口のまとまりの大きさで都市の中心部、町、農村などに分けたものです。国連統計委員会が承認した Degree of Urbanisation (都市化度) の手法の第 1 段階を、上の GHS-POP と GHS-BUILT-S に当てはめています。

ほかに、建物の高さ (GHS-BUILT-H、2018 年のみ)、建物の体積 (GHS-BUILT-V)、行政区域ごとの都市化度 (GHS-DUC) なども同じサーバーにあります。

作り方の限界です。

- 人口は観測ではなく推計です。2020 年以前も含めて、国勢調査の区域の人数を建物の分布で割り振ったものなので、国勢調査の区域が粗い国では格子の値の信頼度が下がります。
- 2025 年と 2030 年は推計 (外挿) です。技術資料は、衛星画像が足りない 1975 年と将来の 2025 年・2030 年の建物を、時空間の内挿・外挿で求めたと書いています。
- 建物の面積は衛星画像からの推定で、技術資料に土地被覆の種類ごとの誤差の表があります。

## 内容

各ファイルは 1 バンドの GeoTIFF です。
ファイル名は `GHS_<名前>_E<エポック>_GLOBE_R2023A_<投影法>_<解像度>_V<版>` の形です。
投影法の `54009` は World Mollweide (ESRI:54009)、`4326` は WGS84 (EPSG:4326) です。
解像度の `100` と `1000` はメートル、`3ss` と `30ss` は秒 (約 100m と約 1km) です。

エポックは 1975、1980、1985、1990、1995、2000、2005、2010、2015、2020、2025、2030 の 12 個です。

| 製品 | 値 | 型 | 欠損 (NoData) | 解像度と投影法 |
| --- | --- | --- | --- | --- |
| GHS-POP | 格子の中の居住人口 (人、小数) | Float64 | -200 | 100m・1km (54009)、3ss・30ss (4326) |
| GHS-BUILT-S | 格子の中の建物の面積 (平方メートル)。100m は 0〜10,000、1km は 0〜1,000,000 | UInt16 (100m)、UInt32 (1km) | 65535 (100m)、4294967295 (1km) | 100m・1km (54009)、3ss・30ss (4326)、2018 年だけ 10m (54009、建物率 0〜100、NoData 255) |
| GHS-BUILT-S NRES | 住宅以外の建物の面積 (平方メートル) | 同上 | 同上 | 同上 |
| GHS-SMOD | 都市化度の区分コード | Int16 | -200 | 1km (54009)、30ss (4326) |

GHS-SMOD の区分コード (第 2 階層) です。
十の位が第 1 階層 (3 都市の中心部、2 都市のまとまり、1 農村) に当たります。

| コード | 名前 | 定義の要点 |
| --- | --- | --- |
| 30 | Urban Centre (都市の中心部) | 1km² あたり 1,500 人以上の格子が接してまとまり、合計 5 万人以上 |
| 23 | Dense Urban Cluster | 1km² あたり 1,500 人以上で、合計 5,000 人以上 5 万人未満 |
| 22 | Semi-dense Urban Cluster | 1km² あたり 900 人以上で合計 2,500 人以上、密な都市から 2km 以上離れている |
| 21 | Suburban or peri-urban (郊外) | 都市のまとまり (300 人以上で合計 5,000 人以上) のうち、上の 3 つに入らない格子 |
| 13 | Rural Cluster (村) | 1km² あたり 300 人以上で、合計 500 人以上 5,000 人未満 |
| 12 | Low Density Rural | 1km² あたり 50 人以上で、村に入らない格子 |
| 11 | Very Low Density Rural | 1km² あたり 50 人未満 |
| 10 | Water (水域) | 半分以上が恒常的な水面で、人も建物もない格子 |

東京を含むタイル (R5_C31、2020 年) を開くと、海も含めて 100 万格子のうち 820,453 が 10 (水域)、14,961 が 30 (都市の中心部) でした。
海は NoData ではなく 10 で埋まっています。

GHS-SMOD の zip には、都市の中心部 (`_UC_`) と Dense Urban Cluster (`_DUC_`) の境界の Shapefile が別に置いてあります。
技術資料によると、属性は ID と、その範囲の 2020 年の人口 (`POP_2020`) と建物面積 (`BU_2020`) です。

技術資料に載っている GHS-POP 1km の全世界の人口の合計は、1975 年 4,069,437,259 人、2020 年 7,840,952,947 人、2030 年 8,546,141,407 人です。

## 取り出し方

区分は split です。

- 配布サーバーは Apache の一覧を返すので、製品 (`GHS_POP_GLOBE_R2023A/` など)、エポックと解像度と投影法 (`GHS_POP_E2020_GLOBE_R2023A_54009_1000/`)、版 (`V1-0/`) の順にたどれます。
- 各版のフォルダーに全球 1 ファイルの zip と `tiles/` があります。GHS-POP 1km と 100m、GHS-SMOD 1km、GHS-BUILT-S 10m の `tiles/` を数えると、どれも `R{行}_C{列}.zip` が 375 個でした。
- タイルは 1,000km 四方です。タイル区画は Shapefile (`GHSL_data_54009_shapefile.zip`、1,330,530 バイト、375 区画、属性 `tile_id`、`left`、`top`、`right`、`bottom`) で配られていて、緯度経度をモルワイデ図法に直せば、どのタイルを取ればよいか分かります。
- 例えば東京は R5_C31 で、GHS-POP 2020 年 1km のタイルは 2,564,510 バイト、100m のタイルは 29,604,923 バイトでした。
- 全球の zip とタイルの zip は、どちらも Range 要求に 206 を返しました。ただし中身は zip に入った GeoTIFF なので、COG のように必要な範囲だけを読むことはできません。必要なタイルを丸ごと取って展開します。
- 認証は要りません。

画面のダウンロードページ (`download.php?ds=pop` など) は JavaScript で組み立てられていて、HTML に製品や年の一覧は入っていません。
機械で取るときは、上の配布サーバーの一覧をたどるほうが確実です。

## 使いどころ

- SDG 11 (住み続けられるまちづくり): 都市の範囲を国ごとの定義に頼らずに同じ基準で切り出せます。指標 11.3.1 (市街地の拡大率と人口増加率の比) は、建物面積と人口の時系列が要る指標です。技術資料の文献一覧には「Global Human Settlement Layer as Baseline for the Land Use Efficiency Indicator - SDG 11.3.1」(Melchiorri ほか 2019) が挙がっています。ただし、国連の公式の指標メタデータが GHSL をどう位置づけているかは確かめていません。
- 都市と農村の区分: GHS-SMOD は、国連統計委員会第 51 回会合が国際比較のために承認した Degree of Urbanisation の手法を格子に当てはめたものです (説明ページの記述)。手法は EU、OECD、世界銀行、FAO、UN-Habitat、ILO の共同提案です。世帯調査などを都市・町・農村に分けて集計するときの共通の物差しになります。説明ページは、国連経済社会局人口部の World Urbanization Prospects と UN-Habitat の World Cities Report に GHSL が使われていると書いています。
- 人道支援と防災: 洪水や地震の範囲と重ねて、影響を受ける人口や建物の量を見積もれます。GHSL は Copernicus 緊急管理サービスの曝露マッピングの中心データと説明されています。
- 長期の変化: 1975 年から同じ方法で並んでいるので、都市の広がりや人口の偏りの移り変わりを国をまたいで比べられます。

使ってはいけない使い方です。

- 1 格子 (特に 100m) の人数を、その場所の実際の人数として扱わないでください。国勢調査の区域の人数を割り振った推計です。
- 2025 年と 2030 年の値を観測値として扱わないでください。
- 国内の公式の統計 (国勢調査の小地域集計など) がある国で、それより GHSL を優先する理由はありません。GHSL の利点は全世界で同じ方法であることです。
- GHS-SMOD の区分は、各国が法律や統計で定めている「市」や「都市部」とは別物です。

## ライセンスと帰属表示

配布サーバーの各フォルダーにある `copyright.txt` が [[CC-BY-4.0]] と明記しています。

> (c) European Union, 1995-2026
> Any copyright and/or sui generis right on the dataset is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. Reuse is allowed provided appropriate credit is given and any changes are indicated.

根拠は欧州委員会の文書の再利用に関する決定 (Commission Decision 2011/833/EU) です。
ダウンロードページには「© European Union, 1995-2025. Reuse of this data is authorised with proper acknowledgment of the source.」とあります。

説明ページは製品ごとに引用の形を示しています。
例えば次のとおりです。

- Schiavina M., Freire S., Carioli A., MacManus K. (2023): GHS-POP R2023A - GHS population grid multitemporal (1975-2030). European Commission, Joint Research Centre (JRC). doi:10.2905/2FF68A52-5B5B-4A22-8F40-C41DA8332CFE
- Pesaresi M., Politis P. (2023): GHS-BUILT-S R2023A - GHS built-up surface grid, derived from Sentinel2 composite and Landsat, multitemporal (1975-2030). European Commission, Joint Research Centre (JRC). doi:10.2905/9F06F36F-4B11-47EC-ABB0-4F8B7B1D72EA
- Schiavina M., Melchiorri M., Pesaresi M. (2023): GHS-SMOD R2023A - GHS settlement layers, application of the Degree of Urbanisation methodology (stage I) to GHS-POP R2023A and GHS-BUILT-S R2023A, multitemporal (1975-2030). European Commission, Joint Research Centre (JRC). doi:10.2905/A0DF7A6F-49DE-46EA-9BDE-563437A6E2BA

第三者データの例外です。
行政区域ごとの都市化度 (GHS-DUC) は GADM 4.1 の行政区域に当てはめたもので、ダウンロードページは GADM のライセンスのページへリンクしています。
GADM は商用利用を認めていないので、GHS-DUC と、それと組み合わせる GADM の境界を使うときは GADM の条件も確かめてください。
GHS-POP、GHS-BUILT-S、GHS-SMOD の格子そのものには、この例外の記述は見当たりませんでした。

## 気をつけること

- 版が複数あります。配布サーバーには R2022A、R2023A、R2024A (都市データベースなど)、R2025A (北極域の版と、国連 World Urbanization Prospects 向けに 2100 年まで延ばした GHS-WUP) が並んでいます。R2023A の 2030 年までと、GHS-WUP R2025A の 2030 年以降は別の製品です。
- 同じ R2023A の中にも版 (V1-0、V2-0) があります。GHS-SMOD の `V1-0/` には `---OBSOLETE_VERSION---.txt` が置かれていて、`V2-0/` が新しい版です。ダウンロードページの都市の中心部の境界のリンクは、2026-10-06 の時点で古い `V1-0` の zip を指していました。
- 座標系です。モルワイデ図法 (ESRI:54009) は面積を保つので、人口密度や面積の集計に向きます。WGS84 版 (3ss・30ss) は JRC が体積を保つ方法で変換したものです。技術資料は、モルワイデ版を自分で再投影するには専門知識が要ると断っています。ESRI:54009 は EPSG の番号ではないので、ツールによっては `ESRI:54009` と書く必要があります。
- 説明ページの解像度の一覧と、配布サーバーの実物が一致しません。説明ページは GHS-BUILT-S を 100m と 1km、GHS-SMOD をモルワイデだけとしていますが、配布サーバーには GHS-BUILT-S の 3ss・30ss・10m と、GHS-SMOD の 30ss もあります。技術資料も、タイルを 100km 四方と書いていますが、実物の 1km のタイルは 1,000 × 1,000 画素の 1,000km 四方でした。
- GHS-SMOD の 30ss 版は `V2-0/` にだけあり、`V1-0/` の名前で取ろうとすると 404 になります。
- 似た名前の別のデータとの取り違えに注意してください。[[WorldPop 人口グリッド]]や [[Kontur Population]] も全世界の人口の格子ですが、作り方も版も違います。GHS-BUILT-S は建物の面積の格子で、建物 1 棟ずつの形 ([[Google Open Buildings]] など) ではありません。

## データ処理コマンド

2026-10-06 に実際に動かしたコマンドです。
GDAL (gdaltransform、ogrinfo、gdalinfo、gdallocationinfo) を使います。

```bash
mkdir -p ./tmp && cd ./tmp
B=https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/GHSL

# 大きさと更新日を確かめる
curl -sIL $B/GHS_POP_GLOBE_R2023A/GHS_POP_E2020_GLOBE_R2023A_54009_1000/V1-0/GHS_POP_E2020_GLOBE_R2023A_54009_1000_V1_0.zip

# タイル区画の Shapefile を取る
curl -sL -o tiles_shp.zip https://human-settlement.emergency.copernicus.eu/download/GHSL_data_54009_shapefile.zip

# 緯度経度 (例: 東京) をモルワイデ図法に直し、それを含むタイルを探す
read X Y Z <<< "$(echo '139.6917 35.6895' | gdaltransform -s_srs EPSG:4326 -t_srs ESRI:54009)"
ogrinfo -q -ro /vsizip/tiles_shp.zip/GHSL2_0_MWD_L1_tile_schema_land.shp GHSL2_0_MWD_L1_tile_schema_land -spat $X $Y $X $Y -geom=NO | grep tile_id
# => tile_id (String) = R5_C31

# そのタイルの人口 (2020 年、1km) と都市化度 (2020 年、1km) を取る
curl -s -o pop.zip $B/GHS_POP_GLOBE_R2023A/GHS_POP_E2020_GLOBE_R2023A_54009_1000/V1-0/tiles/GHS_POP_E2020_GLOBE_R2023A_54009_1000_V1_0_R5_C31.zip
curl -s -o smod.zip $B/GHS_SMOD_GLOBE_R2023A/GHS_SMOD_E2020_GLOBE_R2023A_54009_1000/V2-0/tiles/GHS_SMOD_E2020_GLOBE_R2023A_54009_1000_V2_0_R5_C31.zip
unzip -l pop.zip

# 中身を見る (zip のまま読める)
gdalinfo /vsizip/pop.zip/GHS_POP_E2020_GLOBE_R2023A_54009_1000_V1_0_R5_C31.tif

# 1 点の値を読む
gdallocationinfo -valonly -wgs84 /vsizip/pop.zip/GHS_POP_E2020_GLOBE_R2023A_54009_1000_V1_0_R5_C31.tif 139.6917 35.6895
# => 22307.74... (人)
gdallocationinfo -valonly -wgs84 /vsizip/smod.zip/GHS_SMOD_E2020_GLOBE_R2023A_54009_1000_V2_0_R5_C31.tif 139.6917 35.6895
# => 30 (Urban Centre)

# 区分ごとの格子数を見る
gdalinfo -hist /vsizip/smod.zip/GHS_SMOD_E2020_GLOBE_R2023A_54009_1000_V2_0_R5_C31.tif
```

## 関連項目

- [[欧州委員会]]
- [[共同研究センター]]
- [[Copernicus]]
- [[CIESIN]]
- [[Degree of Urbanisation]]
- [[国連統計委員会]]
- [[SDGs]]
- [[WorldPop 人口グリッド]]
- [[Kontur Population]]
- [[Google Open Buildings]]
- [[ESA WorldCover 土地被覆]]
- [[geoBoundaries 行政区域]]
- [[GADM]]
- [[GeoTIFF]]
- [[GDAL]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次のことを確かめました。

- 配布サーバーの一覧をたどり、製品、エポック、解像度、版のフォルダーを確かめました。GHS-POP、GHS-BUILT-S、GHS-SMOD の R2023A の主なファイルに HEAD を送って大きさと Last-Modified を、GHS-POP と GHS-SMOD の全球 zip に Range 要求を送って 206 を確かめました。
- `copyright.txt` を読んでライセンスを確かめました。
- 説明ページ (`datasets.php`、`degurbaOverview.php`、`degurbaDefinitions.php`、`GHSLStudiesUrbanisation.php`、`download.php?ds=pop`) を読みました。製品ごとのページ (`ghs_pop2023.php` など) は JavaScript で中身を描くため、本文は読めませんでした。
- タイル区画の Shapefile、GHS-POP と GHS-SMOD の東京のタイル、R7_C22 のタイルを取り、GDAL で座標系、画素の大きさ、NoData、値を確かめました。値の型、範囲、SMOD の区分の定義、全世界の人口の合計は、zip に同梱された技術資料 (GHSL Data Package 2023) で確かめました。
- GHS-SMOD の全球 zip (約 36MB) は、配布サーバーの転送が遅く取り切れなかったため、中身はタイルでしか確かめていません。
- GHS-BUILT-S の中身 (GeoTIFF) は開いていません。値の型と範囲は技術資料の記述です。
- 国連の SDG 指標メタデータ (11.3.1 など) が GHSL をどう扱っているかは確かめていません。
