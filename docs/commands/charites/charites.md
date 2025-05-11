# charites

> [[ベクトルタイル]]地図のスタイル設定を効率的に行うためのツール。
> [[YAML]]形式で[[MapLibre]]/[[Mapbox]]のStyle Specificationに準拠したスタイルを簡単に作成・編集できます。
> 詳細: https://unvt.github.io/charites/

- 基本的な使用法（スタイルYAMLファイルの初期化）:
  `charites init style.yml`

- 既存のstyle.jsonをYAML形式に変換:
  `charites convert style.json style.yml`

- YAMLからstyle.jsonをビルド:
  `charites build style.yml style.json`

- リアルタイムプレビュー付きでスタイルを編集:
  `charites serve style.yml`

- TileJSONのURLからレイヤーを自動生成してYAMLを初期化:
  `charites init --tilejson-urls https://example.com/tiles.json style.yml`

- 複数レイヤーを1つのYAMLに統合:
  `charites init --composite-layers style.yml`

- 圧縮されたstyle.jsonを生成:
  `charites build --compact-output style.yml style.json`

- YAMLの変更を監視し、変更時に自動ビルド:
  `charites build --watch style.yml style.json`

- スプライトURLを設定してビルド:
  `charites build --sprite-url "/sprites/" style.yml style.json`

- SVGアイコンをスプライトとしてビルド:
  `charites build --sprite-input icons/ style.yml style.json`

- 特定のプロバイダーを指定してプレビュー（mapbox, geolonia, default）:
  `charites serve --provider mapbox style.yml`

- Mapboxのアクセストークンを指定:
  `charites serve --mapbox-access-token YOUR_TOKEN style.yml`

- カスタムポート番号を指定してプレビュー:
  `charites serve --port 3000 style.yml`

- バージョン確認:
  `charites --version`

- ヘルプの表示:
  `charites --help`
