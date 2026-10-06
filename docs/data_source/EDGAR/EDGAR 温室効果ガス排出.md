---
id: edgar_ghg
provider: 欧州委員会 共同研究センター (European Commission, Joint Research Centre, JRC) の EDGAR チーム。化石 CO2 は 国際エネルギー機関 (IEA) との共同
source_data: なし (一次データ。ただし推計の材料として IEA World Energy Balances、IEA Greenhouse Gas Emissions from Energy、FAOSTAT、USGS、IFA、GFMR/NOAA、UNFCCC、worldsteel などの統計を使っている)
license: [CC-BY-NC-ND-4.0, CC-BY-4.0]
license_note: 'CH4、N2O、F ガス、バイオ CO2: CC-BY-4.0。改変、再配布、商用利用ができる。出典の表示と、変更したならその旨の表示が要る / 化石 CO2 = IEA-EDGAR CO2: CC BY-NC-ND 4.0。自由には使えない。非商用に限られ、改変したものは配れない。それ以外の使い方は IEA (compliance@iea.org) の許可が要る / CO2 換算の合計 GWP_100_AR5_GHG: 配布元に明記なし。化石 CO2 を足し込んだ値なので、化石 CO2 と同じ条件で扱うのが安全 (下の「ライセンスと帰属表示」)'
access: split
access_note: split。物質 × 部門 × 形式 × 年でファイルが分かれていて、必要な物質・部門・年の zip だけを取れる。最小単位は 1 物質 1 部門 1 年の格子 zip (CH4 合計の 2025 年で 16,477,890 バイト)。zip の中の NetCDF は deflate 圧縮なので、ファイルの中は whole (Range で zip の目次は読めるが、NetCDF の一部の領域だけは読めない)
format: 国別の表は xlsx (zip 入り)。格子は NetCDF-4 (排出量 `emi_nc` とフラックス `flx_nc`) とテキスト (`emi_txt`)、どれも zip 入り
coverage: 全世界。格子は経度 -180〜180、緯度 -90〜90。国別の表は CH4 で 221 の国・地域と国際航空 (AIR)、国際海運 (SEA)
period: '年別: 1970〜2025 年 (F ガスは 1990〜2025 年)。月別の国別表: 1970〜2025 年 (CO2、CO2bio、CH4、N2O のみ)。月別の格子: 2000〜2025 年'
resolution: 格子は 0.1 度 × 0.1 度 (3600 × 1800 セル)。国別の表は国 × 部門 (IPCC 1996 と IPCC 2006 の区分コード) × 年。単位は表が Gg (= kt) / 年、格子が t / セル / 年 (排出量) と kg / m2 / s (フラックス)
size: '年別の国別表: CH4 5,719,692 バイト、N2O 6,241,014 バイト、F ガス 1,467,444 バイト (各 zip)。格子: CH4 合計の 1 年分 zip 16,477,890 バイト (展開後の NetCDF 25,972,785 バイト)、CH4 合計の全年分 zip (56 年) 913,817,687 バイト、N2O 合計の全年分 zip 898,892,033 バイト'
update: 年 1 回 (2024 年 11 月、2025 年 9 月、2026 年 9 月に新しい版)。版ごとに期間が 1 年延び、過去の年も計算し直される
url: https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/EDGAR/datasets/EDGAR_2026_GHG/
docs: https://edgar.jrc.ec.europa.eu/dataset_ghg2026
checked: 2026-10-06
details:
  最新の版: EDGAR_2026_GHG (2026 年 9 月公開)
  readme: https://edgar.jrc.ec.europa.eu/readme/edgar_2026_ghg_readme.txt
  過去の版: https://edgar.jrc.ec.europa.eu/archived_datasets
---

# EDGAR 温室効果ガス排出

> [[欧州委員会 共同研究センター]] (JRC) が、全世界の温室効果ガス (CO2、CH4、N2O、F ガス) の排出量の推計を、国別・部門別の表 (xlsx) と全球 0.1 度格子 (NetCDF とテキスト) にして、版ごとに配っている EDGAR (Emissions Database for Global Atmospheric Research) の温室効果ガス版

## 概要

EDGAR は、欧州委員会の共同研究センター (JRC) が作っている、全世界の排出量の目録 (インベントリ) です。
温室効果ガス版 (GHG) のほかに大気汚染物質版 (AP) などがありますが、このカードは温室効果ガス版だけを扱います。

排出量は観測値ではなく、推計です。
国ごと・部門ごとの活動量の統計 (燃料の消費量、家畜の頭数、セメントの生産量など) に排出係数を掛けて計算しています。
活動量は、エネルギー部門が IEA の World Energy Balances、農業部門が FAOSTAT を主に使っています。
格子は、国・部門ごとの値を、部門ごとの空間の手がかり (発電所や道路などの位置) で 0.1 度のセルに配っています (方法は Crippa et al. 2024b)。

最新の数年は、統計がまだ揃わないため Fast Track という方法で外挿しています (Guizzardi et al.)。
大規模なバイオマス燃焼 (サバンナ火災、森林火災) と、土地利用・土地利用変化・林業 (LULUCF) の排出と吸収は含みません。
その速報値は https://edgar.jrc.ec.europa.eu/report_2026 にある、と説明ページに書かれています。

作り方から来る限界は次のとおりです。

- 各国が UNFCCC に出している温室効果ガス目録の値とは一致しません。
- 格子のセルの値は、国の値を空間の手がかりで配った結果です。セルごとに測ったものではありません。
- 直近の年は外挿で、次の版で値が変わります。

## 内容

EDGAR_2026_GHG に入っている物質は次のとおりです。

| 物質 | 説明ページでの名前 | 期間 | ライセンス |
| ---- | ---- | ---- | ---- |
| CH4 (メタン) | EDGAR CH4 | 1970〜2025 | CC BY 4.0 |
| N2O (一酸化二窒素) | EDGAR N2O | 1970〜2025 | CC BY 4.0 |
| F ガス 23 種 (HFC 14 種、PFC 7 種、SF6、NF3) | EDGAR F-gases | 1990〜2025 | CC BY 4.0 |
| F ガスの CO2 換算の合計 | EDGAR GWP_100_AR5_F-gases | 1990〜2025 | CC BY 4.0 |
| バイオ CO2 (バイオ燃料の燃焼) | EDGAR CO2bio | 1970〜2025 | CC BY 4.0 (説明ページの例外に入っていないため) |
| 化石 CO2 | IEA-EDGAR CO2 | 1970〜2025 | CC BY-NC-ND 4.0 |
| 温室効果ガスの CO2 換算の合計 | EDGAR GWP_100_AR5_GHG | 1970〜2025 | 明記なし (化石 CO2 を含む) |

CO2 換算には IPCC 第 5 次評価報告書 (AR5) の 100 年の地球温暖化係数 (GWP100) を使っています。

### 国別の表 (年別)

物質ごとに 1 つの zip で、中は xlsx と `_readme.html` です。
`EDGAR_CH4_1970_2025.zip` を開いて確かめました。

- シートは 4 枚です: `Citations and references` (利用条件と引用の文面)、`IPCC 2006`、`IPCC 1996`、`TOTALS BY COUNTRY`。
- 各シートの先頭に説明の行 (`Compound: CH4`、`Start year: 1970`、`End year: 2025`、`Unit: Gg`) があり、10 行目が見出しです。
- `IPCC 2006` の列: `IPCC_annex`、`C_group_IM24_sh` (地域)、`Country_code_A3` (ISO 3166 の 3 文字)、`Name`、`ipcc_code_2006_for_standard_report`、`ipcc_code_2006_for_standard_report_name`、`Substance`、`fossil_bio`、`Y_1970`〜`Y_2025`。CH4 では 5,009 行、部門コードは 24 種です。
- `IPCC 1996` は同じ形で、部門を IPCC 1996 のコードで表します。
- `TOTALS BY COUNTRY` は国ごとの合計で、CH4 では 223 行 (221 の国・地域と `AIR`、`SEA`) です。
- 値が無い組み合わせは空欄です (CH4 の `IPCC 2006` で 42,802 セル)。0 とは書かれていません。
- 単位は Gg (= kt) / 年です。例えば日本 (`JPN`) の 2025 年の CH4 は 1,857.8 Gg です。
- F ガスの表 (`EDGAR_F-gases_1990_2025.zip`) は同じ形で、`Substance` 列に 23 種の物質名 (`HFC-134a`、`SF6`、`CF4` など) が入ります。`TOTALS BY COUNTRY` に出てくる国コードは 149 で、排出の無い国は行がありません。

月別の国別表 (`EDGAR_CH4_m_1970_2025.zip` など、約 70MB ずつ) もあります。
F ガスには月別の値が無く、説明ページは年の値を 12 で割ることを勧めています。
月別の表の中身は開いていません。

### 格子 (年別)

物質ごと、部門ごとにディレクトリが分かれています。
CH4 には部門のディレクトリが 24 と合計 (`TOTALS`) があります。
部門の記号 (`ENE` 発電、`ENF` 消化管内発酵、`AGS` 農用地土壌、`SWD_LDF` 埋立、`WWT` 排水処理、`PRO_GAS` ガスの採掘など) と IPCC コードの対応は readme にあります。

`EDGAR_2026_GHG_CH4_2025_TOTALS_emi.nc` を開いて確かめた内容です。

- 形式は NetCDF-4。次元は `lat` 1800 × `lon` 3600、変数は `emissions` (float32) です。
- 属性: `units = "Tonnes"`、`substance = "CH4"`、`year = "2025"`、`release = "EDGAR_2026_GHG"`、`global_total = "333.17Mt"`、`_FillValue = NaN`。
- 全セルの合計は 333.17 Mt で、`global_total` と合います。NaN のセルは無く、排出の無いセルは 0 です (6,480,000 セルのうち 2,173,121 セル)。
- 座標はセルの中心です。テキスト形式 (`emi_txt`) の座標はセルの左下隅です (readme による。テキスト形式は開いていません)。
- フラックス (`flx_nc`) は kg / m2 / s です (説明ページと readme による。開いていません)。

F ガスの格子は、物質の種類ごとに `Fgases/HFCs`、`PFCs`、`SF6`、`NF3` に分かれ、部門は `PRU_SOL` (溶剤・製品の使用) と `TOTALS` だけです。
HFC の zip の中は、さらに 14 種の物質ごとの zip に分かれています。

### 格子 (月別)

2000〜2025 年、部門を 8 つにまとめたもの (Agriculture、Buildings、Fuel exploitation、Industrial combustion、Industrial processes、Power industry、Transport、Waste) です。
物質は化石 CO2、CO2bio、CH4、N2O、GWP_100_AR5_GHG の 5 つで、F ガスはありません。
1 年 1 NetCDF に 12 か月が入り、単位は Mg / 月 (排出量) と kg / m2 / s (フラックス) です。
zip は 1 本で数百 MB から数 GB あります (説明ページの表示で CH4 の Fuel exploitation が 3,223.81 Mb)。
中身は開いていません。

## 取り出し方

区分は split です。

- 配布サーバー (`jeodpp.jrc.ec.europa.eu`) は Apache のディレクトリ一覧を出すので、全階層を見て必要なファイルを選べます。
- 格子は `<物質>/<部門>/` の下に、全年をまとめた zip (`TOTALS_emi_nc.zip` など) と、1 年 1 zip に分けたもの (`emi_nc/EDGAR_2026_GHG_CH4_2025_TOTALS_emi_nc.zip` など) の両方があります。
- 最小単位は 1 物質 1 部門 1 年の zip です。CH4 合計の 2025 年で 16,477,890 バイト、展開すると 25,972,785 バイトの NetCDF が 1 つ出てきます。
- HEAD は `accept-ranges: bytes`、`Last-Modified`、`ETag` を返し、`curl -r 0-1023` には 206 が返りました。zip の末尾の中央ディレクトリだけを Range で読んで、中のファイルの一覧と大きさを得られます。
- ただし zip の中の NetCDF は deflate 圧縮されているので、NetCDF の一部の領域だけを Range で読むことはできません。地域を絞るには、1 年分の zip を取ってから [[GDAL]] などで切り出します。
- bbox や時刻で検索できる目録 (STAC など) はありません。
- 認証、登録、利用規約への同意画面はありません。
- 配布サーバーは遅いことがあります。2026-10-06 には 16MB の取得に約 5 分かかり、途中で止まったので `curl -C -` で続きから取り直しました。

## 使いどころ

- SDGs 目標 13 (気候変動): ターゲット 13.2 の指標 13.2.2 (温室効果ガスの年間総排出量) の文脈で、CH4、N2O、F ガスの国別・部門別の推移を比べられます。ただし総排出量 (GWP_100_AR5_GHG) は化石 CO2 を含むので、自由に使えるのは CH4、N2O、F ガスの部分です。
- メタン削減: CH4 は部門別 (畜産、稲作、埋立、排水、石炭・石油・ガスの採掘) に格子があり、どの地域のどの部門が大きいかを地図で示せます。
- SDGs 目標 2 (ターゲット 2.4、持続可能な農業): 消化管内発酵 (`ENF`)、家畜排せつ物管理 (`MNM`)、農用地土壌 (`AGS`) の CH4 と N2O から、農業由来の排出の大きさと変化を国別に見られます。
- F ガス: HFC の物質別の値は、モントリオール議定書のキガリ改正 (HFC の段階的削減) の進み具合を見る材料になります。
- 人道支援・防災: 直接の用途は限られます。都市や地域の排出の大きさを示す背景の地図として使えます。

使ってはいけない使い方:

- 格子のセルの値を、その場所で測った排出量として扱わないでください。国の推計を空間の手がかりで配ったものです。個々の施設や農場の排出の評価には使えません。
- 各国の UNFCCC への公式報告の代わりに、条約上の数字として使わないでください。
- 版をまたいで値をつながないでください。過去の年も版ごとに計算し直されています。
- 直近の年 (2025 年など) の小さな増減を確定した変化として読まないでください。外挿による値です。
- 化石 CO2 と総排出量を、商用の製品やサービス、改変した派生データの配布に使わないでください (下の「ライセンスと帰属表示」)。

## ライセンスと帰属表示

ライセンスは物質によって違います。
根拠は説明ページ https://edgar.jrc.ec.europa.eu/dataset_ghg2026 の「Conditions of use」で、xlsx の 1 枚目のシートにも同じ趣旨の文面があります。

### CH4、N2O、F ガス、バイオ CO2: CC BY 4.0 (自由に使える)

> Unless otherwise noted, all material owned by the European Union is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence. This means that reuse is allowed, provided that appropriate credit is given and any changes are indicated.

配布サーバーの各階層にある `copyright.txt` (540 バイト) も CC BY 4.0 を示しています。

> Any copyright and/or sui generis right on the dataset is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence.

複製、改変、再配布、商用利用ができます。
条件は出典の表示と、変更したならその旨を示すことです。
バイオ CO2 (EDGAR CO2bio) は、説明ページで例外として名指しされていないので CC BY 4.0 と読みました。

### 化石 CO2 (IEA-EDGAR CO2): CC BY-NC-ND 4.0 (自由には使えない)

> IEA-EDGAR CO 2 (v5) data are based on data from IEA (2025) Greenhouse Gas Emissions from Energy, www.iea.org/data-and-statistics, as modified by the Joint Research Centre, licensed under CC BY-NC-ND 4.0. Users of the IEA-EDGAR CO 2 data should contact the IEA at compliance@iea.org if they wish to use such data outside the terms of the CC-BY-NC-ND 4.0 licence.

- 対象は `IEA_EDGAR_CO2_*.zip` の表と、`CO2/` と `monthly/CO2/` の格子です。
- 非商用 (NC) に限られ、改変したもの (ND) は配れません。それ以外の使い方は IEA の許可が要ります。
- 化石 CO2 のディレクトリ (`EDGAR_2026_GHG/CO2/`) にも CC BY 4.0 の `copyright.txt` が置かれていますが、中身は他の階層と同じ文面で、化石 CO2 に触れていません。説明ページは「Unless otherwise noted」としたうえで化石 CO2 を例外にしているので、説明ページの記載に従ってください。

### CO2 換算の合計 (GWP_100_AR5_GHG): 明記なし

`EDGAR_AR5_GHG_1970_2025.zip` と格子の `GWP_100_AR5_GHG/` は化石 CO2 を足し込んだ値です。
どちらの条件に従うかは説明ページに書かれていません。
化石 CO2 を含む以上、化石 CO2 と同じ CC BY-NC-ND 4.0 の条件で扱うのが安全です。
F ガスだけの合計 (`EDGAR_AR5g_F-gases_1990_2025.zip`) は化石 CO2 を含みません。

### 第三者のデータについて

非 CO2 の排出のうちエネルギー部門の活動量は、IEA World Energy Balances (「all rights reserved, as modified by Joint Research Centre」) にもとづく、と説明ページにあります。
配られているのは排出量の推計で、IEA の統計そのものは入っていません。

### 求められる表示

データを使うときの引用 (説明ページの「How to cite the use of underlying data」):

> EDGAR (Emissions Database for Global Atmospheric Research) Community GHG Database, a collaboration between the European Commission, Joint Research Centre (JRC), the International Energy Agency (IEA), and comprising IEA-EDGAR CO2, EDGAR CH4, EDGAR N2O, EDGAR F-GASES version EDGAR_2026_GHG (2026) European Commission, JRC (Datasets).

化石 CO2 を使うときはさらに:

> IEA-EDGAR CO2, a component of the EDGAR (Emissions Database for Global Atmospheric Research) Community GHG database version EDGAR_2026_GHG (2026) including or based on data from IEA (2025) Greenhouse Gas Emissions from Energy, www.iea.org/data-and-statistics, as modified by the Joint Research Centre.

readme は、説明ページ (https://edgar.jrc.ec.europa.eu/dataset_ghg2026) への参照も求めています。

> Users of the data are obliged to acknowledge the source of the data also with reference to the EDGAR website (https://edgar.jrc.ec.europa.eu/dataset_ghg2026) and/or relevant reports.

報告書の引用は Crippa, M. et al., GHG emissions of all world countries - 2026 Report, Publications Office of the European Union, 2026, doi:10.2760/7717504, JRC147815 です。
格子の作り方は Crippa et al. (2024b), Earth Syst. Sci. Data, 16, 2811-2830, doi:10.5194/essd-16-2811-2024 です。

免責 (説明ページと https://edgar.jrc.ec.europa.eu/disclaimer): 欧州連合と IEA は、データについて一切の保証と責任を負わない、としています。

## 気をつけること

- 版: 版の名前は v4.x、v5.0、v6.0、v7.0、v8.0 のあと、2024 年から年の名前 (EDGAR_2024_GHG、EDGAR_2025_GHG、EDGAR_2026_GHG) になりました。過去の版も https://edgar.jrc.ec.europa.eu/archived_datasets と配布サーバーに残っています。版ごとに過去の年も計算し直されるので、版を混ぜないでください。
- `LATEST/` という名前のディレクトリが配布サーバーにありますが、最新版ではありません (調査メモによる。確かめていません)。必ず `EDGAR_2026_GHG/` のように版の名前で指定してください。
- ライセンスの取り違え: 同じ版の中で、化石 CO2 と総排出量だけ条件が違います。CH4 や N2O と一緒にまとめて配り直すときは、化石 CO2 と総排出量を外してください。
- 座標系: NetCDF に CRS の属性はありません (GDAL は SRS を読めません)。値は経緯度の 0.1 度格子なので、GeoTIFF などにするときは EPSG:4326 を指定します (下のコマンドの `-a_srs`)。
- 座標の基準: NetCDF はセルの中心、テキスト形式はセルの左下隅です。混ぜると 0.05 度ずれます。
- 単位: 格子の排出量は t / セル / 年で、セルの面積は緯度で変わります。面積あたりの密度を比べるときはフラックス (`flx_nc`、kg / m2 / s) を使うか、面積で割ってください。表は Gg、月別の格子は Mg / 月です。
- 負の値: CH4 合計の 2025 年の格子に、負の値のセルが 2 つあります (メキシコ北部、北緯 28.45 度・西経 100.65 度で -6,238.6 t など)。理由は確かめていません。
- 値の集中: 同じ格子で最大のセル (北緯 11.25 度・東経 78.15 度、インド南部) は 9,358,140 t で、全球の約 2.8% が 1 セルに入っています。国の値をどう配ったかによるものと考えられますが、確かめていません。セル単位の値をそのまま場所の比較に使うときは注意してください。
- 欠損: 表では値の無い組み合わせが空欄、格子では排出の無いセルが 0 です。F ガスの表には排出の無い国の行がありません。
- 範囲の違い: LULUCF と大規模なバイオマス燃焼を含まないので、[[FAOSTAT]] の農業・土地利用の排出や、各国の UNFCCC 目録の値とは合いません。
- [[World Bank 世界開発指標]] の温室効果ガスの指標の一部は EDGAR を出典にしています。値を比べるときは、どの版の EDGAR かを確かめてください。

## データ処理コマンド

2026-10-06 に実際に動かしたものです (curl 8 系、GDAL 3.9.2)。
化石 CO2 のファイルは使っていません。

```bash
mkdir -p ./tmp
B=https://jeodpp.jrc.ec.europa.eu/ftp/jrc-opendata/EDGAR/datasets/EDGAR_2026_GHG

# 大きさと Range 対応を確かめる (206 が返る)
curl -sIL -m 60 $B/CH4/TOTALS/emi_nc/EDGAR_2026_GHG_CH4_2025_TOTALS_emi_nc.zip
curl -s -m 60 -r 0-1023 -o /dev/null -D - $B/CH4/TOTALS/emi_nc/EDGAR_2026_GHG_CH4_2025_TOTALS_emi_nc.zip

# CH4 合計の 2025 年の格子 (約 16MB) を取る。遅いときは -C - で続きから取り直す
curl -C - -o ./tmp/ch4_2025.zip $B/CH4/TOTALS/emi_nc/EDGAR_2026_GHG_CH4_2025_TOTALS_emi_nc.zip
unzip -l ./tmp/ch4_2025.zip

# 展開せずに中身を見る
gdalinfo /vsizip/./tmp/ch4_2025.zip/EDGAR_2026_GHG_CH4_2025_TOTALS_emi.nc

# 日本のまわり (経度 122〜154、緯度 24〜46) を切り出して GeoTIFF にする (CRS を付ける)
gdal_translate -projwin 122 46 154 24 -a_srs EPSG:4326 \
  /vsizip/./tmp/ch4_2025.zip/EDGAR_2026_GHG_CH4_2025_TOTALS_emi.nc ./tmp/jp_ch4_2025.tif
gdalinfo -stats ./tmp/jp_ch4_2025.tif

# CH4 の国別の表 (約 5.7MB) を取り、日本の行を CSV で出す
curl -C - -o ./tmp/ch4_tab.zip $B/EDGAR_CH4_1970_2025.zip
unzip -o ./tmp/ch4_tab.zip -d ./tmp/ch4_tab
ogrinfo -ro -so ./tmp/ch4_tab/EDGAR_CH4_1970_2025.xlsx
ogr2ogr -f CSV /vsistdout/ ./tmp/ch4_tab/EDGAR_CH4_1970_2025.xlsx "TOTALS BY COUNTRY" \
  -oo HEADERS=DISABLE -where "Field3 IN ('Country_code_A3','JPN')"
```

xlsx は先頭に説明の行があるため、`HEADERS=DISABLE` で読み、10 行目の見出しを `Country_code_A3` で拾っています。
GDAL の XLSX ドライバーは、zip の中の xlsx を `/vsizip/` で直接開けなかったので、先に展開しています。
`/vsizip/` の NetCDF に `gdalinfo -stats` を使うと、統計の `.aux.xml` が zip の中に書き足されて zip が変わりました。
統計は、切り出した GeoTIFF か展開した NetCDF に対して取ってください。

## 関連項目

- [[欧州委員会 共同研究センター]]
- [[国際エネルギー機関]]
- [[World Bank 世界開発指標]]
- [[FAOSTAT]]
- [[SDGs]]
- [[CC-BY-4.0]]
- [[NetCDF]]
- [[GDAL]]

## 確認日

2026-10-06 に次のことを確かめました。

- 説明ページ (dataset_ghg2026) を読み、最新の版が EDGAR_2026_GHG (1970〜2025 年) であること、Conditions of use と How to cite の文面、物質ごとの期間 (F ガスは 1990 年から、月別の格子は 2000 年から) を確かめました。データ一覧のページ (emissions_data_and_maps) と過去の版のページ (archived_datasets) も読みました。
- readme (edgar_2026_ghg_readme.txt) で、単位、座標の基準、部門の記号を確かめました。
- 配布サーバーのディレクトリ一覧と HEAD で、ファイルの構成と大きさを確かめました。Range 要求に 206 が返ることを確かめ、zip の中央ディレクトリを Range で読んで、CH4 合計 (57 メンバー)、SF6 合計、HFC 合計 (14 種) の中身を数えました。
- `EDGAR_CH4_1970_2025.zip`、`EDGAR_F-gases_1990_2025.zip`、`EDGAR_2026_GHG_CH4_2025_TOTALS_emi_nc.zip` を取得して開き、シート、列、行数、NetCDF の変数と属性、全球の合計、負の値のセルを確かめました。
- `copyright.txt` を CH4 と CO2 の階層で読み、同じ文面であることを確かめました。
- data.europa.eu の検索 API では、EDGAR 2025 GHG までの記録があり、2026 年版の記録はまだありませんでした (2026 年版の DOI は確かめていません)。

確かめていないこと:

- 化石 CO2 の表と格子の中身 (ライセンスの都合で、取得していません)。
- 月別の表と月別の格子、テキスト形式の格子、フラックスの NetCDF の中身。
- 格子全体の総量 (全物質・全部門・全形式の合計バイト数)。
- 総排出量 (GWP_100_AR5_GHG) に適用されるライセンス。
- 負の値のセルと、値が 1 セルに集中している理由。
- `LATEST/` ディレクトリの中身。
