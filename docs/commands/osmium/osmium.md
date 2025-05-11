# osmium

> [[OpenStreetMap]] (OSM) データを処理するための多機能コマンドラインツール。
> OSMデータの変換、フィルタリング、結合、抽出などの操作ができます。
> 詳細: https://osmcode.org/osmium-tool/

## ファイル形式について

OpenStreetMapデータには主に以下の拡張子が使われます：
- `.osm.pbf` - 標準的なOSMデータファイル（Protocol Bufferフォーマット）
- `.osh.pbf` - OSM履歴データファイル（時間的な変更履歴を含む）
- `.osc.gz` - OSM変更ファイル（差分データ）、通常gzipで圧縮される

## 使用例

- 基本的な使用法（OSMファイルの情報表示）:
  `osmium fileinfo input.osm.pbf`

- OSMファイルフォーマットの変換 (PBF→XML):
  `osmium cat input.osm.pbf -o output.osm`

- 指定した地理的な境界でOSMデータを抽出:
  `osmium extract -b minlon,minlat,maxlon,maxlat input.osm.pbf -o output.osm.pbf`

- ポリゴンファイルを使用してOSMデータを抽出:
  `osmium extract -p polygon.geojson input.osm.pbf -o output.osm.pbf`

- 複数のOSMファイルを結合:
  `osmium merge input1.osm.pbf input2.osm.pbf -o merged.osm.pbf`

- OSMファイルからタグやノード情報を表示:
  `osmium tags-filter input.osm.pbf amenity -o amenities.osm.pbf`

- 特定のキーを持つ要素のみを抽出:
  `osmium tags-filter input.osm.pbf highway -o highways.osm.pbf`

- 複雑なタグのフィルタリング:
  `osmium tags-filter input.osm.pbf "highway=primary or highway=secondary" -o main_roads.osm.pbf`

- 特定のオブジェクトタイプのみを抽出（ノード、ウェイ、リレーション）:
  `osmium tags-filter input.osm.pbf n/amenity w/highway r/type=multipolygon -o filtered.osm.pbf`

- OSMファイルからジオメトリを作成してGeoJSONに変換:
  `osmium export input.osm.pbf -o output.geojson`

- OSMデータをShapefileに変換:
  `osmium export input.osm.pbf -o output.shp`

- OSMファイルの時間範囲を指定して更新（差分）を適用:
  `osmium apply-changes input.osm.pbf change.osc.gz -o updated.osm.pbf`

- OSMデータの履歴を処理:
  `osmium time-filter input.osh.pbf 2021-01-01T00:00:00Z -o filtered.osm.pbf`

- OSMファイルのチェックサムを計算:
  `osmium fileinfo --checksums input.osm.pbf`

- OSM変更ファイル（.osc）からサマリーレポートを生成:
  `osmium diff-summary change.osc.gz`

- OSMデータを圧縮:
  `osmium cat input.osm -o output.osm.pbf`

- タイムスタンプでOSMデータをフィルタリング:
  `osmium time-filter input.osh.pbf 2020-01-01T/2021-01-01T -o output.osm.pbf`

- OSMファイルのオブジェクトをIDでフィルタリング:
  `osmium getid input.osm.pbf n12345 w9876 -o output.osm.pbf`

- OSMファイルの破損をチェック:
  `osmium check-refs input.osm.pbf`

## osmium-tool のサブコマンド

osmium は多くのサブコマンドを持つツールです。主なサブコマンドは以下の通りです：

- `add-locations-to-ways` - ウェイにノードの位置情報を追加
- `apply-changes` - OSMの変更セットを適用
- `cat` - OSMファイルの連結と変換
- `check-refs` - 参照の整合性チェック
- `derive-changes` - 2つのOSMファイルの差分を抽出
- `diff` - 2つのOSMファイルの差分を表示
- `export` - OSMデータをGeoJSONなどの他の形式に変換
- `extract` - OSMデータから地理的なサブセットを抽出
- `fileinfo` - OSMファイルの情報を表示
- `getid` - 特定のIDを持つオブジェクトを抽出
- `merge` - 複数のOSMファイルを結合
- `tags-filter` - タグに基づいてOSMデータをフィルタリング
- `time-filter` - タイムスタンプに基づいてOSMデータをフィルタリング
