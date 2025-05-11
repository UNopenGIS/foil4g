# gdal_translate

> ラスターデータセットを別の形式に変換する[[GDAL]]ユーティリティ。
> フォーマット変換、リサイズ、リサンプリング、データ型変換などが可能です。
> 詳細: https://gdal.org/programs/gdal_translate.html

- 基本的な使用法（フォーマット変換例：GeoTIFFからJPEGに変換）:
  `gdal_translate -of JPEG path/to/input.tif path/to/output.jpg`

- 出力サイズを指定（ピクセル数を指定）:
  `gdal_translate -outsize 800 600 path/to/input.tif path/to/output.tif`

- 出力サイズを元のサイズに対する割合で指定（50%に縮小）:
  `gdal_translate -outsize 50% 50% path/to/input.tif path/to/output.tif`

- 出力データ型を変更（例：Float32からInt16へ）:
  `gdal_translate -ot Int16 path/to/input.tif path/to/output.tif`

- ノーデータ値を設定（透明部分や欠損値の指定）:
  `gdal_translate -a_nodata 0 path/to/input.tif path/to/output.tif`

- 特定の範囲を切り出し（左上X, 左上Y, 右下X, 右下Yの順）:
  `gdal_translate -projwin 440720 3751320 441920 3750120 path/to/input.tif path/to/output.tif`

- 圧縮オプションを指定（LZW圧縮を使用）:
  `gdal_translate -co COMPRESS=LZW path/to/input.tif path/to/output.tif`

- 特定のバンドのみを抽出（例：3バンドのデータから1番目と3番目のバンドのみ抽出）:
  `gdal_translate -b 1 -b 3 path/to/input.tif path/to/output.tif`

- スケーリングを適用（元の値の範囲[0,1000]を新しい範囲[0,255]に変換）:
  `gdal_translate -scale 0 1000 0 255 path/to/input.tif path/to/output.tif`

- 特定の座標系に変換（EPSG:4326に変換）:
  `gdal_translate -a_srs EPSG:4326 path/to/input.tif path/to/output.tif`

- メタデータを追加:
  `gdal_translate -mo "AUTHOR=GIS専門家" path/to/input.tif path/to/output.tif`

- オーバービューの作成（ピラミッド作成）:
  `gdal_translate -outsize 50% 50% -co "COPY_SRC_OVERVIEWS=YES" path/to/input.tif path/to/output.tif`

- クラウドストレージからのデータを変換:
  `gdal_translate /vsicurl/https://example.com/path/to/input.tif path/to/output.tif`
