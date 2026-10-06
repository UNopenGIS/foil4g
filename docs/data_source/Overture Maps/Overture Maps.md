# Overture Maps

> [[Overture Maps Foundation]] が、[[OpenStreetMap]] や各社・各国のオープンデータを統合した全世界の地図データ (住所、基盤、建物、行政区域、施設、交通の 6 テーマ) を、毎月 [[GeoParquet]] で Amazon S3 と Microsoft Azure から配り、[[STAC]] カタログで目録を公開しているもの

## データソース情報

| 項目             | 内容 |
| ---------------- | ---- |
| データID         | overture_maps |
| 提供元           | [[Overture Maps Foundation]] |
| 元データ         | [[OpenStreetMap]]、Microsoft と Google の機械学習による建物、Esri Community Maps、[[geoBoundaries 行政区域]]、[[ESA WorldCover 土地被覆]]、Meta や Microsoft などの施設データ、OpenAddresses などの住所データ、TomTom の道路データほか (テーマごとに下で説明) |
| ライセンス       | テーマごとに違う。base、buildings、divisions、transportation は [[ODbL-1.0]]。places は出典ごとに [[CDLA-Permissive-2.0]]、Apache-2.0、CC0-1.0。addresses は出典ごとに 175 を超える別々の条件 (STAC では places と addresses の license は `other`) |
| 取り出し方       | range。テーマと種類ごとのフォルダに分かれた GeoParquet で、STAC の item がファイルごとの範囲 (bbox) を持つ。ファイルの中は行グループごとに bbox 列の統計があり、HTTP Range (206 を確認) で必要な行グループと列だけを読める |
| データ形式       | [[GeoParquet]] 1.1.0 (ジオメトリは WKB、zstd 圧縮、bbox の covering 列つき)。ほかにテーマごとの [[PMTiles]] |
| 範囲             | 全世界 (テーマによって網羅度が違う。addresses は 41 か国だけ) |
| 期間             | 毎月のリリース時点のスナップショット。最新は 2026-09-23.1 (OSM の取り込み締め日は 2026-09-09 から 2026-09-16)。公開バケットには直近 2 か月分だけが残る |
| 解像度または単位 | 地物 (点、線、面) ごとの 1 行。座標は経緯度 (OGC:CRS84) |
| 大きさ           | 2026-09-23.1 の GeoParquet 全体で 619,188,730,173 バイト (約 619GB、1,278 ファイル)。テーマ別 PMTiles は 18GB (places) から 190GB (base) |
| 更新頻度         | 毎月 (次は 2026-10-21.0 の予定)。修正版は末尾の番号が上がる (例: 2026-09-23.0 の修正が 2026-09-23.1) |
| URL              | s3://overturemaps-us-west-2/release/2026-09-23.1/ (HTTPS では https://overturemaps-us-west-2.s3.us-west-2.amazonaws.com/release/2026-09-23.1/)、https://overturemapswestus2.blob.core.windows.net/release/2026-09-23.1/ |
| STAC カタログ    | https://stac.overturemaps.org/catalog.json |
| 説明ページ       | https://docs.overturemaps.org/getting-data/cloud-sources/ |
| ライセンスと帰属 | https://docs.overturemaps.org/attribution/ |
| リリース一覧     | https://docs.overturemaps.org/release-calendar/ |

## 概要

Overture Maps Foundation は、OpenStreetMap を中心に、ほかのオープンデータや参加企業が提供したデータを、共通のスキーマに変換して統合し、毎月リリースしています。
2026-09-23 のリリースからスキーマは v2.0.0 です。

データは 6 つのテーマと 15 の種類 (type) に分かれています。
テーマごとに作り方が違います。

- addresses (住所): OpenAddresses と AddressForAll を中心に、各国の公的機関の住所データを集めたものです。加工は少なく、点の位置と属性が完全に一致するものだけを重複として除いています。このテーマはまだアルファ版です。
- base (基盤): 陸、水域、土地利用、インフラは OpenStreetMap のタグを選んで変換したものです。土地被覆は ESA WorldCover、海底地形は ETOPO1 と GLOBathy から作っています。照合や統合はしていません。
- buildings (建物): OpenStreetMap を最優先にして、Esri Community Maps、スペインの IGN、バンクーバー市、Microsoft と Google の機械学習による建物、東アジアの建物データ (Zenodo) で隙間を埋めています。重なりの判定は IoU 0.5 を境にしています。
- divisions (行政区域): OpenStreetMap と geoBoundaries を統合しています。
- places (施設): Meta (約 5,900 万件)、Microsoft、Foursquare、BrightQuery、PinMeTo などのデータを、機械学習 (XGBoost の分類器と埋め込み) で照合して 1 件にまとめています。OpenStreetMap のデータは入っていません。
- transportation (交通): OpenStreetMap の道路、鉄道、航路を中心に、TomTom の道路データなどで補っています。

各地物には GERS ID (Global Entity Reference System の ID) が `id` 列として付きます。
GERS ID はリリースをまたいで同じ地物を指すことを目指した ID で、変化はブリッジファイルで追えます。
ただし 2026-09-23 のリリースでは、base の 5 種類で ID の生成方法が変わり、ID がすべて入れ替わりました。
addresses の ID は属性や位置が変わると新しくなり、GERS のレジストリにも載っていません。

作り方の限界は次のとおりです。

- base、buildings、divisions、transportation の正確さは、主に OpenStreetMap の正確さに従います。
- 建物の多くは衛星画像からの機械学習による推定で、形の精度は手で描いた建物より低く、グローバルサウスでその割合が高いと説明されています。
- places の `confidence` は「その施設が実在する確からしさ」で、出典の間で目盛りがそろえられていないと説明されています。
- addresses は 41 か国だけで、アメリカ、ドイツ、台湾も一部の地域だけです。

## 内容

2026-09-23.1 の種類ごとの行数、ファイル数、ライセンスです (STAC の collection.json の `table:row_count`、`partition:file_count`、`license` と、S3 の一覧から集計した大きさ)。

| テーマ / 種類 | 行数 | ファイル数 | 大きさ (バイト) | STAC の license |
| --- | ---: | ---: | ---: | --- |
| addresses / address | 474,186,531 | 64 | 27,611,519,585 | other |
| base / bathymetry | 407,277 | 1 | 52,018,294 | CC0-1.0 |
| base / infrastructure | 157,617,917 | 64 | 13,835,003,465 | ODbL-1.0 |
| base / land | 75,848,834 | 128 | 30,149,166,659 | ODbL-1.0 |
| base / land_cover | 123,302,114 | 128 | 109,058,727,144 | CC-BY-4.0 |
| base / land_use | 56,097,254 | 64 | 18,816,717,483 | ODbL-1.0 |
| base / water | 66,204,219 | 128 | 28,560,508,405 | ODbL-1.0 |
| buildings / building | 2,533,842,612 | 512 | 276,863,520,053 | ODbL-1.0 |
| buildings / building_part | 4,486,107 | 3 | 617,783,154 | ODbL-1.0 |
| divisions / division | 4,688,229 | 1 | 581,868,458 | ODbL-1.0 |
| divisions / division_area | 1,080,667 | 8 | 4,531,207,040 | ODbL-1.0 |
| divisions / division_boundary | 87,530 | 1 | 512,261,151 | ODbL-1.0 |
| places / place | 81,455,423 | 16 | 10,996,226,026 | other |
| transportation / connector | 421,978,977 | 32 | 24,824,064,677 | ODbL-1.0 |
| transportation / segment | 352,054,710 | 128 | 72,178,138,579 | ODbL-1.0 |

どの種類にも共通する列は次のとおりです。

- `id`: GERS ID (UUID の文字列)。
- `geometry`: WKB のジオメトリ。種類ごとに点 (place、address、connector)、線 (segment、division_boundary)、面 (building、land など) が決まっています。
- `bbox`: `xmin`、`xmax`、`ymin`、`ymax` を持つ構造体。GeoParquet の covering 列として宣言されていて、範囲での絞り込みに使います。
- `sources`: 出典の配列。`dataset` (例: `meta`、`OpenStreetMap`)、`record_id`、`update_time`、`license` などを持ちます。
- `version`: 地物の版の番号。

種類ごとの主な列は次のとおりです (列の定義は https://docs.overturemaps.org/schema/ にあります)。

- address: `street`、`number`、`unit`、`postcode`、`postal_city`、`address_levels`、`country`。
- place: `names`、`basic_category`、`taxonomy` (分類の階層)、`confidence` (0 から 1)、`operating_status`、`websites`、`phones`、`emails`、`socials`、`brand`、`addresses`。`categories` 列は v2.0.0 で削除されました。
- building: `names`、`subtype`、`class`、`height` (メートル)、`num_floors`、`is_underground`、屋根と外壁の属性、`has_parts`。
- division: `subtype` (country、region、locality など)、`admin_level`、`country`、`region`、`hierarchies`、`parent_division_id`、`population`、`wikidata`、`perspectives` (係争地をどの国の見方で描くか)。
- division_boundary: `division_ids`、`is_disputed`、`is_land`、`is_territorial`。
- segment: `subtype` (road、rail、water)、`class`、`connectors`、`speed_limits`、`access_restrictions`、`road_surface`、`routes` など。
- land_cover: `subtype` (森林、草地、市街地など)。

値が無いときは Parquet の null です。
place の `confidence` が null のときは「確からしさの情報が無い」という意味で、0 は「存在しないと確信している」という意味だと説明されています。

places の出典ごとの件数 (places ガイドの 2026 年 9 月の表) は次のとおりです。
合計は STAC の行数 81,455,423 と一致します。

| 出典 | ライセンス | 件数 |
| --- | --- | ---: |
| Meta | CDLA-Permissive-2.0 | 58,783,121 |
| BrightQuery | CDLA-Permissive-2.0 | 10,255,071 |
| Microsoft | CDLA-Permissive-2.0 | 6,135,466 |
| Foursquare | Apache-2.0 | 4,138,835 |
| AllThePlaces | CC0-1.0 | 1,809,219 |
| PinMeTo | CDLA-Permissive-2.0 | 167,667 |
| DAC | CDLA-Permissive-2.0 | 148,791 |
| Krick | CDLA-Permissive-2.0 | 13,501 |
| RenderSEO | CDLA-Permissive-2.0 | 3,752 |

## 取り出し方

区分は range です。
絞り込みは 3 段で行えます。

1. フォルダ: パスが `release/<リリース>/theme=<テーマ>/type=<種類>/` に分かれているので、要る種類だけを選べます。
2. ファイル: STAC の item (`https://stac.overturemaps.org/<リリース>/<テーマ>/<種類>/<番号>/<番号>.json`) が、ファイルごとの bbox、行数、行グループ数、大きさ、S3 と Azure の URL を持っています。ファイルは空間的に分けられていて、たとえば places の 16 ファイルのうち、経度 42.14 から 105.8、緯度 18.11 から 81.84 の範囲は `00014` の 1 ファイルです。
3. 行グループ: ファイルの中は行グループ (place は 1 ファイル 256 から 512、division_boundary は 64) に分かれていて、Parquet のフッターに行グループごとの `bbox.xmin` などの最小値と最大値が入っています。範囲の条件に合わない行グループは読まずに済みます。

2026-10-06 に次を確かめました。

- S3 と Azure の HTTPS の URL は、どちらも認証なしで読めます。S3 は `Accept-Ranges: bytes` を返し、Range 要求には両方とも `206 Partial Content` を返しました。S3 は `Access-Control-Allow-Origin: *` を返すので、ブラウザから直接読めます。
- division_boundary のファイル (512,261,151 バイト) の末尾 8 バイトを Range で読むと、フッターの長さ (234,933 バイト) と `PAR1` が返りました。フッターだけを Range で読んで、64 行グループそれぞれの bbox の統計を取り出せました。日本付近 (経度 128 から 146、緯度 30 から 46) に掛かる行グループは 64 のうち 6 でした。
- DuckDB で同じファイルに日本付近の bbox の条件を付けて件数を数えると (4,252 件)、読んだのは GET 21 回、375,701 バイトで、ファイルの 0.07% でした。
- places の `00014` (683,038,313 バイト) からバングラデシュのコックスバザール付近 (経度 92.10 から 92.25、緯度 21.05 から 21.25) の施設 208 件を GeoJSON に書き出したときは、GET 7 回、3,123,079 バイトで済みました。

最小の単位は 1 つのファイルの 1 行グループの、要る列だけです。
ファイル全体を落とすなら、最小は bathymetry の 1 ファイル (約 52MB)、多くは 1 ファイル 500MB から 750MB ほどです。

公式の Python クライアント (`overturemaps download --bbox=...`) も、STAC を使って範囲内だけを取り出すと説明されています (動かしていません)。
一括で落とすときは、`aws s3 cp --no-sign-request --recursive` や AzCopy が案内されています (動かしていません)。
BigQuery、Databricks、Snowflake、Source Cooperative などにもミラーがありますが、コミュニティが保守するものと書かれています。

PMTiles はテーマごとに 1 ファイルで、`https://tiles.overturemaps.org/<リリース>/<テーマ>.pmtiles` (または `https://overturemaps-extras-us-west-2.s3.us-west-2.amazonaws.com/tiles/<リリース>/<テーマ>.pmtiles`) にあります。
Range 要求に 206 を返し、[[pmtiles]] コマンドでヘッダを読めました (places はズーム 0 から 14)。
説明ページは、この PMTiles を「data inspection rather than production cartography」(本番の地図表現ではなくデータを確かめるため) のものとしています。
2026-09-23.1 の PMTiles の大きさは、addresses 32,848,372,060、base 190,000,282,108、buildings 180,679,746,134、divisions 19,929,576,927、places 18,392,360,113、transportation 133,668,255,524 バイトです。

## 使いどころ

- 人道支援と防災: 建物の面 (25 億件) は、被災地の建物数の見積もりや、[[WorldPop 人口グリッド]] などの人口データと組み合わせた被害の想定に使えます。道路網 (segment と connector) はつながりの情報を持つので、避難や物資輸送の経路の検討に使えます。施設の `basic_category` で病院 (`hospital`) や学校 (`place_of_learning`、`high_school` など) を選べ、コックスバザールの例では 208 件のうち 11 件が `hospital` でした。
- SDGs: 11.2 (公共交通へのアクセス) や 9.1 (インフラへのアクセス) の指標を、道路網と施設の位置から近似的に計算する材料になります。3.8 (保健サービスの普及) では、医療施設までの距離の計算に使えます。
- 行政区域: divisions は国から地区までの境界を全世界でそろった形式で持ち、`perspectives` で係争地の描き方を選べます。国連の公式の境界ではないので、国境の表示に使うときは各機関の方針を確かめてください。
- 統合の手間を減らす: OpenStreetMap、geoBoundaries、Google と Microsoft の建物など、別々に配られているデータが 1 つのスキーマと 1 つの ID にまとまっているので、国をまたいだ比較がしやすくなります。

使ってはいけない使い方もあります。

- 建物の数をそのまま人口や世帯数とみなさないでください。機械学習の建物には、コンテナや車庫などの誤検出が残っていると説明されています。
- places の件数を地域の施設の網羅率とみなさないでください。出典が Meta などのプラットフォームに偏っていて、地域によって網羅度が大きく違います。`confidence` は出典をまたいで比べられる確率ではありません。
- addresses は 41 か国だけなので、全世界の住所データとして使えません。
- 毎月のリリースは 2 か月で公開バケットから消えます。論文や報告の再現性が要るときは、使ったリリースのファイルを手元に保存してください。

## ライセンスと帰属表示

ライセンスはテーマごとに違い、places と addresses は他の 4 テーマと条件が違います。
根拠は https://docs.overturemaps.org/attribution/ (2026-05-15 更新) と各テーマのガイドです。

- base、buildings、divisions、transportation: 「License for theme: ODbL」。OpenStreetMap を含むため、[[ODbL-1.0]] の継承 (share-alike) の条件が掛かります。buildings のガイドは、取り込む他のデータも ODbL か CC BY 4.0 のような両立するライセンスであることを確かめていると書いています。
- places: 出典ごとに CDLA Permissive 2.0 (Meta、Microsoft、BrightQuery など)、Apache 2.0 (Foursquare)、CC0 1.0 (AllThePlaces) です。ガイドは「It contains no OpenStreetMap data and carries none of the share-alike obligations of the Open Database License (ODbL).」と書いています。ただし OpenStreetMap と結合した結果は、派生データベースとして ODbL になることがあるとも注意しています。
- addresses: 「The addresses data comes from a variety of sources. All carry permissive open licenses. Some have special terms or require attribution.」とあり、テーマ全体のライセンスはありません。帰属ページには国や郡ごとに CC BY 4.0、CC0、PDDL、ドイツの DL-DE-BY-2.0、フランスの Etalab 2.0、オーストラリアの G-NAF の利用許諾、アメリカの National Address Database の利用許諾、ミシガン州の郡の「revocable license」(取り消せる許諾) などが並んでいます。日本は国土交通省のデータで CC BY 4.0 です。2026-09-23 のリリースから、各行の `sources[].license` に出典のライセンスが入るようになったとリリースノートに書かれています。

CDLA Permissive 2.0 は、データを共有するときに「makes available the text of this agreement with the shared Data」(この許諾の本文を一緒に示すこと) を求め、分析の結果 (Results) には制限を掛けません。

STAC と説明ページで食い違う点が 1 つあります。
STAC の collection.json は base の bathymetry を CC0-1.0、land_cover を CC-BY-4.0 としていますが、帰属ページと base のガイドは base テーマ全体を ODbL としています。
帰属ページには、land_cover の元の ESA WorldCover が CC BY 4.0、bathymetry の元の ETOPO1 が PDDL、GLOBathy が「CC0 1.0 (assumed)」と書かれています。
迷ったら、テーマ全体の ODbL と元データの条件の両方を満たす扱いにしてください。

求められる表示は次のとおりです。

- 論文などでの引用 (任意): 「Overture Maps Foundation, overturemaps.org.」とアクセス日。
- OpenStreetMap を含むテーマを表示するとき: 「© OpenStreetMap contributors, Overture Maps Foundation.」
- そのうえで、使った出典ごとに帰属ページの表示文を添えます (例: 建物の「Google Open Buildings. Available under CC BY 4.0.」、行政区域の「geoBoundaries. Available under CC BY 4.0.」、Foursquare の NOTICE.txt)。

## 気をつけること

- リリース番号は `yyyy-mm-dd.x` です。2026-09-23.0 は base と building_part の GERS ID の生成に誤りがあり、同じ日に 2026-09-23.1 で直されました。.0 と .1 の両方が公開バケットに残っています。
- 公開バケットには直近 2 か月分 (2026-10-06 時点で 2026-08-19.0、2026-09-23.0、2026-09-23.1) しかありません。GDPR の削除要求に応えるためと説明されています。過去のパスを固定で書くと、2 か月後に読めなくなります。STAC の `latest` から取ると安全です。
- 2026-09-23 のスキーマ v2.0.0 は大きな変更で、places の `categories` 列が無くなりました。古い例の SQL (`categories.primary`) は動きません。`taxonomy` か `basic_category` を使います。
- 座標系は経緯度 (OGC:CRS84) です。GeoParquet の `geo` メタデータに `crs` が無いので、仕様の既定の CRS84 になります。
- PMTiles の `tiles.overturemaps.org` は、buildings への HEAD 要求に 400 を返しました (Range 付きの GET は 206)。HEAD だけで有無を判断しないでください。
- [[OpenStreetMap Japan Overture Maps PMTiles]] は、OSMFJ が Overture のデータから作って配っていた別の PMTiles です。本家の配布とは版も中身も違います。
- foil4g の `src/components/Datasets/OvertureMaps/source.ts` は、本家の配布ではなく OSMFJ の `https://tile.openstreetmap.jp/static/overture.pmtiles` を指しています。そこで使っているレイヤー名 (`building`、`transportation`、`water`) は 1 つのファイルにまとめた OSMFJ の PMTiles のもので、本家のテーマ別 PMTiles のレイヤー名 (buildings は `building` と `building_part`、transportation は `segment` と `connector`、base は `water` など) とは一致しません。本家に切り替えるときは、テーマごとに source を分けてレイヤー名を直す必要があります。OSMFJ の URL の現状は、そちらのカードを見てください。
- 種類ごとの網羅度が違います。たとえば bathymetry は 2026-09-23 で 59,963 件から 407,277 件に増えました (作り方が変わったため)。月をまたいだ件数の比較は、リリースノートで変更を確かめてから行ってください。
- 取り違えやすいデータ: [[Google Open Buildings]] と [[ESA WorldCover 土地被覆]] と [[geoBoundaries 行政区域]] は Overture の元データの一部です。元データの方が新しいことも古いこともあります。

## データ処理コマンド

curl と jq のコマンドは 2026-10-06 に実際に動かしました。

```bash
# 最新のリリース番号を STAC から取る
curl -s https://stac.overturemaps.org/catalog.json | jq -r .latest
# => 2026-09-23.1

# 種類ごとのライセンス、行数、ファイル数
curl -s https://stac.overturemaps.org/2026-09-23.1/places/place/collection.json \
  | jq '{license, rows: ."table:row_count", files: ."partition:file_count"}'

# ファイルごとの範囲 (bbox) と URL を一覧にする (places は 16 ファイル)
for i in $(seq -f "%05g" 0 15); do
  curl -s https://stac.overturemaps.org/2026-09-23.1/places/place/$i/$i.json \
    | jq -r '[.id, (.bbox|map(.*100|round/100)|@csv), .assets.aws.href]|@tsv'
done

# Range に対応しているかを確かめる (末尾 8 バイトはフッターの長さと PAR1)
U=https://overturemaps-us-west-2.s3.us-west-2.amazonaws.com/release/2026-09-23.1/theme=divisions/type=division_boundary/part-00000-6530b6cb-4083-558b-90c6-43ce926b7631-c000.zstd.parquet
curl -sI "$U" | grep -iE '^(HTTP|Content-Length|Accept-Ranges)'
curl -s -r -8 -D - -o tail.bin "$U" | grep -iE '^(HTTP|Content-Range)'
xxd tail.bin
```

次の SQL は、DuckDB 1.5.6 (Python パッケージ) に spatial と httpfs の拡張を読み込んで実行しました。
duckdb の CLI では動かしていません。
古い DuckDB (1.1 や 1.3) では spatial 拡張が不安定なことがあるので、1.5 系を使ってください。

```sql
LOAD spatial;
LOAD httpfs;

-- STAC で選んだ 1 ファイルから、bbox 列で範囲を絞って GeoJSON に書き出す
-- (バングラデシュのコックスバザール付近の施設。読んだのは約 3.1MB)
COPY (
  SELECT id, names.primary AS name, basic_category, confidence,
         sources[1].dataset AS source, sources[1].license AS license, geometry
  FROM read_parquet('https://overturemaps-us-west-2.s3.us-west-2.amazonaws.com/release/2026-09-23.1/theme=places/type=place/part-00014-1d36203b-4312-5a97-b9e0-5c110ae7a274-c000.zstd.parquet')
  WHERE bbox.xmin BETWEEN 92.10 AND 92.25 AND bbox.ymin BETWEEN 21.05 AND 21.25
) TO 'coxsbazar_places.geojson' WITH (FORMAT GDAL, DRIVER 'GeoJSON');
```

```bash
# 書き出した GeoJSON を確かめる (208 件の点、CRS84)
ogrinfo -so -al coxsbazar_places.geojson

# PMTiles のヘッダを読む
pmtiles show https://tiles.overturemaps.org/2026-09-23.1/places.pmtiles
```

S3 の `s3://` パスとワイルドカード (`theme=places/type=place/*.parquet`) で全ファイルをまとめて読む書き方も説明ページにあります。
試したところ一覧の取得 (16 ファイル) は 1 秒ほどで終わりましたが、範囲で絞った読み出しは、この日の回線 (約 80KB/秒) では 5 分で終わりませんでした。
回線が遅いときは、上のように STAC で 1 ファイルを選んでから読むと、フッターの読み込みが 1 ファイル分で済みます。

## 関連項目

- [[Overture Maps Foundation]]
- [[OpenStreetMap Japan Overture Maps PMTiles]]
- [[OpenStreetMap]]
- [[Geofabrik Japan OpenStreetMap Data]]
- [[Google Open Buildings]]
- [[ESA WorldCover 土地被覆]]
- [[geoBoundaries 行政区域]]
- [[WorldPop 人口グリッド]]
- [[GeoParquet]]
- [[STAC]]
- [[PMTiles]]
- [[pmtiles]]
- [[DuckDB]]
- [[ODbL-1.0]]
- [[CDLA-Permissive-2.0]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に次を確かめました。

- STAC カタログ (`catalog.json`、2026-09-23.1 の 6 テーマのカタログと 15 種類の collection.json、places と division_boundary と building の item) で、最新のリリース番号、行数、ファイル数、license の値、ファイルごとの bbox と URL を読みました。
- S3 の公開一覧 (ListObjectsV2) で、2026-09-23.1 の GeoParquet 1,278 ファイルの大きさと、PMTiles 6 ファイルの大きさを集計しました。公開バケットに残っているリリースも同じ一覧で確かめました。
- S3 と Azure の HTTPS の URL に HEAD と Range 要求を送り、206 を確かめました。division_boundary と places の `00014` のフッターを Range で読み、行グループと bbox の統計、GeoParquet の `geo` メタデータ (版 1.1.0、WKB、covering) を確かめました。
- DuckDB 1.5.6 で bbox の条件付きの読み出しを 2 回行い、HTTP の記録から読んだバイト数を数えました。
- ライセンスと帰属は、帰属ページ、6 テーマのガイド、2026-09-23 のリリースノート、リリース一覧のページ、CDLA Permissive 2.0 の本文で確かめました。
- foil4g の `source.ts` は読むだけにしました。tile.openstreetmap.jp には問い合わせていません。

確かめられなかったことは次のとおりです。

- addresses の各行の `sources[].license` の実際の値は確かめていません (リリースノートの記述だけです)。
- 公式の Python クライアント、AWS CLI、AzCopy、Azure 経由の DuckDB の読み出しは動かしていません。
- S3 の `s3://` パスとワイルドカードでの範囲の読み出しは、回線が遅く最後まで終わらなかったため、結果を確かめていません。
- 各国の住所データの許諾の細かい条件 (取り消せる許諾の範囲など) は、元の許諾文までは読んでいません。
