---
id: openaerialmap
provider: Humanitarian OpenStreetMap Team (OpenAerialMap と Open Imagery Network)
source_data: '`openaerialmap` は投稿者が撮影した一次データ (撮影者は Item ごとに `oam:producer_name` と `providers` に記録)。`noaa-emergency-response` は NOAA の Emergency Response Imagery を載せ直したもの'
license: [CC-BY-4.0, CC-BY-NC-4.0, CC-BY-SA-4.0, public-domain]
license_note: '`openaerialmap` はコレクションとしては CC-BY-4.0 だが、Item ごとに違う (CC-BY-4.0、CC-BY-NC-4.0、CC-BY-SA-4.0、記載なし)。`noaa-emergency-response` は public-domain。同じ API の `maxar-opendata` と `vantor-opendata` は CC-BY-NC-4.0 で、このカードの対象外'
access: catalog
access_note: catalog。STAC API の `/search` で、コレクション、bbox、日時、ライセンス (`query` または CQL2 の `filter`) で Item を絞れる。各画像は COG で HTTP Range に 206 を返すので、画像の中も範囲と縮尺を絞って読める
format: STAC Item (GeoJSON) と、その asset の Cloud Optimized GeoTIFF (RGB、8 bit)。新しい投稿には未加工の `original` (GeoTIFF)、`mbtiles`、`pmtiles` が付くものもある
coverage: 全世界 (`openaerialmap` のコレクションの bbox は経度 -175.5 から 178.6、緯度 -85.6 から 90)。画像のある場所は点在する。`noaa-emergency-response` は米国テネシー州ナッシュビル周辺だけ (経度 -87.03 から -85.42、緯度 36.10 から 36.23)
period: '`openaerialmap` は撮影日がおおむね 2009 年から 2026 年 10 月 (それ以前の日付の Item も十数件あり、0206 年という誤入力も 1 件ある)。`noaa-emergency-response` は 2020-03-07 から 2020-03-11'
resolution: 画素サイズは Item ごとに違う。新しい順 500 件の `gsd` は 0.008 m から 30.9 m、中央値 0.05 m。NOAA の画像は約 1.35e-6 度 (緯度方向で約 0.15 m、経度方向で約 0.12 m と換算した推定値)
size: 1 Item の `visual` は 0.58MB から 5.7GB (新しい順 500 件で中央値約 100MB、合計約 115GB)。コレクション全体の合計は確かめていません。NOAA の 1 タイルは約 6MB
update: '`openaerialmap` は投稿があるたびに増える (2026-10-05 投稿の Item を確認)。`noaa-emergency-response` は 2020 年の 1 イベントで止まっている'
url: https://api.imagery.hotosm.org/stac (STAC API のルート)、https://api.imagery.hotosm.org/stac/search
docs: https://openaerialmap.org/about/ 、https://github.com/openimagerynetwork/oin-register 、API の説明 https://api.imagery.hotosm.org/stac/api.html
checked: 2026-10-06
details:
  件数: '`openaerialmap` 21,859 件、`noaa-emergency-response` 163 件 (2026-10-06 にページを最後までたどって数えた)'
---

# OpenAerialMap 航空・災害画像

> [[Humanitarian OpenStreetMap Team]] (HOT) が運営する [[OpenAerialMap]] の STAC API で、利用者が投稿した世界各地のドローン・航空機・衛星の画像 (約 2 万 2 千件) と、NOAA の災害後航空写真 (2020 年ナッシュビル竜巻の 163 件) を [[Cloud Optimized GeoTIFF]] で配っているもの

## 概要

[[OpenAerialMap]] (OAM) は、自由なライセンスの衛星画像とドローン (UAV) 画像を探し、共有し、使うための仕組みです。
[[Humanitarian OpenStreetMap Team]] が運営し、[[Open Imagery Network]] (OIN) という画像の共有網の上に作られています。
画像は個人、NGO、自治体、研究者などが自分で撮影して投稿したもので、HOT が撮影を計画したものではありません。
そのため、場所も時期も画質も投稿者しだいで、ある地域の画像がそろっている保証はありません。

HOT は 2026 年時点で、これらの画像を STAC API (stac-fastapi、STAC 1.0.0) で公開しています。
ルートの題名は「STAC FastAPI for OpenAerialMap」で、5 つのコレクションがあります。

| コレクション | 中身 | ライセンス (コレクションの値) | このカード |
| --- | --- | --- | --- |
| openaerialmap | 利用者が投稿した航空写真、ドローン、衛星画像 | CC-BY-4.0 (Item ごとに違う) | 対象 |
| noaa-emergency-response | NOAA の災害後航空写真 (2020 年ナッシュビル竜巻だけ) | public-domain | 対象 |
| maxar-opendata | Maxar Open Data の災害画像 | CC-BY-NC-4.0 | 対象外 |
| vantor-opendata | Vantor (Maxar の後継の名前) Open Data | CC-BY-NC-4.0 | 対象外 |
| cop-dem-glo-30 | Copernicus DEM GLO-30 (30 m の数値表層モデル) | other | 対象外 (条件を確かめられていない) |

`maxar-opendata` と `vantor-opendata` は CC BY-NC 4.0 (非営利に限る) なので、自由に使えるデータではありません。
営利の目的を含む使い方や、条件の違うデータと混ぜて再配布する使い方はできないため、このカードの対象から外しています。
`cop-dem-glo-30` は STAC の値が `other` で、ESA の条件文書 (CSCDA ESA Mission-specific Annex の PDF) を指しています。
この PDF は 2026-10-06 に 2 回取得を試みてどちらもタイムアウトしたので、条件の中身は確かめていません。

`openaerialmap` の `visual` は、投稿された元画像から作った表示用の COG です。
新しい投稿 (2026 年の新しいアップローダー経由) では、`processing:lineage` に「Lossy display COG (compress WEBP quality 90, ...) derived from the archived original」と書かれ、元画像は `original` として別に置かれています。
古い投稿の `visual` は YCbCr JPEG で圧縮されていました (確かめた 3 件。能登の 1 件は JPEG_QUALITY=75)。
どちらも非可逆圧縮なので、色の値をそのまま計測に使うのには向きません。

## 内容

### openaerialmap の Item

Item の `properties` にある主な項目です (日本の範囲の 804 件で数えた出現数を添えます)。

- `title`: 投稿者が付けた題名 (804 件すべて)。地名のこともあれば、`Task of 2024-09-06...` のような自動の名前のこともあります。
- `start_datetime`, `end_datetime`: 撮影期間 (799 件)。残りの 5 件は `datetime` だけを持ちます。古い投稿の多くは `datetime` が null です。
- `license`: Item のライセンス (803 件。1 件は記載なし)。
- `gsd`: 地上画素寸法 (m)。
- `oam:platform_type`: `uav`、`aircraft`、`satellite`、`kite`、`balloon` のどれか。
- `instruments`: 機材名 (例: `RGB Mavic 3`)。
- `oam:producer_name`, `providers`: 撮影者・権利者。
- `created`: 投稿日時。
- 新しい投稿には `oam:uploader_name`、`oam:uploader_id`、`oam:uploader_email`、`oam:footprint_area`、`processing:*` も付きます。

全 21,859 件の内訳は次のとおりです。

- ライセンス: CC-BY-4.0 が 18,587、CC-BY-NC-4.0 が 2,039、CC-BY-SA-4.0 が 488、記載なしが 745。
- 機材の種類: uav 11,520、aircraft 6,165、satellite 4,155、kite 12、balloon 7。
- 撮影年: 2016 年が 4,128 件で最も多く、2024 年 2,263、2025 年 2,177、2026 年 1,723 と続きます。

asset は `visual` (表示用 COG) と `metadata` (JSON) と `thumbnail` (PNG) が基本で、Item によって `original`、`mbtiles`、`pmtiles` が加わります。
新しい順 500 件では、455 件が `visual` と `metadata` と `thumbnail` だけでした。

`visual` は RGB 3 バンド (8 bit) とマスクを持ち、撮影範囲の外はマスクで隠れます (黒く見えます)。
座標系は Item ごとに違い、UTM (例: EPSG:32736、EPSG:32653) や EPSG:3857 がありました。
asset の `proj:code` と `proj:shape` で、取得する前に座標系と画素数が分かります。

### noaa-emergency-response の Item

163 件すべてが `event: Nashville Tornado` で、`properties` は `event` と `datetime` だけです。
asset は `cog` の 1 つだけで、`visual` という名前ではありません。
画像は EPSG:4326 の RGB で、18681 x 18681 画素、512 x 512 のタイルと 7 段のオーバービューを持ちます。
gdalinfo は `LAYOUT=COG` を表示しませんでしたが、タイル分割とオーバービューがあるので部分読みができます。
Item の id の日付 (例: `20200307a...`) と `datetime` (2020-03-11) が合わないものがあります。

## 取り出し方

区分は catalog です。

STAC API の `/search` は GET と POST の両方に応じます。
2026-10-06 に次の絞り込みが効くことを確かめました。

- `collections` と `bbox` と `datetime` の組み合わせ。日本 (bbox 122,24,154,46) の `openaerialmap` は 804 件で、`datetime` を 2024 年に絞ると 16 件になりました。能登半島の周辺 (bbox 136.5,36.9,137.4,37.6) は 2024 年でも全期間でも 1 件でした。
- `start_datetime` と `end_datetime` しか持たない Item も、`datetime` の範囲で正しく絞られました (撮影期間で判定されます)。
- ライセンスでの絞り込み。`"query": {"license": {"eq": "CC-BY-4.0"}}` と、CQL2 の `"filter": {"op": "=", "args": [{"property": "license"}, "CC-BY-4.0"]}` のどちらでも、日本の 804 件が 790 件になりました。
- `sortby` (例: `properties.datetime` の降順) と `fields` (返す項目を減らす)。
- NOAA は、ナッシュビル西部の bbox (-86.9,36.1,-86.7,36.2) と 2020 年 3 月で 21 件、2021 年以降では 0 件でした。

`numberMatched` は返らないので、件数は `next` のリンクをたどって数えます。
`limit` は 10000 まで 1 ページで返り、日本の 804 件 (項目を絞ったもの) で約 10 秒でした。

画像そのものは AWS S3 (`oin-hotosm-temp.s3.us-east-1.amazonaws.com`、NOAA は `noaa-eri-pds.s3.us-east-1.amazonaws.com`) にあり、認証は要りません。
どちらも `Range: bytes=0-1023` に 206 で 1024 バイトを返しました。
そのため GDAL の `/vsicurl/` で、ファイル全体を取らずにオーバービューや一部の範囲だけを読めます。
例えばマラウイのマンゴチの画像 (`visual` 4.07MB、6394 x 3544 画素) から 10% の縮小図を作るのに約 17 秒、約 90 m 四方を切り出すのに約 10 秒かかりました。

## 使いどころ

- 人道支援と防災: 災害の直後に現地のドローン撮影者が投稿した高解像度の画像を、[[OpenStreetMap]] で建物や道路を描く下絵にできます。OAM の説明ページは「All imagery is available to be traced in OpenStreetMap」としています。
- 被害の把握: 同じ場所の災害前後の画像があれば、倒壊家屋や浸水域を目で比べられます。ただし前後がそろうことはまれです。
- SDGs: 目標 11 (ターゲット 11.5 災害による被害の削減、11.b 防災の計画) で、地域の地図づくりや被害記録の材料になります。目標 1 のターゲット 1.5 (貧困層の災害への強靭性) で、地図が乏しい集落の現況を記録する材料にもなります。
- 教育と小さな機械学習の実験: ラベル付きの教師データではありませんが、ライセンスのはっきりした高解像度画像として、建物の目視判読の練習や手作業のラベル付けの元に使えます。

使ってはいけない使い方もあります。

- 投稿者しだいの点在するデータなので、国や地域の全体を網羅する基図や、地域どうしの比較の母集団としては使えません。
- 色の値は非可逆圧縮を経ているので、植生指数などの放射量の計測には `visual` を使いません (`original` があればそちらを確かめる)。
- 撮影日、機材の種類、`gsd` は投稿者の申告で、誤りがあります (下の「気をつけること」)。現況の証拠として使うときは、撮影日を別の手段で確かめます。
- `maxar-opendata` と `vantor-opendata` の画像を、このカードの自由なデータと同じつもりで営利の製品や再配布に使ってはいけません。

## ライセンスと帰属表示

`openaerialmap` について、OAM の説明ページ (https://openaerialmap.org/about/) は次のように書いています。

> All imagery is publicly licensed and made available through the Humanitarian OpenStreetMap Team's Open Imagery Network (OIN) Node. All imagery contained in OIN is licensed CC-BY 4.0, with attribution as contributors of Open Imagery Network.

OIN の登録簿 (https://github.com/openimagerynetwork/oin-register) も「All imagery contained in OIN is licensed CC-BY 4.0」としています。
STAC のコレクションの `license` も `CC-BY-4.0` です。

ところが、Item の `license` には CC-BY-NC-4.0 (2,039 件) と CC-BY-SA-4.0 (488 件) と記載なし (745 件) があり、説明ページの「すべて CC BY 4.0」とは合いません。
新しい順 500 件では 139 件が CC-BY-NC-4.0 でした。
使う前に Item ごとの `license` を確かめ、自由に使いたいときは `CC-BY-4.0` の Item だけに絞ってください (上の `query` か `filter` で絞れます)。
記載なしの Item をどう扱うべきかは、配布元の説明に見当たらず確かめていません。

求められる表示は、OAM の説明ページの言い回しにならうと次のとおりです。

- 例: Imagery © 撮影者名 (Item の `oam:producer_name`), Contributors of Open Imagery Network, CC BY 4.0, via OpenAerialMap

`noaa-emergency-response` はコレクションの `license` が `public-domain` で、表示の義務はありません。
出所として「NOAA Emergency Response Imagery」と書くのが望ましいです。
NOAA 側の利用条件のページは確かめていません。

## 気をつけること

- ライセンスは Item ごとに違います。コレクションの `CC-BY-4.0` だけを見て全件を自由に使えると判断しないでください。
- 同じ API の `maxar-opendata` (49 イベント、2010 年から 2025 年 11 月) と `vantor-opendata` (202 件) は CC BY-NC 4.0 です。検索で `collections` を指定しないと混ざって返ります。
- 投稿者の申告に誤りがあります。撮影日に 0206 年という Item が 1 件あり、1944 年から 1999 年の日付も十数件あります。ドローンの画像に `oam:platform_type` が `satellite` と付いている例を、加賀市の 2024 年 4 月の投稿で見ました。地上型レーザースキャナーの機材名に `kite` が付いた例もありました。
- 新しい投稿の Item には、投稿者のメールアドレス (`oam:uploader_email`) と連絡先が `providers` の説明に入っていることがあります。Item の表を再配布するときは、これらの列を落としてください。
- 撮影日の項目は投稿の時期で形が違い、`datetime` だけのもの、`start_datetime` と `end_datetime` だけのものがあります。
- 座標系は Item ごとに違います (UTM、EPSG:3857、EPSG:4326)。複数の画像を並べるときは再投影が要ります。
- `noaa-emergency-response` は NOAA の Emergency Response Imagery 全体ではなく、2020 年のナッシュビル竜巻の 163 枚だけです。他の災害の NOAA 画像はこの API にはありません。
- `noaa-emergency-response` の asset 名は `cog` で、`visual` ではありません。asset 名を決め打ちするプログラムは、コレクションごとに名前を変える必要があります。
- 背景地図として使う画像タイルの [[ArcGIS World Imagery 衛星画像タイル]] とは別物です。こちらは個々の撮影の原画像を配っていて、撮影者と撮影日が Item ごとに分かります。

## データ処理コマンド

2026-10-06 に、GDAL 3.9.2、curl、jq で実際に動かしたものです。

```bash
mkdir -p ./tmp

# 1. マラウイ南部 (マンゴチ周辺) で 2026-10-01 から 10-05 に撮影された CC-BY-4.0 の画像を探す
curl -s -X POST https://api.imagery.hotosm.org/stac/search \
  -H 'Content-Type: application/json' \
  -d '{"collections":["openaerialmap"],"bbox":[35.0,-14.6,35.4,-14.2],"datetime":"2026-10-01T00:00:00Z/2026-10-06T00:00:00Z","query":{"license":{"eq":"CC-BY-4.0"}},"limit":10}' \
  > ./tmp/oam_search.json
jq -r '.features[] | [.id, .properties.start_datetime, .properties.title, .properties.license, .properties.gsd, .assets.visual.href] | @tsv' ./tmp/oam_search.json

# 2. 題名が Mangochi の Item の COG の情報を、ファイル全体を取らずに見る
HREF=$(jq -r '.features[] | select(.properties.title == "Mangochi") | .assets.visual.href' ./tmp/oam_search.json)
gdalinfo /vsicurl/$HREF

# 3. オーバービューから 10% の縮小図を作る
gdal_translate -q -b 1 -b 2 -b 3 -outsize 10% 10% -of PNG /vsicurl/$HREF ./tmp/preview.png

# 4. 経緯度で範囲を指定して元の解像度で切り出す (約 90 m 四方、約 9MB)
gdal_translate -q -projwin_srs EPSG:4326 -projwin 35.2310 -14.4210 35.2318 -14.4218 /vsicurl/$HREF ./tmp/crop.tif
gdalinfo -stats ./tmp/crop.tif
```

1 の結果は 2 件 (Lake Malawi Shore と Mangochi) でした。
`-projwin` が画像の範囲から外れていても gdal_translate は黙って空の画像を書くので、4 のあとに `-stats` で中身があるか確かめます。

## 関連項目

- [[Humanitarian OpenStreetMap Team]]
- [[OpenAerialMap]]
- [[Open Imagery Network]]
- [[NOAA]]
- [[STAC]]
- [[Cloud Optimized GeoTIFF]]
- [[GDAL]]
- [[OpenStreetMap]]
- [[OpenStreetMap France HOT 人道支援地図タイル]]
- [[ArcGIS World Imagery 衛星画像タイル]]
- [[CC-BY-4.0]]
- [[人道支援]]
- [[防災]]

## 確認日

2026-10-06 に次を確かめました。

- STAC API のルート、`/collections`、`/conformance`、`/queryables` を読み、5 つのコレクションの題名、ライセンス、範囲、期間を確かめました。
- `/search` の POST で、bbox と datetime の絞り込み、`query` と CQL2 の `filter` によるライセンスの絞り込み、`fields`、`sortby` が効くことを確かめました。
- `openaerialmap` の全件 (21,859 件) を `limit=10000` で 3 ページたどり、ライセンス、機材の種類、撮影年を数えました。`noaa-emergency-response` の 163 件と `vantor-opendata` の 202 件も数えました。`maxar-opendata` と `cop-dem-glo-30` の件数は数えていません。
- `openaerialmap` (能登、港区、マンゴチの 3 件) と `noaa-emergency-response` (1 件) の COG に HEAD と Range 要求を送り、206 を確かめ、gdalinfo で座標系、画素数、圧縮、オーバービューを確かめました。
- OAM の説明ページと OIN の登録簿の README で、ライセンスの文言を確かめました。

確かめられなかったことは次のとおりです。

- `cop-dem-glo-30` の条件文書 (ESA の PDF) は 2 回ともタイムアウトし、中身を読めていません。
- `openaerialmap` の全画像の合計の大きさ。
- ライセンスの記載が無い Item の扱いと、NOAA 側の利用条件のページ。
- 帰属表示の文言は OAM の説明ページの言い回しから組んだ例で、配布元が定めた定型文は見つけていません。
