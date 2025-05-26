# PMTiles

> PMTiles は、静的ストレージ上で単一ファイルにタイル化された地図データを格納するためのアーカイブ形式です。

Protomaps によって開発された PMTiles は、S3 のような汎用ストレージプラットフォーム上でホストすることができ、カスタムタイルバックエンドやサードパーティプロバイダを必要としない、低コストでメンテナンスフリーな「サーバーレス」マップアプリケーションを実現します。

主な特徴として、単一ファイルであることによるポータビリティの高さや、HTTP Range Requests を活用した効率的なタイルアクセスが挙げられます。これにより、クライアントは必要な部分のタイルデータのみをリクエストできます。

PMTiles の作成には `pmtiles` コマンドラインツールが提供されており、既存の `MBTiles` ファイルからの変換などが可能です。また、Leaflet や MapLibre GL JS、OpenLayers などの JavaScript ライブラリで PMTiles を直接利用するためのプラグインも提供されています。

仕様の詳細は[リポジトリ内のドキュメント](https://github.com/protomaps/PMTiles/blob/main/spec/v3/spec.md)で確認できます。

## 関連情報

-   [[martin]] (PMTiles をサポートするタイルサーバー)
-   [[MBTiles]] (PMTiles が影響を受けたタイル形式)
-   [[ベクトルタイル]]
-   [GitHubリポジトリ](https://github.com/protomaps/PMTiles)
-   [公式ドキュメント](https://protomaps.com/docs/pmtiles/)
