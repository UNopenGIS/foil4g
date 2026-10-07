---
title: "PLATEAU 3D都市モデル"
description: "建物などの形状と属性を持つ日本の3D都市モデル。都市ごとの公開データを選び、防災やまちづくりの検討に使えます。"
id: "mlit_plateau"
provider_group: "国土交通省"
provider: "国土交通省"
categories: ["建物", "都市計画"]
regions: ["アジア", "日本"]
formats: ["CityGML"]
license: ["other"]
access: "catalog"
access_note: "G空間情報センターのCKAN APIで都市・年度・資源を選択。CityGML ZIPの分割単位はデータセットごとに確認する。"
format: ["CityGML"]
coverage: "日本の公開対象都市。全国のすべての建物を網羅するものではない。"
period: "都市・データセットごとに整備年度が異なる。"
url: "https://www.mlit.go.jp/plateau/open-data/"
docs: "https://www.mlit.go.jp/plateau/"
checked: "2026-10-07"
details: {"参考資料": "study-geoai-algo-py/docs/datasets/plateau/README.md", "確認範囲": "2026-10-07に公式案内・利用条件と本文に記載した配布応答を確認。全国の実データの全件読込は未実施。"}
---

# PLATEAU 3D都市モデル

> 建物などの形状と属性を持つ日本の3D都市モデル。都市ごとの公開データを選び、防災やまちづくりの検討に使えます。

## 概要・内容

Project PLATEAUが整備・公開する3D都市モデルです。建物等の3次元形状と属性を持ち、都市計画、防災、景観や日照の検討に使えます。基本形式はCityGMLで、都市や整備年度によって収録地物・属性・LODが異なります。

## 取り出し方・データ処理コマンド

[公式の都市一覧](https://www.mlit.go.jp/plateau/open-data/) からG空間情報センターへ進めます。CKAN APIでもデータセットと資源のURLを取得できます。

```sh
curl -fL 'https://www.geospatial.jp/ckan/api/3/action/package_show?id=plateau-tokyo23ku-citygml-2020' -o plateau-tokyo23ku.json
jq '.result | {title, license_id, license_title, resources: [.resources[] | {name, url}]}' plateau-tokyo23ku.json
```

今回このAPIのHTTP 200とJSONを確認しました。例は東京23区の2020年度版であり、最新の整備年度を意味しません。目録で都市・年度を選ぶため `catalog` に分類します。

## ライセンスと帰属表示

CKANの当該データセットは独自の `plateau` ライセンス識別子を持ち、[PLATEAUサイトポリシー](https://www.mlit.go.jp/plateau/site-policy/) の著作権に関する条件を参照しています。同ポリシーは適用対象のコンテンツについてCC BY 4.0に従う利用も認めています。一覧上は元の独自条件を示す `other` とし、対象資源の利用条件・出典表示・測量法に関する注記を個別に確認します。都市ごとのデータを一律の条件とみなさないでください。

## 気をつけること

- LODは地物の形状の詳細度です。都市全域で同じLODや属性が揃うとは限りません。
- CityGMLの座標系と高さの基準を確認してから、ほかのデータと重ねます。
- ZIP内のCityGMLを扱うには形式に対応したツールが必要です。配布URLのRange対応だけで地物単位の部分取得ができるわけではありません。
- 建物の平面形状を広域で扱う用途には [[Overture Maps]] も候補になります。

## 確認日

2026-10-07。配布応答は本文の例で確認しました。全国の全件数・精度・処理時間は今回測定していません。
