# 新人教育プログラム

## ご意見お待ちしております

https://github.com/NwHub/newcomer-training/issues

## タイムスケジュール

-
-
-

## 導入

## GitHub 登録

![image](https://user-images.githubusercontent.com/1374058/120644963-e202f700-c4b2-11eb-92ba-4781523969ff.png)

## Paiza Cloud 登録

![image](https://user-images.githubusercontent.com/1374058/127300018-27aecb9a-0227-4899-ac6a-3ea6e2d9b657.png)
![image](https://user-images.githubusercontent.com/1374058/127300594-2a599d2e-165d-4fea-b8f5-c5bedbaa87d7.png)

## Node.js で JavaScript を実行

環境が正しく動作するか確認していきます。

### 作業ディレクトリと js ファイルを作成

ターミナルを開いて以下のコマンドを実行すると、ファイルが作られます。  
Mac と Windows でコピー＆ペーストのやり方が違うので、以下を参考にしてください。

|          | Mac                             | Windows                                            |
| -------- | ------------------------------- | -------------------------------------------------- |
| コピー   | ページの文字列を選択して`⌘ + c` | ページの文字列の右端にあるコピーアイコンをクリック |
| ペースト | ターミナルで`⌘ + v`             | ターミナルで`右クリック → 貼り付け`                |

#### ターミナルを開く

GUI からターミナルを開きます。
![image](https://user-images.githubusercontent.com/1374058/127300939-ec11de69-e362-4a00-aa7a-8ac7dd774484.png)

#### npm の更新

なにも考えずターミルで以下のコマンドを実行してください。

```shell
npm install -g npm
```

#### ファイルを作成

以下のコマンドでファイルを作成できます。（GUI から作っても OK）

```Shell
touch test.js
```

---

### JS ファイルに処理を記述

作成したファイルを右ペインから開き、以下の内容を記述します。  
その際ファイルの保存を忘れずに！（自動保存にチェックを入れておいた方がよい）

#### test.js

```javascript
console.log("YouTube");
```

---

### JS ファイルを実行

`node ファイル名`で JavaScript を実行します。  
`YouTube`と表示されれば成功です。

```Shell
node test.js
```

```shell
YouTube
```

---

## lesson01 -axios を使って YouTubeAPI に接続-

ウォーミングアップとして軽い JavaScript のコーディングと YouTubeAPI の疎通を試してみましょう。

### GitHub からプロジェクトをクローン

`skeleton`ブランチを指定して、GitHub からコードの雛形をクローンします。  
雛形の中身はコードフォーマットやモックサーバの設定などがしてありますが、0 から作るのとほぼ変わりません。

```Shell
git clone https://github.com/NwHub/youtube-api.git -b skeleton
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

プロジェクトルートで`npm install axios`を実行してインストールします。  
これだけで`axios`のパッケージが導入されます、すごいですね。

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

早速 YouTubeAPI と疎通しましょう。

- `src/youtube.js`にコードを貼り付け
- `API_KEY`に別途配布している Token を設定
- 自動的に保存にチェックを忘れずに

#### src/youtube.js

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

メモ：

- 使用する技術
  - パッケージ読み込み
  - 変数定義
  - 文字列結合
  - console.log

---

### 実行

正しく取れるか確認しましょう。

```Shell
node youtube.js
```

---

### コードフォーマット

今回 DaaS（Desktop As A Service）を利用する関係でコードの整形が難しいという問題があります。  
手動でスペースを入れたり、タブを入れたるするのは考えられないので、`prettier`というパッケージを利用します。  
設定は済ませてあるので、下記のコマンドを実行しコードフォーマットを実施します。
ちなみに`package.json`の scripts の項目に設定が書いてあります。

```shell
npm run format
```

メモ

- prettier

---

### 基本となる URL を切り出し

コードを修正して可読性を上げましょう。  
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

YouTubeApi はクォータと呼ばれる使用制限があるため、YouTubeAPI に何度も接続すると 1 日のインターバルが発生します。  
しかし開発中は何度も接続する必要がでてきます。  
そこで簡単にサーバーを立ち上げることが出来る`json-server` を利用して、モックデータを取得するようにすることで解決します。

例によって設定はしておいたので`新しく違うターミナルを立ち上げて`、json-server を起動してみましょう。

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

---

## lesson02 -YouTube 情報取得の外枠を作成-

さぁ、いよいよ YouTube から必要なデータを取得しましょう。  
その前に簡単な仕様書を用意したので、参考にしてください。

### 仕様書

- [詳細設計](https://github.com/NwHub/newcomer-training/wiki/%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88)

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

---

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

### getYouTubeInfo から`getChannelInfo`を呼び出す

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

---

## lesson04-動画情報リストを取得-

おそらくこの処理が一番難しいかと思います。

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
    console.log(videoIdList);
  } catch (error) {
    console.log(error);
  }
}
```

---

### 最大件数になるまで取得するように処理を追加

- `MAX_VIDEO_COUNT`の定数を定義
- `getVideoIdMultiList`の変数として、取得件数の合計を保持する`videoCount`を定義
- `videoCount`に件数を加算する処理を追加
- API からの返却された nextPageToken をチェックし、存在しない場合はループを終了する（最大件数に達していないが、次の取得するデータがない）

```javascript
// 省略

const BASE_URL = "http://localhost:8080";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

// 追加
// 動画情報の最大件数
const MAX_VIDEO_COUNT = 200;

async function getChannelInfo(videoId) {
  // 省略
}

async function getVideoIdMultiList(channelId) {
  // 追加
  let videoCount = 0;
  // 追加
  while (videoCount < MAX_VIDEO_COUNT) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          key: KEY,
          channelId: channelId,
          part: "id",
          order: "date",
          type: "video",
          maxResults: 50,
          // 追加
          pageToken: nextPageToken,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));
      const videoIdList = response.data.items.map((item) => item.id.videoId);
      // 追加
      videoCount += videoIdList.length;

      // 追加
      const nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
```

### 多重配列の返却値を作成

- 返却値を格納する変数`videoIdMultiList`を定義
- `videoIdMultiList`に`videoIdList`を追加するように処理を作成
- `videoIdMultiList`を return で返却する（値は仕様書をみてね）

```javascript
async function getVideoIdMultiList(channelId) {
  // 追加
  let videoIdMultiList = [];
  let videoCount = 0;
  let nextPageToken = "";

  while (videoCount < MAX_VIDEO_COUNT) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          key: KEY,
          channelId: channelId,
          part: "id",
          order: "date",
          type: "video",
          maxResults: 50,
          pageToken: nextPageToken,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));
      const videoIdList = response.data.items.map((item) => item.id.videoId);
      videoCount += videoIdList.length;
      // 追加
      videoIdMultiList = [...videoIdMultiList, videoIdList];

      const nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 追加
  return videoIdMultiList;
}
```

---

### getYouTubeInfo から`getVideoIdMultiList`を呼び出す

- `getYouTubeInfo`から`getVideoIdMultiList`を呼び出すように修正
- `getYouTubeInfo`に`async`を追加

```javascript
// 省略

async function getChannelInfo(videoId) {
  // 省略
}
async function getVideoIdMultiList(channelId) {
  // 省略
}

async function getYouTubeInfo(videoId) {

  // 1-1. チャンネル情報取得の呼び出し
  const channelInfo = await getChannelInfo(videoId);

  // getVideoIdMultiListを呼び出すように修正
  // 1-2. 動画 ID リスト取得の呼び出し
  const videoIdMultiList = await getVideoIdMultiList(channelInfo.channelId)；
  console.log(videoIdMultiList);

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

## lesson05-動画情報 リスト取得-

### 関数の定義

- `getVideoInfoList`を追加する

```javascript
// 省略

async function getChannelInfo(videoId) {
  // 省略
}

async function getVideoIdMultiList(channelId) {
  // 省略
}

// 追加
async function getVideoInfoList(videoIdMultiList) {}

async function getYouTubeInfo(videoId) {
  // 省略
}

getYouTubeInfo(videoId);
```

---

### 関数の定義

- `getVideoInfoList`を追加する

```javascript
async function getVideoInfoList(videoIdMultiList) {
  try {
    const commaVideoIdList = videoIdList.join(",");
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: KEY,
        id: commaVideoIdList,
        part: "snippet,statistics",
        maxResults: 50,
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(error);
  }
}
```

## lesson06-取得した情報を整形-

###

## lesson06-画面表示-
