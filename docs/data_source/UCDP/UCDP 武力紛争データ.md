# UCDP 武力紛争データ

> **[[Uppsala Conflict Data Program]]** (UCDP)は、世界の武力紛争に関する包括的なデータベースを提供する研究機関です。このデータセットは地理的に特定された武力紛争事件データを含みます。

## データソース情報

- **データID**: ucdp_ged_23_1
- **ライセンス**: [[CC-BY-4.0]]
- **提供者**:
  - [[Uppsala Conflict Data Program]]
- **データ形式**: [[Zipped CSV]]
- **ファイル形式**: zip
- **ファイルサイズ**: 23MB
- **URL**: https://ucdp.uu.se/downloads/ged231-csv.zip

## 説明

**[[Uppsala Conflict Data Program]]** (UCDP)による武力紛争データ。地理的に特定された武力紛争事件の詳細情報を含み、平和研究、安全保障研究、政策立案などに活用されています。

## データ処理コマンド

### 基本処理（ダウンロード・解凍・PostGISインポート）

```bash
# 1. ダウンロード
mkdir -p ./tmp
wget https://ucdp.uu.se/downloads/ged/ged231-csv.zip -O ./tmp/ged231-csv.zip

# 2. 解凍
unzip ./tmp/ged231-csv.zip -d ./tmp

# 3. [[PostGIS]]データベースへのインポート（オプション）
[[ogr2ogr]] \
  -overwrite \
  -f "[[PostgreSQL]]" PG:"dbname=tileserv user=postgres password=postgres host=localhost port=54321" \
  -oo AUTODETECT_TYPE=YES \
  -oo GEOM_POSSIBLE_NAMES=geom_wkt \
  -oo X_POSSIBLE_NAMES=longitude \
  -oo Y_POSSIBLE_NAMES=latitude \
  -a_srs [[EPSG:4326]] \
  -lco FID=id \
  -nln "ucdp_ged" \
  --config PG_USE_COPY YES \
  --debug ON \
  ./tmp/GEDEvent_v23_1.csv
```

### PMTiles変換処理

```bash
# 完全な処理パイプライン（ダウンロード→解凍→GeoJSON変換→PMTiles変換）

# 1. ダウンロード
mkdir -p tmp/ucdp.uu.se
wget https://ucdp.uu.se/downloads/ged/ged231-csv.zip -O tmp/ucdp.uu.se/ged231-csv.zip

# 2. 解凍
unzip -f tmp/ucdp.uu.se/ged231-csv.zip -d tmp/ucdp.uu.se

# 3. [[CSV]]から[[GeoJSON]]への変換
[[ogr2ogr]] \
  -overwrite \
  -f [[GeoJSON]] \
  -oo X_POSSIBLE_NAMES=longitude \
  -oo Y_POSSIBLE_NAMES=latitude \
  -a_srs [[EPSG:4326]] \
  --debug ON \
  tmp/ucdp.uu.se/GEDEvent_v23_1.geojson \
  tmp/ucdp.uu.se/GEDEvent_v23_1.csv

# 4. [[GeoJSON]]から[[PMTiles]]への変換
[[tippecanoe]] \
  -Z1 \
  -z18 \
  -pf \
  -pk \
  -P \
  -o tmp/ucdp.uu.se/GEDEvent_v23_1.pmtiles \
  tmp/ucdp.uu.se/GEDEvent_v23_1.geojson
```

### 手動処理コマンド

#### 基本処理

```bash
# 1. ダウンロード
mkdir -p ./tmp
wget https://ucdp.uu.se/downloads/ged/ged231-csv.zip -O ./tmp/ged231-csv.zip

# 2. 解凍
unzip ged231-csv.zip -d ./tmp
```

#### PostGISインポート

```bash
# OGR2OGRを使用してPostGISデータベースに登録
ogr2ogr \
  -overwrite \
  -f "PostgreSQL" PG:"dbname=tileserv user=postgres password=postgres host=localhost port=54321" \
  -oo AUTODETECT_TYPE=YES \
  -oo GEOM_POSSIBLE_NAMES=geom_wkt \
  -oo X_POSSIBLE_NAMES=longitude \
  -oo Y_POSSIBLE_NAMES=latitude \
  -a_srs EPSG:4326 \
  -lco FID=id \
  -nln "ucdp_ged" \
  --config PG_USE_COPY YES \
  --debug ON \
  ./tmp/GEDEvent_v23_1.csv
```

### 処理概要

- **基本処理**: ZIPファイルのダウンロードと解凍、PostGISデータベースへのインポート
- **PMTiles変換**: CSVからGeoJSON、さらにPMTiles形式への変換でウェブマップ利用を可能にする
- **データ形式**: 地理的に特定された武力紛争事件の詳細情報（緯度・経度付き）
- **用途**: 平和研究、安全保障研究、政策立案、紛争データの可視化

### 使用ツール

- **wget**: HTTPダウンロード
- **unzip**: ZIP圧縮ファイルの展開
- **[[ogr2ogr]]**: 地理空間データ変換と[[PostGIS]]インポート
- **[[tippecanoe]]**: [[GeoJSON]]からベクタータイル（[[PMTiles]]）への変換

## 関連項目

- [[Uppsala Conflict Data Program]]
- [[武力紛争]]
- [[平和研究]]
- [[CC-BY-4.0]]
- [[CSV]]
- [[GeoJSON]]
- [[PMTiles]]
- [[SmartMaps Uppsala 紛争データ PMTiles]]
- [[PostGIS]]
- [[PostgreSQL]]
- [[ogr2ogr]]
- [[tippecanoe]]
- [[EPSG:4326]]
