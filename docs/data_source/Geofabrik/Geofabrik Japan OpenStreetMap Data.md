# Geofabrik Japan OpenStreetMap Data

> **[[Geofabrik]]**は、世界各国・地域別の**[[OpenStreetMap]]**データ抽出ファイルを提供するサービスです。このデータソースは日本のOSMデータの最新版を提供します。

## データソース情報

- **データID**: geofabrik_asia_japan
- **ライセンス**: [[ODbL-1.0]]
- **提供者**:
  - [[Geofabrik]] GmbH
  - [[OpenStreetMap]] Contributors
- **データ形式**: [[OSM PBF]]
- **ファイル形式**: pbf
- **ファイルサイズ**: 不明
- **URL**: https://download.geofabrik.de/asia/japan-latest.osm.pbf

## 説明

日本の**OpenStreetMap**データ抽出ファイル。地理空間データの解析や地図作成に使用できます。

## データ処理コマンド

### ダウンロード処理

```bash
# ディレクトリ作成とPBFファイルダウンロード
mkdir -p ./tmp
wget https://download.geofabrik.de/asia/japan/japan-latest.osm.pbf -O ./tmp/japan-latest.osm.pbf
```

### データ変換・活用例

```bash
# [[osmium]]を使用したOSMデータ処理
[[osmium]] fileinfo tmp/japan-latest.osm.pbf
[[osmium]] export tmp/japan-latest.osm.pbf -f geojson -o tmp/japan.geojson

# osm2pgsqlを使用した[[PostGIS]]インポート
osm2pgsql -d osm_japan -H localhost -U postgres tmp/japan-latest.osm.pbf

# [[ogr2ogr]]を使用した形式変換
[[ogr2ogr]] -f [[GeoJSON]] tmp/japan.geojson tmp/japan-latest.osm.pbf
```

### 処理概要

- **ダウンロード**: [[Geofabrik]]サイトから[[OSM PBF]]ファイルを取得
- **変換**: [[osmium]]、osm2pgsql、[[ogr2ogr]]を使用して各種形式に変換可能
- **用途**: [[QGIS]]での直接読み込み、[[PostgreSQL]]/[[PostGIS]]へのインポート、他の地理空間データ形式への変換

## 関連項目

- [[OpenStreetMap]]
- [[Geofabrik]]
- [[ODbL]]
- [[OSM PBF]]
- [[Geofabrik Japan Kanto OpenStreetMap Data]]
- [[osmium]]
- [[osm2pgsql]]
- [[ogr2ogr]]
- [[QGIS]]
- [[PostgreSQL]]
- [[PostGIS]]
- [[GeoJSON]]
