---
id: undp_hdr
provider: 国連開発計画 (UNDP) の Human Development Report Office (HDRO)。多次元貧困指数 (MPI) は HDRO とオックスフォード大学の OPHI の共同作成
source_data: 他機関の統計 (UNDESA の World Population Prospects、UNESCO 統計研究所、Barro and Lee、IMF、World Bank、国連統計部、ILOSTAT、IPU、WHO などの共同推計、Global Carbon Project、UNEP) と、DHS・MICS などの世帯調査の個票 (MPI)。HDRO はこれらを集めて指数を計算している
license: [CC-BY-3.0-IGO]
license_note: CC-BY-3.0-IGO (hdr.undp.org の Terms of use)。報告書本体の PDF は「All rights reserved」
access: whole
access_note: whole。全指数・全期間・全か国の時系列が 2,001,263 バイトの CSV 1 本。国・年・指標で絞れる API (HDRO Data API 2.0) もあるが、登録して API キーを取る必要がある
format: [CSV (横持ち, Windows-1252, 改行 CRLF), XLSX (統計付録の表, 列の説明, MPI の表), PDF (Technical Notes)]
coverage: 全世界。195 の国と地域 (うち北朝鮮とモナコは HDI の値なし) と、11 の集計 (HDI の 4 区分、6 つの開発途上地域、世界)。国の中の地方の値は無い (MPI の地方別推計は別)
period: 1990〜2023 年 (IHDI とその構成要素は 2010〜2023 年、順位は 2023 年だけ)
resolution: 国 (ISO 3166-1 alpha-3 の `iso3`) × 年。位置の列は無い
size: 時系列 CSV 2,001,263 バイト (HDR 2025 の全指数、206 行 × 1,112 列)。MPI の表 `2025_gMPI_Table1and2.xlsx` 139,761 バイト
update: 年 1 回 (Human Development Report の刊行に合わせる)。毎回、過去の年も含めて全系列を計算し直す。MPI は別の日程で更新
url: https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv
docs: https://hdr.undp.org/data-center/documentation-and-downloads
checked: 2026-10-06
details:
  現行の版: Human Development Report 2025 (HDR 2025、データ更新 2025-05-06)。MPI は 2025-10-17 更新
  計算方法: https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Technical_Notes.pdf
  利用条件: https://hdr.undp.org/terms-use
---

# UNDP 人間開発指数

> [[国連開発計画]] (UNDP) の人間開発報告書室 (HDRO) が、人間開発指数 (HDI) とそれに連なる複合指数を、195 か国と 11 の集計について 1990 年から 2023 年まで計算し、1 本の CSV と XLSX の表で配っている国別統計

## 概要

人間開発指数 (Human Development Index、HDI) は、国の発展を所得だけでなく、健康、教育、生活水準の 3 つの面から測るために UNDP が 1990 年から毎年公表している指数です。
HDI は、出生時平均余命、就学予測年数と平均就学年数、1 人あたり国民総所得 (GNI、2021 年購買力平価ドル) を 0 から 1 の指数にし、その幾何平均をとったものです。
HDRO は HDI のほかに、不平等で割り引いた HDI (IHDI)、男女の HDI の比であるジェンダー開発指数 (GDI)、ジェンダー不平等指数 (GII)、地球への負荷 (CO2 排出とマテリアルフットプリント) で調整した HDI (PHDI)、多次元貧困指数 (MPI) を計算しています。

HDRO 自身は観測をしていません。
構成要素の値は、それぞれの分野で国のデータを集める役目を持つ国際機関の統計から取り、欠けている所は HDRO が回帰などで推計して埋めています。
統計付録の表の脚注には「HDRO estimate」「estimates using cross-country regression」などの注記が国ごとに付いており、すべてが観測値ではありません。
MPI は国ごとの世帯調査 (DHS、MICS など) の個票から計算しており、調査の年は国ごとに違います (Table 1 の列 1 に国ごとの調査名と年があります)。

作り方から来る限界があります。

- 国の平均を表す値なので、国の中の地域差は見えません。
- 他機関の推計を重ねて作るため、元の統計の改訂や、購買力平価の基準年の変更で、過去の年の値も毎年変わります (下の「気をつけること」)。
- 一部の構成要素は最新年の値を後の年に繰り返して埋めています。列の説明 (`HDR25_Composite_indices_metadata.xlsx`) の期間の欄によれば、妊産婦死亡率 `mmr` は「1990-2019, 2020-2023=2020」、所得の不平等 `ineq_inc` は「2010-2021, 2022-2023=2022」です。2021 年以降の `mmr` は 2020 年の値の繰り返しで、その年の観測ではありません。

## 内容

主な配布物は、全指数の時系列を 1 本にまとめた `HDR25_Composite_indices_complete_time_series.csv` です。
列は「指標_年」の横持ちで、共通 4 列 (`iso3`, `country`, `hdicode`, `region`) と値の列 1,108 の計 1,112 列、206 行です。
列の正式名と単位は `HDR25_Composite_indices_metadata.xlsx` のシート `codebook` にあり、推奨の引用文はシート `recommended_citation` にあります。

| 指数 | 列 (年を除いた名前) | 期間 |
| ---- | ------------------- | ---- |
| 人間開発指数 (HDI) | `hdi`、`le` (出生時平均余命、年)、`eys` (就学予測年数)、`mys` (平均就学年数)、`gnipc` (1 人あたり GNI、2021 年 PPP ドル)、`hdi_rank` | 1990〜2023 (順位は 2023 のみ) |
| ジェンダー開発指数 (GDI) | `gdi`、`gdi_group`、女性と男性の `hdi_f`/`hdi_m`、`le_f`/`le_m`、`eys_f`/`eys_m`、`mys_f`/`mys_m`、`gni_pc_f`/`gni_pc_m` | 1990〜2023 (`gdi_group` は 2023 のみ) |
| 不平等調整済み HDI (IHDI) | `ihdi`、`coef_ineq` (人間の不平等の係数)、`loss` (HDI からの損失、%)、`ineq_le`、`ineq_edu`、`ineq_inc` | 2010〜2023 |
| ジェンダー不平等指数 (GII) | `gii`、`gii_rank`、`mmr` (妊産婦死亡率、出生 10 万あたり)、`abr` (15〜19 歳の出生率、千人あたり)、`se_f`/`se_m` (25 歳以上で中等教育を受けた割合、%)、`pr_f`/`pr_m` (議席の割合、%)、`lfpr_f`/`lfpr_m` (15 歳以上の労働参加率、%) | 1990〜2023 (順位は 2023 のみ) |
| 地球への負荷で調整した HDI (PHDI) | `phdi`、`diff_hdi_phdi` (HDI との差、%)、`rankdiff_hdi_phdi`、`co2_prod` (生産ベースの 1 人あたり CO2、トン)、`mf` (1 人あたりマテリアルフットプリント、トン) | 1990〜2023 (順位差は 2023 のみ) |
| 追加の指標 | `pop_total` (総人口、百万人) | 1990〜2023 |

行と区分の列です。

- 国の行は 195 で、`iso3` に ISO 3166-1 alpha-3 の符号が入っています。
- `hdicode` は HDI の 4 区分で、2023 年は Very High 74、High 50、Medium 43、Low 26 か国です。北朝鮮 (PRK) とモナコ (MCO) は「Other Countries or Territories」で、HDI の値がありません。
- `region` は UNDP の開発途上地域 (AS アラブ諸国 20、EAP 東アジア・太平洋 26、ECA 欧州・中央アジア 17、LAC 中南米・カリブ 33、SA 南アジア 9、SSA サハラ以南アフリカ 46) で、それ以外の 44 か国は空です。
- 集計の行は `iso3` が `ZZA.VHHD` から `ZZK.WORLD` の 11 行です。国だけを使うときは `ZZ` で始まる行を落とします。

2023 年の値がある国の数は、`hdi` 193、`gdi` 184、`gii` 172、`ihdi` 169、`phdi` 156 です。
1990 年の `hdi` がある国は 141 で、古い年ほど欠けが増えます。
値の欠けは空文字です。値のセル 228,248 のうち 28,244 が空でした。

例として、日本 (JPN) の HDR 2025 の値は、`hdi_2023` 0.925 (`hdi_rank_2023` 23)、`hdi_1990` 0.853、`le_2023` 84.712、`gii_2023` 0.059、`phdi_2023` 0.785 です。

MPI はこの CSV に入っていません。
`2025_gMPI_Table1and2.xlsx` に、Table 1 (開発途上国の MPI、貧困層の割合と人数、剥奪の強さ、次元ごとの寄与など) と Table 2 (調和させた推計による時間変化) の 2 シートがあります。
MPI のページは「It presents MPI data from 109 countries, along with subnational estimates covering 1,359 regions across 101 countries.」と書いていますが、この xlsx は国の表 2 枚だけで、地方別の推計は入っていません。地方別の推計の配り方は確かめていません。

このほかに、統計付録の表 (Table 1〜5 と 7、および全表) が XLSX で配られています。
報告書の表の体裁 (見出しや脚注の行が入る) なので、機械で読むなら時系列 CSV のほうが扱いやすいです。
表の脚注には、国ごとの推計の方法と元の出典が書かれています。

## 取り出し方

区分は whole です。
最新の全指数・全期間・全か国が 2,001,263 バイトの CSV 1 本にまとまっているので、丸ごと取得して手元で絞ります。

- サーバーは HTTP Range に応えます。CSV に `curl -r 0-1023` を送ると 206 と `content-range: bytes 0-1023/2001263` が返りました。ただし索引の無い CSV なので、必要な国や年だけを選ぶ手段にはなりません。
- 統計付録の表も 1 表 44KB〜62KB の XLSX で、分ける意味のある大きさではありません。
- HDRO Data API 2.0 (https://hdrdata.org、2024-04-16 公開) では、国 (ISO3 か集計の符号)、年、指標を指定して取り出せます。登録して API キーを受け取る必要があり、キーなしで `https://hdrdata.org/api/Metadata/Indices` を引くと HTTP 400 と「Please provide API key.」が返りました。登録の手順は https://hdr.undp.org/sites/default/files/2023-24_HDR/HDRO_data_api_manual.pdf にあります。キーを取っていないので、API の中身は確かめていません。
- HDRO は [[Humanitarian Data Exchange]] (HDX) の組織 `undp-human-development-reports-office` にも、国ごとのデータセット (`hdro-data-for-<国>` など) を載せています。2026-10-06 の時点で 228 件でした。国別に分かれた写しですが、一次配布元は hdr.undp.org です。

## 使いどころ

- 国の発展段階の比較と色分け: HDI の 4 区分や値を国境のポリゴンに結んで、主題図 (コロプレス図) にできます。国連機関や NGO が、支援の対象国を説明するときの背景の指標として使えます。
- SDGs との対応: 構成要素の多くは SDGs の指標と同じ系統の値です。平均余命は目標 3、就学年数は目標 4 (ターゲット 4.1)、GII の議席の割合と労働参加率は目標 5 (ターゲット 5.5)、1 人あたり GNI は目標 8、IHDI は目標 10 (不平等)、PHDI の CO2 とマテリアルフットプリントは目標 12 (ターゲット 12.2) と目標 13 に関わります。MPI は目標 1 (ターゲット 1.2、各国の定義による多次元の貧困) に関わります。ただし HDRO の値は SDGs の公式の指標値そのものではありません。
- 人道支援の文脈: 災害や紛争の影響を受けた国の、発生前の発展の水準を示す背景情報になります。[[UCDP 武力紛争データ]] や [[UNHCR 難民統計]] と ISO3 で結べば、紛争や避難と人間開発の水準を並べて見られます。
- 1 つの版の中での時系列: 同じ版の CSV の 1990〜2023 年は同じ方法とデータで計算されているので、国の推移を描くのに使えます。

使ってはいけない使い方です。

- 国の中の地域、都市、地区の評価には使えません。値は国の平均です。地方の HDI が要るときは、HDRO の配布物ではない別のデータ (ラドバウド大学 Global Data Lab の Subnational HDI など) を探す必要があります。
- 別の年の報告書に載った値どうしを並べて、上がった、下がったと言ってはいけません (下の「気をつけること」)。
- 0.001 程度の差や、順位の 1〜2 位の違いを、意味のある差として扱うのは避けます。構成要素には推計で埋めた値が含まれます。
- `mmr` の 2021〜2023 年のように、繰り返しで埋めた年の値を、その年の変化として読んではいけません。

## ライセンスと帰属表示

hdr.undp.org の Terms of use (https://hdr.undp.org/terms-use) は、サイトの資料を [[CC-BY-3.0-IGO]] (Creative Commons Attribution 3.0 IGO) で提供すると書いています。

> All materials provided on this website are copyrighted under the Creative Commons Attribution 3.0 IGO license.

> You must give appropriate credit, provide a link to the license, and indicate where changes were made. You may do so in any reasonable manner, but in no way that suggests the licensor endorses you or your use.

条文は https://creativecommons.org/licenses/by/3.0/igo/legalcode です。
複製、再配布、改変、商用利用ができ、非商用の制限も継承 (share-alike) もありません。
帰属の表示、ライセンスへのリンク、改変したことの表示が要ります。
UNDP が推奨や関与をしているように示してはいけません。
条文によれば、紛争は仲裁 (指定が無ければ UNCITRAL 仲裁規則) で解決し、国際機関の特権と免除は放棄されません。

求められる表示文は、列の説明の xlsx (シート `recommended_citation`) にある次の引用です。

> Source: UNDP (United Nations Development Programme). 2025. Human Development Report 2025 - A matter of choice: People and possibilities in the age of AI. New York.

(原文の区切りは引用符とハイフンです。)
これに、ライセンスの名前とリンク (CC BY 3.0 IGO) と、形式の変換や抜き出しなどの改変をしたことを添えます。

Terms of use には、ライセンスの要約のほかに次の項があります。

- Principles: 利用は国連憲章の原則に沿うこと。他人の権利を侵す使い方や、名誉毀損や違法な内容の配布をしないこと。
- Latest available Data: 「When requesting the data to be incorporated in internal servers, you must ensure you are providing the latest available data and comply with updates.」とあり、自分のサーバーに取り込むときは最新のデータを使い、更新に追随するよう求めています。
- HDI のデータを公表するときに添える文として、HDI は毎年計算し直すので過去の報告書の値と直接比べられない、という注記を強く推奨しています (下の「気をつけること」に原文)。

注意する点です。

- 報告書本体の PDF (`hdr2025reporten.pdf`) の奥付には「All rights reserved. No part of this publication may be reproduced ... without prior permission.」とあり、CC BY 3.0 IGO ではありません。データのファイル (CSV、XLSX) にはライセンスの表示が無く、サイトの Terms of use だけが掛かっているので、データは CC BY 3.0 IGO で使えると読めます。報告書の本文や図をそのまま写すのは避けます。
- 構成要素の列の多くは、他機関の値をそのまま、または補完して載せたものです。HDRO は指標ごとに別の条件を示していませんが、元の機関の条件が及ぶかどうかについての HDRO の見解は確かめていません。
- HDX の HDRO のデータセットのライセンス欄は、228 件のうち 225 件が `cc-by-igo`、3 件が `cc-by` でした。

## 気をつけること

- 別の年の報告書の値どうしを比べてはいけません。HDR 2025 の報告書の Reader's guide (269 ページ、「Comparisons over time and across editions」) は次のように書いています。

  > Because national and international agencies continually improve their data series, the data - including the HDI values and ranks - presented in this report are not comparable to those published in earlier editions. For HDI comparability across years and countries, see table 2, which presents trends using consistent data, or https://hdr.undp.org/data-center, which presents interpolated consistent data.

  (原文の区切りはダッシュです。)
  Terms of use も「The entire series of Human Development Index (HDI) values and rankings are recalculated every year using the same methodology, the most recent data. and updated time series.」と書き、公表時に添える文として「The HDI rankings and values in the 2014 Human Development Report cannot therefore be compared directly to indices published in previous Reports.」を推奨しています (2014 年版の時の文がそのまま残っています)。
  統計付録 Table 2 (HDI の推移) の注にも「For HDI values that are comparable across years and countries, use this table or the interpolated data ...」とあります。
  年ごとの変化を見るときは、1 つの版の時系列 CSV の中で比べます。
- 実際に、版をまたぐと同じ年の値が変わっています。日本の値を HDR 2023/24 の CSV と HDR 2025 の CSV で比べると、`hdi_1990` は 0.846 と 0.853、`hdi_2020` は 0.917 と 0.922、`hdi_2022` は 0.920 と 0.921、`gnipc_2010` は 39,084.57 と 42,697.71 でした。HDR 2025 の GNI は 2021 年 PPP ドルです。HDR 2023/24 の PPP の基準年は確かめていません。
- 版を必ず記録します。ファイル名の `HDR25` が版です。過去の版のファイルも同じサーバーに残っています (例: `2023-24_HDR/HDR23-24_Composite_indices_complete_time_series.csv`、1,919,243 バイト、1,076 列で 2022 年まで)。版の違うファイルの行や列を混ぜると系列が壊れます。
- 報告書の題の年とデータの年はずれます。HDR 2025 の最新年は 2023 年です。
- 2026-10-06 の時点で HDR 2026 のデータは出ていません。サイトには「Towards 2026 Human Development Report」のページがあります。新しい版が出ると、過去の年も含めて値が変わります。
- 位置の列がありません。地図にするには、`iso3` (ISO 3166-1 alpha-3) で国境のポリゴンと結びます。境界のデータによって符号の入れ方が違うので、結べなかった国を必ず数えます。
  - [[Natural Earth]] の admin 0 は、`ISO_A3` がフランスとノルウェーで `-99`、`ADM0_A3` がパレスチナで `PSX`、南スーダンで `SDS` です。1:110m の版で試すと、2023 年の HDI がある 193 か国のうち、`ISO_A3` と `ADM0_A3` では 163、`ISO_A3_EH` では 165 か国が結べました。残りは 1:110m に描かれていない小さな島国などです。
  - 逆に、境界の側にあって HDI に無い地物 (西サハラ、台湾、コソボ、グリーンランド、プエルトリコ、北キプロス、ソマリランドなど) は空になります。HDR が対象にする国と、境界のデータの国の分け方は一致しません。
- CSV の文字コードは UTF-8 ではなく Windows-1252 です。`Côte d'Ivoire` と `Türkiye` の 2 行だけが ASCII 外で、UTF-8 として読むと失敗します。改行は CRLF、BOM はありません。
- 集計の行 (`ZZ` で始まる `iso3`) は国ではありません。国の数を数えるときや地図に結ぶときは落とします。
- 地方の HDI と取り違えないようにします。ラドバウド大学 Global Data Lab の Subnational HDI は HDRO の配布物ではなく、値の作り方も版も別です。
- 国連の人口データ ([[World Population Prospects]]) と `pop_total` は同じ系統ですが、WPP の版 (HDR 2025 は WPP 2024) に固定された値です。

## データ処理コマンド

2026-10-06 に、空のディレクトリで上から順に実行して確かめたコマンドです。
`iconv`、`python3` (標準ライブラリだけ)、GDAL 3.9.2 の `ogr2ogr` と `ogrinfo` を使います。

```bash
mkdir -p ./tmp

# 大きさと更新日を確かめる
curl -sIL https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv \
  | grep -iE '^(content-length|last-modified)'

# 時系列 CSV を取得し、UTF-8 と LF に直す
curl -sL -o ./tmp/hdr25.csv https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv
iconv -f WINDOWS-1252 -t UTF-8 ./tmp/hdr25.csv | tr -d '\r' > ./tmp/hdr25_utf8.csv

# 集計の行を落とし、いくつかの国を表示し、2023 年の HDI だけの縦長の表を作る
python3 - <<'EOF'
import csv
with open('./tmp/hdr25_utf8.csv', encoding='utf-8', newline='') as f:
    rows = [r for r in csv.DictReader(f) if not r['iso3'].startswith('ZZ')]
print(len(rows), 'countries')
for r in rows:
    if r['iso3'] in ('JPN', 'RWA', 'PRK'):
        print(r['iso3'], r['country'], r['hdi_rank_2023'], r['hdi_1990'], r['hdi_2023'])
with open('./tmp/hdi_2023.csv', 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['iso3', 'hdi_2023'])
    for r in rows:
        if r['hdi_2023']:
            w.writerow([r['iso3'], r['hdi_2023']])
EOF

# Natural Earth の国境 (1:110m) と ISO3 で結んで GeoPackage にする
curl -sL -o ./tmp/ne.zip https://naciscdn.org/naturalearth/110m/cultural/ne_110m_admin_0_countries.zip
ogr2ogr -f GPKG ./tmp/hdi_2023.gpkg /vsizip/./tmp/ne.zip/ne_110m_admin_0_countries.shp \
  -dialect SQLITE -nln hdi_2023 -nlt MULTIPOLYGON \
  -sql "SELECT n.ISO_A3_EH AS iso3, n.NAME AS name, CAST(h.hdi_2023 AS REAL) AS hdi_2023, n.geometry FROM ne_110m_admin_0_countries n LEFT JOIN '$(pwd)/tmp/hdi_2023.csv'.hdi_2023 h ON n.ISO_A3_EH = h.iso3"

# 結べた数と、結べなかった地物を数える
ogrinfo -q -dialect SQLITE -sql "SELECT COUNT(*) AS features, COUNT(hdi_2023) AS with_hdi FROM hdi_2023" ./tmp/hdi_2023.gpkg
ogrinfo -q -dialect SQLITE -sql "SELECT iso3, name FROM hdi_2023 WHERE hdi_2023 IS NULL" ./tmp/hdi_2023.gpkg
```

実行すると、`195 countries`、`JPN Japan 23 0.853 0.925`、`RWA Rwanda 159  0.578` (1990 年は空)、`PRK` は値が空で表示されます。
結合は 177 地物のうち 165 地物に値が入り、西サハラ、フォークランド諸島、グリーンランド、仏領南方南極地域、プエルトリコ、北朝鮮、ニューカレドニア、台湾、南極、北キプロス、ソマリランド、コソボの 12 地物が空でした。

## 関連項目

- [[国連開発計画]]
- [[OPHI]]
- [[Humanitarian Data Exchange]]
- [[World Population Prospects]]
- [[World Bank 世界開発指標]]
- [[ILOSTAT]]
- [[UNHCR 難民統計]]
- [[UCDP 武力紛争データ]]
- [[Natural Earth]]
- [[Natural Earth Coastline Data]]
- [[持続可能な開発目標]]
- [[CC-BY-3.0-IGO]]
- [[クリエイティブ・コモンズ]]
- [[CSV]]
- [[GeoPackage]]

## 確認日

2026-10-06 に次のことを確かめました。

- Documentation and downloads のページを読み、現行の版が HDR 2025 (データ更新 2025-05-06、MPI は 2025-10-17) で、HDR 2026 のデータがまだ無いことを確かめました。
- 時系列 CSV (2,001,263 バイト、Last-Modified 2025-05-05) と列の説明の xlsx (13,731 バイト) を取得して、列、行、区分、値の数、文字コード、改行を数えました。HDR 2023/24 の時系列 CSV (1,919,243 バイト) も取得して、日本の値を比べました。
- CSV への Range 要求で 206 が返ることを確かめました。HDRO Data API がキーなしで HTTP 400 を返すことを確かめました。
- Terms of use のページで CC BY 3.0 IGO と Latest available Data の項を、creativecommons.org で CC BY 3.0 IGO の条文 (推奨や関与の示唆の禁止、仲裁、特権と免除) を読みました。
- HDR 2025 の報告書 PDF (8,414,927 バイト) で、Reader's guide の比較の注意と奥付の「All rights reserved」を、統計付録 Table 1 と Table 2 の xlsx で脚注を、Technical Notes で GNI の 2021 年 PPP と MPI の共同作成の注を読みました。
- MPI の表の xlsx (139,761 バイト、Last-Modified 2025-10-16) のシートを開き、MPI のページで 109 か国と 1,359 地域の記述を読みました。
- HDX の `package_search` で HDRO の組織のデータセット数とライセンス欄を数えました。
- Natural Earth の 1:110m の国境と結ぶコマンドを実行しました。

確かめていないことです。

- HDRO Data API の中身、過去の版の値を返すか、利用回数の上限 (キーを取っていません)。
- MPI の地方別推計 (1,359 地域) の配布の場所と形式。
- HDR 2023/24 の GNI の PPP の基準年。
- 構成要素の列 (他機関の値) の再配布に、元の機関の条件が及ぶかについての HDRO の見解。
- 報告書の PDF の「All rights reserved」と、サイトの CC BY 3.0 IGO の関係についての HDRO の見解。
- Terms of use の「Latest available Data」の項が、公開の再配布にも適用されるか。
