import { PMTilesSource } from "../../../types/PMTilesSource";

export const VientianeLandusePMTilesSource: PMTilesSource = {
  id: "vientiane-landuse-source",
  url: "pmtiles://https://optgeo.github.io/vientiane-landuse/vientiane-landuse.pmtiles/{z}/{x}/{y}",
  type: "vector",
  attribution: "VirGo",
  maxzoom: 14,
  minzoom: 2,

  layers: [
    {
      id: "vientiane-landuse-layer",
      type: "fill",
      source: "vientiane-landuse-source",
      sourceLayer: "vientiane-landuse-source",
      paint: {
        "fill-color": [
          "match",
          ["get", "l1"],
          "A",
          "rgba(152, 251, 152, 0.8)", // Agriculture (農業): 淡い黄緑色
          "B",
          "rgba(245, 245, 220, 0.8)", // Building (建物): ベージュ
          "C",
          "rgba(230, 230, 250, 0.8)", // Culturally (文化): ラベンダー
          "D",
          "rgba(128, 128, 0, 0.8)", // Defend (防衛): オリーブ
          "F",
          "rgba(119, 221, 119, 0.8)", // Forest (森林): パステルグリーン
          "I",
          "rgba(105, 105, 105, 0.8)", // Industry (産業): 鉄色
          "R",
          "rgba(220, 220, 220, 0.8)", // Road (道路): 薄灰色
          "W",
          "rgba(173, 216, 230, 0.8)", // Water (水域): ライトブルー
          /* その他の値にはデフォルト色を指定 */
          "rgba(0, 0, 0, 0.8)", // デフォルト: 40% 透過の黒色
        ],
      },
    },
  ],
};
