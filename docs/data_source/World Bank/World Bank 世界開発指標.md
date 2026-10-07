---
title: World Bank 世界開発指標
description: "世界銀行 が、217 の国と地域と 47 の集計地域について、1960 年から 2025 年までの 1,498 の開発指標を、Indicators API と CSV の一括 zip で配っている World Development Indicators (WDI)"
provider_group: "World Bank"
categories: ["人口・社会"]
regions: ["全世界"]
formats: ["CSV", "XLSX", "JSON", "XML"]
id: worldbank_wdi
provider: [世界銀行 (World Bank, Development Data Group)]
source_data: 一部は一次データ (世界銀行の推計)、多くは各国の統計局と国際機関 (国連人口部、FAO、ILO、ITU、UNESCO、SIPRI など) の統計を集めたもの。出典は指標ごとにメタデータの Source の欄にある
license: [CC-BY-4.0, CC-BY-3.0-IGO, other]
license_note: 既定は CC-BY-4.0 に紛争解決 (調停と仲裁) の追加条項を付けたもの。2026-10-01 版の `License Type` の欄では 1,498 指標のうち 9 指標が別の条件 (SIPRI の条件 6、CC BY 3.0 IGO 3)。ただし欄の値は版によって揺れ、第三者の出所の条件を反映しきれていない (下のライセンスの節を参照)
access: range
access_note: range。一括 zip (`WDI_CSV.zip`) は HTTP Range に 206 を返し、末尾の索引から 6 つの CSV の位置が分かるので、指標の定義表 (約 6MB) などのメンバーを 1 つだけ読める。API では指標、国、年で絞れ、指標ごとの CSV zip もある
format: [CSV (一括 zip と指標ごとの zip), Excel (一括 zip), JSON と XML (API)]
coverage: 全世界。国と地域 217 (台湾は含まない) と、地域別・所得別などの集計地域 47。ジオメトリは持たず、ISO 3166-1 alpha-3 に近い 3 文字のコードで国を表す
period: 1960 年から 2025 年 (列の範囲。指標ごとに始まりと終わりは異なる)
resolution: 国単位、年単位 (`WDIseries-time.csv` などに一部の注記がある)。値の単位は指標ごと (人、%、現在の US ドルなど)
size: '`WDI_CSV.zip` が 282,847,680 バイト (2026-10-01 版)。中の `WDICSV.csv` (値の本体) が展開後 198,481,686 バイト。指標 1 つの CSV zip は `SP.POP.TOTL` で 89,654 バイト'
update: 定期の周期は確かめていません。API の `lastupdated` は 2026-07-13、一括 zip の Last-Modified は 2026-10-01、データカタログの版番号は 130
url: '一括: https://databank.worldbank.org/data/download/WDI_CSV.zip 、API: https://api.worldbank.org/v2/'
docs: https://datacatalog.worldbank.org/search/dataset/0037712/World-Development-Indicators 、https://data.worldbank.org/
checked: 2026-10-06
---

# World Bank 世界開発指標

> [[世界銀行]] が、217 の国と地域と 47 の集計地域について、1960 年から 2025 年までの 1,498 の開発指標を、Indicators API と CSV の一括 zip で配っている World Development Indicators (WDI)

## 概要

World Development Indicators (WDI) は、世界銀行が国ごとの開発の状況を比べられるようにまとめた、年次の指標集です。
人口、経済、貧困、保健、教育、環境、エネルギー、インフラ、金融、公共部門など、13 の大分類に 1,498 の指標があります (2026-10-01 版の `WDISeries.csv` の件数。API の `source/2/indicator` の total も 1,498)。

値の多くは世界銀行が自分で測ったものではありません。
各国の公式統計と国際機関の統計を集めて、定義をそろえ、欠けた所を世界銀行の職員が推計して埋めています。
たとえば人口 (`SP.POP.TOTL`) の出典は国連の World Population Prospects、温室効果ガスの一部は [[EDGAR 温室効果ガス排出]] です。
そのため、元の統計の精度と更新の遅れをそのまま引き継ぎます。
最新年の値は空のことが多く、過去の値も版ごとに改訂されます。

集計地域 (世界、所得別、地域別など) の値は、世界銀行が国の値から計算したものです。
集計の方法は指標ごとに `Aggregation method` の欄に書かれています。

## 内容

一括 zip `WDI_CSV.zip` の中身は 6 つの CSV です (2026-10-01 版、展開後のバイト数)。

| ファイル | 展開後 | 内容 |
| --- | ---: | --- |
| `WDICSV.csv` | 198,481,686 | 値の本体。1 行が 1 つの国と 1 つの指標、列が年 |
| `WDICountry.csv` | 156,476 | 国と集計地域の表 (264 行) |
| `WDISeries.csv` | 5,964,228 | 指標の定義表 (1,498 行) |
| `WDIcountry-series.csv` | 1,362,558 | 国と指標の組ごとの注記 |
| `WDIfootnote.csv` | 76,824,428 | 国、指標、年ごとの脚注 |
| `WDIseries-time.csv` | 14,388 | 指標と年ごとの注記 |

`WDICSV.csv` の列は `Country Name`, `Country Code`, `Indicator Name`, `Indicator Code` と、`1960` から `2025` までの 66 の年の列です。
値の無い年は空欄で、0 とは区別されます。
行の数は 264 (国と集計地域) × 1,498 (指標) = 395,472 と見込まれますが、全部を数えてはいません (推定)。

`WDISeries.csv` の主な列は `Series Code`, `Topic`, `Indicator Name`, `Long definition`, `Unit of measure`, `Periodicity`, `Aggregation method`, `Limitations and exceptions`, `Source`, `License Type` です。
`Topic` の大分類と指標の数は次のとおりです。
Economic Policy & Debt 360、Health 251、Social Protection & Labor 169、Education 156、Private Sector & Trade 151、Environment 144、Public Sector 99、Financial Sector 55、Infrastructure 36、Trade 24、Poverty 24、Gender 17、Policy & institutions 12。

`WDICountry.csv` は 264 行で、`Region` の欄が空の 47 行が集計地域 (WLD 世界、HIC 高所得国、SSF サハラ以南アフリカなど) です。
残りの 217 行が国と地域で、`Region` (7 地域) と `Income Group` (所得区分) を持ちます。

## 取り出し方

区分は range です。
`https://databank.worldbank.org/data/download/WDI_CSV.zip` は `https://databankfiles.worldbank.org/public/ddpext_download/WDI_CSV.zip` へ 301 で転送され、転送先は `accept-ranges: bytes` を返します。
`curl -r 0-1023` に 206 が返りました。
zip の末尾 64KB と中央ディレクトリ (合わせて 65,903 バイト) を読めば 6 つの CSV の位置が分かり、`WDISeries.csv` だけを 5,965,181 バイトの読み出しで取り出せました。
`WDICSV.csv` は 1 つのメンバーなので、この方法でも国や指標で絞ることはできません。

国、指標、年で絞るときは Indicators API を使います。
認証は要りません。

- 指標の一覧: `https://api.worldbank.org/v2/source/2/indicator?format=json` (source 2 が WDI)
- 値: `https://api.worldbank.org/v2/country/JPN;KEN/indicator/SP.POP.TOTL?format=json&date=2023:2025`
- 指標のメタデータ (ライセンスを含む): `https://api.worldbank.org/v2/sources/2/series/<指標コード>/metadata?format=json`
- 指標 1 つの全期間・全国の CSV zip: `https://api.worldbank.org/v2/en/indicator/<指標コード>?downloadformat=csv`

`country/all` で指標 1 つを引くと、`SP.POP.TOTL` では 265 か国・地域 × 66 年 = 17,490 件でした。
`per_page=50000` は HTML のエラーページ (400) を返したので、大きな要求はページに分けます。

## 使いどころ

- [[SDGs]] の指標の多くに対応する国別の値があります。例: 目標 1 の貧困 (1.1.1 の国際貧困線未満の人口の割合)、目標 3 の 5 歳未満死亡率 (3.2.1)、目標 7 の電力へのアクセス (7.1.1)、目標 17 のインターネット利用 (17.8.1)。各国の進み具合を地図で比べる主題図の元データになります。
- 人道支援と防災では、被災国の人口、所得水準、保健の基礎値を、境界データ ([[Natural Earth Coastline Data]] などの国の形) に国コードで結んで、状況を素早く把握するのに使えます。
- 国際平和の分野では、軍事支出 (SIPRI 由来、下のライセンスの節を参照) や [[UCDP 武力紛争データ]] と組み合わせた国単位の比較に使えます。

使ってはいけない使い方もあります。
WDI は国単位の年次値なので、国の中の地域差 (州や市町村) は分かりません。
国の中の分布を示す地図に、国の値を塗り広げて使わないでください。
欠けた年を補ってある値や、職員の推計値が混ざるので、1 年ごとの小さな変化を因果の根拠にするのは避けます。
最新年の値は改訂されることが多いので、版を記録せずに引用しないでください。

## ライセンスと帰属表示

既定のライセンスは [[CC-BY-4.0]] に追加条項を付けたものです。
根拠は世界銀行のデータカタログの https://datacatalog.worldbank.org/public-licenses で、WDI のカタログのページも「Creative Commons Attribution 4.0」と表示しています。

> CC-BY 4.0, with the additional terms below, is the default license for all Datasets produced by the World Bank itself and distributed as open data.

> All users of these Datasets under the CC-BY 4.0 License also agree to the following mandatory terms: Any and all disputes arising under this License that cannot be settled amicably shall be resolved in accordance with the following procedure

追加条項は紛争解決の手続きで、まず調停、45 日で解決しなければ仲裁 (定めが無ければ UNCITRAL 仲裁規則)、仲裁地はライセンサーの本部、と定めています。
複製、改変、商用を含む再配布はでき、継承 (share-alike) は求められません。
ただし素の CC BY 4.0 と同じではないので、目録には追加条項があることを併記します。

帰属表示の書式は https://data.worldbank.org/summary-terms-of-use にあります。

> Generally, you agree to provide attribution to The World Bank and its data providers in the following format: The World Bank: Dataset name: Data source (if known).

WDI なら、たとえば「The World Bank: World Development Indicators: World Population Prospects, United Nations Population Division」のように、指標の `Source` の欄の出典を続けます。
再配布するときは、同じ表示の要件を受け手にも課す必要があります。

### 第三者の条件で制限される指標の見分け方

指標ごとのライセンスは、次のどちらかで分かります。

- API の指標メタデータ `https://api.worldbank.org/v2/sources/2/series/<指標コード>/metadata?format=json` の `License_Type` と `License_URL` の欄。
- 一括 zip の `WDISeries.csv` の `License Type` の列 (1,498 指標を一度に見られる)。

欄の値が `CC BY-4.0` なら、世界銀行はその版で既定のライセンスを示しています。
それ以外の値が入っている指標は、提供元の条件に従います。
2026-10-01 版で `CC BY-4.0` 以外だったのは次の 9 指標でした。

- `MS.MIL.XPND.CD`, `MS.MIL.XPND.CN`, `MS.MIL.XPND.GD.ZS`, `MS.MIL.XPND.ZS` (軍事支出)、`MS.MIL.MPRT.KD`, `MS.MIL.XPRT.KD` (武器の輸入と輸出): SIPRI の条件。原文は「SIPRI data may not be used for commercial purposes (as assessed by SIPRI) without a separate commercial license from SIPRI. Use of more than 10 percent of any SIPRI data set for non-commercial purposes (as assessed by SIPRI) must be directly authorized by SIPRI.」。商用利用と、データセットの 10% を超える利用には SIPRI の許可が要ります。
- `GD_WBL_OVL_ENF`, `GD_WBL_OVL_LAW`, `GD_WBL_OVL_SFR` (Women, Business and the Law の指数): CC BY 3.0 IGO。

指標のライセンスは版によって変わります。
2025-04-17 版 (`WDI_CSV_2025_04_17.zip`) の `WDISeries.csv` では 1,509 指標のうち 25 指標が `CC BY-4.0` と `CC BY 4.0` 以外で、IEA の条件 14、SIPRI 4、Protected Planet (WDPA) 3、ITU 2、空欄 2 (FAO 出典) でした。
2026-10-01 版では、欄の値が IEA、Protected Planet、ITU の条件になっている指標はありません。
しかし、これらを出所とする指標が無くなったのではなく、欄の値だけが `CC BY-4.0` に変わっています。
2026-10-01 版の `WDISeries.csv` の `Source` の欄で数えると、IEA を出所とする指標が 61、ITU が 9、Protected Planet (WDPA、UNEP-WCMC) が 6 あり、どれも `CC BY-4.0` と書かれていました。
このうち Protected Planet は、提供元の利用規約 (https://www.protectedplanet.net/en/legal) が「You may not redistribute the WDPCA and GD-PAME Data contained in the WDPCA and GD-PAME in whole or in part by any means」と再配布を禁じています。
つまり `License Type` の欄は、その版の世界銀行の表示であって、出所の条件を保証するものではありません。
第三者が出所の指標を再配布するときは、`Source` の欄を見て、出所の側の条件も確かめてください。
複数の版を貯めて配るなら、どれかの版で制限の付いた指標をまとめて除く、という考え方もあります。

## 気をつけること

- 集計地域が国と同じ表に混ざっています。`WDICSV.csv` は 264 行のうち 47 行が集計地域、API の `country/all` も集計地域を返します。国の平均や回帰に入れる前に、`WDICountry.csv` の `Region` が空の行 (API では `region.id` が `NA`) を除きます。
- API の `country` の一覧 (296 件、集計地域 79 件) は世界銀行の全データベースに共通のもので、WDI の 264 件より多くなっています。
- API で所得別の集計 (High income など) は `countryiso3code` が空になり、`country.id` が `XD` のような 2 文字のコードになります。
- 国コードは ISO 3166-1 alpha-3 とおおむね同じですが、コソボは `XKX`、チャネル諸島は `CHI` で、どちらも ISO の正式なコードではありません。台湾は含まれません。境界データと結ぶときは突き合わせを確かめます。
- 一括 zip と API で更新日がずれます。2026-10-06 時点で一括 zip の Last-Modified は 2026-10-01、API と指標ごとの CSV zip の Last Updated Date は 2026-07-13 でした。中の値が同じかどうかは確かめていません。
- 一括 zip `WDI_CSV.zip` は同じ URL のまま上書きされます。版を固定したいときは、データカタログにある日付つきの zip (`https://datacatalogfiles.worldbank.org/ddh-published/0037712/DR0095335/WDI_CSV_2026_10_01.zip` など) を使います。
- 取り違えやすいものとして、API の source 57「WDI Database Archives」(2,794 指標、最終更新 2025-10-29) があります。現行の WDI から外れた指標 (たとえば旧 CO2 排出量 `EN.ATM.CO2E.PC`) はそちらにあり、ライセンスも別のことがあります。
- 世界銀行のデータベースは WDI 以外にも多数あり (Gender Statistics、Health Nutrition and Population Statistics など)、同じ指標コードが複数のデータベースに現れます。API で引くときは `source=2` を指定するか `sources/2` の経路を使います。

## データ処理コマンド

次のコマンドは 2026-10-06 に実際に動かして確かめました (curl、jq、unzip、python3 の標準ライブラリだけを使います)。

```bash
# WDI の指標の数を数える
curl -s "https://api.worldbank.org/v2/source/2/indicator?format=json&per_page=1" | jq '.[0].total'

# 国と年を絞って値を引く (日本とケニアの人口、2023 年から 2025 年)
curl -s "https://api.worldbank.org/v2/country/JPN;KEN/indicator/SP.POP.TOTL?format=json&date=2023:2025" \
  | jq -r '.[1][] | [.countryiso3code, .date, .value] | @tsv'

# 指標 1 つのライセンスを API で見る (SIPRI の軍事支出)
curl -s "https://api.worldbank.org/v2/sources/2/series/MS.MIL.XPND.CD/metadata?format=json" \
  | jq -r '.source[0].concept[0].variable[0].metatype[] | select(.id=="License_Type" or .id=="License_URL") | .value'

# 指標 1 つの全期間・全国の CSV zip を取得して開く
mkdir -p ./tmp
curl -sL -o ./tmp/SP.POP.TOTL.zip "https://api.worldbank.org/v2/en/indicator/SP.POP.TOTL?downloadformat=csv"
unzip -o -q ./tmp/SP.POP.TOTL.zip -d ./tmp/SP.POP.TOTL
ls ./tmp/SP.POP.TOTL

# 一括 zip の大きさ、更新日、Range 対応を確かめる
curl -sIL https://databank.worldbank.org/data/download/WDI_CSV.zip | grep -iE '^(content-length|last-modified|accept-ranges)'
curl -s -r 0-1023 -o /dev/null -w '%{http_code}\n' https://databankfiles.worldbank.org/public/ddpext_download/WDI_CSV.zip
```

一括 zip から指標の定義表 `WDISeries.csv` だけを Range で取り出し、`CC BY-4.0` 以外の指標を一覧にします。

```bash
cat > ./tmp/zip_member.py <<'EOF'
# Usage: python3 zip_member.py URL MEMBER OUT
# Reads only the zip index and one member with HTTP Range requests.
import sys, struct, zlib, urllib.request
url, member, out = sys.argv[1:4]

def get(a, b):
    req = urllib.request.Request(url, headers={"Range": f"bytes={a}-{b}"})
    return urllib.request.urlopen(req, timeout=60).read()

head = urllib.request.Request(url, method="HEAD")
size = int(urllib.request.urlopen(head, timeout=60).headers["Content-Length"])
tail = get(size - 65536, size - 1)
i = tail.rfind(b"PK\x05\x06")
cd_size, cd_off = struct.unpack("<II", tail[i + 12:i + 20])
cd = get(cd_off, cd_off + cd_size - 1)
p = 0
while p < len(cd):
    method = struct.unpack("<H", cd[p + 10:p + 12])[0]
    csize, usize = struct.unpack("<II", cd[p + 20:p + 28])
    fl, el, cl = struct.unpack("<HHH", cd[p + 28:p + 34])
    offset = struct.unpack("<I", cd[p + 42:p + 46])[0]
    name = cd[p + 46:p + 46 + fl].decode()
    print(name, usize)
    if name == member:
        h = get(offset, offset + 29)
        n, m = struct.unpack("<HH", h[26:30])
        start = offset + 30 + n + m
        raw = get(start, start + csize - 1)
        open(out, "wb").write(zlib.decompress(raw, -15) if method == 8 else raw)
    p += 46 + fl + el + cl
EOF
python3 ./tmp/zip_member.py https://databankfiles.worldbank.org/public/ddpext_download/WDI_CSV.zip WDISeries.csv ./tmp/WDISeries.csv

python3 -c "
import csv, collections
rows = list(csv.DictReader(open('./tmp/WDISeries.csv', encoding='utf-8-sig')))
print(len(rows), 'indicators')
print(collections.Counter(r['License Type'][:40] for r in rows))
for r in rows:
    if r['License Type'].strip() != 'CC BY-4.0':
        print(r['Series Code'], '|', r['License Type'][:60])
"
```

## 関連項目

- [[世界銀行]]
- [[World Development Indicators]]
- [[SDGs]]
- [[CC-BY-4.0]]
- [[SIPRI]]
- [[World Population Prospects]]
- [[FAOSTAT]]
- [[ILOSTAT]]
- [[UNDP 人間開発指数]]
- [[UNHCR 難民統計]]
- [[EDGAR 温室効果ガス排出]]
- [[UCDP 武力紛争データ]]
- [[Natural Earth Coastline Data]]

## 確認日

2026-10-06 に次のことを確かめました。

- API の `source/2` (lastupdated 2026-07-13)、`source/2/indicator` (1,498 指標)、`country` (296 件、集計地域 79 件)、`SP.POP.TOTL` の値と件数 (17,490)、`per_page=50000` が 400 を返すこと。
- `MS.MIL.XPND.CD`、`SP.POP.TOTL`、`GD_WBL_OVL_LAW` の API メタデータの `License_Type` と `License_URL`。
- `WDI_CSV.zip` の HEAD (282,847,680 バイト、Last-Modified 2026-10-01) と Range (206)。中央ディレクトリからメンバーの一覧を読み、`WDISeries.csv`、`WDICountry.csv` と `WDICSV.csv` の先頭 3KB を Range で取り出して、指標の数、ライセンスの内訳、国と集計地域の数、年の列を数えました。
- データカタログの 2025-04-17 版の zip からも `WDISeries.csv` を Range で取り出し、ライセンスの内訳を比べました。
- ライセンスの文言は https://datacatalog.worldbank.org/public-licenses 、帰属表示の書式は https://data.worldbank.org/summary-terms-of-use 、期間とカタログのライセンス表示は WDI のデータカタログのページで読みました。

確かめていないこと。

- `WDICSV.csv` 全体 (約 198MB) は取得していないので、行の数と値の入っている割合は数えていません。
- 一括 zip (2026-10-01) と API (2026-07-13) の値が同じかどうか。
- 更新の周期 (年に何回か) の公式な記載。
- SIPRI と Women, Business and the Law の側のライセンスの原文 (WDI のメタデータに書かれた文言だけを読みました)。
- 2025-04-17 版と 2026-10-01 版以外の版の `License Type`。調査メモにある「どれかの版で制限つきの 74 指標」は、複数の版を合わせた数で、確かめていません。
