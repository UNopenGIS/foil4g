---
title: geoBoundaries 行政区域
description: "William & Mary geoLab が、各国の政府、国連機関、OpenStreetMap などから集めた行政区域の境界 (国境から ADM5 まで) を、国と階層の組ごとに GeoJSON、Shapefile、TopoJSON で配っている全世界のデータベース"
provider_group: "geoBoundaries"
categories: ["行政区域"]
regions: ["全世界"]
formats: ["GeoJSON", "TopoJSON", "Shapefile", "GeoPackage"]
id: geoboundaries
provider: William & Mary geoLab (米国ウィリアム・アンド・メアリー大学) と協力者
source_data: 国と階層ごとに違う。各国の政府機関、OpenStreetMap (osm-boundaries.com 経由)、HDX の COD-AB、UN SALB、Wikimedia Commons など。各ファイルのメタデータに出所がある
license: [ODbL-1.0, public-domain, CC-BY-4.0, CC-BY-3.0-IGO, other]
license_note: ファイルごとに違う。gbOpen は 25 種類 (ODbL 1.0 が 225 件、Public Domain が 102 件、CC BY 4.0 が 148 件など)、gbHumanitarian は全件 CC-BY-3.0-IGO、gbAuthoritative は全件 UN SALB Data License (非営利のみ)。配布元はサイト全体を CC-BY-4.0 と案内している
access: split
access_note: split。国 (ISO 3166-1 alpha-3) と行政階層 (ADM0 から ADM5) の組でファイルが分かれ、API でその組を指定して 1 件ずつ取れる。空間や日時での検索は無い
format: GeoJSON、簡略化 GeoJSON、TopoJSON、Shapefile (一式 zip に同梱)、プレビュー PNG。全世界の合成版 CGAZ は GeoPackage もある
coverage: 全世界。gbOpen は 232 の国と地域、gbHumanitarian は 142、gbAuthoritative は 32
period: 境界が表す年は国と階層ごとに違う。gbOpen は 1995 年から 2023 年
resolution: 行政区画 1 つが 1 地物 (ポリゴンまたはマルチポリゴン)。座標系は WGS84 経緯度
size: 1 件ごとに違う。日本の ADM2 の GeoJSON が 10,897,321 バイト、日本の ADM1 の一式 zip が 45,855,447 バイト。CGAZ の GeoPackage は ADM0 が 162,144,256、ADM1 が 144,470,016、ADM2 が 240,824,320 バイト
update: 決まった周期は無い。年ごとのリリース (5.0.0 が 2022-12-19) と、その間の随時の更新。現行のファイルの大半は 2023-12-12 の build
url: https://www.geoboundaries.org/api/current/gbOpen/ALL/ALL/ (API の目録)
docs: https://www.geoboundaries.org/ 、https://www.geoboundaries.org/api.html
checked: 2026-10-06
details:
  配布の実体: https://github.com/wmgeolab/geoBoundaries (`releaseData/` の下)
  論文: 'Runfola, D. et al. (2020) PLoS ONE 15(4): e0231866'
---

# geoBoundaries 行政区域

> [[William & Mary geoLab]] が、各国の政府、国連機関、[[OpenStreetMap]] などから集めた行政区域の境界 (国境から ADM5 まで) を、国と階層の組ごとに GeoJSON、Shapefile、TopoJSON で配っている全世界のデータベース

## 概要

geoBoundaries は、米国ウィリアム・アンド・メアリー大学の geoLab が 2016 年から作っている、全世界の行政区域の境界のデータベースです。
自分で測量した境界ではなく、各国の政府機関、国連機関、OpenStreetMap、Wikimedia Commons などが公開している境界を集め、形式と属性をそろえて配り直しています。
そのため、出所、表している年、精度、ライセンスは、国ごと、さらに同じ国の階層ごとに違います。

配布は 3 つの系統 (release type) に分かれています。
API の説明ページはこう書いています。

> For most users, we suggest using gbOpen, as it is CC-BY 4.0 compliant, and can be used for most purposes so long as attribution is provided. gbHumanitarian files are mirrored from UN OCHA, but may have less open licensure. gbAuthoritative files are mirrored from UN SALB, and cannot be used for commerical purposes, but are verified through in-country processes.

| 系統            | 出所                                                                                      | ライセンスの性質                                                     | 件数 | 国と地域 |
| --------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---: | -------: |
| gbOpen          | 国と階層ごとに、開いたライセンスで公開されている境界を選んだもの (OSM、各国政府、Wikimedia Commons、衛星の土地被覆からの推定など) | 開いたライセンスに限るが、種類は 25 あり、share-alike も含む       |  715 |      232 |
| gbHumanitarian  | 国連 OCHA が [[HDX]] で配る Common Operational Datasets (COD-AB) の写し                    | 全件 CC BY 3.0 IGO と記録されている。ただし出所に GADM を含む行がある (下の気をつけることを参照) |  463 |      142 |
| gbAuthoritative | 国連の Second Administrative Level Boundaries ([[UN SALB]]) の写し。各国が SALB に提出し、国連が確かめたもの | 全件 UN SALB Data License。非営利の利用に限られ、形を変えることも禁じられている |   93 |       32 |

gbOpen の境界の作り方は一つではありません。
多いのは OpenStreetMap の行政界 (`OpenStreetMap, Wambacher` が 199 件) で、ほかに Wikimedia Commons の地図から起こしたもの (`geoBoundaries, Wikimedia Commons` が 42 件など)、Sentinel-2 の 10m 土地被覆から陸地をポリゴンにした ADM0 (21 件と 11 件)、[[Natural Earth]] (16 件) があります。
台湾の ADM0 は出所が `geoBoundaries, Pixabay` で、ストック画像サイトのベクター地図から起こされています。
つまり、測量や法令に基づく境界と、絵から起こした境界が同じ形式で並んでいます。

配布元は、各国のファイルを「as they would represent themselves」(その国が自分を表すであろう姿) で作るとしています。
国ごとに別の出所から取っているため、隣り合う国のファイルの境界は一致せず、重なりや隙間があり得ます。
継ぎ目をそろえた全世界の合成版として CGAZ (Comprehensive Global Administrative Zones) が別にあり、こちらは強く簡略化され、係争地は米国国務省の定義に置き換えられています。

## 内容

### 各ファイルの属性

ファイル (GeoJSON、Shapefile) の地物が持つ属性は 5 つです。

| 属性         | 意味                                                                         | 例 (日本の ADM1)          |
| ------------ | ---------------------------------------------------------------------------- | ------------------------- |
| `shapeName`  | 区画の名前。出所の表記のままで、言語や綴りは国ごとに違う                     | `Osaka Prefecture`、`Oita` |
| `shapeISO`   | 区画の ISO 3166-2 コード。無いときは空文字列。準拠は保証されていない          | `JP-27`                   |
| `shapeID`    | 区画の ID。ファイルの ID に `B` と連番をつないだもの                          | `47310658B55038426470858` |
| `shapeGroup` | 国のコード (ISO 3166-1 alpha-3)                                               | `JPN`                     |
| `shapeType`  | 階層                                                                         | `ADM1`                    |

日本の ADM1 の例で分かるように、`shapeName` は表記がそろっていません (`Osaka Prefecture` と `Oita` が混ざる)。
人口や統計の表と結ぶときは、名前ではなく `shapeISO` を使うほうが安全ですが、`shapeISO` が空の国もあります。

### API が返すファイルごとのメタデータ

API は 1 件 (国 x 階層) ごとに 32 の欄を返します。
主なものは次のとおりです。

- 識別: `boundaryID`、`boundaryName`、`boundaryISO`、`boundaryType`、`boundaryCanonical` (その国での階層の呼び名。`Unknown` もある)
- 出所と年: `boundarySource`、`boundarySourceURL`、`boundaryYearRepresented` (`2017` のような年、または `31-05-2013 to 20-02-2020` のような期間)、`sourceDataUpdateDate`、`buildDate`
- ライセンス: `boundaryLicense`、`licenseDetail` (欠損は文字列の `nan`)、`licenseSource`
- 地域区分: `Continent`、`UNSDG-region`、`UNSDG-subregion`、`worldBankIncomeGroup`
- 形の統計: `admUnitCount`、頂点数・周長 (km)・面積 (km2) の平均、最小、最大
- 配布先: `staticDownloadLink` (一式 zip)、`gjDownloadURL`、`tjDownloadURL`、`simplifiedGeometryGeoJSON`、`imagePreview`

値はすべて文字列で返ります。

### 件数 (gbOpen)

2026-10-06 に API の目録 715 件を集計しました。

| 階層 | 国と地域の数 | 区画の合計 |
| ---- | -----------: | ---------: |
| ADM0 |          230 |        230 |
| ADM1 |          199 |      3,281 |
| ADM2 |          180 |     49,363 |
| ADM3 |           81 |    105,170 |
| ADM4 |           21 |     94,251 |
| ADM5 |            4 |    699,798 |

ADM5 の大半はインドの 649,771 区画です。
gbHumanitarian は ADM0 から ADM4 までで、区画の合計は 142、2,273、29,652、45,930、128,278 です。
gbAuthoritative は ADM0 から ADM2 までで、32、542、6,052 です。

### ライセンスの内訳 (gbOpen)

`boundaryLicense` の値を数えた結果です (715 件、25 種類)。

| ライセンス (API の表記を短くしたもの)            | 件数 |
| ------------------------------------------------ | ---: |
| Open Data Commons Open Database License 1.0      |  225 |
| Public Domain                                    |  102 |
| CC BY 4.0 International                          |  102 |
| CC BY 3.0 IGO                                    |   98 |
| CC BY 4.0                                        |   46 |
| CC BY-SA 2.0                                     |   33 |
| CC0 1.0                                          |   22 |
| CC BY 3.0                                        |   21 |
| CC BY 2.5 Generic                                |   16 |
| CC BY-SA 3.0 Unported                            |   11 |
| Etalab Open License 2.0                          |   10 |
| Other - Direct Permission                        |    5 |
| そのほか 13 種類 (各 1 から 4 件)                |   24 |

そのほかの 13 種類は、Open Government Licence v3.0 (英国)、swisstopo License、Data license Germany - Attribution 2.0、Open Government Canada 2.0、CC BY 2.5 IN、Singapore Open Data License 1.0、Pixabay License、Other - Humanitarian、PDDL 1.0、ODC Attribution License 1.0、INE Data License、Korea Open Government License Type 1、CC BY-SA 4.0 です。
`CC BY 4.0 International` と `CC BY 4.0` は表記の揺れで、合わせると 148 件です。

share-alike (ODbL か CC BY-SA) は 715 件中 270 件です。
ADM2 に限ると 180 件中 45 件が share-alike で、残りの 135 件 (36,925 区画) は share-alike ではありません。

同じ国の中でも階層ごとにライセンスが違います。
日本は次のとおりです。

| 階層 | 区画  | `boundaryCanonical` | 出所                                    | ライセンス    | 年   |
| ---- | ----: | ------------------- | --------------------------------------- | ------------- | ---- |
| ADM0 |     1 | Japan               | 国土交通省 国土数値情報                 | CC BY 4.0     | 2022 |
| ADM1 |    47 | Prefectures         | OpenStreetMap, Wambacher                | ODbL 1.0      | 2017 |
| ADM2 | 1,745 | Subprefectures      | OpenStreetMap, Wambacher                | CC BY-SA 2.0  | 2017 |

日本の ADM3 は gbOpen に無く、API は 404 を返します。

## 取り出し方

区分は split です。
国と階層の組ごとにファイルが分かれていて、API の URL に ISO コードと階層を入れると、その 1 件のメタデータと配布先が返ります。

```
https://www.geoboundaries.org/api/current/[gbOpen|gbHumanitarian|gbAuthoritative]/[ISO3 または ALL]/[ADM0..ADM5 または ALL]/
```

- `.../gbOpen/ALL/ALL/` は JSON の配列 715 件 (1,274,935 バイト) を返しました。gbHumanitarian は 463 件 (843,279 バイト)、gbAuthoritative は 93 件 (173,480 バイト) です。
- `.../gbOpen/JPN/ADM2/` は JSON のオブジェクト 1 件 (1,700 バイト) を返しました。
- 絞り込みは国と階層だけで、範囲 (bbox) や日時での検索はありません。
- 認証は要りません。

配布先は GitHub の `wmgeolab/geoBoundaries` で、URL には commit hash が入ります (現行の 715 件中 695 件が `9469f09`、残りは 6 つの別の commit)。
`github.com/.../raw/...` は 302 で `media.githubusercontent.com` (Git LFS) へ転送され、追うと 200 が返ります。
日本の ADM2 の GeoJSON (10,897,321 バイト) では `accept-ranges: bytes` が返り、`curl -r 0-1023` に 206 と 1,024 バイトが返りました。
ただし中身は索引の無い素の GeoJSON なので、Range で一部の区画だけを読む道はありません。
最小単位は 1 国 1 階層のファイル 1 つで、丸ごと取得します。

一式 zip (`staticDownloadLink`) には、Shapefile、GeoJSON、TopoJSON とそれぞれの簡略化版、プレビュー PNG、メタデータ (json と txt)、`CITATION-AND-USE-geoBoundaries.txt` が入っています。
日本の ADM1 の一式 zip は 45,855,447 バイトで、展開すると 16 ファイル、121,461,948 バイトでした。
形だけが要るなら、`gjDownloadURL` か `simplifiedGeometryGeoJSON` を直接取るほうが小さく済みます (日本の ADM1 の簡略化 GeoJSON は 2,235,621 バイト)。

過去のリリースは、API の説明ページに commit hash の表があります (5.0.0 が `b7dd6a5`、4.0.0 が `299e006`、3.0.0 が `7c8dbc5` など)。

## 使いどころ

- 国や州、郡の単位で統計を集計し、地図にする下地になります。SDGs の指標を国より細かい単位で示すとき (例えば目標 1 の貧困、目標 3 の保健、目標 6 の水と衛生の地域差) に、人口グリッド ([[WorldPop 人口グリッド]]、[[GHSL 人口・建物・都市化度]]、[[Kontur Population]]) を区画ごとに集計する枠として使えます。
- 人道支援では、gbHumanitarian が OCHA の COD-AB と同じ境界なので、OCHA や各クラスターの表 (P-code で結ぶもの) と合わせやすくなります。ただし P-code そのものはこのカードで確かめた gbOpen の属性には無く、gbHumanitarian のファイルの属性は確かめていません。
- 防災では、被災した州や郡の範囲を切り出したり、地震 ([[USGS 地震カタログ]]) や紛争の出来事 ([[UCDP 武力紛争データ]]) を区画ごとに数えたりするのに使えます。
- 研究では、180 の国と地域に ADM2 があるので、国をまたいだ比較の枠として使われています。

使ってはいけない使い方もあります。

- 国境や係争地についての公式な立場の表明として使ってはいけません。geoBoundaries は国連の公式の境界ではなく、国ごとのファイルは隣国どうしで一致しません。国連の文書や地図では、国連の境界 (UN Geospatial の境界) を使うべきです。
- 同じ「ADM2」を国をまたいで同じ粒度として比べてはいけません。階層の意味は国ごとに違います (下の気をつけることを参照)。
- 境界の年がそろっていないので、ある時点の行政区画の正本として使うときは、`boundaryYearRepresented` を国と階層ごとに確かめる必要があります。
- 法的な境界確定や土地の権利の判断には使えません。配布元は正確さを保証しないと明記しています。

## ライセンスと帰属表示

ライセンスはファイルごとに違い、API の `boundaryLicense` と `licenseSource`、一式 zip の `*-metaData.txt` に書かれています。
使う前に、使う国と階層の 1 件ずつについて、この欄を読む必要があります。

配布元の案内は二重になっています。
トップページはデータベース全体を CC BY 4.0 と案内しています。

> geoBoundaries datasets are provided under the CC BY 4.0 license, which allows for most commmercial, noncommercial, and academic uses. Our license requires an acknowledgement in any products you produce which use this data.

GitHub の README は「open license (CC BY 4.0 / ODbL)」と書いています。
一式 zip の `CITATION-AND-USE-geoBoundaries.txt` は、CC BY 4.0 の対象を「Computer code and derivative works generated by the geoBoundaries project」とし、各ファイルのメタデータにある出所も引用するよう求めています。

> Users using individual boundary files from geoBoundaries should additionally ensure that they are citing the sources provided in the metadata for each file.

一方、`boundaryLicense` は「The original license that the dataset was released under by the primary source」(一次の出所が公開したときのライセンス) と定義されています。
例えば日本の ADM1 は ODbL 1.0、ADM2 は CC BY-SA 2.0 で、これらは share-alike の条件を持ちます。
geoBoundaries の CC BY 4.0 の案内が、元のライセンスの条件 (share-alike など) を外せるのかは、配布元の文言からは読み取れません。
安全側に倒すなら、ファイルごとの `boundaryLicense` に従い、加えて geoBoundaries の帰属表示をします。

系統ごとの性質は次のとおりです。

- gbAuthoritative は UN SALB の利用条件に従います。SALB の Data Specifications v2.0 (2021 年 6 月) の Annex 2 は「The SALB Data may be used for only non-commercial purposes.」とし、「Users are prohibited from changing the geometry or content of the SALB Data without consent of the Contributor.」とも書いています。派生物には「from SALB Data, United Nations」と提供国の機関名を表示するよう求めています。
- gbHumanitarian は全件 `Creative Commons Attribution 3.0 Intergovernmental Organisations (CC BY 3.0 IGO)` と記録され、`licenseSource` は HDX の COD-AB のページです。ただし 463 件中 57 件は出所が `www.gadm.org, HDX` (29 か国) で、GADM 自身のライセンスページは「Redistribution or commercial use is not allowed without prior permission.」と書いています。これらの行を商用で使うときは、HDX の該当ページで条件を確かめてください。
- gbOpen にも、通常の公開ライセンスでないものがあります。`Other - Direct Permission` が 5 件 (オマーンの ADM2、ソロモン諸島の ADM3 と ADM4、ツバルの ADM3、バヌアツの ADM3。`licenseDetail` は「Granted to redistribute in email」など)、`Other - Humanitarian` が 1 件 (ポーランドの ADM0)、`Pixabay License for Content` が 1 件 (台湾の ADM0) です。

求められる表示文は次のとおりです。

- ウェブでの利用: 「geoBoundaries」の名前と https://www.geoboundaries.org へのリンク。メタデータの txt は「Administrative boundaries courtesy of geoBoundaries.org」を例に挙げています。
- 論文: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries. PLoS ONE 15(4): e0231866. https://doi.org/10.1371/journal.pone.0231866
- あわせて、使ったファイルの `boundarySource` と、そのライセンスが求める表示 (OSM 由来なら「© OpenStreetMap contributors」、SALB 由来なら「from SALB Data, United Nations」と提供国の機関名)。

## 気をつけること

- 国境は国連の公式見解ではありません。各国のファイルについて、配布元は「seeks to represent every nation "as they would represent themselves", with no special identification of disputed areas」と書いています。係争地を特別に区別していないので、隣り合う国のファイルが同じ土地を両方に含めることがあり得ます。全世界の合成版 CGAZ について、配布元は「disputed areas are removed and replaced with polygons following US Department of State definitions」と書いており、これは米国国務省の定義で、国連の定義ではありません。geoBoundaries のサイトと README には、国連の立場についての注記は見当たりませんでした。gbAuthoritative の元の SALB の仕様書には、国連の標準の免責文 (「do not imply the expression of any opinion whatsoever on the part of the Secretariat of the United Nations concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries」) があります。
- 国と地域の扱いも政治的な判断を含みます。gbOpen には台湾 (`TWN`)、パレスチナ (`PSE`、名前は State of Palestine)、コソボ (`XKX`、ISO 3166-1 の正式コードではない) が独立した国として ADM0 から ADM2 まで入っており、南極 (`ATA`) もあります。西サハラ (`ESH`) は gbOpen にありません。
- `boundaryCanonical` は出所の呼び名で、意味は国ごとに違います。日本の ADM2 は `Subprefectures` (支庁) と呼ばれていますが 1,745 区画あり、北海道の 14 の振興局ではなく市区町村に近い粒度です。
- 年がそろっていません。gbOpen の `boundaryYearRepresented` は 1995 年から 2023 年までに散らばり、期間で書かれた行もあります。日本は ADM0 が 2022 年、ADM1 と ADM2 が 2017 年です。
- 隣り合う国のファイルは別の出所から作られているので、国境線が一致しません。全世界を一枚で塗るときは、CGAZ を使うか、自分で継ぎ目を処理します。
- 名前の表記は出所のままです。英語、現地語、ローマ字が混ざり、同じ国の中でも揺れます。
- gbOpen と gbHumanitarian と gbAuthoritative は、同じ国でも別の境界です。区画の数も違います。例えば日本は gbOpen に 3 件、gbHumanitarian に 3 件あり、gbAuthoritative にはありません。
- `CC BY 4.0 International` と `CC BY 4.0` のように、ライセンスの表記が揺れています。機械的に分類するときは名寄せが要ります。
- `licenseSource` と `boundarySourceURL` の URL は `https//` (コロンの抜け) や `https://` の無いものがあり、そのままでは開けないことがあります。
- 座標系は WGS84 経緯度です (GeoJSON は CRS84、Shapefile の .prj は WGS84)。面積や周長は投影してから計算してください。API の面積は EASE-Grid 2、周長は World Equidistant Cylindrical で計算されたものです。
- [[Natural Earth]] の行政区域とは別のデータです。Natural Earth は全世界が 1 ファイルで版が固定され、継ぎ目がそろっていますが、ADM2 は限られます。geoBoundaries は国ごとに細かい階層まであるかわりに、出所と年がばらばらです。GADM とも別物で、GADM はライセンスが非営利に限られます。

## データ処理コマンド

2026-10-06 に、以下を実際に動かして確かめました (curl、jq、GDAL の ogrinfo と ogr2ogr)。

```bash
# 日本の ADM1 のライセンス、出所、年、簡略化 GeoJSON の URL を見る
curl -s https://www.geoboundaries.org/api/current/gbOpen/JPN/ADM1/ \
  | jq -r '.boundaryLicense, .boundarySource, .boundaryYearRepresented, .simplifiedGeometryGeoJSON'

# 簡略化 GeoJSON を取得する (GitHub から LFS へ転送されるので -L が要る)
URL=$(curl -s https://www.geoboundaries.org/api/current/gbOpen/JPN/ADM1/ | jq -r '.simplifiedGeometryGeoJSON')
mkdir -p ./tmp
curl -sL -o ./tmp/JPN-ADM1_simplified.geojson "$URL"

# 中身を見る (47 地物、属性 5 つ)
ogrinfo -so -al ./tmp/JPN-ADM1_simplified.geojson

# GeoPackage に変換する
ogr2ogr -f GPKG ./tmp/JPN-ADM1.gpkg ./tmp/JPN-ADM1_simplified.geojson -nln adm1

# gbOpen 全体のライセンスの種類と件数を数える
curl -s https://www.geoboundaries.org/api/current/gbOpen/ALL/ALL/ \
  | jq -r '.[].boundaryLicense' | sort | uniq -c | sort -rn

# ADM2 のうち share-alike でないものの数を数える
curl -s https://www.geoboundaries.org/api/current/gbOpen/ALL/ADM2/ \
  | jq -r '.[] | select(.boundaryLicense | test("ShareAlike|Open Database") | not) | .boundaryISO' | wc -l
```

## 関連項目

- [[William & Mary geoLab]]
- [[OpenStreetMap]]
- [[HDX]]
- [[UN SALB]]
- [[Natural Earth]]
- [[Natural Earth Coastline Data]]
- [[UCDP 武力紛争データ]]
- [[USGS 地震カタログ]]
- [[WorldPop 人口グリッド]]
- [[GHSL 人口・建物・都市化度]]
- [[Kontur Population]]
- [[行政区域]]
- [[GeoJSON]]
- [[TopoJSON]]
- [[Shapefile]]
- [[GeoPackage]]
- [[CC-BY-4.0]]
- [[CC-BY-3.0-IGO]]
- [[ODbL-1.0]]

## 確認日

2026-10-06 に次を確かめました。

- API の目録を 3 系統 (gbOpen、gbHumanitarian、gbAuthoritative) とも取得し、件数、国の数、区画の合計、ライセンス、出所、年、commit hash を jq で数えました。
- 日本の ADM2 の GeoJSON に HEAD と Range 要求を送り、302 から 200、10,897,321 バイト、`accept-ranges: bytes`、Range に 206 を確かめました。
- 日本の ADM1 の一式 zip (45,855,447 バイト) を取得し、中のファイル、メタデータ、`CITATION-AND-USE-geoBoundaries.txt` を読みました。簡略化 GeoJSON を ogrinfo で開き、属性と地物数を確かめました。
- CGAZ の GeoPackage 3 つの大きさを HEAD で確かめました (中身は開いていません)。
- トップページ、API の説明ページ、各国ファイルと CGAZ のダウンロードページ、GitHub の README を読み、ライセンスの案内と係争地の扱いの文言を確かめました。
- UN SALB の Data Specifications v2.0 は、unsalb.org に 2 回つながらなかったため、geoBoundaries が licenseSource に挙げている写し (github.com/wmgeolab/geoBoundaryBot の `dta/licenseText/SALB_DataSpecifications_v2.0.pdf`) で読みました。
- GADM のライセンスページを読みました。

確かめていないことは次のとおりです。

- gbHumanitarian と gbAuthoritative のファイルの中身 (属性に P-code などがあるか)。
- HDX の COD-AB の各ページにあるライセンスの記載 (geoBoundaries の記録と一致するか)。
- 全ファイルの合計の大きさ。
- geoBoundaries の CC BY 4.0 の案内と、元のライセンス (ODbL や CC BY-SA) の関係について、配布元の公式な説明。
