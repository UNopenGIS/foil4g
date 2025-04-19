# gdalinfo

> ラスターデータセットの情報を表示するGDALユーティリティ。
> GDALでサポートされている様々な形式のラスターデータの情報を取得できます。
> 詳細: https://gdal.org/programs/gdalinfo.html

- 基本的な使用法（ファイルの情報を表示）:
  `gdalinfo path/to/input.tif`

- 全てのメタデータを表示:
  `gdalinfo -stats path/to/input.tif`

- 座標系情報をWKT形式で表示:
  `gdalinfo -wkt path/to/input.tif`

- 座標系情報をPROJ.4形式で表示:
  `gdalinfo -proj4 path/to/input.tif`

- ファイルの統計情報を表示（最小値、最大値、平均値、標準偏差など）:
  `gdalinfo -stats path/to/input.tif`

- ファイルの情報をJSON形式で出力:
  `gdalinfo -json path/to/input.tif`

- ピクセル値のヒストグラムを表示:
  `gdalinfo -hist path/to/input.tif`

- 指定したバンドのみの情報を表示（例：バンド1）:
  `gdalinfo -band 1 path/to/input.tif`

- マルチスレッド処理を有効化（大きなファイル向け）:
  `gdalinfo --config GDAL_NUM_THREADS 4 path/to/large_input.tif`

- HTTPやクラウドストレージ上のファイルの情報を取得:
  `gdalinfo /vsicurl/https://example.com/path/to/file.tif`
