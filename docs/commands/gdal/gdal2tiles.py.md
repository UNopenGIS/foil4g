# gdal2tiles.py

> ラスターデータをウェブマップタイル（XYZ または TMS）に変換する[[GDAL]]ユーティリティ。
> Google Maps、OpenLayers、Leaflet などで使用可能なタイルセットを生成します。
> 詳細: https://gdal.org/programs/gdal2tiles.html

- 基本的な使用法（ラスターファイルからタイルを生成）:
  `gdal2tiles.py input.tif output_directory/`

- Webメルカトル（EPSG:3857）でタイルを生成:
  `gdal2tiles.py -s EPSG:4326 -z 1-10 -w all input.tif output_directory/`

- GoogleマップやOpenStreetMap互換（XYZ）タイルを生成:
  `gdal2tiles.py -w all -p mercator input.tif output_directory/`

- TMS（Tile Map Service）形式でタイルを生成:
  `gdal2tiles.py -p geodetic input.tif output_directory/`

- 特定のズームレベル範囲のタイルのみを生成:
  `gdal2tiles.py -z 10-15 input.tif output_directory/`

- マルチプロセス処理でタイル生成を高速化（例：4プロセス）:
  `gdal2tiles.py -p mercator --processes=4 input.tif output_directory/`

- リサンプリングメソッドを指定してタイルを生成:
  `gdal2tiles.py -r bilinear input.tif output_directory/`

- サムネイル画像（KML SuperOverlay用）も生成:
  `gdal2tiles.py -p mercator --kml input.tif output_directory/`

- タイルにカスタムNoData値を設定:
  `gdal2tiles.py --srcnodata 255 --nodata 0 input.tif output_directory/`

- 簡易的なWebビューアを生成（Leaflet、OpenLayers、Google Maps）:
  `gdal2tiles.py -w all -p mercator input.tif output_directory/`

- VRTファイルを入力として使用（複数ファイルのタイル化）:
  `gdal2tiles.py input.vrt output_directory/`
