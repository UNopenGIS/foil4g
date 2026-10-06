---
title: UNHCR 難民統計
id: unhcr_refugee_statistics
provider: UNHCR (UNHCR Refugee Population Statistics Database、Refugee Data Finder)
source_data: なし (一次データ)。ただし各国政府と UNHCR の現地事務所の報告を UNHCR が集計したもの。パレスチナ難民の値は UNRWA、IDMC の国内避難民の値は IDMC が提供した第三者のデータ
license: [CC-BY-4.0]
license_note: CC-BY-4.0 と UNHCR の Terms of Use for Datasets (第三者のデータには別の条件がありうる)
access: catalog
access_note: catalog。API で年 (`year`、`yearFrom`、`yearTo`)、出身国 (`coo`)、庇護国 (`coa`) を指定して、必要な行だけを JSON か CSV (zip) で取れる。最小単位は 1 年、1 出身国、1 庇護国の 1 行
format: API の JSON、API の CSV (`download=true` で zip に入った `population.csv` と `footnotes.csv`)。HDX にも CSV の写しがある
coverage: 全世界。国と地域の一覧 (`countries`) は 232 件。2025 年の `population` には 212 の符号 (ISO3 と UNHCR 独自の符号) が出てくる
period: 1951 年から 2025 年末まで (項目ごとに始まりの年が違う)。IDMC の値は 1990 年から、UNRWA の値は 1952 年から
resolution: 国 (出身国と庇護国の組み合わせ) と年。単位は人 (庇護申請と決定には件で数えた国もある)。位置の列は無い
size: '`population` の全期間、全組み合わせの zip が 1,080,972 バイト (138,893 行)。HDX の CSV 5 本で合計約 55MB'
update: 年 2 回 (6 月に前年末の値、12 月ごろにその年の 1 月から 6 月の値)。公表のたびに過去の値も直る
url: https://api.unhcr.org/population/v1/
docs: https://api.unhcr.org/docs/refugee-statistics.html (API)、https://www.unhcr.org/refugee-statistics/methodology/ (方法と利用条件)
checked: 2026-10-06
details:
  画面: https://www.unhcr.org/refugee-statistics/
---

# UNHCR 難民統計

> [[UNHCR]] (国連難民高等弁務官事務所) が、難民、庇護希望者、国内避難民、無国籍者などの人数を、年、出身国、庇護国の組み合わせごとに全世界について集計し、Refugee Data Finder とその API (JSON と CSV) で配っている統計

## 概要

UNHCR が 1951 年の設立以来、毎年の統計業務で集めてきた、強制的に移動させられた人と無国籍者の人数のデータベースです。
数は主に各国政府から集め、UNHCR の現地事務所のデータでも補っています。
観測や推定のモデルではなく、国ごとに報告された人数の集計です。
登録の仕組みや数え方は国によって違い、政府の推計がそのまま入っている国もあります (`footnotes` に「Government estimate」と注記された行があります)。

Refugee Data Finder のトップページは、三つのデータ源をもとにしていると書いています。

> This website is based on three data sources:
> UNHCR data collected through its annual statistical activities with some data going back as far as 1951, the year UNHCR was created.
> Data provided by the United Nations Relief and Works Agency for Palestine Refugees in the Near East ( UNRWA ). Information is limited to registered Palestine refugees under UNRWA's mandate.
> Data provided by the Internal Displacement Monitoring Centre ( IDMC ). Information is limited to people displaced within their country due to conflict or violence.

API でも、UNHCR 自身の値 (`population` など) と、UNRWA の値 (`unrwa`)、IDMC の値 (`idmc`) は別のエンドポイントに分かれています。

作り方から来る限界は次のとおりです。

- 単位は国です。州や県、キャンプや都市ごとの人数はこの API では取れません。
- UNHCR の国内避難民 (`idps`) は、UNHCR が保護や支援をしている紛争による国内避難民だけです。methodology は「UNHCR statistics do not provide a complete overview of global internal displacement.」と書いています。
- 項目の定義が途中で変わっています。「その他の国際的保護を要する人」(`oip`) は 2022 年に新設され、それまでの「Venezuelans displaced abroad」を 2018 年まで遡って置き換えました。

## 内容

### 人口の区分

`population` エンドポイントの列です。
各行は `year`、出身国 (`coo_id`、`coo_name`、`coo`、`coo_iso`)、庇護国 (`coa_id`、`coa_name`、`coa`、`coa_iso`) と、次の人数を持ちます。

| 列 | CSV の見出し | 意味 | 最初の年 (methodology) |
|---|---|---|---:|
| `refugees` | Refugees under UNHCR's mandate | UNHCR の任務の下の難民と、難民に準じる状況の人 | 1951 |
| `asylum_seekers` | Asylum-seekers | 庇護申請の結果を待っている人 | 2000 |
| `returned_refugees` | Returned refugees | その年に出身国へ帰還した難民 (流れの値) | 1965 |
| `idps` | IDPs of concern to UNHCR | UNHCR が関わる紛争による国内避難民 | 1993 |
| `returned_idps` | Returned IDPss (原文の綴りのまま) | その年に帰還した国内避難民 | 1997 |
| `stateless` | Stateless persons | UNHCR の無国籍の任務の対象者 | 2004 |
| `ooc` | Others of concern | その他の UNHCR の関心対象者 | 1997 |
| `oip` | Other people in need of international protection | その他の国際的保護を要する人 | 2018 |
| `hst` | Host Community | UNHCR が支援する受け入れ地域の住民 | 2021 |

2025 年の全世界の合計 (出身国と庇護国を指定しない問い合わせ) は次のとおりでした。

- 難民 28,461,306、庇護希望者 8,998,097、その他の国際的保護を要する人 7,177,473
- UNHCR が関わる国内避難民 64,239,352、無国籍者 4,477,220
- 帰還した難民 4,362,272、帰還した国内避難民 10,308,567

トップページの「35.6 MILLION are refugees under UNHCR's mandate, people in a refugee-like situation and other people in need of international protection」は、難民と `oip` の和に当たります。

### パレスチナ難民と国内避難民 (第三者の値)

- `unrwa`: UNRWA の任務の下に登録されたパレスチナ難民です。列は `total` だけで、庇護国の側 (`coa`) にヨルダン、レバノン、パレスチナ国、シリアと「Unknown」(`UKN`) が入ります。出身国の列は空 (`-`) です。2025 年の合計は 5,964,782 人、全期間で 296 行でした。
- UNRWA の地域にいるパレスチナ人は、UNHCR の `population` には入っていません。2025 年の `population` で出身国パレスチナ (`PSE`)、庇護国ヨルダンとレバノンの `refugees` は 0 でした。UNRWA の地域の外 (ドイツ、ギリシャなど) にいるパレスチナ人は UNHCR の難民として数えられています。
- `idmc`: IDMC による紛争と暴力による国内避難民です。列は `total` だけで、出身国の側に国が入ります。2025 年の合計は 68,653,080 人 (UNHCR の `idps` より約 440 万人多い)、全期間で 934 行 (1990 年から 2025 年) でした。
- IDMC の値の国の符号には ISO3 でないものがあります (アビエイ地域が `AB9`)。

### ほかのエンドポイント

| エンドポイント | 全期間の行数 | 内容 |
|---|---:|---|
| `population` | 138,893 | 上の人数 (年末の値と、その年の帰還) |
| `asylum-applications` | 120,597 | 庇護申請。手続きの種類 (`procedure_type`)、申請の種類 (`app_type`)、決定の段階 (`dec_level`)、人か件か (`app_pc`) |
| `asylum-decisions` | 113,929 | 庇護の決定。認定、その他の保護、却下、終了、合計 |
| `solutions` | 21,258 | 帰還、第三国定住 (`resettlement`)、帰化 (`naturalisation`) |
| `demographics` | 116,781 | 性別 (f、m) と年齢 (0-4、5-11、12-17、18-59、60 以上、不明) の内訳 |
| `unrwa` | 296 | 上記 |
| `idmc` | 934 | 上記 |

行数は、出身国と庇護国をすべて展開した (`coo_all=true&coa_all=true`) ときの `limit=1` の応答の `maxPages` です。
ほかに目録として `countries` (国と地域、UNHCR の符号、ISO3、ISO2、地域区分)、`regions` (UNHCR の 6 地域)、`years` (1951 から 2027 の 77 年)、値の注記の `footnotes`、まだ公表されていない時期の推計の `nowcasting` があります。
`nowcasting` は 2026 年 8 月の難民 28,301,919、庇護希望者 8,917,756 を返しました。
`years` が 2027 年まで返しても、2026 年の `population` の行は 0 でした。

### 値と欠損の表し方

- JSON の人数は、数値と文字列が混ざります (`"refugees": 2347756` と `"asylum_seekers": "0"`)。読み込むときに数値に揃えます。
- 該当しない値は `"-"` です。2025 年の `population` の CSV では、`oip` の 6,290 行のうち 6,267 行が `-` でした。
- 組み合わせの行が無いことと 0 の違いは確かめていません。
- 5 未満の値は丸めてあると UNHCR は説明しています (調査メモの引用による。原文のページは今回読めませんでした)。2025 年の `population` の CSV に 1 から 4 の値は 1 つもありませんでした。

## 取り出し方

区分は catalog です。
API の説明 (Version 1.0.0) によると、次のパラメータで絞れます。

- `year` (年の配列)、`yearFrom`、`yearTo` (両端を含む)
- `coo` (出身国)、`coa` (庇護国)。カンマ区切りで複数指定できます。指定しない軸は足し合わされて 1 行になります (「If not specified, data for this dimension will be summed and aggregated to one row.」)。
- `coo_all=true`、`coa_all=true` でその軸を全部展開します。このとき `coo`、`coa` の指定は無視されます (説明に「this overrides the specific selection」とあり、実際に `coa=JOR,LBN,EGY&coa_all=true` で全庇護国が返りました)。
- `cf_type=ISO` で `coo`、`coa` に ISO3 を使えます。既定は UNHCR 独自の符号です。
- `limit`、`page` でページを送ります。`download=true` で CSV の zip になります。

2026-10-06 に次を確かめました。

- `population/?year=2025&coo=SYR&coa=TUR&cf_type=ISO` は 1 行 (トルコのシリア難民 2,347,756 人) を返しました。
- `population/?yearFrom=2020&yearTo=2025&coa=DEU&coo_all=true&cf_type=ISO` は、ドイツにいる人を出身国別に 6 年分返しました (`limit=100` で 10 ページ)。
- `population/?yearFrom=2015&yearTo=2025&coo=SYR&coa_all=true&cf_type=ISO&download=true` は 11,627 バイトの zip で、中は `population.csv` (1,321 行) と `footnotes.csv` でした。
- 全期間の `population` の zip に `-r 0-1023` を送ると 206 が返りました (`Content-Range: bytes 0-1023/1,080,972`)。ただし zip は要求のたびに作られるので (`Last-Modified` が要求時刻)、Range は絞り込みには使えません。

認証は要りません。
応答には `access-control-allow-origin: *` が付いていて、ブラウザから直接呼べます。
利用回数の上限は説明に書かれていません (確かめていません)。

[[HDX]] の `unhcr-population-data-for-world` に、UNHCR が同じデータベースから書き出した CSV が 5 本あります (人数、年齢性別、庇護申請、庇護の決定、解決)。
こちらは whole で、HTTP Range に 206 を返しますが、索引の無い CSV なので必要な行だけを選ぶ手段にはなりません。
人数の CSV は 7,281,295 バイト、年齢性別の CSV は 29,504,789 バイトです。
HDX の年齢性別の CSV には `location`、`urbanRural`、`accommodationType` の列があり、`location` は「Central」「North」のような国の中の地域名やキャンプ名の文字列です。
座標や行政区域の符号は持たないので、そのまま地図には載せられません。

## 使いどころ

- [[SDGs]] 目標 10 のターゲット 10.7 (秩序のとれた安全な移住)。指標 10.7.4「Proportion of the population who are refugees, by country of origin」は、国連の SDG のデータベースで UNHCR の難民統計と [[World Population Prospects]] の人口から計算されています (出典の欄にそう書かれています)。
- 人道支援の計画。庇護国ごとの難民と庇護希望者の数、出身国ごとの流出の数で、受け入れ国の負担や支援の規模の見当をつけられます。年齢性別の内訳 (`demographics`) は、子どもや高齢者の支援の見積もりに使えます。
- 国際平和と紛争の分析。[[UCDP 武力紛争データ]] の紛争の出来事と、出身国ごとの難民と国内避難民の推移を並べられます。
- 出身国と庇護国の組み合わせを持つので、国の間の流れ (出身国から庇護国への線) を地図に描けます。

使ってはいけない使い方もあります。

- 国より細かい単位の分析はできません。国内の分布や、キャンプの位置は別のデータが要ります。
- 全世界の国内避難民の総数を UNHCR の `idps` で示してはいけません。UNHCR が関わる人だけです。全体を示すなら IDMC の値を使い、出典を IDMC と書きます。
- パレスチナ難民を `population` だけで数えると、UNRWA の地域の約 600 万人が抜けます。
- 年をまたいで足し合わせると、定義の変更 (`oip` の新設、無国籍で難民でもある人の数え方の変更) で二重に数えたり抜けたりする年があります。
- 庇護申請と決定は、人で数える国と件で数える国が混ざっています (`app_pc`、`dec_pc`)。そのまま足しません。

## ライセンスと帰属表示

methodology のページの「Data terms and conditions of usage」:

> Except where otherwise indicated, the datasets made available by UNHCR on UNHCR Refugee Population Statistics Database are licensed under the Creative Commons Attribution 4.0 International Public License.

Terms of Use for Datasets (https://www.unhcr.org/what-we-do/data-and-publications/data-and-statistics/terms-use-datasets) の関係する項:

> 1. Except where otherwise provided, the datasets made available by UNHCR on the UNHCR Refugee Population Statistics Database (the "Datasets") are licensed under a Creative Commons Attribution International License 4.0 (the "CC BY License") and the provision thereof is subject to the supplemental terms contained below in these Terms of Use for Datasets.

> 3. You shall provide attribution to UNHCR and its data providers in the following format:"UNHCR Refugee Population Statistics Database".

> 4. When sharing or facilitating access to the Datasets, the URI or hyperlink to the Datasets shall also provide the uniform resource locator (URL) of these Terms of Use for Datasets.

> 6. Some datasets and indicators are provided by third parties, and may not be shared, redistributed or reused without the consent of the original data provider, or may be subject to terms and conditions that are different from those described herein. Where applicable, these conditions are included in the dataset or indicator metadata.

求められる表示は次のとおりです。

- 「UNHCR Refugee Population Statistics Database」の表記 (第 3 項)
- CC BY 4.0 のライセンス名と URL、改変したならその旨
- 再配布するときは Terms of Use for Datasets の URL (第 4 項)
- UNHCR が利用を後援や承認しているように見せないこと (第 5 項)

追加の条件と例外があります。

- 第 6 項の第三者のデータに、UNRWA と IDMC の値が当たる可能性があります。API の応答にも HDX の CSV にも、その条件の記載は見当たりませんでした。UNRWA と IDMC の値を再配布するときは、それぞれの提供元の条件を確かめてください (確かめていません)。
- ウェブサイトの利用条件 (Terms and conditions of use) は、サイトの内容を個人と教育の目的に限り、商用と AI によるスクレイピングを許可制にしています。データセットの利用条件の第 2 項は、両者が食い違うときはデータセットの利用条件が優先すると書いています。画面をスクレイピングせず、API (第 8 項が API の利用を認めています) か HDX の CSV で取るのが条件に沿います。
- [[HDX]] の同じデータセットのライセンスの表示は「Creative Commons Attribution for Intergovernmental Organisations (CC BY-IGO)」で、UNHCR のサイトの CC BY 4.0 と食い違います。一次配布元の UNHCR の表示に従うのがよいと考えます。

## 気をつけること

- 国の符号が 2 種類あります。UNHCR 独自の符号 (`coo`、`coa`) と ISO3 (`coo_iso`、`coa_iso`) です。99 の国と地域で両者が違います (ドイツは `GFR` と `DEU`)。
- UNHCR の符号の中には、別の国の ISO3 と同じ文字列があります。`AUS` は UNHCR ではオーストリア、ISO3 ではオーストラリアです。`ARE` は UNHCR ではエジプト (ISO3 ではアラブ首長国連邦)、`MAR` は UNHCR ではマルティニーク (ISO3 ではモロッコ) です。地図に結ぶときは必ず `coo_iso`、`coa_iso` (CSV では「(ISO)」の付いた列) を使い、問い合わせにも `cf_type=ISO` を付けます。
- ISO3 の列にも ISO 3166 にない符号があります。無国籍 `XXA`、チベット `TIB`、不明 `UNK` (UNHCR の符号では `UKN`)、IDMC のアビエイ地域 `AB9` です。コソボは「Serbia and Kosovo: S/RES/1244 (1999)」として `SRB` に含まれています。
- [[HDX]] の CSV の符号の列は ISO3 で、不明だけが `UKN` です。
- 解決のデータ (`returned_refugees`、`solutions`) では、庇護国の列の意味が変わります。帰還では出発した国です。2025 年の出身国シリア、庇護国トルコの行の `returned_refugees` 556,009 は、トルコからシリアへ帰った人です。
- 過去の値は公表のたびに直ります (2025 年 6 月の版では 1975 年から 1981 年の米国への第三国定住や、2009 年から 2023 年の IDMC の値が改訂されました)。API は常に最新の版を返し、版を選ぶパラメータはありません。取得した日付を残してください。
- www.unhcr.org のページは curl で取ると Cloudflare のチャレンジ (403、`cf-mitigated: challenge`) が返ります。API の `api.unhcr.org` は直接読めます。

### 地図にするには

このデータには位置の列がありません。
地図にするには、国の境界のポリゴンを別に用意して、ISO3 の符号で結びます。
foil4g の [[Natural Earth Coastline Data]] は海岸線の線で、国の境界を持たないので使えません。
[[Natural Earth]] の Admin 0 Countries や [[geoBoundaries]] の国境界のような行政区域データを使います。

Natural Earth の Admin 0 Countries (1:110m) で試したときの注意です。

- `ISO_A3` 列はフランスとノルウェーが `-99` です。`ISO_A3_EH` 列を使うと結べます。
- 北キプロス、ソマリランド、コソボは `ISO_A3_EH` も `-99` で、UNHCR の行と結べません。
- 2025 年の庇護国別の値を `ISO_A3_EH` で結ぶと、177 の地物のうち 157 が結べました。残りは上の 3 つのほか、パレスチナ (UNHCR の `population` に庇護国としての行が無い)、西サハラ、台湾、北朝鮮などでした。
- 境界の引き方 (係争地の扱い) はデータによって違い、国連の公式の境界とは限りません。国連の文書に載せる地図では、国連の境界の扱いに従ってください。

## データ処理コマンド

2026-10-06 に動かして確かめたコマンドです。
`curl`、`jq`、`unzip`、GDAL (`ogr2ogr`、`ogrinfo`) を使います。

```bash
# 1 行だけ取る (2025 年、シリア出身、トルコにいる人)
curl -s "https://api.unhcr.org/population/v1/population/?year=2025&coo=SYR&coa=TUR&cf_type=ISO" | jq '.items'

# 全期間、全組み合わせの行数 (1 ページ 1 行にして maxPages を見る)
curl -s "https://api.unhcr.org/population/v1/population/?limit=1&yearFrom=1951&yearTo=2026&coo_all=true&coa_all=true" | jq '.maxPages'

# UNRWA のパレスチナ難民と IDMC の国内避難民 (2025 年の合計)
curl -s "https://api.unhcr.org/population/v1/unrwa/?year=2025" | jq '.items[0].total'
curl -s "https://api.unhcr.org/population/v1/idmc/?year=2025" | jq '.items[0].total'

# UNHCR の符号と ISO3 の対応表 (符号が違う国だけ)
curl -s "https://api.unhcr.org/population/v1/countries/?limit=1000" | jq -c '.items[] | select(.code != .iso) | {code, iso, name}'

# 2025 年の庇護国別の値を CSV (zip) で取る (出身国は足し合わされる)
mkdir -p ./tmp
curl -s -o ./tmp/coa2025.zip "https://api.unhcr.org/population/v1/population/?year=2025&coa_all=true&cf_type=ISO&download=true"
unzip -o -q ./tmp/coa2025.zip -d ./tmp/coa2025
head -3 ./tmp/coa2025/population.csv

# Natural Earth の国境界 (1:110m) と ISO3 で結んで GeoJSON にする
curl -s -o ./tmp/ne_110m_admin_0_countries.zip https://naciscdn.org/naturalearth/110m/cultural/ne_110m_admin_0_countries.zip
ogr2ogr -f GPKG ./tmp/work.gpkg /vsizip/./tmp/ne_110m_admin_0_countries.zip -nln countries -nlt MULTIPOLYGON
ogr2ogr -update ./tmp/work.gpkg ./tmp/coa2025/population.csv -nln pop
ogr2ogr -f GeoJSON ./tmp/refugees_by_asylum_2025.geojson ./tmp/work.gpkg -nln refugees_by_asylum_2025 -dialect SQLite \
  -sql "SELECT c.NAME AS name, c.ISO_A3_EH AS iso3, CAST(p.\"Refugees under UNHCR's mandate\" AS INTEGER) AS refugees, c.geom FROM countries c LEFT JOIN pop p ON p.\"Country of asylum (ISO)\" = c.ISO_A3_EH"

# 結べた数を数える (177 のうち 157)
ogrinfo -ro -q ./tmp/refugees_by_asylum_2025.geojson -dialect SQLite \
  -sql "SELECT COUNT(*) AS n, COUNT(refugees) AS matched FROM refugees_by_asylum_2025"
```

## 関連項目

- [[UNHCR]]
- [[UNRWA]]
- [[IDMC]]
- [[HDX]]
- [[UCDP 武力紛争データ]]
- [[World Population Prospects]]
- [[World Bank 世界開発指標]]
- [[Natural Earth Coastline Data]]
- [[Natural Earth]]
- [[geoBoundaries]]
- [[SDGs]]
- [[人道支援]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に、API (`api.unhcr.org/population/v1`) へ直接問い合わせて、年、出身国、庇護国での絞り込み、`coo_all` と `coa_all` の働き、`cf_type=ISO`、`download=true` の zip、各エンドポイントの行数と列、2025 年の合計、`unrwa` と `idmc` の中身を確かめました。
全期間の zip への Range 要求に 206 が返ることを確かめました。
API の説明ページ (refugee-statistics.html) を読んでパラメータの意味を確かめました。
[[HDX]] の `package_show` で CSV の大きさとライセンスの表示を、CSV の先頭を Range で読んで見出しと符号を確かめました。
www.unhcr.org は Cloudflare のチャレンジで直接読めなかったため、methodology のページ (2026-07-30 の保存)、Terms of Use for Datasets (2026-09-21 の保存)、トップページ (2026-09-06 の保存) を Internet Archive で読みました。
SDG 指標 10.7.4 の出典は、国連統計部の SDG API で確かめました。
Natural Earth の Admin 0 Countries (1:110m) と実際に結んで、結べる数と結べない国を確かめました。

確かめられなかったことは次のとおりです。

- 5 未満の値の丸めの原文 (data-content のページの保存が Internet Archive から取れませんでした。値の分布は丸めと矛盾しません)。
- UNRWA と IDMC の値の利用条件。
- 組み合わせの行が無いことと 0 の違い。
- API の利用回数の上限。
- www.unhcr.org の現在のページ (保存された版で読みました)。
