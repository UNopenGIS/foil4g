# Tippecanoe

> Tippecanoe は、大規模な GeoJSON フィーチャコレクションからベクトルタイルセットを構築するためのツールです。

Felt によって開発・維持されている [[Tippecanoe]] は、[[GeoJSON]]、[[FlatGeobuf]]、または CSV 形式のフィーチャから [[ベクトルタイル]] を生成します。元々は Mapbox によって開発されていましたが、現在は Felt が公式な開発元となっています。

このツールの主な目的は、データからスケールに依存しないビューを作成することです。つまり、全世界から個々の建物まで、どのズームレベルでも、重要でないとされるフィーチャを削除したり、クラスタリングしたり、集約したりするのではなく、データの密度とテクスチャを確認できるようにすることを目指しています。

## 主な機能

tippecanoeの主な特徴と機能には以下のものがあります：

1. **自動的な間引き（simplification）**: データ密度の高い地域では、低いズームレベルで適切に間引きを行い、パフォーマンスを最適化
2. **属性の選択的保持**: 指定した属性のみをタイルに含めることで、サイズを削減
3. **柔軟なジオメトリ処理**: ポイント、ライン、ポリゴンなど様々な地物タイプに対応
4. **複数のズームレベル最適化**: 各ズームレベルに適したデータ量と詳細度を自動調整

ズームレベルに応じたフィーチャの動的な単純化、タイルサイズの最適化、属性のフィルタリングや変更などがあります。また、`tile-join` などの関連ツールも提供されており、タイルセットのマージや属性の結合などが可能です。

## 使用方法

- 基本的な使用法（GeoJSONから[[MBTiles]]への変換）:
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

- [[PMTiles]]形式で出力:
  `tippecanoe -o output.pmtiles input.geojson`

- フィーチャーIDを生成:
  `tippecanoe -o output.mbtiles -ai input.geojson`

- CSVファイルを座標を持つGeoJSONに変換してからタイル化:
  `tippecanoe -o output.mbtiles --csv-points input.csv --csv-lat-field latitude --csv-lon-field longitude`

- カスタム一時ディレクトリを指定:
  `tippecanoe -o output.mbtiles -t /path/to/temp/dir input.geojson`

## 活用事例

tippecanoeは[[OpenStreetMap]]のデータ処理ワークフローで頻繁に使用され、以下のような場面で活躍します：

- 大規模な[[GeoJSON]]データを[[ベクトルタイル]]に変換
- [[MBTiles]]または[[PMTiles]]形式のタイルセットを生成
- [[MapLibre]]や[[Mapbox]]のライブラリで表示する軽量なベクトルタイルの作成

[[UNopenGIS]]の[[foil4g]]プロジェクトでは、tippecanoeを使用した効率的なベクトルタイル生成プロセスやベストプラクティスに関するドキュメントを提供しています。

ライセンスは BSD 2-Clause "Simplified" License です。

詳細なドキュメントや利用方法、豊富なオプションについては、[GitHubリポジトリ](https://github.com/felt/tippecanoe)を参照してください。

## 関連情報

- [[ベクトルタイル]]
- [[GeoJSON]]
- [[MBTiles]] (出力フォーマットの一つ)
- [[PMTiles]] (出力フォーマットの一つ)
- [GitHubリポジトリ](https://github.com/felt/tippecanoe)
