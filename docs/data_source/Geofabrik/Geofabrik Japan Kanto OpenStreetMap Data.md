# Geofabrik Japan Kanto OpenStreetMap Data

> [[Geofabrik]]による日本関東地方の[[OpenStreetMap]]データ抽出ファイル

## データソース情報

| 項目             | 内容                                                          |
| ---------------- | ------------------------------------------------------------- |
| **データID**     | geofabrik_asia_japan_kanto                                    |
| **ライセンス**   | [[ODbL-1.0]]                                                  |
| **データ形式**   | [[OSM PBF]]                                                   |
| **ファイル形式** | PBF                                                           |
| **提供元**       | [[Geofabrik]] GmbH                                            |
| **URL**          | https://download.geofabrik.de/asia/japan/kanto-latest.osm.pbf |

## 概要

[[Geofabrik]] GmbHが提供する日本の関東地方の[[OpenStreetMap]]データ抽出ファイルです。東京都、神奈川県、埼玉県、千葉県、茨城県、栃木県、群馬県の詳細な地理情報データが含まれています。

## 帰属表示

- [[Geofabrik]] GmbH
- [[OpenStreetMap]] Contributors

## 関連項目

- [[Geofabrik Japan OpenStreetMap Data]]
- [[Geofabrik Monaco OpenStreetMap Data]]
- [[OpenStreetMap]]
- [[ODbL]]
- [[オープンストリートマップ]]
- [[オープンデータ]]
- [[Geofabrik]]
- [[OSM PBF]]

## データ処理コマンド

### ダウンロード処理

```bash
# ディレクトリ作成とPBFファイルダウンロード
mkdir -p ./tmp
wget https://download.geofabrik.de/asia/japan/kanto-latest.osm.pbf -O ./tmp/kanto-latest.osm.pbf
```

### データ変換・活用例

```bash
# [[osmium]]を使用したOSMデータ処理
[[osmium]] fileinfo tmp/kanto-latest.osm.pbf
[[osmium]] export tmp/kanto-latest.osm.pbf -f geojson -o tmp/kanto.geojson

# osm2pgsqlを使用した[[PostGIS]]インポート
osm2pgsql -d osm_kanto -H localhost -U postgres tmp/kanto-latest.osm.pbf

# [[ogr2ogr]]を使用した形式変換
[[ogr2ogr]] -f [[GeoJSON]] tmp/kanto.geojson tmp/kanto-latest.osm.pbf
```

### 処理概要

- **ダウンロード**: [[Geofabrik]]サイトから関東地方の[[OSM PBF]]ファイルを取得
- **対象地域**: 東京都、神奈川県、埼玉県、千葉県、茨城県、栃木県、群馬県
- **用途**: [[osmium]]、osm2pgsql、[[ogr2ogr]]を使用して各種形式に変換可能
