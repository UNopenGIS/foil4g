---
title: ILOSTAT
description: "国際労働機関 (ILO) が、雇用、失業、賃金、労働時間、非公式経済、児童労働、労働災害などの労働統計を、約 200 の国・地域と地域集計について、指標ごとまたは国ごとに分けた CSV などのファイルと SDMX API で配っている統計データベース"
provider_group: "ILO"
categories: ["人口・社会"]
regions: ["全世界"]
formats: ["CSV", "TSV", "JSON", "XLSX", "Parquet", "Feather", "Stata", "SDMX-ML"]
id: ilostat
provider: [国際労働機関 (ILO, International Labour Organization)]
source_data: 各国の労働力調査、人口センサス、事業所調査、行政記録などを ILO が集めた値と、ILO 自身の推計 (ILO Modelled Estimates)。IMF、世界銀行 ICP、UNICEF MICS などほかの国際機関の値も含む
license: [CC-BY-4.0]
license_note: CC-BY-4.0 (ILO の Rights and permissions により、2023-05-03 以降に公開されたデータベースとデータセットに適用)
access: split
access_note: split。指標 × 頻度の 1,964 ファイル、または国・地域 × 頻度の 741 ファイルから選ぶ。指標ファイルは `ref_area` (国) と `timefrom` (年) で行を絞って取れる。SDMX API でも指標ごとに国と期間で絞れる。各ファイルは Range 非対応
format: 一括配布は `.csv.gz` (既定)、`.csv`、`.csv2`、`.tsv`、`.json`、`.xlsx`、`.parquet`、`.feather`、`.dta` を選べる。SDMX API は SDMX-ML と CSV
coverage: 全世界。国・地域コード 327 (うち `X` で始まる 93 は世界・地域・所得グループなどの集計)。国より細かい行政単位は無い
period: 1914 年から 2030 年 (目次の `data.start` と `data.end` の最小と最大。2026 年より後は推計・予測)
resolution: 国 × 年 (一部は四半期・月) × 性別・年齢・産業などの分類
size: 全体は測っていません。目次の行数の合計は 399,233,347 行。1 ファイルは 38,913 バイトから 33,150,844 バイト (`.csv.gz`、調査メモの値)。SDG 8.5.2 の失業率ファイルは 318,328 バイト、48,632 行
update: 指標ごとに随時。2026-10-06 時点で 1,964 ファイルのうち 1,807 の最終更新が 2026-09 か 2026-10。決まった公開日の記載は確かめていません
url: https://rplumber.ilo.org/files/website/bulk/indicator.html (指標別の一覧)
docs: https://ilostat.ilo.org/data/bulk/ (Bulk download facility)
checked: 2026-10-06
details:
  SDMX API: https://sdmx.ilo.org/rest/
---

# ILOSTAT

> [[国際労働機関]] (ILO) が、雇用、失業、賃金、労働時間、非公式経済、児童労働、労働災害などの労働統計を、約 200 の国・地域と地域集計について、指標ごとまたは国ごとに分けた CSV などのファイルと SDMX API で配っている統計データベース

## 概要

ILOSTAT は、ジュネーブに本部を置く国連の専門機関 [[国際労働機関]] (ILO) の労働統計データベースです。
国ごと年ごとの雇用、失業、労働力、労働時間、賃金と所得、非公式経済、児童労働、労働安全衛生、労働移動、労使関係、社会保障などの指標を、同じ形の表で配っています。

値の作り方は 2 通りです。
1 つは、各国の統計機関が行った労働力調査や人口センサス、行政記録の集計値を ILO が集めたものです。
ILO が各国のマイクロデータから自分で集計し直した値もあります (SDMX の注記に「ILO-STATISTICS - Micro data processing」とあるもの)。
もう 1 つは、ILO が統計モデルで欠けた国や年を補った推計 (ILO Modelled Estimates) です。
同じファイルの中にこの 2 種類が混在し、`source` 列で見分けます。

作り方から来る限界があります。
各国の調査は定義、対象年齢、調査時期がそろっておらず、同じ指標でも国の間の比較には注意が要ります。
モデル推計は観測値ではないので、調査の無い国や年の値は推計です。
国より細かい地域 (州・県・市) の値は無く、都市と農村の別は分類 (`cl_geo`) として一部の指標にだけあります。

## 内容

### 指標の数

2026-10-06 に取得した指標の目次 (`metadata/toc/indicator`) は 1,964 行、20 列でした。

- 異なる指標は 1,213 個です。
- これを頻度で分けたファイルが 1,964 個で、年次 1,204、四半期 590、月次 170 です。
- SDMX API の dataflow は 1,215 個です (`DF_<指標>`)。
- 主題 (`subject.label`) は 27 種類で、多い順に失業と労働の未活用 457、非公式経済 450、雇用 245、労働時間 146、賃金と所得 129 ファイルです。
- データベース (`database.label`) は 17 種類で、Labour Force Statistics (LFS) 405、Wages and Working Time Statistics (COND) 262、Education and Mismatch Indicators (EMI) 253 ファイルなどです。SDG の指標は SDG Labour Market Indicators (ILOSDG) の 25 ファイルにまとまっています。

目次の列は `id`、`indicator`、`indicator.label`、`freq`、`rep_var`、`classification`、`data.start`、`data.end`、`last.update`、`n.records`、`n.records.all`、`n.ref_area`、`with.region`、`subject`、`database` などです (多くに `.label` 付きの名前の列が対になります)。
`last.update` は `日/月/年 時:分:秒` の形です。

### データファイルの列

SDG 8.5.2 の失業率 (`SDG_0852_SEX_AGE_RT_A`) の CSV は UTF-8、見出しあり、カンマ区切りで、次の列を持っていました。

```
ref_area,source,indicator,sex,classif1,time,obs_value,obs_status,note_classif,note_indicator,note_source
"JPN","BA:259","SDG_0852_SEX_AGE_RT","SEX_T","AGE_YTHADULT_YGE15","2025",2.5,,,,
```

- `ref_area` は ISO 3166 の 3 文字の国コードか、`X` で始まる集計コードです。消滅した国 (ANT、オランダ領アンティル) も残っています。
- `source` は出典のコードで、`BA:259` は日本の「LFS - Labour Force Survey」、`XA:2198` などは「ILO - Modelled Estimates」です。コード表 `source` で名前を引きます。
- `sex`、`classif1`、`classif2` は分類のコードです。どの分類を持つかは指標によって違い、列の数も変わります。
- `time` は年 (`2025`)、四半期や月のファイルではその期間を表します。
- `obs_value` は値です。単位は指標の名前に入っています (`RT` は率 %、`NB` は数)。
- `obs_status` は値の状態で、`A` Adjusted、`B` Break in series、`M` Model-based extrapolation、`U` Unreliable、`R` Real value、`I` Imputation です。
- 欠損は空欄です。このファイルでは 48,632 行のうち 90 行が `obs_value` が空で、確かめた行は `obs_status` が `U` (Unreliable) でした。

値は名前ではなくコードで入っています。
名前はコード表 (`metadata/dic?var=<名前>`) で引きます。
コード表の一覧には 488 個あり、`cl_age`、`cl_eco`、`ref_area`、`source`、`obs_status` などです。

## 取り出し方

区分は split です。
一括配布は、同じデータを 2 通りに分けています。

- 指標 × 頻度の 1,964 ファイル (`https://rplumber.ilo.org/data/indicator?id=<ID>&format=.csv.gz`)
- 国・地域 × 頻度の 741 ファイル (`https://rplumber.ilo.org/data/ref_area?id=<ID>&format=.csv.gz`)

指標ファイルには問い合わせの引数が効きます。
`ref_area=JPN&timefrom=2020` を付けると、日本の 2020 年以降の行だけが返りました。

ファイルは要求のたびにその場で作られます。
応答に `Content-Length` と `Last-Modified` は無く、`content-disposition` のファイル名には生成した時刻が付きます (`SDG_0852_SEX_AGE_RT_A-20261006T0812.csv.gz`)。
HEAD 要求は 405 を返し、`Range: bytes=0-1023` を付けても 200 で全体 (318,328 バイト) が返りました。
そのため 1 つのファイルの中では whole です。

SDMX API でも取れます。
`https://sdmx.ilo.org/rest/data/ILO,DF_<指標>,1.0/<キー>?startPeriod=<年>&format=csv` の形で、キーの先頭が国コード、2 番目が頻度です。
`DF_SDG_0852_SEX_AGE_RT` に `JPN.A...` と `startPeriod=2023` を付けると、日本の値だけが返りました。
SDMX の CSV は出典を名前で持ち (`LFS - Labour Force Survey`)、単位 (`UNIT_MEASURE`) や小数桁 (`DECIMALS`) の列もあります。

一覧ページは、ブラウザ風の User-Agent を付けないと中身が空で返ることがあります (調査メモの記録。2026-10-06 は `-A "Mozilla/5.0"` を付けて取得しました)。
説明ページの `ilostat.ilo.org` は Cloudflare のチャレンジ (HTTP 403) を返し、curl では読めませんでした。
`rplumber.ilo.org` と `sdmx.ilo.org` は認証なしで読めました。

## 使いどころ

### SDG 8 との関係

ILOSTAT は SDG 8 (働きがいも経済成長も) の指標の多くを国別に持っています。
SDG Labour Market Indicators (ILOSDG) の 25 ファイルのうち、SDG 8 に当たるのは次のものです。

- 8.2.1 就業者 1 人あたりの実質 GDP の年成長率
- 8.3.1 雇用全体に占める非公式雇用の割合 (性別・産業別)
- 8.5.1 被用者の平均時給 (性別・職業別、各国通貨)
- 8.5.2 失業率 (性別・年齢別、性別・障害の有無別)
- 8.6.1 教育も雇用も職業訓練も受けていない 15〜24 歳の割合 (NEET 率)
- 8.7.1 経済活動に従事する子どもの割合 (児童労働)
- 8.8.1 労働者 10 万人あたりの死亡・非死亡の労働災害 (性別・移民の別)
- 8.8.2 結社の自由と団体交渉権などの労働権の遵守の水準
- 8.b.1 若者の雇用のための国家戦略の有無

ほかに 1.1.1 (働く貧困層の割合)、1.3.1 (社会保護の対象となる人口の割合)、5.5.2 (管理職に占める女性の割合)、9.2.2 (雇用に占める製造業の割合)、10.4.1 (GDP に占める労働分配率) のファイルもあります。
同じ指標番号に複数のファイルがあるのは、定義の版 (13th ICLS と 19th ICLS) や基準年 (2015 年と 2021 年の価格) の違いによるものです。

### 地図での使い方

- 国境のポリゴン ([[Natural Earth]] など) と `ref_area` の ISO 3 文字コードで結び付けて、失業率や非公式雇用の割合の主題図を作れます。
- 人道支援や難民受け入れの文脈で、受け入れ国の失業率や若者の NEET 率を [[UNHCR 難民統計]] と並べて見ることができます。
- [[World Bank 世界開発指標]] の雇用関連の指標の多くは ILO の推計を引いているので、出所を ILOSTAT までたどれます。

### 使ってはいけない使い方

- 国の中の地域差は分かりません。国の値を州や市に割り振った地図は、このデータからは作れません。
- `X` で始まる集計コードを国と一緒に数えたり塗ったりしないでください。
- モデル推計 (`XA` の出典) を観測値として扱わないでください。調査の無い国や将来の年の値は推計です。
- 定義の版が違うファイル (例: 8.5.2 の 13th ICLS と 19th ICLS) を混ぜて時系列を作らないでください。

## ライセンスと帰属表示

ILO の Rights and permissions のページ (https://www.ilo.org/rights-and-permissions) が根拠です。
ILOSTAT のフッターの「Copyright & permissions」はこのページを指しています (調査メモの記録。2026-10-06 は ILOSTAT のページを直接読めませんでした)。

データの節の原文です。

> As of 3 May 2023, databases and datasets together with the accompanying referential metadata are covered by the Creative Commons CC BY 4.0 licence. This licence does not apply to microdata submitted by or obtained from constituents and partner institutions that is restricted solely to the ILO's use.

2023-05-03 より前のものについての原文です。

> Databases and datasets together with the accompanying referential metadata produced prior to 3 May 2023 do not automatically benefit from a Creative Commons licence. It is essential that users check the copyright page of each work for exact licence information.

ページの冒頭は、出典として ILO を示すことを条件にしています。

> All ILO knowledge products published on or after 3 May 2023 by the ILO or on its behalf will be available for use or reuse without needing to request permission – as long as the ILO is cited as the source of material.

読み取れることは次のとおりです。

- 現行の一括配布は随時作り直されており、2026-10-06 時点で 1,964 ファイルのうち 1,963 の最終更新が 2023-05-03 より後でした。この日付の条件で CC BY 4.0 の対象と読めます。
- 例外は `ILR_CBCT_NOC_RT_A` の 1 ファイルで、最終更新が 2022-05 でした。このファイルに CC BY 4.0 が及ぶかは、文言からは決まりません。
- 2023-05-03 より前に取得した古いファイル (旧一括配布や過去の保存物) も、自動では CC BY 4.0 になりません。
- 対象外はマイクロデータ (加盟国や協力機関から ILO 専用として受け取った個票) です。一括配布は集計値です。
- ILO の名前と紋章 (ロゴ) は「legally protected and may not be used without express written permission」とされています。データを再配布するときに ILO のロゴを使わないでください。
- 第三者の権利の節は「ILO publications and documents」についてのもので、データに含まれる IMF、世界銀行、UNICEF、各国統計機関の値に別の条件が付くかは書かれていません。それらの機関側の条件は確かめていません。

表示文の例です。

- Source: ILOSTAT, International Labour Organization (ILO), https://ilostat.ilo.org/, accessed 2026-10-06. Licensed under CC BY 4.0.

CC BY 4.0 に従い、ライセンスへのリンクと、加工した場合はその旨を添えます。
ILOSTAT 自身が指定する引用の書式は確かめていません。

## 気をつけること

- 版はありません。ファイルは上書きされ、URL にもファイル名にも版が入りません。版を示せるのは目次の `last.update` だけです。再現が必要なら、取得日と `last.update` を記録して手元に保存してください。
- SDMX の dataflow はすべて version 1.0 のままで、中身が変わっても版番号は変わりません。
- 指標 ID が同じまま定義が変わることがあります。調査メモでは、1.1.1 の働く貧困層の貧困線が 2026 年 1 月ごろに 1 日 2.15 ドルから 3 ドルに変わっていました。
- 列は指標によって、また時期によって増減します (`classif2`、`obs_status`、`note_classif` など)。列の位置ではなく名前で読んでください。
- 国コードは ISO 3166 の 3 文字ですが、消滅した国 (ANT) や集計コード (`X01` など) が同じ列に入っています。
- 目次の `n.records` と `n.records.all` は値が違います (合計で約 3,000 万行の差)。差の意味は確かめていません。
- 一括配布の CSV は出典をコード (`BA:259`) で、SDMX の CSV は名前 (`LFS - Labour Force Survey`) で持ちます。両方を混ぜるときは対応を取ってください。
- 旧一括配布 (`www.ilo.org/ilostat-files/WEB_bulk_download/`) は配布されていません (調査メモの記録)。古い手順書の URL は使えません。
- [[World Bank 世界開発指標]] の労働関連の値は ILO の推計を転載したもので、更新の時期がずれることがあります。

## データ処理コマンド

2026-10-06 に動かして確かめたコマンドです。

```bash
mkdir -p ./tmp

# 指標の目次 (1,964 行) を取得する
curl -s -A "Mozilla/5.0" -o ./tmp/ilostat_toc.csv \
  "https://rplumber.ilo.org/metadata/toc/indicator?lang=en&format=.csv"

# SDG 8.5.2 の失業率 (年次) を全部取得して中身を見る
curl -s -A "Mozilla/5.0" -o ./tmp/SDG_0852_SEX_AGE_RT_A.csv.gz \
  "https://rplumber.ilo.org/data/indicator?id=SDG_0852_SEX_AGE_RT_A&format=.csv.gz"
zcat ./tmp/SDG_0852_SEX_AGE_RT_A.csv.gz | head -3

# 国と期間で絞って取得する (日本、2020 年以降)
curl -s -A "Mozilla/5.0" \
  "https://rplumber.ilo.org/data/indicator?id=SDG_0852_SEX_AGE_RT_A&ref_area=JPN&timefrom=2020&format=.csv" | head -4

# コード表を引く (値の状態のコード)
curl -s -A "Mozilla/5.0" \
  "https://rplumber.ilo.org/metadata/dic?var=obs_status&lang=en&format=.csv"

# SDMX API で取得する (日本、2023 年以降、CSV)
curl -s -A "Mozilla/5.0" \
  "https://sdmx.ilo.org/rest/data/ILO,DF_SDG_0852_SEX_AGE_RT,1.0/JPN.A...?startPeriod=2023&format=csv" | head -3
```

## 関連項目

- [[国際労働機関]]
- [[World Bank 世界開発指標]]
- [[UNDP 人間開発指数]]
- [[World Population Prospects]]
- [[UNHCR 難民統計]]
- [[FAOSTAT]]
- [[Natural Earth]]
- [[SDMX]]
- [[持続可能な開発目標]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次のことを確かめました。

- 一括配布の一覧ページ 3 つ (indicator、ref_area、dic) を取得し、末尾の「Last update: 2026-10-05」と、選べる形式の一覧を読みました。
- 指標の目次と国・地域の目次を取得し、行数、指標の数、頻度、期間、最終更新の分布、SDG の指標を数えました。
- `SDG_0852_SEX_AGE_RT_A` を 1 本取得して列と欠損を確かめ、HEAD が 405、Range 要求が 200 で全体を返すこと、`ref_area` と `timefrom` で絞れることを確かめました。`.rds` と `.parquet` も取れることを確かめました (`.rds` は一覧の選択肢にはありません)。
- SDMX API の dataflow の一覧 (1,215 個) を取得し、日本の値を CSV で取れることを確かめました。
- ILO の Rights and permissions のページを読み、2023-05-03 の条件の原文を確かめました。

確かめられなかったことは次のとおりです。

- `ilostat.ilo.org` は Cloudflare のチャレンジで読めませんでした。説明ページの記述とフッターの表示は調査メモ (Internet Archive の保存) によります。
- 一括配布全体の大きさは測っていません。1 ファイルの最大 (33,150,844 バイト) は調査メモの値です。
- 目次の `n.records` と `n.records.all` の差の意味、`region` 引数で効く値、公式な更新頻度の記述は確かめていません。
- データに含まれる他機関の値に、ILO の CC BY 4.0 と別の条件が付くかは確かめていません。
