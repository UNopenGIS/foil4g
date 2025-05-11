## tile-join

> tile-join は、[[tippecanoe]]の一部で、既存の[[ベクトルタイル]]（.mbtiles、.pmtiles、ディレクトリ）を結合したり、CSV ファイルから新しい属性を追加したりするためのツールです。

- 複数の[[MBTiles]]ファイルを結合:
  `tile-join -o combined.mbtiles input1.mbtiles input2.mbtiles input3.mbtiles`

- CSVファイルの属性を既存のフィーチャーに結合:
  `tile-join -o with_attributes.mbtiles -c attributes.csv input.mbtiles`

- レイヤー名を変更:
  `tile-join -o renamed.mbtiles -r old_name:new_name input.mbtiles`

- フィルタを適用して特定のフィーチャーのみを含める:
  `tile-join -o filtered.mbtiles -j '{"*":["none",["==","property","value"]]}' input.mbtiles`
