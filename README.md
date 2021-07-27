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

src/youtube.js

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";

const videoId = "2dldq7XQdIo";
const response = await axios.get(
  `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=snippet&maxResults=1`
);
console.log(response.data);
```

---

### 実行

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

### 基本となる URL を切り出し

コードを修正し、可読性をあげましょう。  
ごちゃっとしたコードはそれだけでバグの温床になってしまいます。

まずは接続 URL のホスト部分を変数で切り出しましょう。

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";
const response = await axios.get(
  `${BASE_URL}/videos?key=${API_KEY}&id=${videoId}&part=snippet&maxResults=1`
);
console.log(response.data);
```

---

### クエリパラメータの引数化

`axios`はクエリパラメータ（?〜の部分）を`{ params:{ { key : value} }`の形で axios の第二引数として与えることができます。

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";
const response = await axios.get(`${BASE_URL}/videos`, {
  params: {
    key: API_KEY,
    id: videoId,
    part: "snippet",
    maxResults: 1,
  },
});
console.log(response.data);
```

---

### 関数化

このまま呼び出す順に処理を追加しても完成しますが、それだとメンテナンス性が悪いので処理の関数化に挑戦してみましょう。  
具体的には`async function getAbc() {}`のようにします。

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
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";

// function getAbc() {}で処理を
async function getAbc() {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: API_KEY,
      id: videoId,
      part: "snippet",
      maxResults: 1,
    },
  });
  console.log(response.data);
}

getAbc();
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
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";

// function getAbc() {}で処理を
async function getAbc() {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: API_KEY,
      id: videoId,
      part: "snippet",
      maxResults: 1,
    },
  });
  console.log(response.data);
}

getAbc();
```

元のターミナルに戻って動作が変わらないことを確認しましょう。

```Shell
node youtube.js
```

### これで lesson01 は終了です。

## lesson02 -YouTube 情報取得の外枠を作成-

さぁ、いよいよ YouTube から必要なデータを取得しましょう。  
その前に簡単な仕様書を用意したので、参考にしてください。

### 関数の定義

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

const videoId = "2dldq7XQdIo";

async function getAbc() {
  // 省略
}

// これは不要なので消す
// getAbc();

// 追加
function getYouTubeInfo(videoId) {
  // 1-1. チャンネル情報取得の呼び出し
  // 1-2. 動画 ID リスト取得の呼び出し
  // 1-3. 動画情報 リスト取得の呼び出し

  // 返却値
  const youTubeInfo = {
    channelInfo: {},
    videoDataList: [],
  };
  // デバッグ
  console.log(`youTubeInfo : ${youTubeInfo}`);
  return youTubeInfo;
}

getYouTubeInfo(videoId);
```

## lesson03-チャンネル情報を取得-

### 関数の定義

lesson01 で作成した abc が利用できる形なので、関数名を修正しましょう

```javascript
// 省略

// getAbc() → getChannelInfo(videoId)に修正（関数名は仕様書をみてね）
async function getChannelInfo(videoId) {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: API_KEY,
      id: videoId,
      part: "snippet",
      maxResults: 1,
    },
  });
  console.log(response.data);
}
function getYouTubeInfo(videoId) {
  // 省略
}

getYouTubeInfo(videoId);
```

---

### 返却値の設定

`getChannelInfo`の返却値を作り込みます。

```javascript
// 省略

async function getChannelInfo(videoId) {
  const response = await axios.get(`${BASE_URL}/videos`, {
    params: {
      key: API_KEY,
      id: videoId,
      part: "snippet",
      maxResults: 1,
    },
  });

  // 返却値を設定（値は仕様書をみてね）
  // console.log(JSON.stringify(jsonObject, null, 2)); でresponseの構造がわかるので、それを参考に設定していく
  const channelInfo = {
    channelId: response.data.items[0].snippet.channelId,
    channelId: response.data.items[0].snippet.channelTitle,
  };

  console.log(channelInfo);
  return channelInfo;
}
function getYouTubeInfo(videoId) {
  // 省略
}

getYouTubeInfo(videoId);
```

---

### `getChannelInfo`を呼び出す

- `getYouTubeInfo`から`getChannelInfo`を呼び出すように修正
- `getYouTubeInfo`に`async`を追加

```javascript
// 省略

async function getChannelInfo(videoId) {
  // 省略
}

// asyncを追加
async function getYouTubeInfo(videoId) {
  // getChannelInfoを呼び出すように修正
  // 1-1. チャンネル情報取得の呼び出し
  const channelInfo = await getChannelInfo(videoId);

  // 1-2. 動画 ID リスト取得の呼び出し
  // 1-3. 動画情報 リスト取得の呼び出し

  // 返却値
  const youTubeInfo = {
    channelInfo: {},
    videoDataList: [],
  };
  // デバッグ
  console.log(`youTubeInfo : ${youTubeInfo}`);
  return youTubeInfo;
}

getYouTubeInfo(videoId);
```

## lesson04-動画情報リストを取得-

### 関数の定義

```javascript
// 省略

async function getChannelInfo(videoId) {
  // 省略
}

// 追加
async function getVideoIdMultiList(channelId) {}

async function getYouTubeInfo(videoId) {
  // 省略
}

getYouTubeInfo(videoId);
```

---

### YouTubeAPI の呼び出し処理を作り込み

```javascript
async function getVideoIdMultiList(channelId) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: 50,
        // 後で設定する
        // pageToken: nextPageToken,
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(error);
  }
}
```

---

### videoIdList を作成

`map`を使って`videoIdList`を作成します。

```javascript
async function getVideoIdMultiList(channelId) {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: 50,
        // 後で設定する
        // pageToken: nextPageToken,
      },
    });

    // console.log(JSON.stringify(response.data, null, 2));
    const videoIdList = response.data.items.map((item) => item.id.videoId);
  } catch (error) {
    console.log(error);
  }
}
```

## lesson05-取得した情報を整形-

###

## lesson06-画面表示-
