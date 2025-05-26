# Protomaps Basemaps

> Protomaps Basemaps は、OpenStreetMap などのデータソースから PMTiles 形式のベースマップを生成し、それらを表示するための地図スタイルを提供するプロジェクトです。

[[Protomaps]] によって開発されているこのプロジェクトは、主に3つの要素から構成されています。

1.  **`app`**: ベースマップのビルドを表示・ダウンロードするためのシングルページアプリケーション ([maps.protomaps.com](https://maps.protomaps.com/))
2.  **`tiles`**: [[OpenStreetMap]] や Natural Earth のデータから `planet.pmtiles` を生成するための [Planetiler](https://github.com/onthegomap/planetiler) ビルドプロファイル。
3.  **`styles`**: [[MapLibre]] GL スタイルを生成する TypeScript パッケージ。複数のカラーテーマがあり、npm や JSON 形式で利用可能です。

フォントやスプライトなどのアセットは、[basemaps-assets](https://github.com/protomaps/basemaps-assets) リポジトリでホストされています。

このプロジェクトを利用することで、独自のベースマップタイルセットとスタイルを構築し、[[PMTiles]] 形式で効率的に配信することができます。

ライセンスに関しては、コードはBSD-3、地図デザインはCC0、タイルセットはODbL（OpenStreetMapへの帰属表示が必要）となっています。

詳細なドキュメントや利用方法については、[GitHubリポジトリ](https://github.com/protomaps/basemaps)を参照してください。

## 関連情報

- [[Protomaps]]
- [[PMTiles]]
- [[OpenStreetMap]]
- [[MapLibre]]
- [GitHubリポジトリ](https://github.com/protomaps/basemaps)
