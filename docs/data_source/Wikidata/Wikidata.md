---
title: Wikidata
id: wikidata
provider: [Wikimedia Foundation (運営), Wikidata の編集者 (内容)]
source_data: なし (一次データ。ただし各ステートメントは編集者が外部の資料から書き写したもので、出典 (reference) が付くものと付かないものがある)
license: [CC-BY-SA-4.0, CC0-1.0]
license_note: 構造化データ (main、Property、Lexeme、EntitySchema の名前空間) は CC0。それ以外の名前空間の文章は CC-BY-SA-4.0
access: catalog
access_note: catalog。SPARQL エンドポイントで、緯度経度の矩形 (`wikibase:box`)、点からの距離 (`wikibase:around`)、種類 (P31)、国 (P17)、行政区域 (P131) などで絞って必要な項目だけを取れる。ダンプは whole (全項目で 1 ファイル、範囲の索引が無い)
format: [SPARQL の結果 (JSON, XML, CSV, TSV), '項目ごとの JSON (`Special:EntityData`)', ダンプ (JSON, N-Triples, Turtle を gzip か bzip2 で圧縮)]
coverage: 全世界 (座標の多くは地球上。P625 は `globe` で月や火星などの天体も表せる)
period: 現在の状態。過去の状態は日付つきのダンプと各項目の編集履歴から得る。事物ごとの時期は、廃止 (P576) や開始・終了の修飾子で表される
resolution: 項目 (Q で始まる ID) 1 件。位置は代表点 1 つ (またはいくつか) で、境界は持たない
size: ダンプ全体 (latest-all.json.gz) 156,315,459,742 バイト、最良ランクだけのダンプ (latest-truthy.nt.bz2) 43,507,090,513 バイト。項目数 123,562,593 (MediaWiki API の統計)
update: 編集は随時。ダンプは 2 日から 3 日おきに作られる (種類ごとに作る日が違う)
url: https://query.wikidata.org/sparql (SPARQL)、https://dumps.wikimedia.org/wikidatawiki/entities/ (ダンプ)
docs: https://www.wikidata.org/wiki/Wikidata:Copyright、https://www.mediawiki.org/wiki/Wikidata_Query_Service/User_Manual
checked: 2026-10-06
---

# Wikidata

> [[Wikimedia Foundation]] が運営し、世界中の編集者が書いている構造化データの知識ベースで、座標 (P625) を持つ約 1,244 万件の項目を含む全世界の事物を、SPARQL の問い合わせと JSON や RDF のダンプで [[CC0]] で配っているもの

## 概要

Wikidata は、Wikipedia などの Wikimedia のプロジェクトが共有する構造化データの知識ベースです。
国、都市、山、川、空港、駅、国際機関、建物など、あらゆる事物が「項目」(Q42 のような ID) として 1 件ずつ記録されています。
項目には「ステートメント」が付きます。
ステートメントは「プロパティ」(P625 のような ID) と値の組で、出典、順位 (rank)、時期などの修飾子を持てます。

地理空間データとして使うときに主に見るプロパティは次のとおりです。

| プロパティ | 名前 (英語)                                        | 値の型           |
| ---------- | -------------------------------------------------- | ---------------- |
| P625       | coordinate location                                | 座標 (緯度、経度、精度、天体) |
| P17        | country                                            | 項目 (国)        |
| P131       | located in the administrative territorial entity   | 項目 (行政区域)  |
| P31        | instance of                                        | 項目 (種類)      |
| P576       | dissolved, abolished or demolished                 | 日時             |
| P1082      | population                                         | 数量             |
| P402       | OpenStreetMap relation ID                          | 外部 ID          |
| P1566      | GeoNames ID                                        | 外部 ID          |
| P2082      | M49 code                                           | 外部 ID (国連統計部の国・地域コード) |
| P298       | ISO 3166-1 alpha-3 code                            | 外部 ID          |

外部 ID は、[[OpenStreetMap]]、[[GeoNames 地名]]、国連の M49 などの別のデータと項目をつなぐ鍵として使えます。

データは観測や測量ではなく、編集者 (人と bot) が書き込んだものです。
出典の付いた値も多いですが、付いていない値もあり、同じ事物について値が複数あることもあります。
網羅の度合いは国や分野によって大きく違い、全数がそろっていることは保証されていません。

## 内容

2026-10-06 に MediaWiki API の統計を読むと、ページ数 129,346,705、項目数 (articles) 123,562,593、編集回数 2,553,206,066 でした。
SPARQL で `wdt:P625` (最良ランクの座標) の組を数えると 12,445,220 でした。
これは座標の数で、1 項目に座標が複数あると重複して数えるので、座標を持つ項目の数とは一致しません。

座標 (P625) の値は、JSON では次の形をしています (国連ジュネーブ事務局のパレ・デ・ナシオン、Q594846)。

```json
{"value":{"latitude":46.226563888889,"longitude":6.1404777777778,"altitude":null,"precision":null,"globe":"http://www.wikidata.org/entity/Q2"},"type":"globecoordinate"}
```

- `globe` の Q2 は地球です。
- `precision` は度の単位の精度ですが、この例のように空 (null) のこともあります。
- SPARQL では `Point(経度 緯度)` の WKT 文字列 (経度が先) で返ります。
- 値が無いことは、プロパティそのものが無いことで表されます。欠損を表す特別な値はありません (「値なし」(novalue) と「不明」(somevalue) という明示の指定はあります)。

国連の M49 コード (P2082) を持つ項目は、2026-10-06 に 283 件でした。
国だけでなく、world (001)、Africa (002)、sub-Saharan Africa (202) などの地域も入っています。
このうち 249 件に ISO 3166-1 alpha-3 (P298) が付いていて、world、Northern America、South-Central Asia、Latin America and the Caribbean の 4 件には座標がありません。
国の座標は代表点で、たとえば日本 (Q17) は `Point(136.0 35.0)` のような丸めた値です。

## 取り出し方

区分は catalog です。
SPARQL エンドポイント (`https://query.wikidata.org/sparql`) で、矩形、点からの距離、種類、国、行政区域などで絞って、必要な項目だけを取れます。
認証は要りませんが、User-Agent の方針 (下記) を守る必要があります。

2026-10-06 に、パレ・デ・ナシオンの周り (経度 6.135 から 6.145、緯度 46.222 から 46.230) を `wikibase:box` で絞り、国、行政区域、OSM の relation ID、GeoNames ID を付けて 10 行を求めると、200 で 6,824 バイトの JSON が返りました。
パレ・デ・ナシオン (Q594846、OSM relation 12126654)、国連ジュネーブ事務局 (Q680212)、世界知的所有権機関 (Q177773) などが入っていました。
P131 に値が 2 つある項目 (Genève-Sécheron 駅など) は 2 行に分かれて返るので、行数と項目数は一致しません。

問い合わせの制限は、Query Service の利用者マニュアルに次のように書かれています。

- 1 回の問い合わせは 60 秒で打ち切られる。
- 1 つのクライアント (User-Agent と IP の組) は、60 秒ごとに 60 秒分の処理時間まで。
- エラーになる問い合わせは 1 分に 30 回まで。超えると 429 が返り、無視し続けると一時的に締め出される。
- 1 つの IP から同時に 5 つまで。

座標を持つ項目は 1,200 万を超えるので、全部を 1 回の問い合わせで取ることはできません。
国や矩形で分けて何度も問い合わせるか、ダンプを使います。
どの大きさまでなら 60 秒に収まるかは、問い合わせの書き方によるので確かめていません。

### User-Agent の方針

Wikimedia の User-Agent の方針 (https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_User-Agent_Policy) は、スクリプトから使うときに、連絡先 (メールアドレス、ウェブサイト、または wiki の利用者名) を含む説明的な User-Agent を送るよう求めています。
`curl` や `python-requests` のような既定の値やブラウザの User-Agent の流用は、予告なく遮断されることがあると書かれています。
形式の例は `CoolBot/0.0 (https://example.org/coolbot/; coolbot@example.org) generic-library/0.0` です。
既定の User-Agent で実際に遮断されるかどうかは、方針に反するので試していません。

### 主グラフと学術論文グラフ

2025-05-09 から、Query Service は 2 つに分かれています。
`query.wikidata.org` は「main graph」で、学術論文 (P31 が scholarly article (Q13442814) の項目など) は `query-scholarly.wikidata.org` に移されました。
地理空間の問い合わせのほとんどは main graph で足りますが、論文と場所を結ぶ問い合わせにはフェデレーションが要ります。

### 1 項目だけを取る

1 項目のすべてのステートメントは `https://www.wikidata.org/wiki/Special:EntityData/Q594846.json` で取れます。
パレ・デ・ナシオンは 36,227 バイトでした (34 種類のプロパティ)。
項目によっては数百 KB になるので、数万件を 1 件ずつ取るのには向きません。

### ダンプ (whole)

ダンプは `https://dumps.wikimedia.org/wikidatawiki/entities/` にあり、2026-10-06 時点で 2026-08-19 から 2026-10-02 までの 20 の日付ディレクトリと、それぞれの最新への `latest-*` が並んでいます。

| ファイル                 | バイト数          | 作られた日 |
| ------------------------ | ----------------: | ---------- |
| latest-all.json.gz       | 156,315,459,742   | 2026-09-29 |
| latest-all.json.bz2      | 103,272,886,026   | 2026-09-29 |
| latest-all.ttl.bz2       | 125,700,757,252   | 2026-09-30 |
| latest-all.nt.bz2        | 196,115,691,447   | 2026-09-30 |
| latest-truthy.nt.bz2     | 43,507,090,513    | 2026-10-02 |
| latest-truthy.nt.gz      | 71,640,460,978    | 2026-10-02 |
| latest-lexemes.json.gz   | 650,549,696       | 2026-09-30 |

`truthy` は各プロパティの最良ランクの値だけを、出典や修飾子を除いて並べたものです。
座標と外部 ID だけが要るなら、こちらで足ります。

日付ディレクトリごとに中身が違います。
`20260928/` には all の JSON と RDF (RDF は `20260929-all-BETA` という名前)、`20260930/` には truthy と lexemes の JSON、`20261002/` には lexemes の RDF だけがありました。
all が週に 1 回作られるのかどうかは、ほかの週を確かめていません。
`latest-*` はファイルごとに作られた日が違うので、同じ時点にそろえたいときは日付ディレクトリのファイルを使います。

サーバーは Range 要求に 206 を返します (latest-truthy.nt.bz2 の先頭 1,024 バイトで確かめました)。
ただし範囲の索引が無いので、途中の任意の位置から特定の地域や項目だけを読むことはできません。
先頭から順に読むことはできます。
latest-all.json.gz の先頭 65,536 バイトを展開すると、`[` の行のあとに 1 行 1 項目の JSON (最初はベルギー、Q31) が続いていました。
地域を絞るには、ファイル全体を順に読んで P625 で選り分ける必要があります。

## 使いどころ

- SDG 17 (ターゲット 17.18、データの入手可能性) に関わる作業で、国や地域の名前を M49 コード (P2082) や ISO 3166 コードと多言語のラベルで対応づける辞書として使えます。国連の統計と、名前で書かれた現地のデータを結ぶときの手がかりになります。
- 人道支援や防災で、病院、学校、空港、橋、ダムなどの位置を、国や行政区域 (P17、P131) や種類 (P31) で絞って素早く一覧にできます。OSM の relation ID (P402) や GeoNames ID (P1566) で、[[OpenStreetMap]] や [[GeoNames 地名]] の同じ事物と突き合わせられます。
- 地名の多言語のラベルと別名を、ジオコーディングや地図の注記の翻訳に使えます。
- 人口 (P1082) などの数値は、出典と時点を修飾子で確かめたうえで、参考値として使えます。

使ってはいけない使い方もあります。

- 境界や面積の計算には使えません。P625 は代表点で、国や行政区域の形は持っていません。
- 網羅していることを前提にした集計 (ある国の病院の総数など) には使えません。登録の度合いは国と分野で大きく違います。
- 公式の統計値の代わりにはなりません。数値は編集者が書き写したもので、出典が付いていても誤りがあります。

## ライセンスと帰属表示

Wikidata の著作権のページ (https://www.wikidata.org/wiki/Wikidata:Copyright) は次のように書いています。

> All structured data from the main, Property, Lexeme, and EntitySchema namespaces is available under the Creative Commons CC0 License; text in the other namespaces is available under the Creative Commons Attribution-ShareAlike License; additional terms may apply.

つまり、項目 (main) とプロパティのステートメント、ラベル、説明は [[CC0]] で、帰属表示を求められません。
`Wikidata:` や `Help:` などの名前空間の文章 (方針や解説のページ) は CC BY-SA で、使うなら帰属表示と同じ条件での公開が要ります。
SPARQL やダンプで取る項目のデータは CC0 の側です。

文書によって書き方が少し違います。

- MediaWiki API (`meta=siteinfo&siprop=rightsinfo`) が返す文は「main and property namespace」だけを挙げ、Lexeme と EntitySchema を挙げていません。
- 著作権のページは CC BY-SA の版を 3.0 のページへリンクしていますが、ライセンスの解説のページ (Wikidata:Licensing) とダンプのライセンスのページ (https://dumps.wikimedia.org/legal.html) は 4.0 と書いています。

帰属表示は求められていませんが、出典を示すなら次のように書けます。

- Wikidata (https://www.wikidata.org/)、CC0。取得日と、使った問い合わせかダンプの日付を添える。

ダンプのライセンスのページは、ダンプに著作権の侵害が残っている可能性があり、利用は自己責任だと書いています。
Wikidata のライセンスの解説のページは、CC0 以外の条件を主張されているデータは取り込まないようにしているとしていますが、取り込まれたデータすべての権利関係を保証してはいません。

## 気をつけること

- 種類 (P31) で引くと、廃止されたものも返ります。現在の事物だけが要るなら、廃止 (P576) を持つ項目を除くか、件数を既知の値と突き合わせます。
- 国や地域の座標は、たとえば日本の `Point(136.0 35.0)` のように粗い代表点です。地図上の位置合わせには使えません。
- SPARQL の WKT は経度が先 (`Point(経度 緯度)`)、JSON は `latitude` と `longitude` の名前つきです。取り違えると位置がずれます。
- `wdt:` は最良ランクの値だけを返します。順位の低い値や出典が要るときは `p:` と `ps:` を使います。
- ラベルと別名 (alias) は別物です。名前を引くときは `rdfs:label` と `skos:altLabel` を混ぜないように注意します。
- M49 コードには、Johnston Atoll (396) のように座標が 2 つある項目があり、座標を付けると 1 件が 2 行になります。
- `query.wikidata.org` は 2025-05-09 から学術論文を含まないので、それより前の件数や問い合わせの例とは結果が違うことがあります。
- 結果は 5 分間キャッシュされることがあります (応答に `cache-control: public, max-age=300`)。編集の直後に同じ問い合わせを投げても反映されていないことがあります。

## データ処理コマンド

```bash
# User-Agent に連絡先を入れる (方針で求められている)
UA="your-tool/0.1 (https://example.org/your-tool; you@example.org)"
mkdir -p ./tmp

# 矩形で絞る (パレ・デ・ナシオンの周り、10 行まで)
cat > ./tmp/box.rq <<'EOF'
SELECT ?item ?itemLabel ?coord ?countryLabel ?adminLabel ?osm ?geonames WHERE {
  SERVICE wikibase:box {
    ?item wdt:P625 ?coord .
    bd:serviceParam wikibase:cornerSouthWest "Point(6.135 46.222)"^^geo:wktLiteral .
    bd:serviceParam wikibase:cornerNorthEast "Point(6.145 46.230)"^^geo:wktLiteral .
  }
  OPTIONAL { ?item wdt:P17 ?country . }
  OPTIONAL { ?item wdt:P131 ?admin . }
  OPTIONAL { ?item wdt:P402 ?osm . }
  OPTIONAL { ?item wdt:P1566 ?geonames . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
} LIMIT 10
EOF
curl -s -m 60 -A "$UA" -H 'Accept: application/sparql-results+json' \
  --data-urlencode query@./tmp/box.rq https://query.wikidata.org/sparql -o ./tmp/box.json
jq -r '.results.bindings[] | [(.item.value|sub(".*/";"")), .itemLabel.value, .coord.value] | @tsv' ./tmp/box.json

# 国連の M49 コードを持つ項目の一覧
curl -s -m 60 -A "$UA" -H 'Accept: application/sparql-results+json' \
  --data-urlencode 'query=SELECT ?item ?itemLabel ?m49 ?iso3 ?coord WHERE { ?item wdt:P2082 ?m49 . OPTIONAL { ?item wdt:P298 ?iso3 . } OPTIONAL { ?item wdt:P625 ?coord . } SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } }' \
  https://query.wikidata.org/sparql -o ./tmp/m49.json
jq '[.results.bindings[].item.value] | unique | length' ./tmp/m49.json

# 1 項目のすべてのステートメントを取り、座標を見る
curl -s -m 60 -A "$UA" -o ./tmp/Q594846.json https://www.wikidata.org/wiki/Special:EntityData/Q594846.json
jq -c '.entities.Q594846.claims.P625[0].mainsnak.datavalue' ./tmp/Q594846.json

# ダンプの大きさと更新日を確かめる (ダウンロードしない)
curl -sIL -m 60 -A "$UA" https://dumps.wikimedia.org/wikidatawiki/entities/latest-truthy.nt.bz2

# ダンプの先頭だけを読む (64KB、最初の項目は Q31)
# gzip は複数のメンバーをつないだ形で、最初のメンバーは "[" の行だけなので、2 つ目まで展開する
curl -s -m 60 -A "$UA" -r 0-65535 -o ./tmp/head.json.gz https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz
python3 -c '
import zlib, sys
b = open(sys.argv[1], "rb").read()
out = b""
while b:
    d = zlib.decompressobj(16 + zlib.MAX_WBITS)
    out += d.decompress(b)
    if not d.eof:
        break
    b = d.unused_data
print(out[:200])
' ./tmp/head.json.gz
```

## 関連項目

- [[Wikimedia Foundation]]
- [[OpenStreetMap]]
- [[GeoNames 地名]]
- [[M49]]
- [[SPARQL]]
- [[CC0]]
- [[CC-BY-SA-4.0]]
- [[地名辞典]]
- [[オープンデータ]]

## 確認日

2026-10-06 に次のことを確かめました。

- MediaWiki API (`meta=siteinfo`) でライセンスの文と統計 (項目数など)、`wbgetentities` でプロパティの名前と型。
- `Wikidata:Copyright` と `Wikidata:Licensing` のページの原文、ダンプのライセンスのページ。
- Wikimedia の User-Agent の方針、Query Service の利用者マニュアル (制限)、graph split の説明ページ。
- SPARQL は 3 回投げました (パレ・デ・ナシオン周りの矩形、M49 コードの一覧、`wdt:P625` の数)。どれも 200 で、User-Agent には連絡先としてウェブサイトの URL を入れました。
- ダンプの索引と日付ディレクトリ 3 つ (20260928、20260930、20261002) の一覧、latest-truthy.nt.bz2 への HEAD と Range 要求 (206)、latest-all.json.gz の先頭 64KB の展開。
- `Special:EntityData/Q594846.json` の取得。

上のコマンドは、`UA` に自分の連絡先を入れた形で実行しました (ダンプのファイル全体はダウンロードしていません)。
SPARQL の 2 つは、問い合わせの回数を増やさないよう、同じ問い合わせ文を 1 回ずつ投げた結果で確かめました (M49 の問い合わせはファイルに書いて `--data-urlencode query@` で渡しました)。
確かめていないことは、既定の User-Agent で実際に遮断されるかどうか、all のダンプが作られる周期、60 秒に収まる問い合わせの大きさ、座標を持つ項目の正確な数 (座標の数ではなく) です。
