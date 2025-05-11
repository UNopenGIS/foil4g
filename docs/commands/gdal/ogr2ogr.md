# ogr2ogr

> [[ベクターデータ]]、[[ベクトルタイル]]の変換・加工を行う[[GDAL]] / OGRユーティリティ。
> フォーマット変換、座標系変換、属性操作、空間フィルタリングなどが可能です。
> 詳細: https://gdal.org/programs/ogr2ogr.html

- 基本的な使用法（フォーマット変換例：ShapefileからGeoJSONへ）:
  `ogr2ogr -f GeoJSON output.geojson input.shp`

- 座標系を変換（例：EPSG:4326からEPSG:3857へ）:
  `ogr2ogr -s_srs EPSG:4326 -t_srs EPSG:3857 output.shp input.shp`

- 特定のレイヤーのみを変換:
  `ogr2ogr -f GeoJSON output.geojson input.gpkg -sql "SELECT * FROM layer_name"`

- SQLを使用して特定の条件に合うフィーチャーのみを抽出:
  `ogr2ogr -f GeoJSON output.geojson input.shp -where "population > 10000"`

- PostGISデータベースからデータをエクスポート:
  `ogr2ogr -f "ESRI Shapefile" output.shp PG:"host=localhost user=user dbname=gisdb password=pwd" -sql "SELECT * FROM schema.table"`

- データをPostGISデータベースにインポート:
  `ogr2ogr -f PostgreSQL PG:"host=localhost user=user dbname=gisdb password=pwd" input.shp -nln schema.table_name`

- 特定の属性フィールドのみを選択:
  `ogr2ogr -f GeoJSON output.geojson input.shp -select "field1,field2,field3"`

- 空間フィルタを適用（特定の範囲内のデータのみを抽出）:
  `ogr2ogr -f GeoJSON output.geojson input.shp -spat xmin ymin xmax ymax`

- 複数のファイルを一つに結合:
  `ogr2ogr -f "ESRI Shapefile" merged.shp input1.shp && ogr2ogr -f "ESRI Shapefile" -update -append merged.shp input2.shp -nln merged`

- 属性フィールド名を変更:
  `ogr2ogr -f GeoJSON output.geojson input.shp -sql "SELECT field1 AS new_name1, field2 AS new_name2 FROM input"`

- ジオメトリタイプを変換（例：ポリゴンからライン）:
  `ogr2ogr -f GeoJSON output.geojson input.shp -nlt LINESTRING`

- 出力を圧縮:
  `ogr2ogr -f "ESRI Shapefile" -dsco SPATIALITE=YES output.sqlite input.shp`

- データがない場合でも出力レイヤーを作成:
  `ogr2ogr -f GeoJSON output.geojson input.shp -nln new_layer_name -lco SPATIAL_INDEX=YES`

- CSVファイルを座標付きのGeoJSONに変換:
  `ogr2ogr -f GeoJSON output.geojson input.csv -oo X_POSSIBLE_NAMES=lon* -oo Y_POSSIBLE_NAMES=lat* -a_srs EPSG:4326`

- GeoJSONシーケンス形式(GeoJSONSeq)で出力:
  `ogr2ogr -f GeoJSONSeq output.geojsonl input.shp`
