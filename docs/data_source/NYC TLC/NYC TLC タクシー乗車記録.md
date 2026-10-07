---
title: "NYC TLC タクシー乗車記録"
description: "ニューヨーク市のタクシー・配車サービスの月別乗車記録。乗降ゾーンや時刻、運賃から移動需要と時系列を分析できます。"
id: "nyc_tlc_trips"
provider_group: "NYC TLC"
provider: "NYC TLC"
categories: ["交通", "人流・移動"]
regions: ["北米", "アメリカ合衆国", "ニューヨーク"]
formats: ["Parquet", "CSV", "Shapefile"]
license: ["unknown"]
access: "range"
access_note: "CloudFrontの月別ParquetにHTTP Rangeでアクセス。乗降ゾーンは公式の境界ZIP・コード表と結合する。"
format: ["Parquet", "CSV", "Shapefile"]
coverage: "ニューヨーク市を中心とするタクシー・配車サービスの記録。"
period: "種類ごとの月別配布。例はyellowの2026年7月。"
url: "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"
docs: "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"
checked: "2026-10-07"
details: {"参考資料": "study-geoai-algo-py/docs/datasets/nyc-tlc/README.md", "確認範囲": "2026-10-07に公式案内・利用条件と本文に記載した配布応答を確認。全国の実データの全件読込は未実施。"}
---

# NYC TLC タクシー乗車記録

> ニューヨーク市のタクシー・配車サービスの月別乗車記録。乗降ゾーンや時刻、運賃から移動需要と時系列を分析できます。

## 概要・内容

ニューヨーク市のTaxi and Limousine Commission (TLC) が配布するタクシー・配車サービスの乗車記録です。車両種別ごとの月別Parquetに、乗降時刻、乗降ゾーン、料金などがあります。時間帯ごとの需要、ゾーン間の移動、時系列予測や車両配置の分析に使えます。

## 取り出し方・データ処理コマンド

[公式の配布ページ](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) で種類・月とData Dictionaryを選びます。今回、yellowの2026年7月版にHTTP 206を確認しました。

```sql
-- DuckDB (httpfsを導入済みの環境)
LOAD httpfs;
SELECT PULocationID, count(*) AS trips
FROM read_parquet('https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2026-07.parquet')
GROUP BY PULocationID
ORDER BY trips DESC;
```

乗降ゾーンの名称は [公式CSV](https://d37ci6vzurychx.cloudfront.net/misc/taxi_zone_lookup.csv)、形状は [公式Shapefile ZIP](https://d37ci6vzurychx.cloudfront.net/misc/taxi_zones.zip) を使います。

## ライセンスと帰属表示

明確なデータ再配布ライセンスを確認できていないため、分類は `unknown` とします。[NYC.gov利用規約](https://www.nyc.gov/home/terms-of-use.page) と [AWS登録ページ](https://registry.opendata.aws/nyc-tlc-trip-records-pds/) の引用案内を参照し、TLC・対象月・アクセス日・出典URLを記載します。このカードは取得先を案内するもので、データ本体を再配布しません。

## 気をつけること

- 現行の乗降位置は主にゾーンIDです。個々の乗車地点の緯度経度を持つと思わないでください。
- 列は年・車両種別で異なります。複数ファイルをまとめるときはスキーマを確認します。
- UnknownやOutside of NYCのゾーンには対応する境界がありません。
- 古い第三者の境界変換版は、現在の乗車記録のIDと一致しない場合があります。公式の境界と照合します。
- Range対応は列単位の読込に有用ですが、月の中で行を少量だけ選べる保証ではありません。

## 確認日

2026-10-07。配布応答は本文の例で確認しました。全国の全件数・精度・処理時間は今回測定していません。
