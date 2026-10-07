---
title: Meta 移動データ
description: "AI for Good at Meta (旧 Data for Good at Meta) が、Facebook アプリの位置情報から行政区域ごとに集計した人の移動の指標を、Humanitarian Data Exchange (HDX) で全世界分の CSV として配っているデータ群 (Movement Distribution、Movement Range Maps、Commuting Zones、Business Activity Trends during Crisis)"
provider_group: "Meta"
categories: ["人口・社会", "交通"]
regions: ["全世界"]
formats: ["CSV", "TSV"]
id: meta_movement
provider: [AI for Good at Meta (HDX の組織名 `meta`, データセットの出典欄は「Data for Good at Meta」)]
source_data: なし (一次データ。位置情報サービスを有効にした Facebook アプリ利用者の位置から Meta が集計したもの。区域の境界と名前は GADM のもの)
license: [CC-BY-4.0]
license_note: 4 つとも CC-BY-4.0 (HDX の `license_id` が `cc-by`、表示名は「Creative Commons Attribution International (CC BY)」)
access: whole
access_note: whole。HDX の CKAN API でデータセットとファイルの一覧は引けるが、ファイルの中は区域でも日付でも絞れない (Range に 206 は返るが、CSV にも zip にも索引が無い)
format: CSV (Movement Distribution、Commuting Zones、Business Activity Trends)、zip に入った TSV (Movement Range Maps)。Commuting Zones の形は WKT の列
coverage: 全世界。HDX が付けた国の数は Movement Distribution 214、Movement Range Maps 203、Commuting Zones 216、Business Activity Trends 23
period: Movement Distribution は HDX に残る直近約 90 日 (2026-10-06 時点のファイルは 2026-06-01 から 2026-08-31)。Movement Range Maps は 2020-03-01 から 2022-05-22 (終了)。Commuting Zones は 2023-03 版。Business Activity Trends は 2024-05 から 2025-03 の 5 つの災害
resolution: 行政区域 (GADM level 2、無ければ level 1) × 日。Commuting Zones は通勤圏のポリゴン
size: Movement Distribution は CSV 12 本で 944,684,358 バイト (2026-10-06 時点で HDX にある分)。Movement Range Maps は zip 2 本で 129,615,027 バイト (展開後は 2021〜2022 年分だけで 598,707,347 バイト)。Commuting Zones は CSV 1 本 16,526,463 バイト。Business Activity Trends は CSV 5 本 154,264,787 バイト
update: Movement Distribution は 2 週間ごと (HDX の `data_update_frequency` は 14)。ほかの 3 つは更新なし
url: https://data.humdata.org/dataset/movement-distribution ほか (下の表)
docs: https://ai.meta.com/ai-for-good/datasets/movement-distribution-maps/
checked: 2026-10-06
details:
  API: https://data.humdata.org/api/3/action/package_show?id=movement-distribution
  データセット: HDX の id | ライセンス | 最終更新 (HDX)
  Movement Distribution: '`movement-distribution` | `cc-by` | 2026-09-16'
  Movement Range Maps: '`movement-range-maps` | `cc-by` | 2022-05-24'
  Facebook Commuting Zones: '`commuting-zones` | `cc-by` | 2025-05-12'
  Facebook Business Activity Trends during Crisis: '`facebook-business-activity-trends-during-crisis` | `cc-by` | 2026-05-11'
---

# Meta 移動データ

> [[AI for Good at Meta]] (旧 Data for Good at Meta) が、Facebook アプリの位置情報から行政区域ごとに集計した人の移動の指標を、[[Humanitarian Data Exchange]] (HDX) で全世界分の CSV として配っているデータ群 (Movement Distribution、Movement Range Maps、Commuting Zones、Business Activity Trends during Crisis)

## 概要

Meta は、位置情報サービスを有効にしている Facebook アプリの利用者の位置を、行政区域ごとに集計して公開しています。
個人の位置そのものは公開されず、配られるのは区域 × 日の割合や変化率です。
集計の前後に、人数の少ない区域を落とすことと、差分プライバシーのための雑音を足すことが行われています (下の「プライバシー保護」)。

Movement Distribution は、人が住んでいる場所 (夜にいることが多い場所) からその日どれだけ離れたかの分布です。
HDX の説明は、交通、観光、避難 (displacement) などの用途を挙げています。
作り方は、20 時から 6 時の位置から各人の家の Bing タイルを決め、その日の位置の更新を 1 人につき 1 つ無作為に選び、家からの距離を 4 つの区分に分けて、区分ごとの人の割合を出すというものです (README の PDF)。
2022 年 12 月より前のデータは無く、紛争地などの「sensitive geographies」も含まれません (HDX の caveats)。

Movement Range Maps は、COVID-19 の外出自粛に人がどう反応したかを見るために 2020 年に作られたデータで、2022-05-22 で更新を止めています。
2020 年 2 月の曜日ごとの値を基準に、訪れた Bing タイル (level 16、赤道で約 600m 四方) の数の変化率と、1 日中 1 つのタイルから出なかった人の割合を出しています。
README の PDF によると、Movement Distribution はこれの後継で、元の位置データが Location History から Location Services に変わったため指標も変えたとのことです。
Movement Distribution の `0` の区分は Movement Range の「Stay Put」に近いが、変化率に当たる指標は無いと書かれています。

Commuting Zones は、家と職場の位置の集計から作った移動のグラフをコミュニティ検出で分けた、通勤圏のポリゴンです (HDX の methodology)。
Business Activity Trends during Crisis は、災害の前後に Facebook のビジネスページの投稿の頻度が、前の年の平時と比べてどうだったかを、区域 × 業種 × 日で示したものです。

作り方から来る限界があります。

- 母集団は、位置情報を共有している Facebook アプリの利用者だけです。年齢、所得、地域によって利用の割合が違い、人口全体を代表しません。Facebook が使われていない国や地域は含まれません。
- 雑音が足されているので、人数の少ない区域では値が大きくぶれ、割合が負になることもあります。
- 区域の組み直しがあります。2026-03 に Movement Distribution の区域が変わり、それまであった区域の一部が無くなったと HDX に書かれています。

## 内容

### Movement Distribution

1 行が、区域 × 日 × 距離の区分です。

| 列 | 意味 |
| -- | ---- |
| `gadm_id` | GADM の区域 ID (例 `JPN.41.51_1` は東京都台東区) |
| `gadm_name` | GADM の区域名 |
| `country` | 国コード。実データは ISO 3 文字 (`JPN`、`USA`)。README の PDF は 2 文字と書いているが、2026 年のファイルは 3 文字 |
| `polygon_level` | GADM の階層 (2、無い国は 1) |
| `home_to_ping_distance_category` | 家からの距離の区分 (km)。`0`、`(0, 10)`、`[10, 100)`、`100+` の 4 つ |
| `distance_category_ping_fraction` | その区分に入った人の割合。雑音込み |
| `ds` | 日付 (太平洋時間の 0 時から 24 時) |

2026-07-13 から 07-16 の 4 日分のファイル (48,830,570 バイト) の中身は次のとおりです。

- 617,908 行、217 か国 (`country` の値の数)、38,751 区域。
- 日本は 28,740 行、1,802 区域で、すべて level 2 (市区町村) です。東京都 (`JPN.41`) は 53 区市町村がそろっています。
- 日本の 1 日の行数は 7,176 から 7,192 で、日によって載る区域が少し違います。
- 日本の 28,740 行のうち 1,593 行は割合が負です。
- 台東区 (`JPN.41.51_1`、名前は `Taitō`) の 2026-07-13 は、`0` が 0.358、`(0, 10)` が 0.565、`[10, 100)` が 0.070、`100+` が 0.007 でした。

README の PDF によると、割合が負になる行は `0` と `(0, 10)` では 0.1% よりずっと少なく、`100+` では約 10% あります。
4 区分の割合の和は 1 になるとは限りません。

### Movement Range Maps

zip の中の TSV 1 本で、1 行が区域 × 日です (HDX の readme.txt)。

| 列 | 意味 |
| -- | ---- |
| `ds` | 日付 |
| `country` | ISO 3 文字の国コード |
| `polygon_source` | `GADM`、米国は `FIPS` |
| `polygon_id` | 区域 ID (GADM か FIPS) |
| `polygon_name` | 区域名 |
| `all_day_bing_tiles_visited_relative_change` | 訪れたタイルの数の、基準からの変化率 (正か負) |
| `all_day_ratio_single_tile_users` | 1 日中 1 つのタイルにいた人の割合 |
| `baseline_name`, `baseline_type` | 基準の期間と求め方 |

### Commuting Zones

CSV 1 本で、列は `region`、`fbcz_id`、`name`、`fbcz_id_num`、`cz_gen_ds`、`win_population`、`win_roads_km`、`area` (km2)、`country` (英語の国名)、`geography` (WKT) です。
`win_population` と `win_roads_km` は、下と上の 5% を 5 パーセンタイルと 95 パーセンタイルの値に置き換えてあります (winsorize、HDX の codebook)。
大都市どうしの人口の比較には使えません。
`fbcz_id_num` は版ごとに振り直されます。

### Business Activity Trends during Crisis

災害ごとの CSV 5 本で、列は `polygon_id`、`polygon_name`、`business_vertical` (業種。`All` を含む)、`activity_quantile` (0 から 1、0.5 前後が平時)、`ds`、`country` です。
`activity_quantile` は、ページごとの日々の活動が平時の分布のどの分位にあたるかをまとめ、7 日間で平均したものです (HDX の codebook)。
災害はブラジル南部の洪水 (2024-05〜07)、中東欧の洪水 (2024-09〜10)、ハリケーン Beryl (2024-06〜10)、Helene (2024-09〜10)、ロサンゼルスの山火事 (2025-01〜03) です。

## 取り出し方

区分は whole です。

- HDX の CKAN API (`package_show`) で、データセットごとのファイルの一覧、大きさ、更新日、ライセンスが取れます。認証は要りません。ただし素の curl の User-Agent では断られることがあるので、`-A "Mozilla/5.0"` を付けます。
- ファイルの URL は、署名付きの S3 (`hdx-production-filestore`、us-east-1) へ 302 で飛びます。署名は時間で切れるので、保存するなら HDX の resource の URL のほうにします。
- S3 は Range 要求に 206 を返しました (Movement Distribution の CSV で `-r 0-1023` と `-r -200`、Movement Range Maps の zip で `-r -22` と中央ディレクトリの 131 バイト)。
- しかし CSV には区域や日付の索引が無く、特定の国の行だけを引くことはできません。先頭と末尾が見えるだけです。
- Movement Range Maps の 2022 年の zip の中身は、`movement-range-2022-05-22.txt` (deflate で 73,054,214 バイト、展開後 598,707,347 バイト) と `README.txt` の 2 つだけでした。deflate の流れは途中から展開できないので、1 か国分が欲しくても全体を取って展開します。
- 分割の単位は、Movement Distribution が 4 日から 2 週間ごとのファイル、Business Activity Trends が災害ごとのファイルです。国や区域では分かれていません。最小のファイルは Business Activity Trends のロサンゼルス (1,499,220 バイト)、Movement Distribution では 43,981,952 バイトです。

### 直近 90 日しか残らない

Movement Distribution は、HDX に直近 90 日分までしか残りません。
HDX の説明には「The dataset will also now update biweekly, retaining up to 90 days of data.」とあります。
2026-10-06 に HDX にあった CSV は 2026-06-01 から 2026-08-31 の 12 本で、それより古いファイルは消えています。
HDX のメタデータの期間 (`dataset_date`) は 2026-01-17 からとなっていますが、その期間のファイルはもうありません。

時系列として使うなら、使う人が 2 週間ごとに新しいファイルを取り、自分で残し続ける必要があります。
後から同じ期間を取り直すことはできないので、分析を再現できるように、取ったファイルの名前、resource の id、大きさを記録しておきます。
CC BY なので、取ったファイルを出典を示して再配布することはライセンス上できます。

## 使いどころ

- 人道支援、避難: 災害や紛争の後に、区域ごとに家から 100km 以上離れた人の割合や、家から動かない人の割合が平時からどう変わったかを見ることで、避難や移動の制限の大きさのおおよその手がかりにできます (SDG 11.5、災害による被害の軽減)。HDX のタグも `displacement` です。
- 公衆衛生: Movement Range Maps は COVID-19 の外出自粛の効果を見る研究に広く使われました。2020 年から 2022 年の感染症対策の振り返りに使えます (SDG 3.d、健康危険の早期警告と管理)。
- 交通と都市: Commuting Zones は、行政区域と違う、生活と仕事のまとまりの単位として、地域経済の分析や交通計画の下地に使えます (SDG 11.2、11.a)。
- 経済の回復: Business Activity Trends は、災害の後に業種ごとの営業がどれだけ戻ったかの目安になります (SDG 8)。

使ってはいけない使い方もあります。

- 人数を数えることには使えません。配られているのは割合と変化率だけで、母集団は Facebook の利用者に偏っています。避難者の数や人口の推定の代わりにはなりません。
- 個人や小さな集団の動きは分かりません。区域 × 日の集計で、雑音も入っています。
- 国の間で値の大きさを直接比べるのは避けます。Facebook の普及の度合いが国によって違うからです。
- Movement Range Maps と Movement Distribution は元の位置データも指標も違うので、2022 年の前後をつないで 1 本の時系列にすることはできません。

## ライセンスと帰属表示

4 つのデータセットとも、HDX の CKAN API の `license_id` は `cc-by`、`license_title` は「Creative Commons Attribution International (CC BY)」でした (2026-10-06)。
HDX のライセンスの説明ページ (https://data.humdata.org/faqs/licenses) は、この CC BY を CC BY 4.0 の条文 (https://creativecommons.org/licenses/by/4.0/) に結び付け、次のように説明しています。

> Under the CC BY license, you are free to share (copy and redistribute the material in any medium or format) and or adapt (remix, transform, and build upon the material) for any purpose, even commercially. ... The license terms are that you must give appropriate credit, provide a link to the license, and indicate if changes were made.

Meta の同じ組織のデータセットには、CC BY でない条件のものもあります。
使うたびに、データセットごとに `license_id` を確かめてください。
Meta のサイト (ai.meta.com) 側のデータの利用条件は確かめていません。

表示の例は次のとおりです。

- Movement Distribution, Data for Good at Meta, via Humanitarian Data Exchange (https://data.humdata.org/dataset/movement-distribution), CC BY 4.0
- Movement Range Maps, Data for Good at Meta (Facebook), via Humanitarian Data Exchange (https://data.humdata.org/dataset/movement-range-maps), CC BY 4.0

区域の境界と名前は [[GADM]] のものです。
GADM の境界を別に取って結合するときは、GADM の利用条件 (非商用に限るなど) が別にかかるので、そちらも確かめてください。

### プライバシー保護

Movement Distribution の README (HDX にある PDF、2022-12-13 版) は、次のように説明しています。

- 1 人につき位置を 1 つだけ選ぶので、各区分の数の感度は 1 です。区分ごとの数と区域ごとの合計に、強さ 1 のラプラス雑音を足し、epsilon = 1 の差分プライバシーにしています。
- 雑音を足した後の人数が 10 を超える区域だけを載せています。
- 家の推定そのものには差分プライバシーをかけていません (「differential privacy is implemented after the mapping of people to home polygons is fixed」)。

Movement Range Maps については、Meta Research のブログ「Protecting privacy in Facebook mobility data during the COVID-19 response」(2020-06-02) が説明しています。

- Location History と背景での位置の収集を有効にした人だけを含み、1 日の位置の記録が少ない人は除いています。
- 対象の人が 300 人未満の区域は除いています。
- 1 人が数えるタイルの数を 200 で打ち切り、タイルの合計と「Stay Put」の人数に、それぞれ epsilon = 1.0 のラプラス雑音を足しています。1 人が両方に効くので、合わせた epsilon は 2.0 です。
- 紛争地、帰属に争いのある地域、Facebook が営業していない国は除いています。

Commuting Zones と Business Activity Trends については、HDX の説明に「aggregated and de-identified」「Sensitive geographies are removed」とあるだけで、差分プライバシーの有無は書かれていません。

## 気をつけること

- Movement Distribution のファイルの名前に書かれた期間と、中の `ds` が一致するとは限りません。ファイルの境目の日が 2 つのファイルに入っていることがあるので、`gadm_id`、`ds`、区分で重複を落としてから使います。
- 拡張子の無いファイル (`Movement Distribution 1 June - 15 June, 2026`) や、名前が `combined_part1` のような URL のファイルがあります。HDX の resource の名前と URL の名前は違います。
- `country` は Movement Distribution と Movement Range Maps では ISO 3 文字ですが、Business Activity Trends のブラジルのファイルは 2 文字です (調査メモの値。この日は確かめていません)。Commuting Zones は英語の国名です。
- Movement Range Maps の `polygon_name` には、文字列の `NA` になっている区域があります (調査メモでは長音記号の入る日本の区域)。結合は名前でなく ID で行います。
- Movement Range Maps の 2020 年の zip は、API の大きさ (56,561,599 バイト) と実際のファイル (56,560,052 バイト、2026-10-06 の HEAD) が違います。
- Commuting Zones の CSV は先頭に UTF-8 の BOM があります。調査メモでは、33 の通勤圏の WKT が 32,759 文字で切れていて読めないとされています (この日は確かめていません)。
- 座標系は、Commuting Zones の WKT が経緯度 (WGS 84 と見られます。CSV に座標系の記載はありません)。ほかの 3 つは座標を持たず、GADM の ID で境界と結合します。結合する GADM の版はどこにも書かれていません。
- Movement Distribution の日付は太平洋時間で区切られていて、現地の 1 日とずれます。
- 取り違えやすいデータとして、同じ Meta の [[Meta 高解像度人口密度マップ]] (High Resolution Population Density Maps) は人口の推定で、移動のデータではありません。Google の COVID-19 Community Mobility Reports は別の会社の、場所の種類ごとの来訪の変化です。

## データ処理コマンド

HDX の API でライセンスとファイルの一覧を見て、Movement Distribution の 4 日分を 1 本取り、日本の行を数えるまでです。
2026-10-06 にこの通りに動かしました (この日の回線では 48.8MB の取得に約 13 分かかりました)。

```bash
mkdir -p ./tmp && cd ./tmp

# ライセンスとファイルの一覧 (名前、大きさ、URL)
curl -s -A "Mozilla/5.0" "https://data.humdata.org/api/3/action/package_show?id=movement-distribution" \
  | jq -r '.result.license_id, (.result.resources[] | [.name, .size, .url] | @tsv)' > list.tsv
head -3 list.tsv

# 4 日分の CSV を 1 本取る (S3 へのリダイレクトを追う)
URL=$(grep '2026-07-13_to_2026-07-16' list.tsv | cut -f3)
curl -sL -A "Mozilla/5.0" -o md_0713.csv "$URL"

# 行数、国の数、区域の数と、日本の区分ごとの行数、負の割合の行数を数える
python3 - md_0713.csv <<'EOF'
import csv, sys, collections
n = 0; jp = collections.Counter(); neg = 0; c = set(); areas = set()
with open(sys.argv[1], newline='', encoding='utf-8') as f:
    for r in csv.DictReader(f):
        n += 1; c.add(r['country']); areas.add(r['gadm_id'])
        if r['country'] == 'JPN':
            jp[r['home_to_ping_distance_category']] += 1
            if float(r['distance_category_ping_fraction']) < 0: neg += 1
print('rows', n, 'countries', len(c), 'areas', len(areas))
print('JPN rows by category', dict(jp), 'negative', neg)
EOF

# 台東区の行を見る
grep '"JPN.41.51_1"' md_0713.csv | head -4
```

このファイルは 90 日を過ぎると HDX から消えるので、そのときは `list.tsv` にある別の期間の名前に変えてください。

Range で先頭と末尾だけを見る、zip の中身の一覧を見るのは次のとおりです (これも動かしました)。

```bash
# CSV の先頭 1KB (列名と最初の行)。206 が返る
curl -sL -A "Mozilla/5.0" -r 0-1023 "$URL" | head -5

# Movement Range Maps の zip の末尾 22 バイト (中央ディレクトリの位置と大きさ)
Z="https://data.humdata.org/dataset/c3429f0e-651b-4788-bb2f-4adbf222c90e/resource/55a51014-0d27-49ae-bf92-c82a570c2c6c/download/movement-range-data-2022-05-22.zip"
curl -sL -A "Mozilla/5.0" -r -22 -o eocd.bin "$Z"
python3 -c "import struct; s=struct.unpack('<4sHHHHIIH', open('eocd.bin','rb').read()); print('entries', s[4], 'cd_size', s[5], 'cd_offset', s[6])"
```

## 関連項目

- [[AI for Good at Meta]]
- [[Humanitarian Data Exchange]]
- [[GADM]]
- [[Meta 高解像度人口密度マップ]]
- [[WorldPop 人口グリッド]]
- [[UCDP 武力紛争データ]]
- [[差分プライバシー]]
- [[人流データ]]
- [[COVID-19]]
- [[国内避難民]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次を確かめました。

- HDX の CKAN API (`package_show`) で 4 つのデータセットの `license_id` (すべて `cc-by`)、ファイルの一覧と大きさ、更新日、説明 (notes、caveats、methodology) を読みました。
- HDX のライセンスの説明ページで、CC BY が CC BY 4.0 に結び付いていることを読みました。
- Movement Distribution の README の PDF と Movement Range Maps の readme.txt を取得して読みました。Meta Research のプライバシーのブログ記事を読みました。
- Movement Distribution の 2026-08-18〜31 の CSV と、Movement Range Maps の 2022 年の zip に Range 要求を送り、206 を確かめました。zip の中央ディレクトリを読みました。Commuting Zones と Business Activity Trends (ロサンゼルス) の CSV の先頭を Range で読みました。
- Movement Distribution の 2026-07-13〜16 の CSV を 1 本取得して数えました。

確かめていないこと:

- ai.meta.com の説明ページは画面を JavaScript で組み立てるため、本文を読めていません。Meta 側の利用条件も確かめていません。
- Movement Range Maps、Commuting Zones、Business Activity Trends の中身は全部は取得していません。WKT の切れ、ブラジルのファイルの国コードなどは調査メモの値です。
- GADM のどの版の境界と合うかは確かめていません。
