---
id: usgs_earthquakes
provider: USGS Earthquake Hazards Program (National Earthquake Information Center ほか)
source_data: なし (一次データ)。ただし震源の値の一部は、USGS 以外の地域観測網 (Alaska Earthquake Center など) が寄与したもの
license: [public-domain]
license_note: USGS が作ったデータは米国のパブリックドメイン (USGS の方針ページ)。USGS 以外の観測網が寄与した値の扱いは明記なし (下のライセンスの節を参照)
access: catalog
access_note: catalog。FDSN イベント API で期間、矩形 (bbox) または円、規模、深さ、寄与者で絞れる。1 回 20,000 件まで。リアルタイムのフィードは split (規模 5 種 × 期間 4 種の 20 本) で、各ファイルは whole (Range は効かない)
format: API は GeoJSON、CSV、QuakeML (XML)、KML、テキスト。フィードは GeoJSON (ほかに ATOM、KML、CSV、QuakeML もある)
coverage: 全世界 (米国とその周辺は小さな地震まで入る。米国外は大きめの地震が中心と見られるが、閾値は確かめていない)
period: API では 1568 年の記録から現在まで。フィードは直近 1 時間、1 日、7 日、30 日
resolution: 1 件 1 地震 (震源の点。経度、緯度、深さ km)
size: フィード `all_month.geojson` 7,484,948 バイト (10,535 件)、`4.5_month.geojson` 359,761 バイト (515 件、gzip 転送で 43,865 バイト)。API で 2026 年 1 月の全件を GeoJSON で引くと 9,351,282 バイト (13,070 件)。いずれも 2026-10-06 の値
update: フィードは毎分 (説明ページに「Updated every minute.」)。API は問い合わせた時点の値を返し、過去の地震の値も後から改訂される
url: API https://earthquake.usgs.gov/fdsnws/event/1/ 、フィード https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/
docs: https://earthquake.usgs.gov/fdsnws/event/1/ (API)、https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php (フィード)、https://earthquake.usgs.gov/data/comcat/ (ComCat)
checked: 2026-10-06
---

# USGS 地震カタログ

> 米国地質調査所 ([[USGS]]) が、世界の観測網から集めた地震の震源一覧 ([[ANSS Comprehensive Earthquake Catalog]]、ComCat) を、期間・範囲・規模で絞れる検索 API と、直近の地震を規模と期間ごとにまとめたリアルタイムの [[GeoJSON]] フィードで配っているもの

## 概要

ComCat は、米国の Advanced National Seismic System (ANSS) の総合地震カタログです。
ComCat のページは「earthquake source parameters and related products contributed by seismic networks around the world」を収めたものと説明しています。
USGS の National Earthquake Information Center (`us`) が世界の地震を決めるほか、米国内の地域観測網 (アラスカ `ak`、北カリフォルニア `nc`、南カリフォルニア `ci`、ハワイ `hv`、プエルトリコ `pr` など) や津波警報センター (`at`、`pt`) が自分の地域の震源を送っています。
同じ地震に複数の寄与者が解を出したときは、そのうちの 1 つが優先解として選ばれ、API とフィードには既定でその優先解が出ます。

震源は地震計の観測から決めた推定値です。
速報の段階では自動決定 (`status` が `automatic`) で、後から解析者が見直すと `reviewed` になります。
`reviewed` になった後でも、マグニチュードや位置は改訂されます。
同じ期間を時期を変えて引き直すと、件数も値も変わります。

マグニチュードの種類 (`magType`) は寄与者と規模によって違い、1 つの列に `ml`、`md`、`mb`、`mww` などが混ざっています。
検出できる最小の規模は地域の観測網の密度で決まるため、米国内では M1 未満まで入っていますが、米国外の小さな地震はほとんど入っていません。
カタログの網羅性は地域と時代で大きく違います。
1568 年のような古い記録は歴史資料から推定した地震 (`ushis` など) で、深さが空のものもあります。

## 内容

API とフィードの GeoJSON は、どちらも同じ形の FeatureCollection です。
`metadata` に `generated` (生成時刻、ミリ秒のエポック)、`url`、`title`、`api` (2026-10-06 は `2.7.0`)、`count`、`status` があり、`bbox` は経度、緯度、深さの最小と最大の 6 つです。

地物はすべて Point で、座標は経度、緯度、深さ (km) です。
深さは負の値 (海面より上) もあります (`all_month` で最小 -3.43)。
属性は次の 26 個です。

- 規模: `mag`、`magType`
- 時刻: `time` (発生時刻)、`updated` (最終更新時刻)。どちらもミリ秒の UNIX エポック (UTC)
- 場所の文字列: `place` (「11 km SW of Borrego Springs, CA」のような、近くの地名からの方位と距離)、`title`
- 識別: `net` (優先解の寄与者)、`code`、`ids` (別名の ID をカンマで囲んで並べた文字列)、`sources` (解を出した寄与者)、`types` (付いている成果物の種類)。地物の `id` はイベント ID (例 `us6000tzus`)
- 被害と影響: `felt` (「Did You Feel It?」の報告数)、`cdi`、`mmi` (震度階)、`alert` (PAGER の警報 green / yellow / orange / red)、`tsunami` (0 か 1)、`sig` (USGS が付けた重要度の数値)
- 決定精度: `nst` (観測点数)、`dmin` (最寄り観測点までの角距離、度)、`rms` (秒)、`gap` (方位の空き、度)
- 種別: `type` (`earthquake` のほか `quarry blast`、`explosion`、`ice quake` など)、`status` (`automatic` か `reviewed`)
- その他: `url` (イベントページ)、`detail` (詳細の GeoJSON)、`tz` (2026-10-06 に取ったファイルでは全件 null)

欠損は null です。
`all_month` (10,535 件) では `felt` と `cdi` が 10,083 件、`mmi` が 10,374 件、`alert` が 10,490 件 null でした。

CSV で引くと列は 22 個で、GeoJSON に無い `horizontalError`、`depthError`、`magError`、`magNst`、`locationSource`、`magSource` があります。

2026-10-06 に取ったフィードの中身は次のとおりです。

| フィード | 件数 | 期間 (発生時刻) | 優先解の寄与者 |
| --- | ---: | --- | --- |
| `all_month` | 10,535 | 2026-09-06 06:12 から 2026-10-06 06:05 UTC | `ak` 2,350、`nc` 1,672、`ci` 1,525、`us` 1,106、`av` 900 ほか |
| `4.5_month` | 515 | 2026-09-06 06:41 から 2026-10-06 04:40 UTC | `us` 513、`nc` 1、`pr` 1 |
| `significant_month` | 6 | 直近 30 日 | |

`all_month` の `mag` は -1.22 から 6.6、`status` は `reviewed` 8,732、`automatic` 1,803、`type` は `earthquake` 10,323、それ以外 212 でした。
`all_month` のうち、優先解が USGS (`us`) 以外のものは約 9 割 (9,429 件) です。

## 取り出し方

### FDSN イベント API (catalog)

https://earthquake.usgs.gov/fdsnws/event/1/ は FDSN Event Web Service の仕様に沿った検索 API で、認証は要りません。
次の条件で絞れます。

- 期間: `starttime`、`endtime` (ISO 8601、既定は UTC)、`updatedafter`
- 範囲: 矩形 (`minlatitude`、`maxlatitude`、`minlongitude`、`maxlongitude`。日付変更線をまたぐときは経度を -180 未満か 180 超にする) または円 (`latitude`、`longitude`、`maxradius` か `maxradiuskm`)
- 規模と深さ: `minmagnitude`、`maxmagnitude`、`mindepth`、`maxdepth`
- 寄与者とカタログ: `contributor`、`catalog`
- その他: `eventtype`、`limit`、`offset`、`orderby`、`eventid`

`count` メソッドで件数だけを先に聞けます。
2026-10-06 に試した結果です。

| 照会 | 応答 |
| --- | --- |
| 2025 年の 1 年間、M4.5 以上、全世界 | `{"count":8558,"maxAllowed":20000}` |
| 同じ条件に緯度 20 から 50、経度 120 から 155 を足す | `{"count":788,"maxAllowed":20000}` |
| 同じ範囲で M6 以上を `query` で取得 | 16 件、13,789 バイト |
| 2026 年 1 月の全件 (規模の条件なし) | 13,070 件、9,351,282 バイト |
| 2026 年 1 月から 2 月の全件 | 400 Bad Request (「23375 matching events exceeds search limit of 20000」) |

1 回の照会は 20,000 件までで、超えると 400 が返ります。
大きな期間は、`count` で件数を確かめてから期間を分けて引きます。
`application.json` で、`contributor` に使える値 (2026-10-06 に 29 個) と `catalog` に使える値 (62 個) の一覧が取れます。

返るのは問い合わせた時点の値で、版を固定して引く手段はありません。
引いた日時を控えておきます。
説明ページは、地震の表示を目的とする自動化されたアプリケーションには、この API よりもリアルタイムのフィードを使うよう求めています。

### リアルタイムの GeoJSON フィード (split / whole)

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/ の下に、規模 5 種 (`significant`、`4.5`、`2.5`、`1.0`、`all`) と期間 4 種 (`hour`、`day`、`week`、`month`) の組で 20 本のファイルがあります (例 `4.5_month.geojson`)。
説明ページ (geojson.php) からリンクされている 20 本を確かめました。
分割の単位はこの組だけで、範囲や任意の期間では選べません。

各ファイルは whole です。
`4.5_month.geojson` に HEAD を送ると 200 で、`Content-Length` も `Accept-Ranges` もありませんでした。
`-r 0-1023` を付けても 206 ではなく 200 で全体 (359,761 バイト) が返りました。
いちばん大きい `all_month.geojson` でも約 7.5MB なので、丸ごと取得します。
応答は `Cache-Control: public, max-age=60` と `Access-Control-Allow-Origin: *` を持ち、ブラウザから直接読めます。

`significant` は規模の閾値ではありません。
2026-10-06 の `significant_month` には M4.15 や M4.7 の地震も入っていて、6 件の `sig` はどれも 619 以上でした (閾値の定義は確かめていません)。

フィードは同じ URL の中身を毎分差し替えます。
過去のある時点のフィードを USGS から取り直すことはできません。

## 使いどころ

- 防災と減災 ([[SDGs]] ターゲット 1.5、11.5、13.1、[[仙台防災枠組]]): 地域ごとの地震の起こりやすさや深さの分布を調べ、ハザードの説明や訓練の想定に使えます。
- 人道支援: 大きな地震の直後に `significant` や `4.5_day` のフィードで震央、規模、`alert` (PAGER の警報) を確かめ、人口データ ([[WorldPop]] など) と重ねて影響を受けそうな地域の見当を付けられます。
- 地図とダッシュボード: フィードは CORS を許可した小さな GeoJSON なので、[[MapLibre GL JS]] などでそのまま表示できます。
- 研究と教育: API で期間と範囲を絞って、プレート境界との関係、余震の減り方、深さの断面などを調べられます。

使ってはいけない使い方もあります。

- このデータは地震の予知や予測ではありません。将来の地震の場所や時期を示すものとして扱わないでください。
- フィードの `alert` や `place` を、被害の確定値や公式の被害報告として扱わないでください。被害の確認は各国政府や [[ReliefWeb]] などの報告で行います。
- 米国外の小さな地震はほとんど入っていないので、国どうしの地震の数をそのまま比べると、観測網の差を地震活動の差と取り違えます。
- 津波の警報には使えません。警報の発表は各国の津波警報機関が行います。`tsunami` の値の正確な意味は確かめていません。

## ライセンスと帰属表示

USGS の方針ページ「Copyrights and Credits」(https://www.usgs.gov/information-policies-and-instructions/copyrights-and-credits) は次のように書いています。

> USGS-authored or produced data and information are considered to be in the U.S. Public Domain.

同じ方針ページと「Acknowledging or Crediting USGS」(https://www.usgs.gov/information-policies-and-instructions/acknowledging-or-crediting-usgs) は、表示を義務ではなく依頼として求めています。

> When using information from USGS information products, publications, or websites, we ask that proper credit be given.

表示の例は次のとおりです。

- Credit: U.S. Geological Survey
- (データ名) courtesy of the U.S. Geological Survey

ComCat を引用するときは、References ページ (https://earthquake.usgs.gov/data/catalog/references.php) にある次の文献と DOI を使います。

- U.S. Geological Survey, 2017, Advanced National Seismic System (ANSS) Comprehensive Catalog of Earthquake Events and Products. https://doi.org/10.5066/F7MS3QZH

DataCite のこの DOI のメタデータでは、ライセンスの欄 (`rightsList`) は空です。

USGS 以外の観測網が寄与した値の条件は、はっきりしません。
方針ページがパブリックドメインとしているのは「USGS-authored or produced」のデータで、寄与分を含むとも含まないとも書いていません。
寄与者の一覧ページ (https://earthquake.usgs.gov/data/catalog/contributors/) と Alaska Earthquake Center (`ak`) のページには、ライセンスや利用条件の記述がありませんでした。
寄与者の多くは米国の大学や州と USGS の共同の観測網ですが、米国外の機関も一覧に載っています。
寄与者の解が優先解になっている地震 (`net` が `us` 以外) を再配布するときは、`net` と `sources` を残し、必要なら各観測網の利用条件を確かめてください (各観測網のサイトの利用条件は確かめていません)。

方針ページは、USGS 以外の写真や図には著作権があるものがあると書いています。
API とフィードに入っているのは数値、地名の文字列、USGS の URL だけです。
イベントページに載る写真や図を使うときは、別に確かめてください。

## 気をつけること

- 値は後から変わります。調査メモの記録では、2025-09-22 に取った `4.5_month` の 601 件を約 1 年後に API で引き直すと、119 件のマグニチュードが変わり、22 件は 4.5 未満に下がって同じ条件では出てこなくなり、新たに 195 件が加わっていました。速報のフィードを確定したカタログとして使わないでください。
- マグニチュードの種類が混ざっています。`mb` と `mww` と `ml` を同じ尺度として比べないでください。`magnitudetype` で 1 種類に絞って引くこともできます。
- `significant` は規模の閾値ではなく、`sig` などから USGS が選んだものです。
- `type` には地震以外 (採石の発破、爆発、氷震、地すべり) も入っています。地震だけが要るときは `eventtype=earthquake` で絞るか、`type` で除きます。
- 時刻はミリ秒のエポック (UTC) です。秒として読むと年が大きくずれます。
- `ids` と `sources` は前後にカンマが付いた文字列 (`,us6000tzus,`) です。
- 削除された地震は既定では返りません (`includedeleted` で取れます)。API の説明ページには、削除された地震は既定で 409 Conflict を返すとあります。
- フィードの説明ページがリンクしている「Feed Life Cycle Policy」(https://earthquake.usgs.gov/earthquakes/feed/policy.php) は 2026-10-06 に 404 で、フィードの保存や廃止の方針は確かめていません。
- 日本周辺の地震は、気象庁の一元化震源とは別のカタログです。このカードでは両者を突き合わせていません。

## データ処理コマンド

2026-10-06 に動かして確かめたコマンドです。

```bash
mkdir -p ./tmp

# フィード: Range が効かないことを確かめる (206 ではなく 200 と全体の大きさが返る)
curl -s -r 0-1023 -o ./tmp/r.bin -w "%{http_code} %{size_download}\n" \
  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson

# フィード: 直近 30 日の M4.5 以上を丸ごと取る
curl -s -o ./tmp/4.5_month.geojson \
  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson

# API: 件数だけを先に聞く (2025 年、日本周辺、M4.5 以上)
curl -s "https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson&starttime=2025-01-01&endtime=2026-01-01&minmagnitude=4.5&minlatitude=20&maxlatitude=50&minlongitude=120&maxlongitude=155"

# API: 同じ範囲の M6 以上を GeoJSON で取る
curl -s -o ./tmp/q.geojson "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-01-01&endtime=2026-01-01&minmagnitude=6&minlatitude=20&maxlatitude=50&minlongitude=120&maxlongitude=155&orderby=time-asc"

# API: CSV で古い順に 3 件だけ見る
curl -s "https://earthquake.usgs.gov/fdsnws/event/1/query?format=csv&starttime=1500-01-01&endtime=1800-01-01&orderby=time-asc&limit=3"

# 使える寄与者とカタログの値
curl -s https://earthquake.usgs.gov/fdsnws/event/1/application.json | jq '.contributors, .catalogs | length'

# 件数、時刻の範囲、寄与者の内訳を見る
python3 - ./tmp/4.5_month.geojson <<'EOF'
import json, sys, collections, datetime
d = json.load(open(sys.argv[1]))
f = d["features"]
ts = lambda v: datetime.datetime.fromtimestamp(v / 1000, datetime.timezone.utc).isoformat()
t = [x["properties"]["time"] for x in f]
print(d["metadata"]["title"], len(f), ts(min(t)), ts(max(t)))
print(collections.Counter(x["properties"]["net"] for x in f).most_common())
print(collections.Counter(x["properties"]["magType"] for x in f).most_common())
EOF
```

最後の 3 つ (jq、Python) も、この形のまま動かしました。

## 関連項目

- [[USGS]]
- [[ANSS Comprehensive Earthquake Catalog]]
- [[FDSN]]
- [[GeoJSON]]
- [[QuakeML]]
- [[地震]]
- [[防災]]
- [[仙台防災枠組]]
- [[SDGs]]
- [[WorldPop]]
- [[ReliefWeb]]
- [[MapLibre GL JS]]
- [[パブリックドメイン]]

## 確認日

2026-10-06 に次を確かめました。

- フィード: `4.5_month.geojson` への HEAD、Range 要求 (200 で全体が返る)、gzip 転送の大きさ。`4.5_month`、`all_month`、`significant_month` を取得して件数と属性を数えました。geojson.php から 20 本のリンクを読み取りました。
- API: `version` (2.7.0)、`count` を 3 回、`query` を 3 回 (うち 1 回は 20,000 件を超えて 400)、`application.json`、説明ページの読み取り。
- ComCat、References、寄与者の一覧、`ak` の寄与者ページの読み取りと、DataCite での DOI のメタデータ。
- フィードの Life Cycle Policy のページは 404 でした。

確かめられなかったこと:

- usgs.gov の方針ページ 2 つ (Copyrights and Credits、Acknowledging or Crediting USGS) は、2026-10-06 に 2 回ずつ試して 403、タイムアウト、504 で読めませんでした。引用した文言は、2026-10-02 に同じページを読んだ調査メモの記録です。
- USGS 以外の観測網 (ak 以外) のページと、各観測網自身のサイトの利用条件は読んでいません。
- `significant` の選び方の定義と、`sig` の計算方法は確かめていません。
- 値の改訂 (119 件のマグニチュードの変化など) は調査メモの 2026-10-02 の照合の値で、この日には照合し直していません。
- ComCat 全体の件数と大きさは確かめていません。
