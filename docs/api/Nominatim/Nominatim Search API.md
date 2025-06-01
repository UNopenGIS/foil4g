# Nominatim Search API

> Nominatimは**OpenStreetMap**データを名前や住所でジオコーディング検索し、OSMポイントの合成住所を生成する（リバースジオコーディング）ツールです。このAPIは場所名や住所から座標情報を取得するための検索機能を提供します。

## API情報

- **API ID**: nominatim_search
- **エンドポイントURL**: https://nominatim.openstreetmap.org/search

## パラメータ

### 必須パラメータ

| パラメータ名 | 型     | 説明                           |
| ------------ | ------ | ------------------------------ |
| format       | string | レスポンスの形式（例: jsonv2） |
| q            | string | 検索クエリ（例: 場所名や住所） |

## 関連項目

- [[Nominatim Reverse API]]
- [[OpenStreetMap]]
- [[ジオコーディング]]
