# gdalbuildvrt

> 複数の[[ラスターデータ]]から仮想ラスターデータセット（VRT）を構築する[[GDAL]]ユーティリティ。
> VRTはデータを複製せずに複数のラスターデータを仮想的に結合します。
> 詳細: https://gdal.org/programs/gdalbuildvrt.html

- 基本的な使用法（複数のファイルからVRTを作成）:
  `gdalbuildvrt output.vrt input1.tif input2.tif input3.tif`

- ディレクトリ内の全てのTIFファイルからVRTを作成:
  `gdalbuildvrt output.vrt path/to/directory/*.tif`

- ファイルリストからVRTを作成:
  `gdalbuildvrt output.vrt -input_file_list file_list.txt`

- 複数のファイルをモザイク（結合）してVRTを作成:
  `gdalbuildvrt -resolution highest output.vrt *.tif`

- 特定のバンドのみを使用してVRTを作成:
  `gdalbuildvrt -b 1 -b 3 output.vrt input.tif`

- 画像のオーバーラップ部分の処理方法を指定（最初、最後、平均、最大値など）:
  `gdalbuildvrt -srcnodata 0 -vrtnodata 0 -resolution highest output.vrt *.tif`

- 時系列データセットからマルチバンドVRTを作成（各ファイルが1つのバンドになる）:
  `gdalbuildvrt -separate output.vrt time1.tif time2.tif time3.tif`

- 出力範囲を指定してVRTを作成:
  `gdalbuildvrt -te xmin ymin xmax ymax output.vrt *.tif`

- 特定の空間参照系でVRTを作成:
  `gdalbuildvrt -a_srs EPSG:4326 output.vrt *.tif`

- NoDataの値を指定してVRTを作成:
  `gdalbuildvrt -srcnodata 255 -vrtnodata 0 output.vrt *.tif`
