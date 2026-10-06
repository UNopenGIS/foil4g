# OpenFlights 空港と航空路線

> [[OpenFlights]] が GitHub で配っている、全世界の空港、航空会社、航空路線、機材、国の 5 種類の表 (区切りがカンマのテキスト `.dat`)。路線は 2014 年 6 月、空港は 2019 年 5 月のコミットで止まった古いスナップショット

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | openflights |
| 提供元           | [[OpenFlights]] (openflights.org、GitHub の jpatokal/openflights) |
| 元データ         | 空港は [[OurAirports]] と [[DAFIF]] (2006 年 10 月サイクル) に利用者の追加と修正を加えたもの。路線は [[Airline Route Mapper]]、航空会社は Wikipedia の List of airlines、機材は Wikipedia の List of ICAO aircraft type designators から |
| ライセンス       | [[ODbL-1.0]] (データ)。個々の内容は Database Contents License。リポジトリ直下の AGPL-3.0 はウェブサイトのコードの条件 |
| 取り出し方       | whole。表ごとに 1 ファイルで、範囲や国で絞る手段は無い。最大の `routes.dat` でも約 2.4MB なので全体を取って手元で絞る |
| データ形式       | カンマ区切りのテキスト (拡張子 `.dat`、見出し行なし、UTF-8、欠損は `\N`) |
| 範囲             | 全世界。`airports.dat` は 237 の国と地域、`airports-extended.dat` は 241 |
| 期間             | 路線は 2014 年 6 月時点。空港は配布元の説明で 2017 年 1 月時点、GitHub のファイルの最終更新は 2019-05-13 |
| 解像度または単位 | 1 行 1 空港 (点、緯度経度の十進度)、1 行 1 路線 (航空会社、出発空港、到着空港の組) |
| 大きさ           | `.dat` 6 ファイルの合計 5,585,751 バイト。`routes.dat` 2,377,148、`airports-extended.dat` 1,670,162、`airports.dat` 1,127,225、`airlines.dat` 396,896、`planes.dat` 8,331、`countries.dat` 5,989 バイト |
| 更新頻度         | 実質的に止まっている。路線の供給元は 2014 年 6 月に更新をやめた。GitHub のデータファイルの最後の変更は `countries.dat` の 2020-01-31 |
| URL              | https://github.com/jpatokal/openflights/tree/master/data (生ファイルは https://raw.githubusercontent.com/jpatokal/openflights/master/data/ の下) |
| 説明ページ       | https://openflights.org/data.php |

## 概要

OpenFlights は、利用者が自分の搭乗記録を地図に描くためのウェブサイトです。
そのサイトが内部で持っている空港、航空会社、路線、機材、国の表を、GitHub に `.dat` ファイルとして置いています。

作り方は表ごとに違います。
空港は DAFIF (米国の Digital Aeronautical Flight Information File、2006 年 10 月サイクル) と [[OurAirports]] を土台に、EarthTools の時間帯情報を加え、夏時間の区分は手で付けたものです。
そこに OpenFlights の利用者が追加と修正を重ねています。
路線は Airline Route Mapper から取り込み、重複を除いて OpenFlights の空港 ID と航空会社 ID を付けたものです。
航空会社と機材は Wikipedia の一覧から抜き出したものです。

このデータは古く、もう更新されていません。
説明ページ自身が、空港を「As of January 2017」、路線を「As of June 2014」と書いています。
路線については次の警告があります。

> Warning: The third-party that OpenFlights uses for route data ceased providing updates in June 2014. The current data is of historical value only.

GitHub の更新履歴 (commits API でファイルごとに最後に中身が変わったコミット) もこれと合います。

| ファイル | 最後の変更 | コミットの見出し |
| --- | --- | --- |
| `airports.dat` | 2019-05-13 | Fix broken coordinates for some airports (#959) |
| `airports-extended.dat` | 2019-05-13 | 同上 |
| `routes.dat` | 2017-02-02 | Update data exports |
| `airlines.dat` | 2017-02-02 | Update data exports |
| `planes.dat` | 2019-05-07 | Update planes.dat |
| `countries.dat` | 2020-01-31 | Update and document countries.dat |

`routes.dat` の 2017-02-02 の変更は書き出し直しで、その前の中身の更新は 2014-08-06 の「Data refresh」です。
リポジトリ自体には 2026-09-21 にも push がありますが、それはウェブサイトのコードの修正です。
`data/` ディレクトリの最後のコミットも 2023-07-14 で、これは `.dat` ではなく PHP の修正です。

説明ページは「The GitHub copy is only a sporadically updated static snapshot of the live OpenFlights database」と書いています。
ウェブサイトの中の live database がどこまで更新されているかは確かめていません。

空港の土台は [[OurAirports]] です。
OurAirports は今も毎晩ファイルを書き出しており (2026-10-06 の HEAD で Last-Modified が同日)、空港の位置や種別が要るときは [[OurAirports 空港]] のほうが新しく、件数も多いです。
OpenFlights にしか無いのは路線の表です。

## 内容

どの表にも見出し行がありません。
文字列は二重引用符で囲まれ、空港名などにカンマを含むことがあります。
欠損は `\N` (MySQL の NULL 表記) です。

### airports.dat と airports-extended.dat (14 列)

`airports.dat` は 7,698 行で、type が airport かつ source が OurAirports の行だけを含みます。
`airports-extended.dat` は 12,668 行で、鉄道駅 1,332、フェリーターミナル 101、種別不明 1,320、種別が `\N` の 1,651 行と、利用者の未検証の投稿 (source が User) 3,307 行を含みます。
説明ページの「over 10,000 airports, train stations and ferry terminals」は extended のほうの数です。

| 列 | 名前 | 内容 |
| --- | --- | --- |
| 1 | Airport ID | OpenFlights の空港 ID (整数) |
| 2 | Name | 空港名 |
| 3 | City | 主な就航都市 |
| 4 | Country | 国または地域の名前 (英語名。ISO コードではない) |
| 5 | IATA | 3 文字の IATA コード。`airports.dat` で 1,626 行が `\N` |
| 6 | ICAO | 4 文字の ICAO コード |
| 7 | Latitude | 緯度 (十進度、南が負) |
| 8 | Longitude | 経度 (十進度、西が負) |
| 9 | Altitude | 標高 (フィート) |
| 10 | Timezone | UTC からの時差 (時間、小数あり) |
| 11 | DST | 夏時間の区分 E, A, S, O, Z, N, U |
| 12 | Tz database timezone | `Asia/Tokyo` のような tz 名。`airports.dat` で 1,021 行が `\N` |
| 13 | Type | airport, station, port, unknown |
| 14 | Source | OurAirports, Legacy (主に DAFIF), User (未検証の投稿) |

### routes.dat (9 列、67,663 行)

| 列 | 名前 | 内容 |
| --- | --- | --- |
| 1 | Airline | 航空会社の IATA 2 文字または ICAO 3 文字 |
| 2 | Airline ID | `airlines.dat` の ID |
| 3 | Source airport | 出発空港の IATA または ICAO |
| 4 | Source airport ID | `airports-extended.dat` の ID |
| 5 | Destination airport | 到着空港の IATA または ICAO |
| 6 | Destination airport ID | 同上 |
| 7 | Codeshare | 共同運航なら Y、そうでなければ空 (Y は 14,597 行) |
| 8 | Stops | 経由地の数 (0 が 67,652 行、1 が 11 行) |
| 9 | Equipment | 機材の IATA コード (空白区切りで複数) |

路線には向きがあり、A から B と B から A は別の行です。
便数、時刻、座席数は入っていません。
路線が実際に飛んでいるかどうかではなく、2014 年 6 月時点で航空会社がその区間を運航していたという記録です。

### airlines.dat (8 列、6,162 行)

ID、名前、別名、IATA、ICAO、コールサイン、国、運航中かどうか (Y が 1,255 行、N が 4,906 行) です。
説明ページは運航中の列を「not reliable」と書いています。

### planes.dat (3 列、246 行)

機材の名前、IATA コード、ICAO コードです。

### countries.dat (3 列、261 行)

国名、ISO 3166-1 の 2 文字コード、DAFIF の FIPS コードです。
空港と航空会社の表の国名から ISO コードを引くために使います。

## 取り出し方

区分は whole です。
表ごとに 1 ファイルで、国や範囲で分かれたファイルはなく、カタログや API もありません。
`raw.githubusercontent.com` は Range 要求に 206 を返しますが、テキストの中に索引が無いので、範囲を選んで読むことには使えません。
全部合わせても約 5.6MB なので、全体を取ってから手元で絞ります。
認証は要りません。

同じディレクトリに `DAFIFT_0610_ed6.zip` (24,400,351 バイト) と `airports-dafif.dat` (491,791 バイト) があります。
空港の土台にした 2006 年の DAFIF のアーカイブで、中身は確かめていません。

## 使いどころ

- 2014 年時点の国際航空網の分析。空港を節点、路線を辺とするグラフとして、どの都市が直行便で結ばれていたかを調べる材料になります。航空網を通じた感染症の広がりのモデルなどで、過去の研究の再現に使われています。
- SDG 9.1 (地域と国境を越えるインフラ) に関わる、空の接続性の過去の状態を示す参照として使えます。ただし指標 9.1.2 の旅客数や貨物量は入っていません。
- 航空会社の名前とコード、機材のコードを引く対照表として使えます。

使ってはいけない使い方もあります。

- 現在の運航状況の判断に使ってはいけません。路線は 2014 年 6 月のもので、その後に開設、休止、廃止された路線は反映されていません。人道支援の物資輸送や退避の計画で「今どこから飛べるか」を決める根拠にはなりません。
- 航法に使ってはいけません。説明ページが「This data is not suitable for navigation」と書いています。
- 空港の一覧や位置が要るときは、新しい [[OurAirports 空港]] を使います。

## ライセンスと帰属表示

リポジトリには 2 つのライセンスがあり、当たる対象が違います。

- リポジトリ直下の `LICENSE` は GNU Affero General Public License v3 (AGPL-3.0) で、GitHub もリポジトリのライセンスを AGPL-3.0 と表示します。リポジトリの中身の大半はウェブサイトの PHP と JavaScript です。
- `data/LICENSE` は別に置かれた ODC Open Database License (ODbL) の全文 (25,313 バイト) で、2019-04-18 に追加されました。

データの条件は ODbL です。
説明ページの Licensing の節は次のとおりです。

> The OpenFlights Airport, Airline, Plane and Route Databases are made available under the Open Database License. Any rights in individual contents of the database are licensed under the Database Contents License. In short, these mean that you are welcome to use the data as you wish, if and only if you both acknowledge the source and and license any derived works made available to the public with a free license as well.

AGPL がコードだけに当たると明文で書いた箇所は見つけていません。
データについては、`data/` に ODbL を置いていることと説明ページの上の文から、ODbL が当たると読みました。

ODbL には share-alike があり、派生したデータベースを公開するときは同じ条件が付きます。
パブリックドメインの [[OurAirports]] と組み合わせて配ると、組み合わせた先にも ODbL がかかります。

説明ページには、ほかに次の記述があります。

- 商用の利用について、別のライセンスを求めに応じて出す (書籍などへの画像の利用は 100 米ドルの定額) と書いています。
- 「Airport data derived OurAirports and DAFIF, as well as route data from Airline Route Mapper, is in the public domain. Airline and plane data derived from Wikipedia may be subject to the GNU Free Documentation License.」とも書いています。航空会社と機材の表には GFDL の条件が付く可能性があります。

求められる表示文の決まった形はありません。
少なくとも次を表示します。

- Airport, airline and route data: OpenFlights (https://openflights.org/data.php), Open Database License

## 気をつけること

- 古いデータです。路線は 2014 年 6 月、空港は 2019 年 5 月のコミットで止まっています。リポジトリの最終 push (2026-09-21) を鮮度と読むと間違えます。鮮度はファイルごとの更新履歴で見ます。
- 名前の似た [[OurAirports 空港]] と取り違えやすいです。古いのは OpenFlights のほうで、OurAirports は今も毎晩更新されています。
- 説明ページの件数と実際の行数が合いません。路線は説明で 3,321 空港と 548 航空会社ですが、`routes.dat` に出てくる空港コードは 3,425 種類、航空会社コードは 568 種類でした。航空会社は説明で「As of January 2012」に 5,888 件、ファイルは 6,162 行です。
- `routes.dat` の空港 ID は `airports-extended.dat` の ID です。`airports.dat` とだけ結合すると、476 行で出発か到着の空港が見つかりません。extended と結合すると、`\N` 以外は全部見つかりました。空港 ID が `\N` の行は出発 220 行、到着 221 行、航空会社 ID が `\N` の行は 479 行です。
- 座標に誤りが残っています。`airports.dat` に、緯度経度が (0, 0) の行 (Cape Town Waterfort Heliport) や、名前が「[Duplicate] ...」で緯度 89.5 の行があります。名前に「Duplicate」を含む行は 3 行でした。
- 夏時間の区分は、説明ページによると 2009 年を目安に国単位で付けた近似で、夏時間のある国の中の夏時間のない地域 (説明ページの例は「AL, HI in the USA, NT, QL in Australia, parts of Canada」) で誤っている空港が多いとされます。
- 国の列は英語の国名で、ISO コードではありません。`countries.dat` で引きます。
- 座標系は書かれていません。緯度経度の十進度で、WGS 84 として扱うのが普通ですが、配布元の明記は確かめていません。
- `data/README.md` によると、これは live data のスナップショットなので pull request は受け付けません。誤りの報告はウェブサイトか GitHub の issue へ、とされています。

## データ処理コマンド

2026-10-06 に動かして確かめたコマンドです。

```bash
mkdir -p ./tmp && cd ./tmp

# 空港と路線を取得する
curl -sSL -o airports.dat https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
curl -sSL -o routes.dat https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat

# 行数を数える (airports.dat 7698、routes.dat 67663)
wc -l airports.dat routes.dat

# 空港を GeoPackage の点にする (見出し行が無いので列名は field_1 から field_14)
ogr2ogr -f GPKG airports.gpkg CSV:airports.dat \
  -oo HEADERS=NO -oo X_POSSIBLE_NAMES=field_8 -oo Y_POSSIBLE_NAMES=field_7 \
  -a_srs EPSG:4326 -nln airports
ogrinfo -so airports.gpkg airports

# 日本の主な空港を引く
ogrinfo airports.gpkg -sql "SELECT field_2, field_5 FROM airports WHERE field_4='Japan' AND field_5 IN ('HND','NRT','KIX')"

# 羽田を出発する路線を数える (routes.dat には引用符が無いので awk で切れる。2014 年 6 月時点で 157 行)
awk -F, '$3=="HND"' routes.dat | wc -l
```

`AUTODETECT_TYPE=YES` を付けると、時差の列の `\N` で型の警告が出ます。
`airports.dat` は空港名にカンマを含むので、awk の `-F,` では正しく切れません。

## 関連項目

- [[OpenFlights]]
- [[OurAirports 空港]]
- [[OurAirports]]
- [[DAFIF]]
- [[Airline Route Mapper]]
- [[GeoNames 地名]]
- [[ODbL-1.0]]
- [[GeoPackage]]
- [[GDAL]]

## 確認日

2026-10-06 に次のことを確かめました。

- `data/` の `.dat` 6 ファイルと `README.md`、`LICENSE` を GitHub から取得し、行数、列数、値の分布、欠損の数を Python の標準ライブラリで数えました。
- `routes.dat` への HEAD で大きさを、Range 要求で 206 が返ることを確かめました。
- 説明ページ https://openflights.org/data.php を読み、列の定義、件数の時点、路線の警告、ライセンスの文言を確かめました。
- GitHub の commits API で、データファイルごとの最後の変更日と、リポジトリと `data/` ディレクトリの最後のコミットを確かめました。リポジトリのライセンス表示 (AGPL-3.0) と直下の `LICENSE` の冒頭も読みました。
- [[OurAirports]] の `airports.csv` の Last-Modified が 2026-10-06 であることを HEAD で確かめました。
- 上の「データ処理コマンド」を実行しました。

確かめられなかったこと:

- ウェブサイトの中の live database が 2019 年以降も更新されているか。
- AGPL-3.0 がコードだけに当たると明記した文言。
- `DAFIFT_0610_ed6.zip` と `airports-dafif.dat` の中身。
- 座標系の明記。
