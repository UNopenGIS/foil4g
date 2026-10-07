---
title: FAOSTAT
description: "国連食糧農業機関 (FAO) が、食料と農業の国別・年別の統計 (生産、貿易、食料需給表、食料安全保障、土地利用、農業由来の温室効果ガス排出など) を、69 の領域 (domain) ごとの CSV の zip にして全世界分を配っているデータベース"
provider_group: "FAO"
categories: ["農業"]
regions: ["全世界"]
formats: ["CSV"]
id: faostat
provider: 国連食糧農業機関 (FAO、Food and Agriculture Organization of the United Nations) の統計部 (Statistics Division、ESS)。林業は Forestry Division、食事と栄養は Food and Nutrition Division
source_data: 主に各国政府から FAO が集めた統計と FAO の推計。一部の領域は他機関のデータを使う (OECD、UNSD、ILO、国連人口部など。下の「内容」を参照)
license: [CC-BY-4.0]
license_note: CC-BY-4.0 に FAO の追加条項 (宣伝への利用の禁止、出典の書式、UNCITRAL 仲裁など) が付く
access: split
access_note: split。領域ごとに zip が分かれ、目録 `datasets_E.json` で選べる。zip の中は CSV 1 本で、行や国では絞れない (whole)
format: zip に入った CSV (UTF-8、カンマ区切り、全項目を引用符で囲む)。データ本体のほかに地域、品目、要素、フラグのコード表が入る
coverage: 全世界。国と地域のほかに大陸や経済圏などの集計値を持つ (生産 QCL は 244 地域のうち 34 が集計)。国より細かい単位は無い
period: 領域ごとに違う。生産 QCL は 1961 年から 2024 年、SDG 指標 SDGB は 1974 年から 2026 年
resolution: 国 × 年 × 品目 × 要素 (生産量、収穫面積など) が 1 行。空間の解像度は国
size: 目録の 69 本の zip の合計は 1,488,229KB (約 1.4GB)、行数の合計は 177,586,737 行 (2026-10-05 版の目録)。最大は詳細な貿易行列 TM の 420,650,070 バイト、最小は MDDW の 12,146 バイト
update: 領域ごとに随時。同じファイル名のまま上書きされる
url: https://bulks-faostat.fao.org/production/datasets_E.json (一括配布の目録)
docs: https://www.fao.org/faostat/en/
checked: 2026-10-06
details:
  利用規約: https://www.fao.org/contact-us/terms/db-terms-of-use/en/
---

# FAOSTAT

> [[国連食糧農業機関]] (FAO) が、食料と農業の国別・年別の統計 (生産、貿易、食料需給表、食料安全保障、土地利用、農業由来の温室効果ガス排出など) を、69 の領域 (domain) ごとの CSV の zip にして全世界分を配っているデータベース

## 概要

FAOSTAT は、FAO が世界の国と地域について集めている、食料と農業の統計のデータベースです。
生産 QCL では、国と地域が 210 (消滅した国を含む)、集計が 34 です。
各国から FAO に届いた値 (SDGB の説明では「collecting data from national sources」) に、FAO が推計や補完をした値を加えています。
値が公式の数字か FAO の推計かは、各行の `Flag` 列で分かります。

扱う範囲は、作物と畜産の生産、農産物の貿易、食料需給表 (food balance sheets)、価格、土地利用と土地被覆、肥料と農薬、農業食料システムからの温室効果ガス排出、林業、人口と農業の雇用、投資、食料安全保障の指標、SDG 指標などです。

作り方の限界は次のとおりです。

- 単位は国と年です。国より細かい地域 (州や県) の値はありません。
- 報告の無い国や年は FAO が推計や補完をしています (`E`、`I` のフラグ)。生産 QCL の 4,209,110 行のうち、公式の値 (`A`) は 1,837,346 行で、半分に届きません。
- 温室効果ガスの排出は、FAO が生産や土地利用の統計から IPCC の Tier 1 の方法で計算した推計です (目録の GT の説明)。各国が UNFCCC に出した温室効果ガス目録の値とは一致しません。
- 栄養不足の割合 (2.1.1) などは 3 年平均の推計です (行の `Note` に「3-year average of the period 2000-2002」のように書かれています)。

## 内容

### 領域

目録 `datasets_E.json` の `DatasetName` は「グループ: 名前」の形で、2026-10-06 時点でグループが 20、領域が 69 あります。

| グループ | 領域数 | 主な領域 (コード) |
| -------- | -----: | ----------------- |
| Land, Inputs and Sustainability | 12 | 土地利用 RL、土地被覆 LC、肥料 RFN / RFB / RFM、農薬 RP / RT、家畜の糞尿 EMN、地表気温の変化 ET、バイオエネルギー BE |
| Climate Change | 10 | 農業食料システムからの排出: 合計 GT、作物 GCE、家畜 GLE、森林 GF、火災 GI、排出原単位 EI |
| Discontinued archives and data series | 7 | 旧生産者価格 PA、食糧援助 FA、林産物の貿易フロー FT、農業機械 RM / RY など (更新が終わったもの) |
| Food Balances | 5 | 食料需給表 FBS (2010 年から)、旧方式の食料需給表 FBSH (2013 年まで)、供給利用勘定 SCL |
| Trade | 4 | 作物と畜産物の貿易 TCL、詳細な貿易行列 TM (輸出国と輸入国の組)、貿易指数 TI |
| Prices | 4 | 生産者価格 PP、消費者物価指数 CP、為替 PE、デフレーター PD |
| Investment | 4 | 農業への開発資金 EA、政府支出 IG、農業向け信用 IC、海外直接投資 FDI |
| Food and Diet | 4 | 個人の食事調査 FDIQ、家計調査 HCES、女性の食事の多様性 MDDW、供給量 SUA |
| Production | 3 | 作物と畜産物の生産 QCL、生産指数 QI、生産額 QV |
| Population and Employment | 3 | 人口 OA、農業の雇用 OEA、農村の雇用 OER |
| そのほか 10 グループ | 13 | 食料安全保障の指標 FS、SDG 指標 SDGB、健康的な食事の費用 CAHD、林業 FO、ジェンダー SXS、世界農業センサス WCAD など |

### 列

列は領域で違います。
生産 QCL と SDG 指標 SDGB は次の 14 列です (SDGB は `Item Code (CPC)` の代わりに `Item Code (SDG)`)。

```
Area Code,Area Code (M49),Area,Item Code,Item Code (CPC),Item,Element Code,Element,Year Code,Year,Unit,Value,Flag,Note
```

- `Area Code` は FAO 独自の数値コード、`Area Code (M49)` は国連統計部の M49 のコードです。ISO 3166 の 3 文字コードの列はありません。
- M49 と CPC のコードは頭に `'` が付いています (`'004`)。表計算ソフトで先頭の 0 が消えないようにするためと見られます。使うときに外します。
- `Element` は量の種類です。QCL では Production (生産量)、Area harvested (収穫面積)、Yield (単収)、Stocks (飼養頭数) など 8 種類です。
- `Unit` は行ごとに書かれています (QCL では `t`、`ha`、`kg/ha`、`An` (頭数)、`1000 An` など)。
- `Flag` は値の素性です。QCL のコード表は A (Official figure)、E (Estimated value)、I (Value imputed by a receiving agency)、M (Missing value; data cannot exist)、X (Figure from external organization) です。SDGB はさらに O (Missing value)、Q (Missing value; suppressed)、U (Low reliability) を持ちます。
- 欠損は `Value` を空にして、`Flag` を M、O、Q にして表します。SDGB では 478,304 行のうち 175,778 行の `Value` が空でした。
- SDGB の `Value` には `<2.5` のような不等号つきの文字列が 3,799 行あります (栄養不足の割合が 2.5% 未満の国など)。数値として読むと失敗するか、欠損として落ちます。
- MDDW など調査を単位とする領域では、国の代わりに `Survey` (「Brazil - 2014」) が単位になり、全国、都市、農村の区別を持ちます。

### 件数の例

| 領域 | 行数 | 地域 | 品目 | 期間 |
| ---- | ---: | ---: | ---: | ---- |
| QCL (作物と畜産物の生産) | 4,209,110 | 244 (うち集計 34) | 301 | 1961 から 2024 |
| SDGB (SDG 指標) | 478,304 | 305 (うち集計 54) | 236 系列 | 1974 から 2026 |
| MDDW (女性の食事の多様性) | 1,223 | 調査単位 | | |

### 他機関のデータ

目録の説明に、他機関のデータを使うと書かれている領域があります。

- EA (農業への開発資金): 「republishes the OECD Creditor Reporting System (CRS) Aid Activity database」
- OA (人口): 国連人口部の World Population Prospects 2024 と World Urbanization Prospects 2018。[[World Population Prospects]] を参照
- TM、TCL、TI (貿易): 「The data is mainly provided by UNSD, Eurostat, and other national authorities」
- OEA、OER (雇用): ILO のデータ。[[ILOSTAT]] を参照

## 取り出し方

区分は split です。

- 目録 `datasets_E.json` に 69 の領域が並び、`FileLocation` が各 zip の URL です。目録で選べるのは領域だけで、国、期間、範囲では絞れません。
- 目録が指すのは縦持ち (Normalized、1 行 1 値) の全地域版 `<名前>_E_All_Data_(Normalized).zip` です。同じ場所に、目録に載らない横持ち (年が列) の `<名前>_E_All_Data.zip` と、大陸別の `<名前>_E_Africa.zip` などもあります。QCL ではアフリカ版が 4,319,333 バイトでした。どの領域に大陸別があるかは確かめていません。
- 全領域をまとめた zip が 2 本あります (`FAOSTAT_A-S_E.zip` 738,662,894 バイト、`FAOSTAT_T-Z_E.zip` 777,321,957 バイト)。中身は領域ごとの zip を入れた zip です。
- サーバー (AWS S3 と CloudFront) は Range 要求に 206 を返しました (`content-range: bytes 0-1023/738662894`)。zip の中央ディレクトリを読めば、まとめ zip から領域の zip を 1 本ずつ抜けます。ただし領域の中のデータ本体は deflate で圧縮された CSV 1 本なので、その中を Range で絞ることはできません。
- 最小単位は領域 1 本で、12,146 バイト (MDDW) から 420,650,070 バイト (TM、展開すると数 GB と見られますが展開していません) まであります。
- 認証は要りません。
- 旧配布元 `https://fenixservices.fao.org/faostat/static/bulkdownloads/` は 301 で新しい場所に転送されます。
- FAOSTAT の画面 (https://www.fao.org/faostat/en/) では国、品目、年を選んで CSV を取得できます。画面の裏の API は直接呼んでいないので、このカードでは扱いません。

## 使いどころ

- [[SDGs]] の目標 2 (飢餓をゼロに) の進み具合を国ごとに追えます。FAO は 22 の SDG 指標の管理機関 (custodian agency) で、SDGB 領域はその指標を集めたものです (目録の説明)。SDGB の CSV には、目標 2 の 2.1.1 (栄養不足の割合と人数)、2.1.2 (中程度または重度の食料不安の割合、性別と都市農村の別あり)、2.3.1 と 2.3.2 (小規模食料生産者の生産性と所得)、2.4.1 (持続可能な農業の面積の割合)、2.5.1 と 2.5.2 (遺伝資源の保存と在来家畜品種の絶滅危険)、2.a.1 (政府支出の農業指向指数)、2.c.1 (食料価格の異常) と、`2.2.4` と名のついた女性の食事の多様性の系列が入っています。目標 2 のほかに 5.a、6.4、12.3.1a (食料損失)、14、15 の指標もあります。
- 2.1.1 と 2.1.2 の推計は、FAO などが毎年出す報告書「The State of Food Security and Nutrition in the World」(SOFI) の元になる系列です (FS 領域の説明は CFS の円卓会議の勧告で選んだ指標と書いています。SOFI との対応は配布元で確かめていません)。
- 人道支援と食料安全保障の分析では、国ごとの穀物の生産量 (QCL)、輸入への依存 (TCL、TM)、食料需給表のカロリー供給 (FBS) を、国境のポリゴンに M49 や国名で結びつけると、国ごとの塗り分け地図にできます。
- 気候変動 (目標 13) では、農業食料システムからの排出を国別、ガス別、発生源別に比べられます (GT、GLE など)。
- 使ってはいけない使い方: 国より細かい地域の判断 (どの州で飢餓が深刻か) には使えません。推計の多い国 (`E`、`I` のフラグの多い国) の年ごとの細かい変動を実際の変化として読まないでください。排出の値を各国の公式の温室効果ガス目録の代わりにしないでください。

## ライセンスと帰属表示

ライセンスは [[CC-BY-4.0]] に、FAO の「FAO Statistical Database Terms of Use」の追加条項が付いたものです。
根拠のページは https://www.fao.org/contact-us/terms/db-terms-of-use/en/ で、その Annex 1 の例に FAOSTAT が挙がっています。

> Unless specified otherwise in their metadata or webpage, all datasets disseminated through FAO corporate statistical databases (see examples in Annex 1) are licensed under the Creative Commons Attribution-4.0 International licence (CC BY 4.0) available here as complemented by the Terms of Use outlined below.

> You may access, download, create copies, adapt and re-disseminate datasets subject to these Database terms.

追加条項 (ADDITIONAL TERMS OF USE) は 7 項です。

1. Prohibited uses: 商業企業や製品・サービスの宣伝に使うこと、FAO の推奨を示唆すること、内容を偽ること、匿名化を解くことを禁じます。

   > Datasets shall not be used for or in conjunction with the promotion of a commercial enterprise and/or its product(s) or services (s), and/or in any way that suggests that FAO endorses any specific company, products or services.

2. Third party exceptions: 第三者のデータには、再配布に元の提供者の同意が要るものや、FAO と違う条件のものがあり、その条件はデータセットのメタデータか画面に書かれます。確かめるのは利用者の責任とされています。
3. Attribution: 出典は次の書式で書きます。

   > "FAO. [YYYY (year of last update)]. [Name of database: Name of dataset OR Name of database]. [Accessed on [DD Month YYYY]]. [URL] Licence: CC-BY-4.0."

4. No endorsement: FAO が利用に関わった、承認したと示してはいけません。
5. Exclusion of liability: 無保証です。FAO はデータベースをいつでも予告なく変更・中止できます。
6. Dispute resolution: 話し合いで解決しない紛争は UNCITRAL (国連国際商取引法委員会) の仲裁規則による仲裁に付します。

   > Any dispute, controversy or claim arising out of or in relation to this licence that cannot be settled amicably shall be submitted to arbitration in accordance with the Arbitration Rules of the United Nations Commission on International Trade Law (UNCITRAL).

7. 規約の改訂: ウェブの内容の再利用の条件 (Terms and Conditions regarding the Reuse of Web content) をそのまま取り込み、規約は随時改訂されます。使い続けることが改訂への同意とされます。

求められる表示文の例 (SDG 指標の領域を 2026-10-06 に取得した場合):

```
FAO. 2026. FAOSTAT: SDG Indicators. Accessed on 6 October 2026. https://www.fao.org/faostat/en/ Licence: CC-BY-4.0.
```

商用利用そのものは CC BY 4.0 として禁じられていませんが、宣伝への利用の禁止は CC BY 4.0 には無い FAO 側の追加の条件です。
EA (OECD CRS の再掲) など他機関のデータを使う領域に、別の条件がメタデータに書かれているかは確かめていません。

## 気をつけること

- 版はファイル名に入っていません。同じ名前のファイルが上書きされます。2026-10-04 に 738,662,691 バイトだった `FAOSTAT_A-S_E.zip` は、2026-10-05 12:58 GMT に 738,662,894 バイトのものに置き換わっていました。目録も同じ日に更新されています。版を示すのは目録の `DateUpdate` と HTTP の `Last-Modified` だけなので、取得した日と `Last-Modified` を記録してください。過去の版を配布元から取る手段は見当たりませんでした。
- 領域ごとに更新日が違います。目録の `DateUpdate` は 2026 年が 34 件、2025 年が 25 件で、残り 10 件は更新の終わった系列などの古い日付です (旧生産者価格 PA は 1991-12-31)。
- まとめ zip と単独の zip は同じ時点のものとは限りません。
- 国のコードは FAO 独自のコードと M49 です。ISO 3166 の 3 文字コードで国境データと結ぶときは、変換表が要ります。ソ連 (228)、ユーゴスラビア (248)、チェコスロバキア (51) など、今は無い国も残っています。
- 集計の行 (World 5000、Africa 5100 など、コード 5000 以上) が国の行と同じ表に入っています。国を足し上げるときは除きます。
- 食料需給表は、2010 年からの新方式 (FBS) と 2013 年までの旧方式 (FBSH) で方法が違い、つなげて時系列にはできません。
- 領域の構成とコードは変わってきました。古い資料に出てくる QC (作物) や QL (畜産) は、今は QCL にまとめられています。
- 漁業と養殖の統計は FAOSTAT ではなく、FAO の別のデータベース (FishStat) にあります。森林資源の評価 (FRA) も別です。
- 温室効果ガスの排出は、ほかの排出の目録 ([[EDGAR 温室効果ガス排出]] など) と方法も範囲も違います。

## データ処理コマンド

2026-10-06 に、上から順に動かして確かめました。

```bash
mkdir -p ./tmp

# 一括配布の目録を取得し、領域の一覧 (コード、名前、更新日、大きさ、行数) を表示する
curl -s -o ./tmp/datasets_E.json https://bulks-faostat.fao.org/production/datasets_E.json
jq -r '.Datasets.Dataset[] | [.DatasetCode, .DatasetName, .DateUpdate[0:10], .FileSize, .FileRows] | @tsv' ./tmp/datasets_E.json

# SDG 指標の領域 (SDGB) の URL を目録から取り、大きさと更新日を確かめる
URL=$(jq -r '.Datasets.Dataset[] | select(.DatasetCode=="SDGB") | .FileLocation' ./tmp/datasets_E.json)
curl -sI "$URL" | grep -iE 'content-length|last-modified'

# 取得して中身を見る (zip は約 4.7MB、展開すると約 134MB)
curl -s -o ./tmp/sdgb.zip "$URL"
unzip -l ./tmp/sdgb.zip
unzip -o -q ./tmp/sdgb.zip -d ./tmp/sdgb
head -2 "./tmp/sdgb/SDG_BulkDownloads_E_All_Data_(Normalized).csv"

# 日本の栄養不足の割合 (SDG 2.1.1) を表示する
python3 -c "
import csv
rows = csv.DictReader(open('./tmp/sdgb/SDG_BulkDownloads_E_All_Data_(Normalized).csv', encoding='utf-8'))
for r in rows:
    if r['Area'] == 'Japan' and r['Item'] == '2.1.1 Prevalence of undernourishment' and r['Value']:
        print(r['Year'], r['Value'], r['Unit'], r['Flag'])
"
```

最後のコマンドは `2024 <2.5 % E` のように、値が不等号つきの文字列で返ります。

## 関連項目

- [[国連食糧農業機関]]
- [[SDGs]]
- [[食料安全保障]]
- [[CC-BY-4.0]]
- [[World Bank 世界開発指標]]
- [[World Population Prospects]]
- [[ILOSTAT]]
- [[EDGAR 温室効果ガス排出]]
- [[UNDP 人間開発指数]]

## 確認日

2026-10-06 に次のことを確かめました。

- 目録 `datasets_E.json` (109,120 バイト、Last-Modified 2026-10-05 12:49:35 GMT) を取得し、領域の数、グループ、更新日、大きさ、行数を数えました。
- QCL、TM、SDGB、まとめ zip 2 本、QCL の横持ち版とアフリカ版に HEAD を投げ、大きさと Last-Modified を確かめました。まとめ zip に `curl -r 0-1023` を投げ、206 が返ることを確かめました。旧配布元の 301 も確かめました。
- MDDW (12,146 バイト)、SDGB (4,721,843 バイト)、QCL (33,921,825 バイト) を取得して展開し、列、行数、地域の数、期間、フラグ、欠損の表し方を数えました。
- 利用規約のページ (https://www.fao.org/contact-us/terms/db-terms-of-use/en/) を読み、引用した原文を確かめました。改訂日の記載はありませんでした。

確かめていないこと:

- 各領域のメタデータのページ (FAOSTAT の画面の Metadata) に、CC BY 4.0 と違う条件や第三者の条件が書かれているか。
- まとめ zip の中にある、目録に載らない古いファイルが何か。
- 大陸別の zip がどの領域にあるか。
- QCL、SDGB、MDDW 以外の領域の期間と地域の数。
- SDGB の `2.2.4` が国連の SDG 指標の枠組みで正式な番号か。
- 公開の予定 (リリースカレンダー) についての配布元の記述。
