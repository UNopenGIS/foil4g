---
title: WorldPop 人口グリッド
id: worldpop
provider: WorldPop (University of Southampton, School of Geography and Environmental Science)
source_data: 各国の国勢調査と公式推計 (行政区域別)、国連の World Population Prospects 2024 年版の国別総数、GHSL 人口・建物・都市化度 の建物データ、Google Open Buildings と Microsoft の建物外形、ESA WorldCover 土地被覆 などの共変量。推計値なので一次データではない
license: [CC-BY-4.0]
access: split
access_note: split。国 (ISO 3166-1 alpha-3) × 年 × 製品 × 解像度ごとにファイルが分かれ、STAC API で国と年と製品を選べる。ファイルの中は whole (data.worldpop.org は Range を無視して 200 で全体を返す。FTP は途中から読める)
format: GeoTIFF (Float32、LZW 圧縮、タイル 512x512)。年齢・性別は国・年ごとの ZIP もある。都市化度は GeoTIFF と ZIP (Shapefile、XLS)
coverage: 242 の国と地域 (リリース文書)。STAC のコレクションは 248
period: 2015 年から 2030 年の毎年 (2025 年以降は予測)。旧版 (Global1) は 2000 年から 2020 年
resolution: 3 秒角 (赤道で約 100m) と 30 秒角 (約 1km)。値は 1 セルあたりの推計人数。都市化度は 1km (モルワイデ図法)
size: 2020 年の総人口で、モナコ 100m 版 7,811 バイト、日本 100m 版 108,705,121 バイト、日本 1km 版 2,195,362 バイト、全世界 1km モザイク 288,986,559 バイト。日本 2020 年の年齢・性別 100m 版 ZIP は 5,815,803,230 バイト
update: 不定期のリリース (R2024A、R2024B、R2025A)。R2025A は「alpha version」と明記され、今後変わりうる
url: https://data.worldpop.org/GIS/ (ファイル)、https://api.stac.worldpop.org/ (STAC API)、https://hub.worldpop.org/rest/data (REST API)
docs: https://hub.worldpop.org/ 、リリース文書 https://data.worldpop.org/repo/prj/Global_2015_2030/R2025A/doc/Global2_Release_Statement_R2025A_v1.pdf
checked: 2026-10-06
details:
  DOI: 総人口 100m 10.5258/SOTON/WP00839、総人口 1km 10.5258/SOTON/WP00840、年齢・性別 1km 10.5258/SOTON/WP00842、都市化度 10.5258/SOTON/WP00879
---

# WorldPop 人口グリッド

> 英国サウサンプトン大学の [[WorldPop]] が、国勢調査の人口を機械学習で約 100m と約 1km の格子に配分して、国ごとの [[GeoTIFF]] で配っている、2015 年から 2030 年の毎年の人口推計 (総人口、年齢・性別、都市化度)

## 概要

WorldPop は、人がどこに何人住んでいるかを格子ごとに推計した地図を作っている研究プログラムです。
このカードは、現行の「Global2」(WorldPop Global Demographic Data、2015 年から 2030 年) の R2025A 版を中心に扱います。

作り方は「トップダウン」と呼ばれる方法です (リリース文書による)。

- 各国の国勢調査や公式推計の人口を、手に入るかぎり細かい行政区域の単位で集めます。2 回分 (2010 年ごろと 2020 年ごろ) を使い、その間と先を補間・予測して、国の総数を国連の World Population Prospects 2024 年版 (1 月 1 日時点) に合わせます。
- 国勢調査が使えない国では、米国国勢調査局の推計や国連の Common Operational Datasets (COD) を使います。
- 標高、夜間光、土地被覆、道路、水域、建物などの共変量から、ランダムフォレストで 100m 格子ごとの人口密度の重みを予測し、その重みで行政区域の人口を格子に配分します (popRF という R パッケージ)。
- 建物の有無は、GHSL の BUILT-S と BUILT-V、Google Open Buildings、Microsoft Building Footprints、World Settlement Footprint から毎年の分布を作ります。

作り方から来る限界があります。

- 観測ではなく推計です。精度は国と年によって違い、入力の行政区域が粗い国、国勢調査が古い国、紛争中の国では不確かさが大きくなります。
- 入力の年から離れた年ほど不確かです。2025 年から 2030 年は予測です。
- 災害や紛争による急な避難、季節による移動は反映されません。
- 国の総数は WPP 2024 に合わせてあるので、各国の公式統計と一致するとは限りません。
- 旧版の Global1 (2000 年から 2020 年) とは格子の位置が揃っていません。

WorldPop 自身が、国ごとに政府や国連機関と作った「ボトムアップ」の推計 (WOPR、https://wopr.worldpop.org/) のほうが目的に合う場合があると書いています。

## 内容

### 製品の種類

| 製品 | 解像度 | ファイル | 値 |
| ---- | ------ | -------- | -- |
| 総人口 (Population) | 100m、1km | 国・年ごとに 1 ファイル | 1 セルあたりの推計人数 (Float32) |
| 年齢・性別 (Age and Sex Structures) | 100m、1km | 国・年ごとに 62 ファイル (と、それをまとめた ZIP) | 性別 (f、m、t) × 年齢 20 階級の人数と、女性計 (T_F)、男性計 (T_M) |
| 都市化度 (Degree of Urbanisation、DUG) | 1km | 国・年ごとに GRID_L1、GRID_L2 の 2 ファイルと ZIP 2 つ | 区分コード (Byte) |

R2025A の配布は、総人口と年齢・性別とも「constrained」(建物があると推定されたセルにだけ人を置く) だけです。
ファイル名の `CN` が constrained、`UC` が unconstrained (人の住みうる陸地全体に配る) を表します。
unconstrained は前の版 (R2024B など) にあり、たとえば日本 2020 年の R2024B unconstrained 100m 版は 188,714,589 バイトです。
1km 版のフォルダ名とファイル名には `1km_ua`、`_UA_` が付きますが、`UA` の意味は確かめていません。

### 年齢階級とファイル名

ファイル名は `{iso}_{性別}_{年齢}_{年}_CN_{解像度}_R2025A_v1.tif` です (例 `jpn_f_00_2020_CN_100m_R2025A_v1.tif`)。

- 性別: `f` 女性、`m` 男性、`t` 両方。
- 年齢: `00` (0 歳)、`01` (1 から 4 歳)、`05` (5 から 9 歳)、以下 5 歳刻みで `85`、`90` (90 歳以上)。合わせて 20 階級です。

モナコ 2020 年の 100m 版で、`t` の 20 階級の合計 37,774 人は総人口ファイルの合計 37,774 人と一致し、T_F (19,295) と T_M (18,479) の和とも一致しました。

### 都市化度

GHSL の GHS-DUG ツール (v6.8) に WorldPop の人口を入れて作った、モルワイデ図法 (ESRI:54009) の 1km 格子です。

- GRID_L1: 1、2、3 の 3 区分 (STAC の説明)。
- GRID_L2: 10、11、12、13、21、22、23、30 の 8 区分 (STAC の説明)。
- entities ZIP: 都市クラスターと高密度都市クラスターの GeoTIFF と Shapefile。
- statistics ZIP: 区分ごとの人口を集計した XLS。

コードの意味は GHSL の都市化度 (DEGURBA) の定義に従うとされていますが、意味の表は WorldPop の資料では確かめていません。

### 値と欠損

- 単位は 1 セルあたりの人数 (小数) です。密度 (人/km²) ではありません。
- 欠損は -99999 です (総人口、年齢・性別)。都市化度は 0 が欠損です。
- constrained 版では、海だけでなく、人が住まないと判断された陸地のセルも -99999 になっているように見えます。日本 2020 年の 1km 版で、正の値を持つセルは 361,029、値が 0 のセルは 430 でした。
- 日本 2020 年の 1km 版の全セルの合計は 126,574,853 人でした。

## 取り出し方

区分は split です。

国ごと、年ごと、製品ごと、解像度ごとにファイルが分かれていて、必要な組み合わせだけを取得できます。
配布の経路は 4 つあります。

- data.worldpop.org (HTTPS): ファイルの実体。ディレクトリ一覧が見られます (`GIS/Population/Global_2015_2030/R2025A/{年}/{ISO3}/v1/{100m|1km_ua}/constrained/`)。
- STAC API (https://api.stac.worldpop.org/): 1 か国 1 コレクション (ID は ISO3 の大文字、例 `JPN`)。日本は 80 アイテムで、総人口 100m と 1km、年齢・性別 100m と 1km、都市化度が各 16 年分です。`query` や CQL2 の `filter` で `year` や `project` を指定して絞れます。アセットの `href` は data.worldpop.org を指します。
- REST API (https://hub.worldpop.org/rest/data): 製品の種類ごとの別名 (例 `pop/G2_CN_POP_R25A_100m`) と `iso3` で、ファイルの URL とメタデータ (DOI、引用文) が得られます。
- FTP (ftp://ftp.worldpop.org/): 同じパスで同じファイルが置かれています。

data.worldpop.org は HEAD に `Accept-Ranges: bytes` を返しますが、Range 要求 (`-r 0-1023`) を無視して 200 でファイル全体を返しました。
そのため GDAL の `/vsicurl/` は「Range downloading not supported by this server!」で開けません。
ファイルの一部だけを読むことはできず、丸ごと取得してから読みます。
FTP は途中からの読み出し (REST) に応じ、HTTPS と同じバイト列が返りました。
途中で切れた取得を `curl -C -` で続けられます。

速度は不安定です。
2026-10-06 には、HTTPS で 20 秒に約 0.84MB、120 秒で約 2.07MB、FTP で 60 秒に約 1.28MB でした。
日本の 100m 版 (約 104MB) の取得には 20 分以上かかる見込みです (推定)。

最小単位は「1 か国、1 年、1 製品、1 解像度」の 1 ファイルです。
小さい例として、モナコ 2020 年の総人口 100m 版は 7,811 バイト (38 x 34 セル)、1km 版は 2,634 バイトです。

STAC の検索で `bbox` を使うと、日付変更線をまたぐ国 (USA、KIR、TUV など) のアイテムも一緒に返ってきます。
国が決まっているなら、`collections` に ISO3 を指定するほうが確実です。

認証は要りません。

## 使いどころ

- SDGs: 指標の分母となる人口を、行政区域とは別の範囲 (施設からの距離、浸水域など) で数えられます。たとえば 11.2.1 (公共交通に容易にアクセスできる人口の割合) の人口側の入力や、目標 3 に関わる保健施設への到達性の分析です。都市化度は、都市・農村別の集計に使われる DEGURBA の区分を国ごとに与えます。
- 人道支援: 被災域や紛争地の範囲を重ねて、影響を受けうる人数の目安を出せます。年齢・性別の格子から、5 歳未満や高齢者、出産年齢の女性の数を見積もれます。
- 防災: ハザードマップと重ねた曝露人口の推計、避難所や病院の配置の検討。
- 保健: 予防接種などの計画で、対象人口の分母の目安に使えます。

使ってはいけない使い方:

- 特定の建物や世帯に何人いるかを知るために使うこと。100m の値は統計モデルによる配分で、個々のセルの値は信頼できません。
- 隣り合う年の小さな地域の差を、実際の人口移動とみなすこと。リリース文書は、年の比較は小さな範囲では慎重にと書いています。
- 災害直後や避難の最中の人の居場所とみなすこと。急な移動は入っていません。
- WorldPop の説明ページにあるように、個人や弱い立場の人々を差別、搾取、監視、害するために使うこと。

## ライセンスと帰属表示

ライセンスは [[CC-BY-4.0]] です。
根拠は https://hub.worldpop.org/data/licence.txt で、GeoTIFF のタグ (`TIFFTAG_COPYRIGHT=CC-BY-4.0`) と STAC のコレクション (`"license": "CC-BY-4.0"`) にも書かれています。

> WorldPop datasets are licensed under the Creative Commons Attribution 4.0 International License

求められる表示は、製品ごとの引用文です (STAC と REST API に入っています)。
総人口 100m 版の例:

> Bondarenko M., Priyatikanto R., Tejedor-Garavito N., Zhang W., McKeen T., Cunningham A., Woods T., Hilton J., Cihan D., Nosatiuk B., Brinkhoff T., Tatem A., Sorichetta A.. 2025 Constrained estimates of 2015-2030 total number of people per grid square at a resolution of 3 arc (approximately 100m at the equator) R2025A version v1. Global Demographic Data Project - Funded by The Bill and Melinda Gates Foundation (INV-045237). WorldPop - School of Geography and Environmental Science, University of Southampton. DOI:10.5258/SOTON/WP00839

地図に添える短い表示は、たとえば「WorldPop (www.worldpop.org), R2025A v1, CC BY 4.0」です。
短い表示で足りるとする WorldPop の記述は確かめていません。

追加の条件として、説明ページに次の利用上の注意があります (ライセンスの条項ではありません)。

> This data is not intended, and should not be used, for purposes that discriminate against, exploit, surveil, or otherwise harm individuals or vulnerable populations

都市化度は GHSL の GHS-DUG ツールで作られています。
GHSL 側の帰属が別に要るかどうかは確かめていません。

## 気をつけること

- 版が多くあります。Global1 (2000 年から 2020 年、`ppp` という名前、unconstrained と UN adjusted)、Global1 の constrained 2020 年版、Global2 の R2024A、R2024B、R2025A が同じサーバーに並んでいます。格子の位置も数値も版によって違うので、年をまたいで比べるときは同じ版を使います。
- R2025A は alpha 版と明記され、今後差し替えられる可能性があります。ファイル名に版 (`R2025A_v1`) が入っているので、使った版を記録します。
- STAC の `datetime` は、総人口と年齢・性別ではリリースの日付 (全件 2025-01-01) で、データの年ではありません。年で絞るときは `year` を使います。都市化度のアイテムは `datetime` が年の 1 月 1 日です。
- 座標系は、人口が EPSG:4326 (緯度経度)、都市化度が ESRI:54009 (モルワイデ) です。重ねるときは片方を投影し直します。
- 値はセルあたりの人数です。緯度経度の格子なので、高緯度ほどセルの面積が小さくなります。密度にするにはセル面積で割ります。
- 1km 版が 100m 版を集計したものかどうか、両者の合計が一致するかどうかは確かめていません (100m 版が大きいため取得していません)。
- 国境は米国国務省の LSIB v11.3 に従って切られています。係争地の扱いは国連の立場と同じとは限りません。
- 人が住まないとされた地域 (ヴァチカン、南極周辺の島など 9 の国と地域) はモデル化されていません。ヴァチカン (VAT) の STAC コレクションはアイテムが 0 件でした。
- [[Kontur Population]] や [[GHSL 人口・建物・都市化度]] の人口格子とは、入力も方法も違う別の推計です。同じ場所でも値が違います。

## データ処理コマンド

2026-10-06 に実際に動かしたコマンドです。
GDAL は 3.9.2 を使いました。

```bash
mkdir -p ./tmp

# STAC で日本の 2020 年の総人口のファイルを探す
curl -s -m 60 'https://api.stac.worldpop.org/search' \
  -H 'Content-Type: application/json' \
  -d '{"collections":["JPN"],"query":{"year":{"eq":2020},"project":{"eq":"Population"}},"limit":10}' \
  | jq -r '.features[] | [.id, .assets.data.href] | @tsv'

# 国の 1 年分の全アイテムと大きさを見る (CQL2 text)
curl -s -m 60 'https://api.stac.worldpop.org/search?collections=MCO&filter=year%3D2020&filter-lang=cql2-text&limit=10' \
  | jq -r '.features[] | [.id, .properties.size] | @tsv'

# Range が効かないことを確かめる (206 でなく 200 で全体が返る)
curl -s -m 60 -r 0-1023 -o /dev/null -D - \
  https://data.worldpop.org/GIS/Population/Global_2015_2030/R2025A/2020/MCO/v1/100m/constrained/mco_pop_2020_CN_100m_R2025A_v1.tif

# 小さい国のファイルを取得して中身を見る
curl -s -m 60 -o ./tmp/mco_pop_2020.tif \
  https://data.worldpop.org/GIS/Population/Global_2015_2030/R2025A/2020/MCO/v1/100m/constrained/mco_pop_2020_CN_100m_R2025A_v1.tif
gdalinfo -stats ./tmp/mco_pop_2020.tif

# 全セルの合計人口を出す (-99999 の欠損を除く)
gdal_translate -q -of XYZ ./tmp/mco_pop_2020.tif ./tmp/mco.xyz
awk '$3>0 {s+=$3} END {printf "%.0f\n", s}' ./tmp/mco.xyz

# 途中で切れた取得は FTP で続きから取る
curl -s -C - -o ./tmp/jpn_pop_2020_1km.tif \
  ftp://ftp.worldpop.org/GIS/Population/Global_2015_2030/R2025A/2020/JPN/v1/1km_ua/constrained/jpn_pop_2020_CN_1km_R2025A_UA_v1.tif
```

モナコの合計は 37,774、日本の 1km 版の合計は 126,574,853 でした。
`gdal_translate` の出力先に `/dev/stdout` を指定すると止まったので、ファイルに書き出しています。

## 関連項目

- [[WorldPop]]
- [[GHSL 人口・建物・都市化度]]
- [[Kontur Population]]
- [[geoBoundaries 行政区域]]
- [[Google Open Buildings]]
- [[ESA WorldCover 土地被覆]]
- [[World Population Prospects]]
- [[STAC]]
- [[GeoTIFF]]
- [[GDAL]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次のことを確かめました。

- STAC API のルート、コレクション一覧 (248 件)、日本 (80 アイテム) とモナコのアイテム、`search` の `query`、`filter`、`bbox` の動き。
- REST API (`hub.worldpop.org/rest/data`) の製品の一覧と、日本の R2025A 総人口のメタデータ。
- data.worldpop.org のディレクトリ一覧 (R2024A、R2024B、R2025A、Global1 の各フォルダ) と、各ファイルへの HEAD の Content-Length。
- data.worldpop.org への Range 要求が 200 と全体を返すこと (モナコ 7,811 バイト、日本 100m 版は 20 秒で打ち切り)、`/vsicurl/` で開けないこと、FTP の途中読み出しが HTTPS と同じバイトを返すこと。
- モナコ 2020 年の総人口と年齢・性別 ZIP (483,122 バイト)、都市化度のファイル、日本 2020 年の総人口 1km 版を取得し、gdalinfo と合計で中身を確かめたこと。
- ライセンスの文面 (`licence.txt`) と、リリース文書 (R2025A v1、2025 年 9 月) の作り方と限界の記述。

確かめていないこと:

- `1km_ua` の `UA` の意味。
- 都市化度の区分コードごとの意味 (WorldPop の資料で)。
- 日本の 100m 版と年齢・性別 100m 版の中身 (大きいため取得していません)。
- `_ttp` の付いた国フォルダ (R2025A に 32 個) の意味。
- 次のリリースの予定。
