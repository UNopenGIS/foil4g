# SmartMaps Uppsala 紛争データ PMTiles

> [[UN Smart Maps]] が [[Uppsala Conflict Data Program]] の UCDP GED Global 23.1 (1989 年から 2022 年の武力紛争の出来事) を地図表示用に [[PMTiles]] にしたファイル

## データソース情報

| 項目           | 内容                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| データID       | smartmaps_uppsala_conflict_pmtiles                                                |
| ライセンス     | PMTiles には明記なし (元データの UCDP は [[CC-BY-4.0]] としている、下の帰属表示を参照) |
| 提供元         | [[UN Smart Maps]] (Source Cooperative の UN Smart Maps Group)                     |
| 元データ       | [[Uppsala Conflict Data Program]] の UCDP GED Global version 23.1                 |
| データ形式     | [[PMTiles]] v3 (ベクトルタイル MVT、gzip 圧縮)                                     |
| ファイルサイズ | 136,162,985 バイト (約 130MB)                                                      |
| 更新日         | 2024-06-29 (Last-Modified)                                                        |
| 更新頻度       | なし (23.1 から作った 1 ファイルだけ)                                              |
| 取り出し方     | HTTP Range で必要なタイルだけを読める                                              |
| URL            | https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles                     |
| 説明ページ     | https://source.coop/smartmaps/uppsala-conflict                                    |
| 作成手順       | https://github.com/optgeo/uppsala-conflict                                        |

## 概要

スウェーデンのウプサラ大学の [[Uppsala Conflict Data Program]] (UCDP) が作っている Georeferenced Event Dataset (GED) を、[[tippecanoe]] でベクトルタイルにしたものです。
GED は、組織的な暴力で 1 人以上が亡くなった出来事を 1 件 1 行で記録したデータで、場所、日付、死者数の推定を持っています。
Source Cooperative の題名は「PMTiles of UCDP (Uppsala Conflict Data Program) Georeferenced Event Dataset (GED) Global ver. 23.1」で、説明欄は GitHub の optgeo/uppsala-conflict を指しているだけです。

元にした版は GED Global 23.1 です。
GitHub の README と Makefile (`ged231-csv.zip` を取得している) に書かれており、属性 `year` の範囲 (1989 から 2022) とも合います。
PMTiles のメタデータ自体には版が書かれていません (name と description はどちらも `a.pmtiles`)。

この PMTiles は古い版です。
2026-10-06 時点の UCDP の最新版は GED Global 26.1 で、引用文献の題名から 2025 年までを扱っていると読めます。
23.1 には 2023 年以降の出来事が入っていないうえ、UCDP は版ごとに過去の行も改訂します。
新しい期間や改訂後の値が要るときは、[[UCDP 武力紛争データ]] から最新の CSV を取得してください。

## 中身

PMTiles のヘッダとメタデータから読み取った内容です。

- ズーム 0 から 12、タイル数 72,181。
- 範囲 (bounds) は 経度 -117.3 から 155.90、緯度 -37.81 から 68.98。
- 生成は `tippecanoe v2.28.0`、オプションは `--drop-densest-as-needed --maximum-zoom=12`。
- レイヤーは `event` の 1 つで、ジオメトリは点、地物数 316,818 (tilestats の値)、属性 46 個。

属性は元の CSV の列から `latitude`、`longitude`、`geom_wkt` を除いたものです。

- 識別: `id`, `relid`, `year`, `active_year`, `code_status`
- 暴力の種類: `type_of_violence` (1 国家が当事者の紛争、2 国家以外の組織どうしの紛争、3 民間人への一方的な暴力)
- 紛争と当事者: `conflict_new_id`, `conflict_name`, `dyad_new_id`, `dyad_name`, `side_a`, `side_b` と `*_dset_id`, `*_new_id`
- 出典: `number_of_sources`, `source_article`, `source_office`, `source_date`, `source_headline`, `source_original`
- 場所: `where_prec`, `where_coordinates`, `where_description`, `adm_1`, `adm_2`, `priogrid_gid`, `country`, `country_id`, `region`
- 時間: `event_clarity`, `date_prec`, `date_start`, `date_end`
- 死者数: `deaths_a`, `deaths_b`, `deaths_civilians`, `deaths_unknown`, `best`, `high`, `low`
- 国コード: `gwnoa`, `gwnob`

## 使うときの注意

- 低ズームでは点が間引かれています。作成スクリプトは `best` (死者数の推定) が 0 の出来事をズーム 8 以上にだけ載せ、さらに `--drop-densest-as-needed` で密な所を落としています。全件を数えたいときは、ズーム 12 のタイルを読むか、元の CSV を使います。
- `relid` は全件 0 です。元の CSV では `IRQ-1989-1-524-322` のような文字列ですが、作成スクリプト (`build.rb`) が整数に変換したため失われています。
- `number_of_sources` に -1 があります (欠損を表す値と見られます)。
- ファイル名にも中身にも版が入っていないので、同じ URL のまま差し替えられても区別できません。

## 取り出し方

サーバーは Range 要求に 206 で応え、CORS も許可しています (`access-control-allow-origin: *`)。
そのため [[MapLibre GL JS]] から `pmtiles://` で直接表示でき、[[pmtiles]] コマンドで範囲とズームを絞って一部だけを取り出せます。
例えばコンゴ民主共和国東部 (経度 28.5 から 29.5、緯度 -3.5 から -1.5) をズーム 8 まで取り出すと、約 1.3MB です。

## 帰属表示

PMTiles、Source Cooperative のページ、GitHub の README のどれにも、データのライセンスは書かれていません。
GitHub リポジトリの MIT ライセンスは作成スクリプトの条件で、データの条件ではありません。

元データについて、UCDP のダウンロードページは「All datasets are free of charge and licensed under CC BY 4.0」と書き、再配布の条件として各データセットに挙げた論文の引用を求めています。
ただしこの文言は「current UCDP datasets」についてのもので、旧版の 23.1 を名指ししてはいません。

使うときは、少なくとも次を表示します。

- UCDP Georeferenced Event Dataset (GED) Global version 23.1, Uppsala Conflict Data Program, Uppsala University ([[CC-BY-4.0]])
- PMTiles 化: UN Smart Maps (https://github.com/optgeo/uppsala-conflict)

GitHub の README が挙げている引用文献は次の 2 つです。

- Davies, Shawn, Therese Pettersson & Magnus Öberg (2023). Organized violence 1989-2022 and the return of conflicts between states?. Journal of Peace Research 60(4).
- Sundberg, Ralph and Erik Melander (2013). Introducing the UCDP Georeferenced Event Dataset. Journal of Peace Research 50(4).

## データ処理コマンド

```bash
# 大きさと更新日を確かめる
curl -sI https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles

# ヘッダとメタデータを表示する
pmtiles show https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles

# 範囲とズームを絞って取り出す (例: コンゴ民主共和国東部、ズーム 8 まで)
mkdir -p ./tmp
pmtiles extract https://data.source.coop/smartmaps/uppsala-conflict/a.pmtiles ./tmp/kivu.pmtiles \
  --bbox=28.5,-3.5,29.5,-1.5 --maxzoom=8

# 取り出したタイルを GeoJSON にする (GDAL 3.8 以降)
ogr2ogr -f GeoJSON ./tmp/kivu.geojson ./tmp/kivu.pmtiles -oo ZOOM_LEVEL=8 event
```

## 関連項目

- [[UCDP 武力紛争データ]]
- [[Uppsala Conflict Data Program]]
- [[UN Smart Maps]]
- [[UN Open GIS Initiative]]
- [[武力紛争]]
- [[平和研究]]
- [[PMTiles]]
- [[pmtiles]]
- [[tippecanoe]]
- [[MapLibre GL JS]]
- [[CC-BY-4.0]]

## 確認日

2026-10-06 に HEAD と Range 要求で大きさと Range 対応を、PMTiles のヘッダとメタデータで中身を確かめました。
版は Source Cooperative のページと GitHub の README、Makefile、build.rb で確かめました。
UCDP の最新版 (26.1) とライセンスの文言は、同じ日に UCDP のダウンロードページで確かめました。
