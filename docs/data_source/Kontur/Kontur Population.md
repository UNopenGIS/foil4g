# Kontur Population

> [[Kontur]] が全世界の人口を [[H3]] の解像度 8 の六角形 (約 400m) ごとに推計し、[[Humanitarian Data Exchange]] (HDX) で全世界版と国別版の [[GeoPackage]] として配っているデータ

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | kontur_population |
| 提供元           | [[Kontur]] (Kontur, Inc.) |
| 元データ         | [[GHSL 人口・建物・都市化度]] の GHS-POP R2023A、Facebook (Meta) の High Resolution Settlement Layer (HRSL)、Microsoft Building Footprints、LINZ NZ Building Outlines、Copernicus Global Land Service Land Cover 100m、[[OpenStreetMap]]、Geoalert Urban Mapping、国連 World Population Prospects |
| ライセンス       | [[CC-BY-4.0]] と読むのが自然 (HDX と Kontur は「CC BY」とだけ書き、版番号は書いていない。下のライセンスの節を参照) |
| 取り出し方       | split。HDX に国別版 (250 の国と地域) があり、国を単位に取得できる。各ファイルは gzip 圧縮の GeoPackage で、ファイルの中は whole (Range は 206 を返すが、gzip の途中からは展開できない) |
| データ形式       | [[GeoPackage]] (`.gpkg.gz`)、ポリゴン、EPSG:3857 |
| 範囲             | 全世界 (人のいる陸地だけ) |
| 期間             | 2023-11-01 版が最新 (HDX の期間の表記は 2020-03-11 から 2023-11-01 で、これは版の日付の幅) |
| 解像度または単位 | H3 解像度 8 の六角形 (平均面積 0.737km²、Kontur は「400m」と呼んでいる)。値は六角形の中の人数 |
| 大きさ           | 全世界版 2023-11-01 の `.gpkg.gz` が 2,436,991,241 バイト。国別版の日本 (2023-11-01) は `.gpkg.gz` が 16,070,678 バイト、展開後 45,776,896 バイト |
| 更新頻度         | HDX の表記は「As needed」。版は 2020-03-11、2020-09-28、2021-11-09、2022-06-30、2023-11-01 の 5 つで、2023-11-01 より後の版はない (2026-10-06 時点) |
| URL              | https://geodata-eu-central-1-kontur-public.s3.eu-central-1.amazonaws.com/kontur_datasets/kontur_population_20231101.gpkg.gz |
| 説明ページ       | https://data.humdata.org/dataset/kontur-population-dataset 、https://www.kontur.io/datasets/population-dataset/ |
| 国別版の一覧     | https://data.humdata.org/organization/kontur |
| foil4g の表示用  | https://data.source.coop/smartmaps/foil4gr1/kpop.pmtiles ([[PMTiles]]、作成手順は https://github.com/optgeo/kpop-pmtiles) |

## 概要

Kontur, Inc. が作っている、全世界の人口分布の推計です。
地表を [[H3]] の解像度 8 の六角形で区切り、人がいると推計された六角形ごとに人数を 1 行で持っています。
HDX のデータセットの題名は「Kontur Population: Global Population Density for 400m H3 Hexagons」です。

HDX の methodology によると、作り方は次のとおりです。

- [[GHSL 人口・建物・都市化度]] の人口グリッドと、Facebook の HRSL (ある地域だけ) を重ねて人口を計算する。
- [[OpenStreetMap]] を手がかりに、採石場や大きな道路、湖、川、氷河、砂地、森林などを無人にする (GHSL がそこを人がいると誤検出しやすいため)。
- Microsoft Building Footprints、LINZ の建物データ、Copernicus の土地被覆 100m で分布を補正する。建物がある所には人がいると見なす (アフリカで HRSL が取りこぼす人を拾うため)。
- 行政区画の合計が国連の人口推計と大きく違うときは、係数をかけて合わせる。
- 0.25km² に 50 万人のような極端な値は周りのセルに散らし、小数の人数は整数に丸める。

つまり観測値ではなく、複数のデータを組み合わせて作った推計です。
HDX の caveats は「Dataset is primarily designed to support visualization behind https://disaster.ninja project and may not be suitable for your specific needs.」と書いており、主な目的は Kontur 自身の災害可視化サービスの背景表示です。
入力の GHSL や HRSL の年次と、どの年の人口に合わせたかは、HDX の記述からははっきりしません (下の気をつけることを参照)。

同じ HDX の組織には、解像度を粗くした版が別のデータセットとしてあります。

- 3km 版 (H3 解像度 6): `kontur-population-dataset-3km`、2023-11-01 版の `kontur_population_20231101_r6.gpkg.gz` が 185,340,844 バイト。
- 22km 版 (H3 解像度 4): `kontur-population-dataset-22km`、2023-11-01 版の `kontur_population_20231101_r4.gpkg.gz` が 6,659,105 バイト。

Kontur のページには、API や加工済みファイルの有料の提供もあると書かれていますが、このカードが扱うのは HDX の無償の配布だけです。

## 内容

国別版の日本 (`kontur_population_JP_20231101.gpkg`) を開いて確かめた内容です。
全世界版も HDX の codebook では同じ列です。

- レイヤーは `population` の 1 つ。
- CRS は EPSG:3857 (WGS 84 / Pseudo-Mercator)。緯度経度ではなくメートルです。
- 日本の件数は 229,211 行、人数の合計は 123,294,123 人。

| 列 | 型 | 中身 |
| --- | --- | --- |
| fid | 整数 | 行の番号 (codebook は「record order in data upload」) |
| h3 | 文字列 | H3 のセル ID (15 文字) |
| population | 実数 | 六角形の中の人数 (codebook は「total population inside hexagon」) |
| geom | ポリゴン | 六角形の形 (EPSG:3857) |

日本のファイルで数えた結果です。

- `h3` の先頭 2 文字は全行 `88` で、全行が解像度 8 です。重複はありません。
- `population` は最小 1、最大 18,582 で、小数を持つ行はありません。型は実数ですが値は整数です。
- 人数が 0 の六角形は行がありません。行が無い場所は 0 人を意味し、欠損を表す特別な値はありません。
- 最も多いのは `882f5a373dfffff` の 18,582 人 (東京都区部の中)。

全世界版の行数は確かめていません (2.4GB の全体を取得していないため)。
人数の合計は、下の PMTiles のズーム 0 の値から 8,031,924,024 人と分かります。

## 取り出し方

区分は split です。

- 全世界版は 1 ファイル (2,436,991,241 バイト) です。S3 は Range 要求に 206 を返しますが、中身が gzip の 1 本の流れなので、途中から読み出しても展開できません。必要な範囲だけを取るには、全体を取得して展開する必要があります。
- 国別版が HDX の Kontur の組織に 250 件あります (「<国名>: Population Density for 400m H3 Hexagons」という題名のもの)。国を単位に取得でき、日本は 16MB です。認証は要りません。
- 国別のファイルにも空間索引 (R-tree) はありません。展開してから [[GDAL]] などで範囲を絞ります。日本ぐらいの大きさなら一瞬で済みます。

国別版と全世界版の中身が完全に一致するか (全世界版を国境で切っただけか) は確かめていません。

### foil4g が表示に使っている PMTiles

foil4g の地図 (`src/components/Datasets/KonturPopulation/source.ts`) は、HDX の GeoPackage ではなく次の PMTiles を表示しています。

- URL: https://data.source.coop/smartmaps/foil4gr1/kpop.pmtiles
- 置き場: Source Cooperative の smartmaps アカウントの `foil4gr1` (「FOIL4G Data Pack Release 1」)
- 大きさ: 475,263,703 バイト、Last-Modified 2024-08-19
- Range 要求に 206 を返し、CORS も許可しています (`access-control-allow-origin: *`)。range で、必要な範囲とズームのタイルだけを読めます。

作成手順は GitHub の optgeo/kpop-pmtiles にあります (ファイルの置き場は Source Cooperative の smartmaps アカウントです)。
Makefile は `kontur_population_20231101.gpkg` (全世界版の 2023-11-01 版) を入力にしています。
作り方は次のとおりで、ヘッダとタイルの中身もこれと合います。

- `create_db.rb` が各行の人数を、その H3 セルと解像度 7 から 0 までのすべての親セルに足し込む。
- `dump_db.rb` が各セルを六角形にして [[tippecanoe]] に渡す。解像度 0 はズーム 0 と 1、解像度 r (1 から 8) はズーム r+1 にだけ載る。
- レイヤーは `kpop` の 1 つ、属性は `pop` (整数、そのセルの人数の合計) だけ。H3 のセル ID は持っていない。
- ズームは 0 から 9。地物は全解像度を合わせて 44,467,536 (tilestats の値)。

東京付近のタイルで確かめると、ズーム 9 の最大値 18,582 は GeoPackage の最大値と一致し、ズーム 0 の全地物の合計 8,031,924,024 は全世界の合計になっています。
リポジトリのライセンスは CC0-1.0 ですが、これは作成スクリプトの条件で、データは元の Kontur Population の条件に従います。
README の Source 欄は Kontur Population (CC-BY) を挙げています。

## 使いどころ

- 人道支援と防災: 災害の被害想定範囲や紛争地域のポリゴンと重ねて、影響を受けうる人の数を見積もる (例: [[UCDP 武力紛争データ]] の出来事の周辺人口)。H3 なので、他の H3 のデータと ID で結び付けられます。
- SDGs 11.2 (公共交通へのアクセス) や 3.8 (保健サービスの普及)、9.1 (全天候型道路へのアクセス) のような「施設から一定距離にいる人の割合」を、国や州の単位で概算する分母に使えます。
- 施設の配置 (避難所、診療所、給水所) の需要の分布として使えます。
- [[OpenStreetMap]] のマッピングが手薄な、人が多いのに建物や道路が少ない所を探す (HDX と Kontur のページは、HOT がこの用途で使っていると書いています)。

使ってはいけない使い方もあります。

- 六角形 1 つの人数を、その場所の実際の人口として扱わない。推計で、極端な値は周りに散らしてあります。
- 年ごとの人口の増減を版の違いから読まない。版ごとに入力データも作り方も変わっています。
- 公式統計の代わりにしない。国や行政区画の合計は国連の推計に合わせてあるので、国勢調査とは違います。

## ライセンスと帰属表示

HDX の API (`package_show`) の値は `license_id: cc-by`、`license_title: Creative Commons Attribution International (CC BY)` です。
HDX のデータセットのページも「Creative Commons Attribution International (CC BY)」と表示しています。
Kontur のページも同じ名前を挙げて、商用にも使えると書いています。

> Kontur Population is available under Creative Commons Attribution International (CC BY) license. You can use it for any purpose, even commercially.

HDX のライセンス説明 (https://docs.humdata.org/about/data-licenses) の CC BY の節は、https://creativecommons.org/licenses/by/4.0/ にリンクしています。

> The license terms are that you must give appropriate credit, provide a link to the license, and indicate if changes were made.

データセットのどこにも「4.0」とは書かれていないので、版番号は HDX の説明ページのリンク先から 4.0 と読んでいます。
ファイルの中にもライセンスの記述はありません。

表示文として Kontur が指定する文言は見つかりませんでした。
次のように、題名、提供元、ライセンス、変更の有無を示します。

- Kontur Population: Global Population Density for 400m H3 Hexagons (2023-11-01), Kontur, CC BY 4.0, https://data.humdata.org/dataset/kontur-population-dataset

PMTiles を使うときは、H3 の親セルに集計して PMTiles にしたことも併記します (例: 「optgeo/kpop-pmtiles により H3 の親セルへ集計し PMTiles 化」)。
foil4g の `source.ts` の attribution は HDX へのリンクと題名だけで、ライセンス名と変更の表示はありません。

入力データの条件には注意が要ります。
HDX の caveats は、入力のうち Microsoft Buildings、OpenStreetMap、Geoalert Urban Mapping を ODbL、LINZ を CC BY 4.0、HRSL を「Creative Commons Attribution International」と書いています。
ODbL の入力から作ったものを CC BY で出していることを Kontur がどう整理しているかは、どの資料にも書かれていません。
安全側に寄せるなら、Kontur の表示に加えて「© OpenStreetMap contributors」と Microsoft Building Footprints の表示も併記します。

## 気をつけること

- 座標系が EPSG:3857 です。面積を geom からそのまま計算すると、高緯度ほど大きく出ます。H3 の解像度 8 のセルはほぼ同じ面積 (平均 0.737km²) なので、密度が要るなら h3 列から面積を計算するほうが素直です。
- 人のいない六角形は行がありません。セルごとに回帰や分類をするときは、0 人のセルを自分で足すかを決める必要があります。
- 入力の人口の基準年がはっきりしません。HDX の caveats は国連の推計を「World Population Prospects, 2023 Revision」と書いていますが、日付は「11 July 2022」で、WPP 2022 の公開日です。2023 Revision という版が実在するかは確かめていません。
- 全世界版の大きさは、Kontur のページの「6.6 GB」が展開後、HDX の 2,436,991,241 バイトが gzip 圧縮後です。
- 古い版 (2020-03-11 から 2022-06-30) も同じデータセットに残っています。2020-09-28 版の HDX 上の size は 0 で、置き場も `adhoc.kontur.io` と他と違います。使う版をファイル名の日付で確かめてください。
- PMTiles の `pop` は、ズームによって集計の単位が違います。ズーム 9 は解像度 8 の人数ですが、ズーム 0 と 1 は解像度 0 の六角形 (平均 400 万 km² あまり) の合計で、最大 1,141,305,573 です。人口密度ではなく人数なので、ズームをまたいで値を比べられません。foil4g の `source.ts` は 0 から 100,000 の一つの色の段階を全ズームに使っているので、低ズームではほとんどの六角形が最も濃い色になります。
- PMTiles のヘッダの maxzoom は 9 で、`source.ts` の maxzoom 14 との間はズーム 9 のタイルを拡大して表示しています。
- [[WorldPop 人口グリッド]] や [[GHSL 人口・建物・都市化度]] と比べるとき、Kontur は GHSL を入力の 1 つにしているので、独立な比較にはなりません。
- HDX の Kontur の組織には、題名の似た「<国名>: Administrative Division with Aggregated Population」(行政区画に人口を集計したもの、Kontur Boundaries) もあります。六角形の人口とは別のデータです。

## データ処理コマンド

次のコマンドは 2026-10-06 に実際に動かしました (GDAL 3.9.2、pmtiles コマンド)。
日本の国別版の取得には、この日は約 3 分半かかりました。

```bash
mkdir -p ./tmp

# 全世界版の大きさと更新日を確かめる (Range に 206 が返る)
curl -sI https://geodata-eu-central-1-kontur-public.s3.eu-central-1.amazonaws.com/kontur_datasets/kontur_population_20231101.gpkg.gz
curl -s -r 0-1023 -o /dev/null -D - https://geodata-eu-central-1-kontur-public.s3.eu-central-1.amazonaws.com/kontur_datasets/kontur_population_20231101.gpkg.gz

# 国別版の一覧 (HDX の CKAN API)
curl -s "https://data.humdata.org/api/3/action/package_search?fq=organization:kontur&rows=1000&fl=name,title" \
  | jq -r '.result.results[].title' | grep -c ': Population Density for 400m H3 Hexagons$'

# 日本の国別版を取得して展開する
curl -o ./tmp/kontur_population_JP_20231101.gpkg.gz \
  https://geodata-eu-central-1-kontur-public.s3.amazonaws.com/kontur_datasets/kontur_population_JP_20231101.gpkg.gz
gunzip -k ./tmp/kontur_population_JP_20231101.gpkg.gz

# レイヤーと列を見る
ogrinfo -so ./tmp/kontur_population_JP_20231101.gpkg population

# 件数と人数の合計
ogrinfo -ro -q ./tmp/kontur_population_JP_20231101.gpkg -sql "select count(*) n, sum(population) s from population"

# 東京都区部のおおよその範囲を緯度経度の GeoJSON に書き出す
ogr2ogr -f GeoJSON -t_srs EPSG:4326 -spat 139.6 35.6 139.8 35.75 -spat_srs EPSG:4326 \
  ./tmp/tokyo_r8.geojson ./tmp/kontur_population_JP_20231101.gpkg population

# foil4g が表示に使っている PMTiles のヘッダとメタデータ
pmtiles show https://data.source.coop/smartmaps/foil4gr1/kpop.pmtiles

# PMTiles から範囲を絞って取り出し、ズーム 5 (H3 解像度 4) の六角形を GeoJSON にする
pmtiles extract https://data.source.coop/smartmaps/foil4gr1/kpop.pmtiles ./tmp/tokyo.pmtiles \
  --bbox=139.6,35.6,139.8,35.75 --maxzoom=9
ogr2ogr -f GeoJSON ./tmp/tokyo_z5.geojson ./tmp/tokyo.pmtiles -oo ZOOM_LEVEL=5 kpop
```

## 関連項目

- [[Kontur]]
- [[Humanitarian Data Exchange]]
- [[H3]]
- [[GeoPackage]]
- [[PMTiles]]
- [[pmtiles]]
- [[tippecanoe]]
- [[GDAL]]
- [[UN Smart Maps]]
- [[GHSL 人口・建物・都市化度]]
- [[WorldPop 人口グリッド]]
- [[Google Open Buildings]]
- [[geoBoundaries 行政区域]]
- [[UCDP 武力紛争データ]]
- [[OpenStreetMap]]
- [[CC-BY-4.0]]
- [[ODbL-1.0]]

## 確認日

2026-10-06 に次のことを確かめました。

- HDX の CKAN API (`package_show`) で、全世界版、3km 版、22km 版、日本の国別版の題名、期間、ライセンス、リソースの大きさと URL を読みました。HDX のデータセットのページ (HTML) も取得でき、更新頻度「As needed」とライセンスの表示を確かめました。
- HDX の `package_search` (`organization:kontur`) で 502 件を取り、題名の形から国別の人口版を 250 件と数えました。
- 全世界版の S3 に HEAD と Range 要求を送り、大きさ、Last-Modified (2023-10-31)、Range の 206、先頭が gzip で元のファイル名が `kontur_population_20231101.gpkg` であることを確かめました。
- 日本の国別版 (16MB) を取得して展開し、ogrinfo と sqlite3 で列、件数、値の範囲、解像度、索引の有無を確かめました。
- Kontur のデータセットのページと HDX のライセンス説明のページを読みました。
- kpop.pmtiles に HEAD、Range 要求、`pmtiles show` を行い、東京付近を `pmtiles extract` で取り出してズームごとの六角形の大きさと値を確かめました。作成手順は GitHub の optgeo/kpop-pmtiles の README、Makefile、create_db.rb、dump_db.rb で確かめました。

確かめていないこと。

- 全世界版の行数と中身 (2.4GB を取得していません)。
- 国別版が全世界版を切り出したものと一致するか。
- Kontur が指定する帰属表示の文言 (見つかりませんでした)。
- ODbL の入力データと CC BY の出力の関係を Kontur がどう整理しているか。
- 入力の GHSL や HRSL の年次と、国連 WPP のどの版に合わせたか。
- HDX の利用規約 (Terms of Service) は読んでいません。
