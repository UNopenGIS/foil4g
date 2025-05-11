# gdalwarp

> ラスターデータセットの空間変換とリプロジェクションを行う[[GDAL]]ユーティリティ。
> 座標系変換、リサンプリング、モザイク化などの高度な処理を実行できます。
> 詳細: https://gdal.org/programs/gdalwarp.html

- 基本的な使用法（座標系を変換：UTM座標系からWGS84緯度経度へ）:
  `gdalwarp -t_srs EPSG:4326 path/to/input.tif path/to/output.tif`

- 出力範囲を指定（左下x 左下y 右上x 右上yの順）:
  `gdalwarp -te 440720 3750120 441920 3751320 path/to/input.tif path/to/output.tif`

- リサンプリング方法を指定（最近傍法、バイリニア、キュービック、他）:
  `gdalwarp -r bilinear path/to/input.tif path/to/output.tif`

- 出力解像度を設定（メートル単位）:
  `gdalwarp -tr 30 30 path/to/input.tif path/to/output.tif`

- 複数の入力ファイルをモザイク化して一つのファイルに統合:
  `gdalwarp path/to/input1.tif path/to/input2.tif path/to/output.tif`

- 出力ファイルの作成オプションを指定（LZW圧縮を使用）:
  `gdalwarp -co COMPRESS=LZW path/to/input.tif path/to/output.tif`

- マルチスレッド処理を使用（4つのスレッドを使用）:
  `gdalwarp -multi -wo NUM_THREADS=4 path/to/input.tif path/to/output.tif`

- ノーデータ値の設定（例：値0をノーデータとして指定）:
  `gdalwarp -srcnodata 0 -dstnodata 0 path/to/input.tif path/to/output.tif`

- 出力を特定のサイズに切り抜く（100x100ピクセル）:
  `gdalwarp -ts 100 100 path/to/input.tif path/to/output.tif`

- カットライン（ベクターファイル）を使用して切り抜き:
  `gdalwarp -cutline path/to/cutline.shp -crop_to_cutline path/to/input.tif path/to/output.tif`

- 複数の入力バンドからVRTを作成（仮想モザイク）:
  `gdalwarp -of VRT path/to/input1.tif path/to/input2.tif path/to/output.vrt`

- 出力ファイルの地理変換行列（GeoTransform）を上書き設定:
  `gdalwarp -gcp 0 0 440720 3751320 -gcp 0 100 440720 3750320 -gcp 100 0 441720 3751320 path/to/input.tif path/to/output.tif`

- 入力データの周囲に余白（バッファ）を追加:
  `gdalwarp -wo CUTLINE_ALL_TOUCHED=TRUE -srcnodata 0 -dstnodata 0 path/to/input.tif path/to/output.tif`

- 極性変換（北極・南極の変換）:
  `gdalwarp -s_srs "+proj=stere +lat_0=90 +lat_ts=70 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs" -t_srs EPSG:4326 path/to/input.tif path/to/output.tif`
