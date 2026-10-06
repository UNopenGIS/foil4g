---
title: World Population Prospects
id: un_wpp
provider: 国連経済社会局 人口部 (国連人口部、United Nations, Department of Economic and Social Affairs, Population Division)
source_data: なし (一次データ)。人口部が各国の国勢調査、標本調査、人口動態登録などを集めて推計したもの
license: [CC-BY-3.0-IGO]
access: split
access_note: split。指標、予測のバリアント、期間ごとに分かれた 40 本の `.csv.gz` から要るものだけを取る。1 本の中は whole (Range に 206 は返るが、gzip の途中からは読めない)
format: [CSV (UTF-8, BOM 付き, gzip 圧縮), Excel (XLSX), PDF (資料)]
coverage: 全世界。国と地域 237、集計地域 318 (地理的地域、SDG 地域、所得グループ、開発グループ、特別集計など)、合わせて 555
period: 推計 1950 年から 2023 年、予測 2024 年から 2100 年 (1 年ごと)
resolution: 国と地域 (国より細かい行政区画は無い)。年ごと。人口は千人単位
size: WPP 2024 の CSV 42 本で 4,039,910,774 バイト (約 4.0GB、gzip のまま)。最小の `WPP2024_Demographic_Indicators_Medium.csv.gz` は 16,557,272 バイト (展開後 40,819,701 バイト)
update: 改訂はおおむね 2 年ごと。最新は WPP 2024 (2024-07-11 公表)。次の改訂は 2027-07-11 の予定
url: https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/ (この下に各ファイル)
docs: https://population.un.org/wpp/ (Downloads の画面)
checked: 2026-10-06
details:
  ファイルの目録: https://population.un.org/wpp/assets/downloads.json
  Data Portal: 'https://population.un.org/dataportal/ (API: https://population.un.org/dataportalapi/index.html)'
---

# World Population Prospects

> [[国連経済社会局]] (UN DESA) の [[国連人口部]] が、世界の 237 の国と地域とその集計地域について、1950 年から 2023 年の人口の推計と 2024 年から 2100 年の予測を、CSV と Excel で配っている国連の公式の人口推計

## 概要

World Population Prospects (WPP) は、国連人口部が作っている国連の公式の人口推計と人口予測です。
国連の他の機関や世界銀行の人口の値の出所にもなっています (例えば [[World Bank 世界開発指標]] の人口 `SP.POP.TOTL` や [[UNDP 人間開発指数]] の人口)。

過去の値 (1950 年から 2023 年) は、各国の国勢調査、標本調査、人口動態登録などの実測を、人口部が補正し、欠けた年を補って推計したものです。
配布物の資料 `WPP2024_Data_Sources.pdf` が、国ごとに使った資料と方法を一覧にしていると目録に書かれています (この PDF の中身は確かめていません)。
将来の値 (2024 年から 2100 年) は、出生、死亡、国際移動の仮定を置いて計算した予測です。

推計なので、実測の国勢調査の値とは一致しないことがあります。
統計の整っていない国ほど、過去の値も含めて推定に頼る部分が大きくなります。
版が変わると、過去の年の値も遡って改訂されます。

2026-01-19 に暫定更新 (Interim Update) が出ています。
トーゴの 2010 年と 2022 年の国勢調査について、国の統計当局が補正済みだった数字を人口部がもう一度補正していたため、2022 年の人口が公式の 8.2 百万に対し WPP 2024 では 9.1 百万になっていた、という訂正です。
直したのはトーゴの推計と中位予測の人口と出生・死亡数だけで、配布元はこう書いています。

> Results for all other locations are unchanged, and global/regional aggregates have not been revised in this interim update.

本体の `.csv.gz` (Last-Modified 2024-12-13) には反映されておらず、別の zip (`WPP2024_CSV_files_update.zip`、943,827 バイト) で配られています。

## 内容

### ファイルの種類

Downloads の画面は目録 `downloads.json` から組み立てられていて、2026-10-06 時点で 351 本のファイルが載っています。

- Standard Projections: 推計と決定論的な予測。Excel (Most used 2 本、Population 17 本、Fertility 7 本、Mortality 24 本)、CSV 42 本、暫定更新の zip 2 本。
- Probabilistic Projections: 確率的予測の要約 (中央値と 80%、95% の予測区間)。Excel 40 本。
- Special Aggregates: 推計と中位予測の一部の指標を、経済圏、地理的なまとまり、政治的なまとまり、国連関係の区分 (World Bank の地域、OECD、G20、NATO、ASEAN、African Union など) で集計した Excel 184 本。
- Documentation: 地域の一覧 (`WPP2024_F01_LOCATIONS.xlsx`)、指標のメタデータ (`WPP2024_F02_Metadata.xlsx`)、資料と方法の一覧 (`WPP2024_Data_Sources.pdf`)。
- Archive: 過去の版。CSV の zip が 1998 年から 2022 年の 12 版、Excel の zip が 1992 年から 2022 年の 14 版、確率的予測の zip が 4 版。

### CSV の共通の列

どの CSV も先頭に次の列を持ちます (Downloads の画面の説明と、ファイルの先頭で確かめました)。

- `SortOrder`: 並び順
- `LocID`: 地域の数字コード。国と地域については ISO 3166-1 の数字コード (日本は 392)
- `Notes`: 注記の記号 (`WPP2024_Locations_notes.csv` と対応)
- `ISO3_code`、`ISO2_code`: ISO 3166-1 の英字コード
- `SDMX_code`: SDMX の地域コード (M49 と ISO 3166 を組み合わせたもの)
- `LocTypeID`、`LocTypeName`: 地域の種類
- `ParentID`: 上位の地域の `LocID`
- `Location`: 地域名 (英語)
- `VarID`、`Variant`: 予測のバリアント
- `Time`: 年
- 年齢別の表にはさらに `AgeGrp`、`AgeGrpStart`、`AgeGrpSpan`、一部の表には `MidPeriod` (1950.5 なら 1950 年 7 月)

位置 (緯度経度やジオメトリ) の列はありません。
地図にするには、`ISO3_code` か `LocID` を手がかりに、国境のデータ ([[Natural Earth]] の国の境界など) と結びます。

### 指標 (Demographic Indicators)

`WPP2024_Demographic_Indicators_Medium.csv.gz` は 67 列で、共通の 13 列に続いて 54 の指標が並びます。

- 人口: `TPopulation1Jan`、`TPopulation1July`、`TPopulationMale1July`、`TPopulationFemale1July` (千人)、`PopDensity` (1 平方 km あたりの人数)、`PopSexRatio` (女性 100 人あたりの男性)、`MedianAgePop` (歳)、`NatChange`、`NatChangeRT`、`PopChange`、`PopGrowthRate` (%)、`DoublingTime` (年)
- 出生: `Births`、`Births1519` (千人)、`CBR` (人口千人あたり)、`TFR` (女性 1 人あたりの出生数)、`NRR`、`MAC`、`SRB`
- 死亡: `Deaths`、`DeathsMale`、`DeathsFemale` (千人)、`CDR`、`LEx`、`LExMale`、`LExFemale` (出生時の平均余命、年)、`LE15`、`LE65`、`LE80` (男女別も)、`InfantDeaths`、`IMR`、`LBsurvivingAge1`、`Under5Deaths`、`Q5`、`Q0040`、`Q0060`、`Q1550`、`Q1560` (男女別も)
- 移動: `NetMigrations` (純移動数、千人)、`CNMR` (人口千人あたりの純移動率)

人の移動は純移動の数と率だけで、どこからどこへ移ったか (出発地と到着地の組) はありません。

ほかの CSV は、総人口 (`TotalPopulationBySex`)、5 歳階級と各歳の人口 (7 月 1 日と 1 月 1 日、実数と割合)、曝露人口、年齢別出生率 (`Fertility_by_Age1`、`Fertility_by_Age5`)、各歳の死亡数、生命表 (簡易と完全、男女別) です。

例として、日本 (`LocID` 392) の中位推計の値は次のとおりです。

| 年 | TPopulation1July (千人) | TFR | LEx (年) |
| ---: | ---: | ---: | ---: |
| 1950 | 86,443.277 | 3.6154 | 59.2548 |
| 2024 | 123,753.041 | 1.2168 | 84.852 |
| 2050 | 105,123.167 | 1.3491 | 88.3907 |
| 2100 | 76,845.989 | 1.472 | 94.3965 |

### 地域の区分

`WPP2024_Demographic_Indicators_Medium.csv.gz` は 84,360 行で、555 の地域 × 152 年 (1950 年から 2101 年) です。
`LocTypeName` の内訳は次のとおりです。

| LocTypeName | 地域の数 | 例 |
| --- | ---: | --- |
| Country/Area | 237 | Japan、State of Palestine、Kosovo (under UNSC res. 1244) |
| (空) | 234 | ADB region、AUKUS、African Union などの特別集計 |
| Ad Hoc groups | 23 | LLDC、SIDS の内訳、人口のピークの時期で分けたグループ |
| Subregion | 21 | 地理的な小地域 |
| SDG region | 9 | Sub-Saharan Africa、Central and Southern Asia など |
| Income group | 9 | High-income countries、Low-income countries など (World Bank の分類) |
| Development group | 7 | More developed regions、Least developed countries、LLDC、SIDS など |
| Special other | 7 | Latin America and the Caribbean など |
| Geographic region | 7 | Africa、Asia、Europe、Americas など |
| World | 1 | World |

`ISO3_code` を持つのは 237 の Country/Area だけです。
`LocTypeName` が空の 234 の特別集計は、`LocTypeID`、`ParentID`、`SortOrder` も空で、`LocID` は 986 から 98509 です。
注記の CSV によると、SDG 地域は国連統計部の SDG 報告の区分、所得グループは 2024-05-08 時点の World Bank の分類に従っています。

### 予測のバリアント

`WPP2024_TotalPopulationBySex.csv.gz` (720,210 行) には 18 のバリアントが入っています。

- 中位 (Medium、`VarID` 2): 1950 年から 2100 年。推計の期間はこの値だけ。
- 決定論的なシナリオ (2024 年から 2100 年): High (3)、Low (4)、Constant fertility (5)、Instant replacement (6)、Zero migration (7)、Constant mortality (8)、No change (9)、Momentum (10)、Instant replacement zero migration (16)、No fertility below age 18 (17)、Accelerated ABR decline (18)、Accelarated ABR decline w/rec. (19、綴りは原文のまま)
- 確率的予測の区間 (2024 年から 2100 年): Median PI (202)、Upper 80 PI (203)、Lower 80 PI (204)、Upper 95 PI (206)、Lower 95 PI (207)。これは 321 の地域だけにあります。

日本の 2100 年の人口は、中位 76,845.989 千人、高位 106,414.196 千人、低位 53,421.354 千人です。
多くの表はファイル名で `_Medium` と `_OtherVariants` に分かれており、各歳の人口はバリアントごとに別のファイルです。
生命表、各歳の死亡数、1 月 1 日の各歳人口などは中位だけです。

### 欠損

欠損は空の文字列で表されます。
`Demographic_Indicators_Medium` では、2101 年の行は `TPopulation1Jan` だけが値を持ち (2100 年末の人口を 2101 年 1 月 1 日として持っている)、ほかの指標は空です。
`DoublingTime` は 34,686 行で空です (人口が減っている年と見られますが、確かめていません)。

## 取り出し方

区分は split です。
CSV は指標、バリアント、期間 (1950-2023 と 2024-2100) ごとに 40 本の `.csv.gz` と 2 本の注記の `.csv` に分かれていて、必要なものだけを取れます。
最小単位は 1 本の `.csv.gz` で、最小は `WPP2024_Demographic_Indicators_Medium.csv.gz` (16,557,272 バイト)、最大は `WPP2024_Fertility_by_Age1.csv.gz` (301,907,467 バイト) です。

国や年で絞った一部だけを、ファイルから直接取り出すことはできません。
サーバー (`Windows-Azure-Web/1.0`) は Range 要求に 206 (`content-range: bytes 0-1023/16980593`) を返しますが、`.csv.gz` は 1 本の gzip の流れなので、途中からは展開できません。
先頭だけを読めば列名と最初の行は分かります。
国や年で絞るには、1 本を取ってから絞り込みます。

認証は要りません。
2026-10-06 には 16MB のファイルの取得に 2 分以上かかったので、大きいファイルは途中から再開できるように `curl -C -` を使うと安全です。

Data Portal API は、目録 (`/api/v1/locations` など) は認証なしで 200 を返しましたが、データ (`/api/v1/data/indicators/...`) は 401 で、トークンが要ります。
トークンは登録フォームで申請するもので、ここでは申請していません。
国や指標で絞って引けるのは API の方ですが、まとめて使うなら CSV の方が手間が少ないです。

## 使いどころ

- [[SDGs]] の指標の分母。1 人あたりや人口千人あたりの率を出すときの人口として広く使われます。例えば目標 3 (健康) の乳児死亡率 (`IMR`) や 5 歳未満死亡数 (`Under5Deaths`)、ターゲット 3.7 の 15 歳から 19 歳の出生 (`Births1519`、年齢別出生率) が入っています。
- 人道支援と防災で、被災国や受け入れ国の人口規模と年齢構成 (子ども、高齢者の割合) をつかむ。[[UNHCR 難民統計]] の難民数を受け入れ国の人口で割るなど。
- 気候変動や食料の長期シナリオで、2100 年までの人口の前提として使う。高位と低位のバリアントや確率的予測の区間で幅を示せます。
- 国の境界と結んで、国別の人口、人口密度、高齢化の地図 (コロプレス図) を作る。

使ってはいけない使い方もあります。

- 国より細かい単位 (州、県、市町村、格子) の人口には使えません。国の値を面積で配分すると、都市と農村の差が消えます。格子の人口が要るなら、別のデータが必要です。
- 予測は仮定に基づく計算で、実際にそうなるという見込みではありません。特に中位だけを確定した未来のように示さないでください。
- 推計の値を国勢調査の公式値として扱わないでください (上のトーゴの例のように、公式値と食い違うことがあります)。
- 純移動しか無いので、難民や移民の出発地と到着地の分析には使えません。

## ライセンスと帰属表示

ライセンスは [[CC-BY-3.0-IGO]] (Creative Commons Attribution 3.0 IGO) です。
根拠は WPP の Downloads の画面の各群の脚注 (目録 `downloads.json` の `Footer`) で、次のように書かれています。

> Copyright © 2024 by United Nations, made available under a Creative Commons license CC BY 3.0 IGO: http://creativecommons.org/licenses/by/3.0/igo/

推奨の引用文も同じ脚注にあります。

> Suggested citation: United Nations, Department of Economic and Social Affairs, Population Division (2024). World Population Prospects 2024, Online Edition.

- Special Aggregates の引用文は「World Population Prospects 2024 - Special Aggregates, Online Edition」です。
- Archive (過去の版) の脚注は「Copyright © 1992-2024 by United Nations」で、引用文は「United Nations, Department of Economic and Social Affairs, Population Division ([revision year]). World Population Prospects [revision year], archive.」と版の年を入れる形です。
- 暫定更新 (Interim Update) の群には脚注がありません。

CC BY 3.0 IGO の条文 (https://creativecommons.org/licenses/by/3.0/igo/legalcode) では、複製、再配布、改変、商用利用ができます。
条件は、著作権表示と帰属を示すこと、改変したらその旨を示すこと、ライセンスの URI を付けることです。

> You must include a copy of, or the Uniform Resource Identifier (URI) for, this License with every copy of the Work You Distribute or Publicly Perform.

また、国連が利用者や利用を推奨・後援していると示唆してはいけません。

> You may not implicitly or explicitly assert or imply any connection with, sponsorship or endorsement by the Licensor or others designated for attribution, of You or Your use of the Work, without the separate, express prior written permission of the Licensor or such others.

国際機関 (IGO) 向けの版なので、国連の特権と免除は放棄されず、紛争は調停と仲裁で扱うと条文に書かれています。

地図に使うときは、例えば次のように表示します。

- 人口: United Nations, Department of Economic and Social Affairs, Population Division (2024). World Population Prospects 2024, Online Edition. CC BY 3.0 IGO (http://creativecommons.org/licenses/by/3.0/igo/)

un.org のサイト全体の利用規約 (Terms of Use) は、非商用の個人利用に限ると書いています。
WPP のデータには配布画面で個別に CC BY 3.0 IGO が明示されているので、こちらが適用されると読めますが、両者の優先関係を人口部に確かめてはいません。

## 気をつけること

- 版の取り違え。WPP 2022、WPP 2024 など版ごとに過去の年の値も変わります。他の機関のデータ ([[World Bank 世界開発指標]]、[[UNDP 人間開発指数]]、[[FAOSTAT]] など) が使っている WPP の版と合わせてください。
- 同じ版の中でも、ファイル名を変えずに中身が差し替わることがあります。例えば `WPP2024_Demographic_Indicators_notes.csv` は Last-Modified が 2025-07-03 で、ほかの CSV (2024-12-13) より新しいです。取得日と Last-Modified を記録してください。
- 暫定更新 (トーゴ) は本体の CSV に入っていません。トーゴの最新の値が要るなら、`WPP2024_CSV_files_update.zip` の値で置き換えます。地域集計は直されていません。
- 集計地域が国と同じ表に混ざっています。国別に使うときは `LocTypeName` が `Country/Area` の行 (`ISO3_code` が空でない行) に絞らないと、World や地域の合計を二重に数えます。
- 境界データとの結合。`ISO3_code` には ISO 3166-1 に無いコードもあります (コソボは `XKX`、`LocID` 412)。中国の値には香港、マカオ、台湾が含まれない (それぞれ別の行) など、注記で範囲が決まっている国があります。境界データ側の国の区切り方とコードが一致するかを確かめてから結んでください。
- 単位。人口や出生数、死亡数は千人単位です。
- 2101 年の行は 1 月 1 日の人口だけで、ほかの指標は空です。
- 2024 年以降の値は予測です。推計と予測の境目 (2023 年と 2024 年) を図で区別してください。
- CSV は UTF-8 で先頭に BOM があります。BOM を外さないと、最初の列名が `SortOrder` として読めないことがあります。
- 確率的予測の区間 (Median PI など) は `TotalPopulationBySex` に入っていますが、321 の地域だけです。
- 取り違えやすい別のデータ: 同じ人口部の World Urbanization Prospects (都市人口) と International Migrant Stock (移民のストック) は別のデータです。

## データ処理コマンド

次のコマンドは 2026-10-06 に動かして確かめました。

```bash
B='https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES'

# 大きさと更新日を確かめる
curl -sI "$B/WPP2024_Demographic_Indicators_Medium.csv.gz" | grep -iE '^HTTP|content-length|last-modified'

# 先頭 1KB だけを Range で読んで、列名と最初の行を見る (gzip の途中で切れるので警告は捨てる)
curl -s -r 0-1023 "$B/WPP2024_TotalPopulationBySex.csv.gz" | gzip -dc 2>/dev/null | head -c 600

# 最小のファイルを取る (約 16MB。遅いときは同じコマンドを繰り返すと続きから再開する)
mkdir -p ./tmp && cd ./tmp
curl -s -C - -o WPP2024_Demographic_Indicators_Medium.csv.gz "$B/WPP2024_Demographic_Indicators_Medium.csv.gz"

# 列の数を数える (67)
gzip -dc WPP2024_Demographic_Indicators_Medium.csv.gz | head -1 | tr ',' '\n' | wc -l

# 日本の人口、合計特殊出生率、平均余命を見る
python3 -c "
import csv, gzip
with gzip.open('WPP2024_Demographic_Indicators_Medium.csv.gz', 'rt', encoding='utf-8-sig') as f:
    for r in csv.DictReader(f):
        if r['ISO3_code'] == 'JPN' and r['Time'] in ('1950', '2024', '2050', '2100'):
            print(r['LocID'], r['ISO3_code'], r['Time'], r['TPopulation1July'], r['TFR'], r['LEx'])
"

# 国と地域だけ (237 行) の 2024 年の人口を、境界データと結ぶための表にする
python3 -c "
import csv, gzip
with gzip.open('WPP2024_Demographic_Indicators_Medium.csv.gz', 'rt', encoding='utf-8-sig') as f, open('wpp2024_countries_2024.csv', 'w', newline='') as out:
    w = csv.writer(out); w.writerow(['ISO3_code', 'LocID', 'Location', 'TPopulation1July'])
    for r in csv.DictReader(f):
        if r['LocTypeName'] == 'Country/Area' and r['Time'] == '2024':
            w.writerow([r['ISO3_code'], r['LocID'], r['Location'], r['TPopulation1July']])
"
head -3 wpp2024_countries_2024.csv
```

できた `wpp2024_countries_2024.csv` を、国境のデータの ISO 3166-1 alpha-3 の列と結べば地図にできます。
境界データとの結合そのものは、ここでは動かしていません。

## 関連項目

- [[国連経済社会局]]
- [[国連人口部]]
- [[UN Open GIS Initiative]]
- [[World Bank 世界開発指標]]
- [[UNDP 人間開発指数]]
- [[FAOSTAT]]
- [[ILOSTAT]]
- [[UNHCR 難民統計]]
- [[Natural Earth]]
- [[SDGs]]
- [[CC-BY-3.0-IGO]]

## 確認日

2026-10-06 に次のことを確かめました。

- 目録 `downloads.json` を取得し、ファイルの一覧 (351 本)、各群の脚注のライセンスと推奨の引用文、CSV の列の説明、暫定更新の説明を読みました。
- CSV 42 本すべてに HEAD を送り、大きさと Last-Modified を確かめました (いずれも応答あり)。
- Range 要求 (`-r 0-1023`) に 206 が返ることと、`.csv.gz` の先頭の列名を確かめました。
- `WPP2024_Demographic_Indicators_Medium.csv.gz` と `WPP2024_TotalPopulationBySex.csv.gz` (合わせて約 33MB) を取得して、行数、地域の数と種類、バリアント、年の範囲、欠損を数えました。
- `WPP2024_Locations_notes.csv` の注記を読みました。
- CC BY 3.0 IGO の条文を creativecommons.org で読みました。
- Data Portal API の目録が認証なしで 200、データが 401 になることを確かめました。

確かめていないこと:

- 方法の詳細 (どの資料をどう補正したか、予測の仮定の置き方)。`WPP2024_Data_Sources.pdf` と方法の報告書は読んでいません。
- 各バリアントの定義 (Definition of Projection Scenarios のページは読んでいません)。
- Excel、確率的予測、特別集計、過去の版の zip の大きさと中身。
- CSV 40 本のうち、取得した 2 本以外の展開後の大きさと行数。
- Data Portal API のデータの中身 (トークンを申請していません)。
- un.org の一般の利用規約と CC BY 3.0 IGO の優先関係についての人口部の見解。
