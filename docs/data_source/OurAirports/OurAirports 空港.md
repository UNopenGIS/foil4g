---
id: ourairports
provider: OurAirports (創設者 David Megginson が運営するボランティアのサイト)
source_data: なし (一次データ)。ただし会員が入力した値には、FAA、DAFIF、GeoNames、navaid.com、Wikipedia などから取り込んだものが含まれる (About ページの Credits)
license: [public-domain]
license_note: パブリックドメイン (サイトの Terms of use)。GitHub リポジトリの LICENSE は The Unlicense
access: split
access_note: split。全世界の 7 ファイルは種類 (空港、滑走路など) ごとに分かれていて、それぞれは whole。空港の表だけは国ごとの CSV (ISO 3166-1 alpha-2 の国コードで選ぶ) もある
format: CSV (UTF-8)。国ごとの空港の表は HXL タグつき CSV もある
coverage: 全世界。airports.csv の国コードは 247 種類、緯度 -90 から 83.09、経度 -179.88 から 179.98
period: 現在の状態だけ (時系列ではない)。閉鎖された空港も `closed` として残る
resolution: 1 行 1 空港 (点)、1 行 1 滑走路、1 行 1 周波数、1 行 1 航法援助施設
size: 7 ファイルの合計 24,728,137 バイト (約 25MB)。airports.csv は 12,741,155 バイト (2026-10-06 版)
update: 毎晩 (01:53 UTC ごろに GitHub へ書き出し)。中身が変わらないファイルもある
url: https://davidmegginson.github.io/ourairports-data/airports.csv ほか
docs: https://ourairports.com/data/ 、列の説明は https://ourairports.com/help/data-dictionary.html
checked: 2026-10-06
details:
  リポジトリ: https://github.com/davidmegginson/ourairports-data
---

# OurAirports 空港

> [[OurAirports]] が、会員の投稿で作った世界の空港、滑走路、通信周波数、航法援助施設の表を、パブリックドメインとして毎晩 CSV で配っているもの

## 概要

OurAirports は、自家用機のパイロットである David Megginson が 2007 年に始めた、世界の空港を調べて記録するためのサイトです。
About ページによると、米国の [[DAFIF]] (Digital Aeronautical Flight Information File) が 2006 年に一般公開をやめた後、世界の航空データの公開された出どころが無くなったので、その穴を埋めるために始まりました。

データは観測や公式の航空路誌 (AIP) から機械的に作ったものではありません。
会員が無料のアカウントを作って空港を追加し、直しています。
About ページの Credits には、FAA、DAFIF、カナダの空港一覧、Geonames、navaid.com、Wikipedia、ブラジルやオーストラリアの空港の情報源が挙げられています。
個々の値がどの出どころから来たかは、CSV からは分かりません。

作り方から来る限界があります。

- 国ごとに網羅の度合いが違います。米国だけで全体の 38% (32,673 件) を占め、紛争地や小さな国は件数が少なくなります。
- 公式の確認を経ていません。人道支援データの共有サイト [[Humanitarian Data Exchange]] (HDX) に載っている国別の表には「Unverified live data. May change at any time.」と注記されています。
- 2021-11-03 から、配布ファイルは GitHub の `davidmegginson/ourairports-data` に置かれ、旧来の `https://ourairports.com/data/*.csv` は GitHub Pages へ 301 で転送されます。

## 内容

2026-10-06 に全 7 ファイルを取得して、Python の csv モジュールで数えました (行数は見出し行を除いた件数です)。
GitHub の README の「Direct download links」は 6 ファイルだけを挙げていて、`airport-comments.csv` はダウンロードページにしか載っていません。
`frequencies.csv` という名前のファイルはありません (404)。周波数の表は `airport-frequencies.csv` です。

| ファイル | 行数 | 列数 | バイト数 | 中身 |
| --- | ---: | ---: | ---: | --- |
| airports.csv | 86,208 | 19 | 12,741,155 | 空港 (点) |
| runways.csv | 48,310 | 20 | 3,968,226 | 滑走路、ヘリパッド、水上の離着水帯 |
| airport-frequencies.csv | 30,383 | 6 | 1,302,033 | 空港の音声通信周波数 |
| navaids.csv | 11,008 | 20 | 1,524,946 | 無線航法援助施設 (VOR、NDB など) |
| countries.csv | 249 | 6 | 24,583 | 国の一覧 |
| regions.csv | 3,987 | 8 | 485,265 | 国の一級行政区分 |
| airport-comments.csv | 16,420 | 8 | 4,681,929 | 会員のコメント (本文に改行を含む) |

### airports.csv

列は `id`, `ident`, `type`, `name`, `latitude_deg`, `longitude_deg`, `elevation_ft`, `continent`, `iso_country`, `iso_region`, `municipality`, `scheduled_service`, `icao_code`, `iata_code`, `gps_code`, `local_code`, `home_link`, `wikipedia_link`, `keywords` の 19 列です。

- `id` は内部の整数で、空港のコードが変わっても変わりません。`ident` は URL に使う文字列で、ICAO コードがあればそれ、無ければ国内コードか、`JP-0001` のような国コードつきの番号です。
- `type` の内訳は、small_airport 42,793、heliport 23,242、closed 13,556、medium_airport 4,106、seaplane_base 1,273、large_airport 1,175、balloonport 63 です。
- `type` の定義 (地図の凡例) は、large_airport が「数百万人の旅客がある大手の定期便、または大きな軍の基地」、medium_airport が「地域の定期便、または一般航空や軍の定常的な運航」、small_airport が「定期便がほとんど無く、軽い一般航空の運航」です。
- `scheduled_service` は `yes` が 4,335 件、`no` が 81,873 件です。
- `elevation_ft` はフィート (メートルではない)、緯度経度は 10 進の度です。
- 欠損は空文字です。座標の欠損は 0 件、`elevation_ft` の欠損は 14,970 件、`municipality` は 4,767 件、`icao_code` を持つ行は 10,531 件、`iata_code` を持つ行は 9,051 件です。
- `iso_country` は ISO 3166-1 alpha-2 で、コソボの `XK` のような非公式のコードも使われます。`iso_region` は ISO 3166-2 を基本に、独自のコードも含みます。

### runways.csv

1 行が 1 つの離着陸面 (滑走路、ヘリパッド、水路) です。
`airport_ref` が airports.csv の `id`、`airport_ident` が `ident` を指します。
2026-10-06 版で、参照先の無い行は 0 件でした。

- `length_ft`、`width_ft` は長さと幅 (フィート)。長さは過走帯などを含む面全体の長さです。
- `surface` は路面の種類で、統制語彙ではありません。`ASP` (アスファルト) 11,390、`TURF` 7,487、`CON` (コンクリート) 3,675、`CONC` 3,102 のほか、`ASPH`、`Turf`、`Grass`、`Earth` などの表記の揺れがあり、異なる値は 668 種類です。空文字は 508 件です。
- `lighted` と `closed` は 1 と 0 です (airports.csv の `yes` と `no` とは表し方が違います)。閉鎖中の滑走路は 1,071 件です。
- `le_*` は番号の小さい側の端、`he_*` は大きい側の端の識別子、座標、標高、真方位、移設進入端の長さです。端の座標は約 3 分の 2 の行で空です (`le_latitude_deg` の空は 32,612 件)。

### そのほかの表

- airport-frequencies.csv: `type` (TWR、GND、ATIS、CTAF など、統制語彙ではない)、`description`、`frequency_mhz`。
- navaids.csv: `type` の内訳は NDB 6,609、VOR-DME 2,601、VORTAC 744、TACAN 442、VOR 308、DME 167、NDB-DME 137。周波数は `frequency_khz`。`associated_airport` で空港の `ident` に結びつきます (空は 3,634 件)。
- countries.csv と regions.csv: 国と一級行政区分の名前とコード、大陸、Wikipedia へのリンク。

### 国ごとの空港の表

`https://ourairports.com/countries/<国コード>/airports.csv` (と HXL タグつきの `airports.hxl`) は、全世界の airports.csv と列が違います。
`country_name`、`region_name`、`local_region`、`score`、`last_updated` の列が加わり、`scheduled_service` は `1` と `0` で表されます。
`last_updated` は行ごとの最終更新日時なので、行の新しさを見たいときはこちらを使います。
全世界の airports.csv には行ごとの更新日時の列がありません。

## 取り出し方

区分は split です。

全世界のファイルは、地域ではなく表の種類で 7 つに分かれています。
それぞれのファイルは whole で、2026-10-06 に `curl -r 0-1023` を送ると 206 で 1,024 バイトが返りましたが、CSV に索引が無いので、Range で国や範囲を選ぶことはできません。
いちばん大きい airports.csv でも約 12.7MB なので、全体を取ってから絞るのが現実的です。

空港の表だけは、国ごとのファイルがあります。
例えば南スーダン (`SS`) の `airports.csv` は 18,184 バイト、103 行で、全世界の airports.csv で `iso_country` が `SS` の行数と同じでした。
滑走路、周波数、航法援助施設には国ごとのファイルが見当たらず、全世界のファイルから空港の `id` で引くことになります。

認証は要りません。
GitHub Pages は `access-control-allow-origin: *` を返すので、ブラウザから直接読み込めます。
リポジトリを clone して取る方法もダウンロードページに書かれていて、コミットの履歴が過去の版の代わりになります。

## 使いどころ

人道支援の物流では、どこに飛行場があり、どのくらいの滑走路があるかを、国境をまたいで同じ形の表で引けることが役に立ちます。

- 支援物資や人員を空から運ぶ計画の下調べで、被災地や紛争地の近くにある飛行場の候補と、滑走路の長さ、路面、ICAO / IATA コード、標高を一覧にできます。
- About ページによると、国連人道問題調整事務所 (OCHA) は OurAirports のデータを HDX に載せています。2026-10-06 時点で HDX の「OurAirports」組織に 235 の国別データセットがあり、上の国別 CSV と HXL へリンクしています。
- 道路や人口のデータと組み合わせて、避難所や保健施設から最寄りの飛行場までの距離を見積もる下敷きになります。これは [[SDGs]] のターゲット 9.1 (地域や国境をまたぐインフラ) や、[[仙台防災枠組]] の備えの調べものに使えます。

使ってはいけない使い方、気をつける使い方があります。

- 運航の判断には使えません。サイト自身が「no guarantee of accuracy or fitness for use」と書いています。実際に離着陸できるか、どの機材が使えるか、いま開いているかは、各国の AIP、NOTAM、[[WFP]] の [[Logistics Cluster]] が出す現地の情報で確かめてください。
- 滑走路の情報は国によって薄いです。南スーダンでは、閉鎖とヘリポートを除いた 97 空港のうち runways.csv に行があるのは 5 空港だけでした。全世界でも small_airport 42,793 件のうち滑走路の行を持つのは 24,291 件です。「滑走路の行が無い」ことを「滑走路が無い」と読まないでください。
- `scheduled_service` は「現在、定期便がある」ことを表すとされていますが、更新は会員任せです。例えばウクライナは 2026-10-06 版で `yes` が 0 件で、空域の閉鎖が反映されたと読めますが、反映の時期は確かめていません。
- 件数の比較 (「この国には空港が何か所ある」) には向きません。網羅の度合いが国ごとに違い、ヘリポートと閉鎖済みが全体の 4 割を占めます。

## ライセンスと帰属表示

ダウンロードページ (https://ourairports.com/data/) の Terms of use は、データ全体をパブリックドメインとしています。

> All data is released to the Public Domain, and comes with no guarantee of accuracy or fitness for use.

同じページは、帰属表示を求めていないと書いています。

> We'd love you to give us credit, like we give credit to our sources, but you're not required to.

About ページにも「OurAirport's data, which is all in the Public Domain (no permission required)」とあります。

一方、GitHub リポジトリの `LICENSE` は [[The Unlicense]] で、GitHub の API も `"spdx_id": "Unlicense"` と返します。
本文は「This is free and unencumbered software released into the public domain.」で始まり、その後も「this software」についてだけ書いていて、データ (CSV) を名指ししていません。
パブリックドメインにするという点では同じですが、データを対象にした表明はサイトの Terms of use のほうです。
根拠を示すときは、ダウンロードページの文を引いてください。

ほかに 2 つの食い違いがあります。

- About ページの Credits は、FAA、DAFIF、navaid.com、Wikipedia などを出どころとして挙げています。これらから取り込んだ値まで、サイトの宣言どおりパブリックドメインとして扱えるかは、宣言のほかに根拠を確かめていません。
- HDX の「OurAirports」組織の 235 データセットのライセンス欄は揃っていません。2026-10-06 に API で数えると、Public Domain が 193、CC BY-IGO が 36、「Public Domain / No restrictions (CC0)」が 6 でした。中身はどれも同じ ourairports.com の国別 CSV へのリンクなので、配布元の Terms of use (パブリックドメイン) を基準にするのが筋だと考えますが、HDX 側の意図は確かめていません。

表示は必須ではありませんが、出どころを残すために次のように書くことを勧めます。

- Airport data: OurAirports (https://ourairports.com/), public domain

## 気をつけること

- 似た名前の [[OpenFlights 空港と航空路線]] とは別のデータです。OpenFlights は別の運営者による別のサイトで、ライセンスは [[ODbL-1.0]] (と Database Contents License) です。空港の表 `airports.dat` は 7,698 行で、GitHub での最後の変更は 2019-05-13 でした。OurAirports は 86,208 行で毎晩更新され、ライセンスもパブリックドメインです。取り違えると、件数、新しさ、帰属表示の義務のすべてが変わります。
- ダウンロードページの「last modified」は 7 ファイルとも同じ日付を表示しますが、これは GitHub Pages が配信物を作り直した時刻です。中身が最後に変わった日は、GitHub API の `commits?path=` で見ると、2026-10-06 時点で airports.csv と runways.csv が 2026-10-06、regions.csv が 2026-10-01、navaids.csv が 2026-07-30、countries.csv が 2025-02-28 でした。
- 版の番号はありません。同じ URL の中身が毎晩差し替わるので、結果を再現したいときは、取得した日のファイルを自分で保存するか、リポジトリのコミットを記録してください。
- 列の説明ページは `type` の値を `closed_airport` と書いていますが、実際の CSV の値は `closed` です。
- 座標の測地系は、説明ページに書かれていません。WGS 84 の緯度経度とみなすのが普通ですが、確かめていません。
- 単位はフィートです (標高、滑走路の長さと幅)。メートルに直すときは 0.3048 を掛けます。
- `gps_code` は国をまたいで一意とは限りません。結合の鍵には `id` (内部) か `ident` を使います。
- コードの正しさにはばらつきがあります。GitHub の Issue #49 (2026-06-23) で、IATA の公式の検索と突き合わせて 272 件が確認できなかったという報告がありますが、こちらでは再検証していません。
- `airport-comments.csv` の見出しは `id, "threadRef", ...` のようにカンマの後に空白があります。Python の csv モジュールでは `skipinitialspace=True` を付けないと列名に引用符が残ります。
- Excel でそのまま開くと UTF-8 の文字が化けます (ダウンロードページに回避方法が書かれています)。

## データ処理コマンド

2026-10-06 に、空のディレクトリで上から順に動かして確かめました (GDAL 3.x、Python 3 の標準ライブラリだけ)。

```bash
mkdir -p ./tmp && cd ./tmp

# 全世界の空港と滑走路を取る (ourairports.com の URL は GitHub Pages へ転送される)
curl -sSL -o airports.csv https://ourairports.com/data/airports.csv
curl -sSL -o runways.csv https://davidmegginson.github.io/ourairports-data/runways.csv

# 南スーダンの空港 (閉鎖とヘリポートを除く) と、開いている滑走路を並べる
python3 - <<'EOF'
import csv
air = {r["id"]: r for r in csv.DictReader(open("airports.csv", encoding="utf-8"))}
ss = {k: a for k, a in air.items()
      if a["iso_country"] == "SS" and a["type"] in ("small_airport", "medium_airport", "large_airport")}
print(len(ss), "airports in South Sudan (closed and heliports excluded)")
for r in csv.DictReader(open("runways.csv", encoding="utf-8")):
    a = ss.get(r["airport_ref"])
    if a and r["closed"] == "0":
        print(a["ident"], a["name"], r["length_ft"], r["surface"])
EOF

# 点のレイヤーとして GeoPackage にする (測地系は WGS 84 とみなして付けている)
ogr2ogr -f GPKG airports.gpkg airports.csv \
  -oo X_POSSIBLE_NAMES=longitude_deg -oo Y_POSSIBLE_NAMES=latitude_deg \
  -oo KEEP_GEOM_COLUMNS=NO -a_srs EPSG:4326 -nln airports
ogrinfo -so airports.gpkg airports

# 1 か国の空港だけを取る (行ごとの last_updated 列がある)
curl -sS -o ss.csv https://ourairports.com/countries/SS/airports.csv
```

2026-10-06 の実行では、南スーダンは 97 空港、開いている滑走路の行は Juba、Akobo、Paloich、Malakal、Wau の 5 本でした。
GeoPackage の地物数は 86,208 でした。

## 関連項目

- [[OurAirports]]
- [[OpenFlights 空港と航空路線]]
- [[GeoNames 地名]]
- [[Wikidata]]
- [[OpenStreetMap]]
- [[Humanitarian Data Exchange]]
- [[HXL]]
- [[DAFIF]]
- [[Logistics Cluster]]
- [[パブリックドメイン]]
- [[The Unlicense]]
- [[ODbL-1.0]]
- [[CSV]]

## 確認日

2026-10-06 に次のことを確かめました。

- 7 ファイルを GitHub Pages から取得し (合計 24,728,137 バイト)、行数、列、値の内訳、空の数を Python の csv モジュールで数えました。
- HEAD で `https://ourairports.com/data/airports.csv` が 301 で GitHub Pages へ転送されること、GitHub Pages が `accept-ranges: bytes` と `access-control-allow-origin: *` を返すこと、`curl -r 0-1023` に 206 が返ることを確かめました。
- ダウンロードページ、About ページ、列の説明ページ、地図の凡例、GitHub の README と LICENSE を読みました。ライセンスの引用はすべてこれらの原文です。
- GitHub API でリポジトリのライセンス (Unlicense) と、ファイルごとの最後のコミット日時を確かめました。
- 南スーダンの国別 CSV と HXL を取得し、列と行数を確かめました。
- HDX の CKAN API で、OurAirports 組織のデータセット数 (235) とライセンス欄の内訳を数えました。
- OpenFlights の `airports.dat` の行数 (7,698)、最後のコミット日 (2019-05-13)、ライセンスの記載 (ODbL) を確かめました。

確かめていないこと:

- 座標の測地系 (説明ページに記載が無い)。
- Credits に挙がった出どころから取り込んだ値の権利関係。
- HDX でライセンス欄が揃っていない理由。
- IATA コードの誤りの割合 (Issue #49 の報告を再検証していない)。
- 個々の空港の値が現地の実態と合っているか。
