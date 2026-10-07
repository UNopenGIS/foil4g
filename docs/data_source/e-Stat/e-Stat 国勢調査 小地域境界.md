---
title: "e-Stat 国勢調査 小地域境界"
description: "国勢調査の町丁・字等の境界と人口・世帯数を持つポリゴン。人口密度の地図や施設への到達圏の集計に使えます。"
id: "estat_census_small_area"
provider_group: "e-Stat"
provider: "e-Stat"
categories: ["行政区域", "人口・社会"]
regions: ["アジア", "日本"]
formats: ["Shapefile", "GML", "KML"]
license: ["CC-BY-4.0"]
access: "split"
access_note: "調査年と都道府県・市区町村を選びZIPを取得。台東区のRange要求は206ではなく200だった。"
format: ["Shapefile", "GML", "KML"]
coverage: "日本全国。都道府県・市区町村単位で配布。"
period: "2020年国勢調査を例示。ほかの調査年は目録で選ぶ。"
url: "https://www.e-stat.go.jp/gis/statmap-search?type=2"
docs: "https://www.e-stat.go.jp/gis"
checked: "2026-10-07"
details: {"参考資料": "study-geoai-algo-py/docs/datasets/estat-boundary/README.md", "確認範囲": "2026-10-07に公式案内・利用条件と本文に記載した配布応答を確認。全国の実データの全件読込は未実施。"}
---

# e-Stat 国勢調査 小地域境界

> 国勢調査の町丁・字等の境界と人口・世帯数を持つポリゴン。人口密度の地図や施設への到達圏の集計に使えます。

## 概要・内容

総務省統計局の国勢調査の小地域境界をe-Statが配布しています。2020年版では町丁・字等のポリゴンに地域コード、名称、人口 (`JINKO`)、世帯数 (`SETAI`) などが付きます。人口密度、施設の利用圏、地域別の需要推計に使えます。

## 取り出し方・データ処理コマンド

[統計GISの目録](https://www.e-stat.go.jp/gis/statmap-search?type=2) から調査・地域・形式を選びます。2020年の台東区をJGD2011のShapefileとして取得する例です。

```sh
curl -fL 'https://www.e-stat.go.jp/gis/statmap-search/data?dlserveyId=A002005212020&code=13106&coordSys=1&format=shape&downloadType=5&datum=2011' -o census-2020-taito.zip
unzip -t census-2020-taito.zip
```

今回の先頭1,024バイトのRange要求にはHTTP 200が返りました。地域別に選べるため `split` として扱います。

## ライセンスと帰属表示

[e-Stat利用規約](https://www.e-stat.go.jp/terms-of-use) と [統計GIS機能利用規約](https://www.e-stat.go.jp/gis-terms) を確認してください。コンテンツの利用条件はe-Stat利用規約に準じます。同規約はCC BY 4.0に従う利用も認めています。出典・調査名と、加工した場合はその旨を記載します。

## 気をつけること

- 調査年と測地系を記録します。例では `datum=2011` を明示しています。
- Shapefileの日本語属性はShift_JIS系です。読込時の文字コードを確認します。
- 地域コードの先頭ゼロを保持します。飛び地などで同じ地域コードの複数ポリゴンがあるため、コードが一意とは限りません。
- 境界に付く人口・世帯数以外の詳細集計は、別配布の統計表を結合します。
- [[デジタル庁 アドレス・ベース・レジストリ]] の町字と同一の区分・識別子ではありません。

## 確認日

2026-10-07。配布応答は本文の例で確認しました。全国の全件数・精度・処理時間は今回測定していません。
