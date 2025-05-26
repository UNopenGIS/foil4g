# Martin

> Martin は、PostGIS、MBTiles、PMTiles から動的にベクトルタイルを生成・配信できる、軽量かつ高速なタイルサーバーです。

[[MapLibre]] プロジェクトの一部として Rust で開発されている Martin は、速度と高トラフィック処理に最適化されています。主な機能として、PostGIS データベース内のテーブルや関数を自動検出し、[[ベクトルタイル]]を生成する機能や、[[PMTiles]]、[[MBTiles]] ファイルからのタイル配信機能があります。また、複数のタイルソースを一つにまとめる機能や、スプライト、フォントグリフの生成機能も備えています。

`martin-cp` ツールを使えば、Martin がサポートする任意のソースから `MBTiles` ファイルへの一括タイル生成が可能です。さらに、`mbtiles` ツールにより、`MBTiles` ファイルの検査、コピー、検証、比較、差分適用などが行えます。

詳細なドキュメントや利用方法については、[公式ウェブサイト](https://maplibre.org/martin/)を参照してください。

## 関連情報

-   [[MapLibre]]
-   [[maplibre-gl-js]]
-   [[PMTiles]]
-   [[MBTiles]]
-   [[ベクトルタイル]]
-   [GitHubリポジトリ](https://github.com/maplibre/martin)
