# 新人教育プログラム

## ご意見お待ちしております。

https://github.com/NwHub/newcomer-training/issues

## タイムスケジュール

-
-
-

## 導入

## GitHub 登録

## Paiza Cloud 登録

## Node.js で JavaScript を実行

### 作業ディレクトリと js ファイルを作成

```Shell
touch test.js
```

### JS ファイルに処理を記述

test.js

```javascript
console.log("YouTube");
```

### JS ファイルを実行

```Shell
node test.js
```

```shell
YouTube
```

## lesson01 -axios を使って YouTubeAPI に接続-

---

### 使用する YouTubeAPI の説明

---

### GitHub からプロジェクトをクローン

コードフォーマットの設定などがしてありますが、0 から作るのとほぼ変わりません。

メモ：

- 使用する技術
  - Git
- 公式ページ
  - [Axios](https://axios-http.com/)

```Shell
git clone https://github.com/NwHub/youtube-api.git
```

クローンしたプロジェクトに移動

```Shell
cd youtube-api
```

`npm install`でパッケージダウンロード

```shell
npm install
```

---

### Axios の導入

プロジェクトルートで`npm install axios`を実行してインストール

メモ：

- 使用する技術
  - node
  - npm
- 公式ページ
  - [Axios](https://axios-http.com/)

```Shell
npm install axios
```

`package.json`を確認すると導入されたことが確認できる

```json
"dependencies": {
    "axios": "^0.21.1"
}
```

---

### API に接続

メモ：

- 使用する技術
  - パッケージ読み込み
  - 変数定義
  - 文字列結合
  - console.log

youtube.js

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";

const videoId = "2dldq7XQdIo";
const response = await axios.get(
  `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet`
);
console.log(response.data);
```

---

### 実行

```Shell
node youtube.js
```

---

### json-server を使用する

YouTubeApi はクォータと呼ばれる使用制限があるため、json-server を利用しモックデータを取得するようにする。

新しくターミナルを立ち上げて、json-server を起動する。

```shell
npm run json-server
```

接続先を変更しましょう

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";

const videoId = "2dldq7XQdIo";
const response = await axios.get(
  `http://localhost:8080?key=${API_KEY}&id=${videoId}&part=snippet`
);
console.log(response.data);
```

元のターミナルに戻って動作が変わらないことを確認しましょう。

```Shell
node youtube.js
```

---

### コードフォーマット

下記のコマンドを実行しコードフォーマットを実施します。
ちなみに`package.json`の scripts の項目に設定が書いてあります。

```shell
npm run format
```

---

### 見やすいようにコードを修正

コードを修正し、可読性をあげましょう。  
ごちゃっとしたコードはそれだけでバグの温床になってしまいます。

### 基本となる URL を切り出し

ベースとなる URL 部分を変数で抜き出しましょう。

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";
const response = await axios.get(
  `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet`
);
console.log(response.data);
```

#### クエリパラメータの引数化

`axios`はクエリパラメータ（?〜の部分）を`{ params:{ { key : value} }`の形で axios の第二引数として与えることができます。

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";
const response = await axios.get(`${BASE_URL}/videos`, {
  params: {
    key: API_KEY,
    id: videoId,
    part: "snippet",
  },
});
console.log(response.data);
```

#### 関数化

このまま呼び出す順に処理を追加しても完成しますが、それだとメンテナンス性が悪いので処理の関数化に挑戦してみましょう。  
具体的には`function getAbc() {}`のようにします。

```javascript
function getAbc(str) {
  console.log(str);
}

// function getAbcの呼び出し
getAbc("abc");
// abc
```

実際に適応するとこのような形になるかと思います。

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";

// function getAbc() {}で処理を
function getAbc() {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: API_KEY,
      id: videoId,
      part: "snippet",
    },
  });
  console.log(response.data);
}

getAbc();
```

### これで lesson01 は終了です。


# 最終的に欲しいデータ

まずゴールとなる必要なデータから決めましょう。（実際には API で取得出来るものは何かな？と調べるところから始めるでしょう）

今回は予め決めておきました。

## 最終取得データ

- チャンネル情報
  - チャンネル ID
  - チャンネル名
- 動画情報（複数）
  - 動画 ID
  - 動画タイトル
  - 公開日時
  - 視聴回数
  - Good 件数
  - Bad 件数
  - コメント件数

プログラムで扱う Json 形式も定義します。

```json
{
  "channelInfo": {
    "channelId": "UCAwDrM75UAddwluabae4A6g",
    "channelTitle": "title"
  },
  "videoDataList": [
    {
      "videId": "2CXdfads",
      "title": "abc",
      "publishedAt": "2021-06-19T10:38:55Z",
      "viewCount": "96756",
      "likeCount": "2826",
      "dislikeCount": "24",
      "commentCount": "53"
    },
    {
      "videId": "2CXvkGbiwbs",
      "title": "efg",
      "publishedAt": "2021-06-20T22:38:55Z",
      "viewCount": "96756",
      "likeCount": "2826",
      "dislikeCount": "24",
      "commentCount": "53"
    }
  ]
}
```

## lesson02-処理の流れ-

# 使用する YouTubeAPI について

## 動画情報取得

[動画リスト情報取得 API](https://developers.google.com/youtube/v3/docs/videos/list?hl=ja)は指定した動画 ID（複数可）を元に動画情報リストを取得する。

## 検索

チャンネルに紐付く動画リスト


## lesson02-動画情報を取得-

さぁ、いよいよ YouTube から必要なデータを取得しましょう。

###

## lesson03-チャンネルに紐づく動画 ID リストを取得-

###

## lesson04-動画情報リストを取得-

###

## lesson05-取得した情報を整形-

###

## lesson06-画面表示-
