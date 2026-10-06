---
id: geonames
provider: GeoNames (Unxos GmbH、スイス St. Gallen。創始者は Marc Wick)
source_data: 100 を超える出典の集約と、利用者の wiki 編集。主な出典は米国 NGA の GNS、USGS の GNIS、各国の地図機関と統計機関など (datasources ページに 436 件)
license: [CC-BY-4.0]
access: split
access_note: split。国 (ISO 3166-1 alpha-2) ごとの zip が 253 個と、国に属さない地物の `no-country.zip` がある。別名も同じ単位で `alternatenames/XX.zip` に分かれる。全世界は whole の `allCountries.zip`。Range は 206 を返すが、zip の中は deflate されたテキストで索引が無く、範囲や種類では絞れない
format: [タブ区切りテキスト (UTF-8, 見出し行なし, 引用符なし) を zip で圧縮]
coverage: 全世界 (統計ページで 252 の国と地域、ほかに国に属さない海底地形など)
period: 現在の地名。廃止された行政区画 (`ADM1H` など) と歴史上の別名 (`isHistoric`) も含む。過去の版は無料では残らない
resolution: 地物 1 件につき 1 点 (WGS84 の緯度経度、10 進度)。面は国境の簡略版だけ
size: allCountries.zip 422,006,079 バイト、alternateNamesV2.zip 204,813,820 バイト、JP.zip 4,959,088 バイト、MC.zip 9,030 バイト (いずれも 2026-10-06 版の zip の大きさ)
update: 毎日 (同じ URL の中身が差し替わる)。前日分の差分ファイルも毎日出る
url: https://download.geonames.org/export/dump/
docs: https://download.geonames.org/export/dump/readme.txt 、https://www.geonames.org/export/codes.html 、https://www.geonames.org/export/
checked: 2026-10-06
---

# GeoNames 地名

> スイスの Unxos GmbH が運営する [[GeoNames]] が、全世界の約 1,300 万件の地名 (点) と別名を、国別と全世界のタブ区切りテキストの zip で毎日作り直して配っている地名辞書 (gazetteer)

## 概要

GeoNames は、地名と、その地物の種類、位置、行政区画、人口、標高、時間帯をまとめた全世界の地名辞書です。
about ページは「over 25 million geographical names and consists of over 12 million unique features whereof 4.8 million populated places and 16 million alternate names」と説明しています。
2026-10-06 の統計ページの合計は 13,465,127 件です。

データは観測ではなく、既存の地名辞書や統計の集約です。
出典ページ (https://www.geonames.org/datasources/) には米国 NGA と U.S. Board on Geographic Names、USGS の GNIS、各国の統計局や地図機関、[[Wikidata]]、[[OurAirports 空港]] などが並んでいます。
日本については国土交通省、[[国土地理院]]、統計局、総務省が挙がっています。
利用者が Web の wiki 画面から名前を直したり、新しい地物を足したりもできます。

作り方から来る限界があります。

- 地物はすべて点です。市や国のような広がりのある地物も、代表点 1 つで表されます。
- 出典が国によって違うため、網羅の程度や行政区画の段の意味が国ごとに揃っていません。
- 人口や標高は出典の時点の値で、更新日は行ごとにばらばらです (モナコの 112 件の `modification date` は 1999-06-07 から 2026-09-05 まで)。
- readme.txt は「The Data is provided "as is" without warranty or any representation of accuracy, timeliness or completeness.」と断っています。

## 内容

### ダンプのファイル

readme.txt が説明しているファイルのうち主なものです。

| ファイル | 内容 |
| --- | --- |
| `XX.zip` | 国コード XX の地物。中は `XX.txt` と `readme.txt` |
| `allCountries.zip` | 全世界の地物を 1 ファイルにしたもの |
| `cities500.zip` | 人口 500 を超える集落と、PPLA4 までの行政中心地 (readme の概数は約 185,000) |
| `cities1000.zip` | 人口 1,000 を超える集落と、PPLA3 までの行政中心地 (約 130,000) |
| `cities5000.zip` | 人口 5,000 を超える集落と PPLA (約 50,000) |
| `cities15000.zip` | 人口 15,000 を超える集落と首都 (readme は約 25,000、実測は 34,153 行、244 の国と地域) |
| `alternateNamesV2.zip` | 別名の表 (10 列)。言語コード表 `iso-languagecodes.txt` も入っている |
| `alternateNames.zip` | 別名の旧版。`from` と `to` の列が無く、readme は「obsolete use V2」と書いている |
| `alternatenames/XX.zip` | 国別の別名 (V2 と同じ 10 列) |
| `admin1CodesASCII.txt` | 第 1 階層の行政区画のコードと英語名 (`JP.40` のような `国.コード`、名前、ASCII 名、geonameid) |
| `admin2Codes.txt` | 第 2 階層の行政区画のコードと名前 |
| `adminCode5.zip` | 第 5 階層のコード (geonameId と adm5code)。主表にはまだ入っていない |
| `hierarchy.zip` | 親子関係 (parentId、childId、type) |
| `countryInfo.txt` | 国の情報 (ISO コード、FIPS、首都、面積、人口、通貨、言語、隣国など) |
| `featureCodes_en.txt` | feature code の名前と説明 (英語。ほかに bg、nb、nn、no、ru、sv の版) |
| `timeZones.txt` | 国と時間帯の対応 |
| `shapes_simplified_low.json.zip`、`shapes_all_low.zip` | 国境の簡略版 |
| `modifications-<日付>.txt`、`deletes-<日付>.txt` | 前日に変更、削除された地物 |
| `alternateNamesModifications-<日付>.txt`、`alternateNamesDeletes-<日付>.txt` | 前日に変更、削除された別名 |
| `userTags.zip` | 利用者が付けたタグ |

readme.txt は `featureCodes.txt` があると書いていますが、索引には言語別の `featureCodes_en.txt` などしかありません。

### 主表 geoname の 19 列

`XX.txt`、`allCountries.txt`、`citiesNNN.txt`、`modifications-<日付>.txt` は、どれもこの 19 列です。
見出し行はありません。

| # | 列 | 意味 (readme.txt による) |
| ---: | --- | --- |
| 1 | geonameid | GeoNames のデータベースでの整数 ID |
| 2 | name | 地名 (UTF-8)、200 文字まで |
| 3 | asciiname | 地名の ASCII 表記 |
| 4 | alternatenames | 別名をカンマでつないだもの。ASCII への自動の字訳を含む。別名表の簡略版で、言語は分からない |
| 5 | latitude | 緯度 (10 進度、WGS84) |
| 6 | longitude | 経度 (10 進度、WGS84) |
| 7 | feature class | 地物の大分類 (1 文字) |
| 8 | feature code | 地物の小分類 (10 文字まで) |
| 9 | country code | ISO 3166 の 2 文字の国コード |
| 10 | cc2 | ほかの国コード (カンマ区切り) |
| 11 | admin1 code | 第 1 階層の行政区画コード。多くは FIPS コード |
| 12 | admin2 code | 第 2 階層の行政区画コード (米国では county) |
| 13 | admin3 code | 第 3 階層の行政区画コード |
| 14 | admin4 code | 第 4 階層の行政区画コード |
| 15 | population | 人口 (整数) |
| 16 | elevation | 標高 (m、整数)。出典にあるときだけ |
| 17 | dem | 数値標高モデルから引いた平均標高 (m)。SRTM3 (約 90m 四方) か GTOPO30 (約 900m 四方) |
| 18 | timezone | IANA の時間帯 ID |
| 19 | modification date | その行の最終更新日 (yyyy-MM-dd) |

欠損の表し方は列によって違います。
文字列の列は空欄です。
モナコの 112 件では、population は 22 件だけが正の値で、ほかは 0 でした。
elevation は 1 件だけが埋まっていて、ほかは空欄でした。
dem は首都 Monaco (2993458) が -9999 でした。
-9999 は値が得られなかったことを表すと見られますが、readme には説明がありません (推定)。

### feature class と feature code

feature class は 9 種類です (readme.txt の記述)。

| class | 内容 | featureCodes_en.txt のコード数 |
| --- | --- | ---: |
| A | country, state, region,... (国、行政区画) | 25 |
| H | stream, lake, ... (水系) | 137 |
| L | parks, area, ... (地域、公園) | 48 |
| P | city, village,... (集落) | 19 |
| R | road, railroad (道路、鉄道) | 22 |
| S | spot, building, farm (地点、建物、施設) | 255 |
| T | mountain, hill, rock,... (山、地形) | 98 |
| U | undersea (海底地形) | 62 |
| V | forest, heath,... (植生) | 18 |

`featureCodes_en.txt` は 685 行で、684 行が `A.ADM1` のような `クラス.コード`、残り 1 行は `null` (not available) でした。
各行は、コード、短い名前、説明の 3 列です。
about ページも 684 コードと書いており、一致しました。

よく使うコードの例です。

- 国と行政区画: `PCLI` (independent political entity)、`ADM1` から `ADM5` (第 1 から第 5 階層の行政区画)、`ADMD` (階層を決めていない行政区画)、末尾に `H` の付いた `ADM1H` などは廃止された区画
- 集落: `PPLC` (首都)、`PPLA` から `PPLA4` (各階層の行政中心地)、`PPL` (集落)、`PPLX` (集落の一部)
- 施設: `HTL` (hotel)、`AIRP` (空港)、`SCH` (学校)、`HSP` (病院)

全一覧と説明は https://www.geonames.org/export/codes.html にあります。

### 別名の表 (alternateNamesV2) の 10 列

| # | 列 | 意味 |
| ---: | --- | --- |
| 1 | alternateNameId | 別名の ID |
| 2 | geonameid | 主表の geonameid |
| 3 | isolanguage | ISO 639 の 2 文字か 3 文字の言語コード。`zh-CN` や `zh-Hant` のような変種も入る。ほかに `post` (郵便番号)、`iata`、`icao`、`faac` (空港コード)、`fr_1793` (フランス革命期の名)、`abbr` (略称)、`link` (Web ページ、多くは Wikipedia)、`wkdt` (Wikidata の ID) |
| 4 | alternate name | 別名 (400 文字まで) |
| 5 | isPreferredName | 公式または優先の名前なら `1` |
| 6 | isShortName | 短縮名なら `1` (例: State of California に対する California) |
| 7 | isColloquial | 俗称なら `1` (例: New York に対する Big Apple) |
| 8 | isHistoric | 過去の名前なら `1` (例: Mumbai に対する Bombay) |
| 9 | from | その名前が使われ始めた時期 |
| 10 | to | その名前が使われなくなった時期 |

旗が立っていないときは空欄です。
モナコの別名 363 行では、言語コードの欄に readme に無い `unlc` (UN/LOCODE と見られる値 `MCMON`) と `uicn` もありました。
日本語 (`ja`) の名前は主表の `name` ではなく別名の表にあります (モナコ国 2993457 の `モナコ`、isPreferredName が 1)。

### モナコ (MC.zip) の実測

2026-10-06 版の MC.zip (9,030 バイト) を展開すると、`MC.txt` (17,647 バイト、112 行) と `readme.txt` が入っていました。
112 行はすべて 19 列でした。
統計ページのモナコの件数 (112) と一致しました。

| class | 件数 | 多いコード |
| --- | ---: | --- |
| S | 60 | HTL 25、PO 7、MUS 6、GDN 6 |
| A | 19 | ADMD 17、PCLI 1、ADM1 1 |
| P | 14 | PPLX 13、PPLC 1 |
| T | 10 | PT 7 |
| H | 5 | COVE 3、HBR 2 |
| L | 4 | |

緯度経度の範囲は経度 7.39891 から 7.43897、緯度 43.71879 から 43.74890 でした。
admin1 code は 49 行が `00` (第 1 階層が決まっていない地物)、63 行が空欄でした。

## 取り出し方

区分は split です。
索引 https://download.geonames.org/export/dump/ (Apache の自動生成一覧) に、`XX.zip` の形の国別ファイルが 253 個あります。
別名の下位ディレクトリ `alternatenames/` にも同じく 253 個あります。
最小単位は 1 国分の zip で、例えばモナコは 9,030 バイト、日本は 4,959,088 バイトです。
認証は要りません。

全世界が要るときは `allCountries.zip` (約 422MB) を丸ごと取ります。
`allCountries.zip` は Range 要求 (`-r 0-1023`) に 206 と 1,024 バイトを返しました。
ただし zip の中身は deflate された行の並びで、地域や種類の索引を持たないので、Range で必要な地物だけを読むことはできません。
人口で絞った部分集合として `cities500` から `cities15000` があり、範囲や種類で絞るには国の zip を取ってから手元で選びます。

版は日付で固定できません。
URL はそのままで中身が毎日差し替わり、索引にはチェックサムも版番号もありません。
2026-10-06 に見たときは、主なファイルの Last-Modified が 02:01 から 02:17 GMT (索引の表示は中央ヨーロッパ時間で 04:01 から 04:17) に集まっていました。
手元のデータベースを追いつかせるには、前日分の `modifications-<日付>.txt` (2026-10-05 分は 162 行、19 列) と `deletes-<日付>.txt` (同じく 2 行、`geonameId`、名前、理由) を使います。
再現性が要るときは、取った日の Last-Modified と大きさを記録してください。

配布元は遅いことがあります。
2026-10-06 には `cities15000.zip` (3,360,366 バイト) は取れましたが、`cities500.zip` (13,868,050 バイト) は 120 秒で約 2.6MB しか届かず、途中で切れました。

### Web サービス

https://api.geonames.org/ の REST の Web サービス (検索、逆ジオコーディング、標高、時間帯、郵便番号など 41 種) もあります。
文書 (https://www.geonames.org/export/web-services.html) は「The username parameter is required on every request.」と書いており、無料のアカウント登録が要ります。
利用条件 (https://www.geonames.org/export/) は「10,000 credits daily limit per application (identified by the parameter 'username'), the hourly limit is 1000 credits」としています。
このカードの作成では登録しておらず、Web サービスは呼んでいません。
まとまった量を使うときは、Web サービスではなくダンプを取るのが筋です。

## 使いどころ

- 人道支援、防災: 報告書や SNS に出てくる村や町の名前を座標に変える (ジオコーディング) ための辞書になります。各国語とローマ字の別名、`isHistoric` の旧名があるので、表記揺れのある地名を引くのに使えます。災害の被害報告や避難所の所在地の名前を地図に載せる下準備になります。
- SDGs 11 (持続可能な都市): `cities` のファイルで、人口の閾値ごとの都市の点を一覧にできます。ただし人口は出典の時点の値で、年が揃っていないので、指標 11.x の算定に使う人口の値としては使えません。
- 国際平和、紛争の研究: [[UCDP 武力紛争データ]] のような出来事のデータで、地名から座標を与えたり、座標に近い地名を付けたりする照合に使えます。
- 多言語の地図: 別名の表から、国や都市のラベルを言語別に作れます。
- データの結合: 別名の表の `wkdt` で [[Wikidata]] の項目へ、`iata` と `icao` で空港データへつなげます。

使ってはいけない使い方もあります。

- 行政区画の面や境界の代わりにはなりません。点しかなく、国境の簡略版は配色程度の精度です。
- 公式の地名や行政コードの典拠にはなりません。admin1 code は多くの国で FIPS コードで、ISO 3166-2 や各国の公式コードとは別物です。
- 人口や標高を統計値として集計してはいけません。欠損が 0 や空欄で表され、出典の年もばらばらです。

## ライセンスと帰属表示

ライセンスは [[CC-BY-4.0]] (Creative Commons Attribution 4.0 International) です。
根拠は 3 か所あります。

ダンプに同梱される readme.txt の冒頭:

> This work is licensed under a Creative Commons Attribution 4.0 License,
> see https://creativecommons.org/licenses/by/4.0/
> The Data is provided "as is" without warranty or any representation of accuracy, timeliness or completeness.

サイトのフッター (about ページなど):

> This work is licensed under a Creative Commons Attribution 4.0 License.

https://www.geonames.org/export/ の Terms and Conditions:

> cc-by licence (creative commons attribution license). You should give credit to GeoNames when using data or web services with a link or another reference to GeoNames.
> commercial usage is allowed

求められる表示は、GeoNames へのリンクかほかの参照です。
例えば次のように表示します。

- 地名データ: GeoNames (https://www.geonames.org/)、CC BY 4.0

CC BY 4.0 の条件に合わせるなら、ライセンスへのリンク (https://creativecommons.org/licenses/by/4.0/) と、加工したかどうかも書き添えます。

第三者データについて:
出典ページ (https://www.geonames.org/datasources/) は、出典ごとに「Contains OS data © Crown copyright and database right 2018」や「Contains information licensed under the Open Government Licence – Canada」のような帰属の文言を挙げています。
これらの文言がダンプの利用者にも表示を求めるものかどうかは、GeoNames は明示しておらず、確かめていません。
特定の国のデータを多く使うときは、出典ページのその国の行を読んでおくと安全です。

有料の Premium Data (年額の購読) は別の商品で、その再配布条件は確かめていません。

## 気をつけること

- 毎日差し替わる: 同じ URL でも取った日によって件数が違います。調査メモの 2026-09-30 時点で日本は 103,760 件、2026-10-06 の統計ページでは 103,761 件でした。
- readme の概数は古い: `cities15000` を readme は約 25,000 件としますが、2026-10-06 版は 34,153 行でした。
- admin1 code は国ごとに体系が違う: readme は「Most adm1 are FIPS codes. ISO codes are used for US, CH, BE and ME.」と書いています。日本の admin1 は都道府県のローマ字のアルファベット順の番号で (`JP.01` が Aichi、`JP.40` が Tokyo)、JIS や ISO 3166-2 の番号とは違います。`00` は第 1 階層が決まっていない地物です。
- 行政の段の意味は国によって違う: 同じ `ADM2` でも、国によって指す行政単位が違います。ほかの出典の ADM 階層と同じものを指すとは限りません。
- 廃止された区画が混ざる: `ADM1H` などの末尾 `H` は廃止された区画です。現行の区画だけが欲しければ除きます。
- 座標系は WGS84 (EPSG:4326) の緯度経度です。列の順は緯度、経度の順です。
- 引用符を使わないタブ区切りです: 名前に `"` を含む行があるので、CSV の読み込みでは引用符の扱いを切ってください。
- 先頭のゼロ: admin1 code の `00` や `01` は文字列として読まないと失われます。GDAL の型推定 (`AUTODETECT_TYPE=YES`) で読むと `00` が整数 0 になりました。
- `alternateNames.zip` (旧版) と `alternateNamesV2.zip` を取り違えないでください。旧版は `from` と `to` の列がありません。
- 郵便番号のデータは別の配布 (https://download.geonames.org/export/zip/) で、このカードの対象外です。
- 取り違えやすい別のデータ: 米国 NGA の GNS (GEOnet Names Server) は GeoNames の主な出典の 1 つですが、別の組織の別のデータです。

## データ処理コマンド

2026-10-06 に実際に動かしたコマンドです。
最小単位としてモナコ (MC.zip、9,030 バイト) を使います。

```bash
mkdir -p ./tmp && cd ./tmp

# 大きさと更新日を確かめる
curl -sI https://download.geonames.org/export/dump/MC.zip

# モナコの地物と別名を取る
curl -s -o MC.zip https://download.geonames.org/export/dump/MC.zip
curl -s -o MC_alt.zip https://download.geonames.org/export/dump/alternatenames/MC.zip
unzip -l MC.zip
unzip -o -q MC.zip MC.txt

# 行数と列数を確かめる (112 行、すべて 19 列)
wc -l MC.txt
awk -F'\t' '{print NF}' MC.txt | sort | uniq -c

# feature class と feature code の内訳
awk -F'\t' '{print $7"."$8}' MC.txt | sort | uniq -c | sort -rn | head

# feature code の説明を引く
curl -s -o featureCodes_en.txt https://download.geonames.org/export/dump/featureCodes_en.txt
grep -P '^(P\.PPLC|A\.PCLI|S\.HTL)\t' featureCodes_en.txt

# 日本語の別名を見る
unzip -p MC_alt.zip MC.txt | awk -F'\t' '$3=="ja"'

# 見出しを付けて GeoPackage にする (コードの先頭のゼロを残すため型推定はしない)
{ printf 'geonameid\tname\tasciiname\talternatenames\tlatitude\tlongitude\tfeature_class\tfeature_code\tcountry_code\tcc2\tadmin1_code\tadmin2_code\tadmin3_code\tadmin4_code\tpopulation\televation\tdem\ttimezone\tmodification_date\n'; cat MC.txt; } > MC.tsv
ogr2ogr -f GPKG MC.gpkg MC.tsv -nln geoname -oo SEPARATOR=TAB \
  -oo X_POSSIBLE_NAMES=longitude -oo Y_POSSIBLE_NAMES=latitude -a_srs EPSG:4326
ogrinfo -q MC.gpkg -sql "SELECT name, admin1_code, CAST(population AS INTEGER) AS pop FROM geoname WHERE feature_code='PPLC'"
```

全世界の `allCountries.zip` (約 422MB) は、取得と展開を動かしていません。

## 関連項目

- [[GeoNames]]
- [[CC-BY-4.0]]
- [[Wikidata]]
- [[OurAirports 空港]]
- [[UCDP 武力紛争データ]]
- [[国土地理院]]
- [[Natural Earth Coastline Data]]
- [[Geofabrik Monaco OpenStreetMap Data]]
- [[OpenStreetMap]]
- [[地名辞書]]
- [[ジオコーディング]]

## 確認日

2026-10-06 に次を確かめました。

- ダンプの索引を取得し、国別 zip 253 個、`alternatenames/` の国別 zip 253 個、ほかのファイルの一覧と時刻を確かめました。
- `allCountries.zip`、`alternateNamesV2.zip`、`cities500` から `cities15000`、`JP.zip`、`MC.zip` に HEAD を送り、大きさと Last-Modified と `Accept-Ranges: bytes` を確かめました。`allCountries.zip` への Range 要求は 206 と 1,024 バイトでした。
- `readme.txt`、`featureCodes_en.txt`、`admin1CodesASCII.txt`、`countryInfo.txt`、`MC.zip`、`alternatenames/MC.zip`、`no-country.zip` (7,112 行)、`cities15000.zip`、`modifications-2026-10-05.txt`、`deletes-2026-10-05.txt` を取得して中身を数えました。
- about ページ、export ページ (利用条件)、Web サービスの文書と一覧、統計ページ、出典ページ、codes.html を読みました。
- 出典ページの件数 436 は、表のうち出典コードのある行を数えた値です。

確かめられなかったこと。

- `cities500.zip` は配布元が遅く、120 秒で取り切れなかったため、行数を確かめていません。`cities1000` と `cities5000` の行数も確かめていません (readme の概数だけを載せています)。
- `allCountries.zip` と `alternateNamesV2.zip` の中身は取得していません。
- Web サービスは登録が要るので呼んでいません。
- 第三者の出典ごとの帰属文言がダンプの利用者にも及ぶかどうか、Premium Data の再配布条件は確かめていません。
- dem の -9999 の意味は readme に無く、確かめていません。
