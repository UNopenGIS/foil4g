# tippecanoe

> 大規模（または小規模）なGeoJSON、FlatGeobuf、CSVなどのデータからベクトルタイルセットを構築するツール。
> あらゆるズームレベルでデータの密度と特性を維持し、効率的なベクタータイルを生成します。
> 詳細: https://github.com/felt/tippecanoe

- 基本的な使用法（GeoJSONからMBTilesへの変換）:
  `tippecanoe -o output.mbtiles input.geojson`

- 自動的に適切なズームレベルを選択し、必要に応じて密度の高い地域のフィーチャーを間引く:
  `tippecanoe -zg -o output.mbtiles --drop-densest-as-needed input.geojson`

- 特定のズームレベル範囲を指定（最小ズーム0から最大ズーム14まで）:
  `tippecanoe -z14 -Z0 -o output.mbtiles input.geojson`

- レイヤー名とレイヤーの説明を指定:
  `tippecanoe -o output.mbtiles -l layer_name -n "Layer description" input.geojson`

- 複数の入力ファイルを別々のレイヤーとして追加:
  `tippecanoe -o output.mbtiles -L layer1:input1.geojson -L layer2:input2.geojson`

- タイルサイズの上限を変更（デフォルトは500KB）:
  `tippecanoe -o output.mbtiles -M 1000000 input.geojson`

- 特定の属性のみを保持し、他の属性を削除:
  `tippecanoe -o output.mbtiles -x excluded_attribute -y included_attribute input.geojson`

- 属性に基づいてフィルタリング:
  `tippecanoe -o output.mbtiles -j '{"*":["any",["==","property","value"]]}' input.geojson`

- 密度の高い領域でフィーチャーを間引く:
  `tippecanoe -o output.mbtiles --drop-densest-as-needed input.geojson`

- 空間のフィルタリング（バウンディングボックス内のデータのみを処理）:
  `tippecanoe -o output.mbtiles --clip-bounding-box=minlon,minlat,maxlon,maxlat input.geojson`

- ジオメトリの簡略化レベルを設定（デフォルトは12）:
  `tippecanoe -o output.mbtiles -d 10 input.geojson`

- PMTiles形式で出力:
  `tippecanoe -o output.pmtiles input.geojson`

- フィーチャーIDを生成:
  `tippecanoe -o output.mbtiles -ai input.geojson`

- CSVファイルを座標を持つGeoJSONに変換してからタイル化:
  `tippecanoe -o output.mbtiles --csv-points input.csv --csv-lat-field latitude --csv-lon-field longitude`

- カスタム一時ディレクトリを指定:
  `tippecanoe -o output.mbtiles -t /path/to/temp/dir input.geojson`

## tile-join

tile-join は、既存のベクトルタイルセット（.mbtiles、.pmtiles、ディレクトリ）を結合したり、CSV ファイルから新しい属性を追加したりするためのツールです。

- 複数のMBTilesファイルを結合:
  `tile-join -o combined.mbtiles input1.mbtiles input2.mbtiles input3.mbtiles`

- CSVファイルの属性を既存のフィーチャーに結合:
  `tile-join -o with_attributes.mbtiles -c attributes.csv input.mbtiles`

- レイヤー名を変更:
  `tile-join -o renamed.mbtiles -r old_name:new_name input.mbtiles`

- フィルタを適用して特定のフィーチャーのみを含める:
  `tile-join -o filtered.mbtiles -j '{"*":["none",["==","property","value"]]}' input.mbtiles`
