# ogrinfo

> ベクターデータセットの情報を表示するOGRユーティリティ。
> OGRでサポートされている様々な形式のベクターデータの情報を取得できます。
> 詳細: https://gdal.org/programs/ogrinfo.html

- 基本的な使用法（ファイルの情報とレイヤー一覧を表示）:
  `ogrinfo path/to/vector.shp`

- 特定のレイヤーの詳細情報を表示:
  `ogrinfo path/to/vector.shp layer_name`

- ファイル内の全てのレイヤーの詳細情報を表示:
  `ogrinfo -al path/to/vector.shp`

- フィーチャーカウントのみを表示:
  `ogrinfo -so path/to/vector.shp layer_name`

- 特定のフィーチャーの情報を表示（IDを指定）:
  `ogrinfo path/to/vector.shp layer_name -fid 1`

- 属性とジオメトリの要約情報を表示:
  `ogrinfo -so -al path/to/vector.shp`

- 空間的な範囲（エンベロープ）のみを表示:
  `ogrinfo -so -al -where "1=1" path/to/vector.shp`

- SQL文を使用して条件に合うフィーチャーの情報を表示:
  `ogrinfo -sql "SELECT * FROM layer_name WHERE attribute = 'value'" path/to/vector.shp`

- ベクターデータの座標系情報を表示:
  `ogrinfo -al -so path/to/vector.shp`

- フォーマットを指定してファイルを開く（例：GeoJSON）:
  `ogrinfo -f GeoJSON path/to/vector.geojson`

- 出力をCSV形式で取得:
  `ogrinfo -al -fo CSV path/to/vector.shp`

- データベース接続からレイヤー情報を表示（例：PostGIS）:
  `ogrinfo PG:"host=localhost user=user dbname=gisdb password=password" schema.table_name`

- ネットワーク上のデータを表示（WFS等）:
  `ogrinfo WFS:http://example.com/geoserver/wfs`

- 特定のフィールドの値だけを表示:
  `ogrinfo -sql "SELECT DISTINCT field_name FROM layer_name" path/to/vector.shp`
