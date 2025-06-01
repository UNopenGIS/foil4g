# Overpass API

> **Overpass API**は**OpenStreetMap**マップデータの選択された部分を提供する読み取り専用APIです。カスタムクエリを使用してOSMデータから特定の情報を抽出することができます。

## API情報

- **API ID**: overpass_api
- **エンドポイントURL**: https://overpass-api.de/api/interpreter

## パラメータ

### 必須パラメータ

| パラメータ名 | 型     | 説明                                                                      |
| ------------ | ------ | ------------------------------------------------------------------------- |
| data         | string | Overpass APIに送信するクエリ。有効なOverpass QLクエリである必要があります |

## 関連項目

- [[OpenStreetMap]]
- [[Nominatim Search API]]
- [[Nominatim Reverse API]]
