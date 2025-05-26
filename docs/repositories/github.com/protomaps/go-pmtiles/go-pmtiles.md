# go-pmtiles

> go-pmtiles は、PMTiles アーカイブを作成・操作するための単一実行ファイル形式のツールです。

[[Protomaps]] によって開発された `go-pmtiles` は、[[PMTiles]] フォーマットのファイルを扱うためのコマンドラインインターフェースを提供します。Go 言語で記述されており、クロスプラットフォームで動作する単一の実行ファイルとして配布されています。

主な機能として、既存のタイルセット (例えば [[MBTiles]] ファイル) から [[PMTiles]] ファイルへの変換、[[PMTiles]] ファイルの検証、メタデータの表示、タイルデータの抽出などがあります。また、S3 などのクラウドストレージへのアップロード機能も備えています。

`go-pmtiles` は、[[PMTiles]] を活用したサーバーレスな地図配信ワークフローにおいて重要な役割を担います。

詳細なドキュメントや利用方法については、[公式ドキュメント](https://docs.protomaps.com/pmtiles/cli)を参照してください。

## 関連情報

-   [[PMTiles]]
-   [[Protomaps]]
-   [GitHubリポジトリ](https://github.com/protomaps/go-pmtiles)
