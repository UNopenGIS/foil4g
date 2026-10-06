---
title: OpenStreetMap Japan Overture Maps PMTiles
id: openstreetmap_jp_overture_pmtiles
provider: [OSMFJ (OpenStreetMap Foundation Japan), Overture Maps Foundation]
license: [CC-BY-4.0, ODbL-1.0]
license_note: テーマごとに異なる (ODbL のほか CC-BY 4.0 などを含む)
access: unconfirmed
access_note: 確かめられない (ファイルが削除済み)。配っていたころは 1 つの PMTiles で range だったと考えられる
format: PMTiles
size: 51GB (以前のページの値。確かめていません)
checked: 2026-10-06
details:
  状態: 削除済み (旧 URL は 404)
  元のリリース: Overture Maps 2024-07-22 (2024-08 の OSMFJ の発表資料による)
  旧 URL: https://tile.openstreetmap.jp/static/overture.pmtiles
  移転先 (案内): https://dev.smellman.org/static/overture-latest/
---

# OpenStreetMap Japan Overture Maps PMTiles

> [[OSMFJ]] のタイルサーバーがかつて配っていた、[[Overture Maps]] のデータをベクトルタイルにした [[PMTiles]] ファイル (2026-10-06 時点で削除済み)

## 概要

tile.openstreetmap.jp の `/static/` に、[[Overture Maps]] のデータを PMTiles にしたファイルが置かれていました。
OSMFJ のタイルサーバー管理者による 2024-08 の発表資料 (COSCUP 2024) には「Overture Maps vector tile data. Currently: 2024-07-22 release.」とあります。

2026-10-06 時点では、旧 URL への HEAD は 404 を返します。
`/static/README.txt` (2025-09-29 付け) には「The overture.pmtiles file was deleted, and https://dev.smellman.org/static/overture-latest/ is now used instead.」と書かれています。
移転先の `https://dev.smellman.org/static/overture-latest/` は、2026-10-06 に 2 回問い合わせて 2 回ともエラー (HTTP 530、Cloudflare の error code 1033) でした。
移転先のファイル名、大きさ、元にしたリリースは確かめていません。

## 取り出し方

旧 URL からは取得できません。
Overture Maps のデータを PMTiles で使いたいときは、Overture Maps Foundation がリリースごと・テーマごとに配っている PMTiles を使えます。

- URL の形: `https://overturemaps-extras-us-west-2.s3.us-west-2.amazonaws.com/tiles/<リリース>/<テーマ>.pmtiles`
- 例: https://overturemaps-extras-us-west-2.s3.us-west-2.amazonaws.com/tiles/2026-09-23.1/base.pmtiles (190,000,282,108 バイト、約 190GB)
- 最新のリリースは https://stac.overturemaps.org/catalog.json で分かります (2026-09-28 時点で `2026-09-23.1`)。

いずれも大きいので、丸ごとのダウンロードは避け、HTTP Range で必要な範囲だけを読みます。

## 帰属表示

Overture Maps のデータは、テーマや種類ごとにライセンスと帰属表示が違います。
2026-09-23.1 のリリースでは、buildings、transportation、divisions、base の多くが [[ODbL]] 1.0、base の land_cover が CC-BY 4.0、bathymetry が CC0 1.0、places と addresses は元データごとの条件です。
2024-07-22 のリリースの条件は確かめていません。
帰属表示の書き方は https://docs.overturemaps.org/attribution/ を見ます。

以前のページはライセンスを ODbL だけとしていましたが、テーマによっては ODbL ではありません。

## 関連項目

- [[OpenStreetMap Japan Planet PMTiles]]
- [[OSMFJ]]
- [[Overture Maps]]
- [[Overture Maps Foundation]]
- [[PMTiles]]
- [[ODbL]]

## 確認日

2026-10-06 に旧 URL への HEAD、`/static/` のディレクトリ一覧と README.txt、Overture Maps のドキュメント (examples/overture-tiles) を読み、Overture の base.pmtiles に HEAD して確かめました。
テーマごとのライセンスは、2026-09-28 に STAC カタログを読んだ調査メモの値です (自分では確かめていません)。
移転先の dev.smellman.org は応答せず、確かめられませんでした。
