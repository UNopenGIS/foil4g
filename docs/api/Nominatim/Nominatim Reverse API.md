# Nominatim Reverse API

> Nominatimは**OpenStreetMap**データを名前や住所でジオコーディング検索し、OSMポイントの合成住所を生成する（リバースジオコーディング）ツールです。このAPIは座標から住所情報を取得するためのリバースジオコーディング機能を提供します。

## API情報

- **API ID**: nominatim_reverse
- **エンドポイントURL**: https://nominatim.openstreetmap.org/reverse

## パラメータ

### 必須パラメータ

| パラメータ名 | 型     | 説明                                   |
| ------------ | ------ | -------------------------------------- |
| format       | string | レスポンスの形式（例: jsonv2）         |
| lat          | float  | リバースジオコーディングする位置の緯度 |
| lon          | float  | リバースジオコーディングする位置の経度 |

### オプションパラメータ

| パラメータ名 | 型      | 説明                                   |
| ------------ | ------- | -------------------------------------- |
| zoom         | integer | レスポンスに必要な詳細レベル（例: 10） |

## 関連項目

- [[Nominatim Search API]]
- [[OpenStreetMap]]
- [[ジオコーディング]]
