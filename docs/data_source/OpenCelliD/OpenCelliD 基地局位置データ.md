# OpenCelliD 基地局位置データ

> **OpenCelliD**は、携帯電話基地局のGPS位置情報を収集する世界最大の協同コミュニティプロジェクトです。

## データソース情報

- **データID**: opencellid_full
- **ライセンス**: [[CC-BY-SA-4.0]]
- **提供者**:
  - [[OpenCelliD]]
  - https://opencellid.org/
- **データ形式**: [[CSV]]
- **ファイル形式**: gzipped_csv
- **ファイルサイズ**: 105MB
- **URL**: https://opencellid.org/ocid/downloads?token={api_key}&type=full&file=cell_towers.csv.gz

## 説明

世界中の携帯電話基地局のGPS位置情報を収集したデータセット。通信インフラの分析、電波エリア解析、位置情報サービスの開発などに活用できます。

## 関連項目

- [[OpenCelliD]]
- [[基地局]]
- [[GPS]]
- [[CC-BY-SA-4.0]]
- [[CSV]]

## データ処理コマンド

### 完全な処理パイプライン

```bash
# 1. 圧縮CSVファイルのダウンロード
mkdir -p tmp/opencellid.org
wget https://opencellid.org/downloads/cell_towers.csv.gz -O tmp/opencellid.org/cell_towers.csv.gz

# 2. CSVファイルの展開
gunzip -c tmp/opencellid.org/cell_towers.csv.gz > tmp/opencellid.org/cell_towers.csv

# 3. CSVからGeoJSONへの変換
ogr2ogr \
  -overwrite \
  -f GeoJSON \
  -oo X_POSSIBLE_NAMES=lon \
  -oo Y_POSSIBLE_NAMES=lat \
  tmp/opencellid.org/cell_towers.geojson \
  tmp/opencellid.org/cell_towers.csv

# 4. GeoJSONからPMTilesへの変換
tippecanoe \
  -Z1 \
  -z18 \
  -pf \
  -pk \
  -P \
  -o tmp/opencellid.org/cell_towers.pmtiles \
  tmp/opencellid.org/cell_towers.geojson
```

### 処理概要

- **ダウンロード**: OpenCelliDサイトから圧縮CSVファイルを取得
- **展開**: gzipファイルを展開してCSV形式に変換
- **地理空間変換**: ogr2ogrでCSVからGeoJSONに変換（経度・緯度列を指定）
- **ベクタータイル化**: tippecnoeでGeoJSONからPMTiles形式に変換
- **結果**: ウェブマップで利用可能なベクタータイル形式の基地局データ

### 使用ツール

- **wget**: HTTPダウンロード
- **gunzip**: gzip圧縮ファイルの展開
- **ogr2ogr**: CSVからGeoJSONへの地理空間データ変換
- **tippecanoe**: GeoJSONからベクタータイル（PMTiles）への変換
