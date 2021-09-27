# JavaScript Level.0

## ご意見お待ちしております

https://github.com/NwHub/newcomer-training/issues

## タイムスケジュール

-
-
-

## 完成イメージ

動画 URL を入力すると再生数や高評価・低評価などをグラフで表示するサービスです。（チャンネル URL ではなく動画 URL なので注意）
![Kapture 2021-08-28 at 11 07 24](https://user-images.githubusercontent.com/1374058/131202956-6158d8ff-98bd-4584-899f-759a7656fbe6.gif)

## 環境構築

## GitHub 登録

すでに GitHub アカウントを持っている人は不要です。  
未実施の人は登録をお願いします。（会社メールでも OK）

#### [https://github.com/](https://github.com/)

![image](https://user-images.githubusercontent.com/1374058/120644963-e202f700-c4b2-11eb-92ba-4781523969ff.png)

## Paiza Cloud 登録

Paiza Cloud に登録しましょう。（GitHub アカウントと連携するだけ）

#### [https://paiza.cloud/signup](https://paiza.cloud/signup)

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
npm がアップデートされます。

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

##### その際ファイルの保存を忘れずに！（自動保存にチェックを入れておいた方がよい）

![image](https://user-images.githubusercontent.com/1374058/129496394-189599c6-1175-49bb-b026-3d4d70af872a.png)

#### test.js

```javascript
console.log("YouTube");
```

---

### JS ファイルを実行

ターミナルで`node ファイル名`と入力して JavaScript を実行します。  
`YouTube`と表示されれば成功です。

![image](https://user-images.githubusercontent.com/1374058/129496472-7e119e4e-2064-431f-84f9-4132f55fb80f.png)

```Shell
node test.js
```

```shell
YouTube
```

---

## lesson01 - GitHub からテンプレートプロジェクトをクローン -

GitHub から本日使用するテンプレートを取ってきます

### GitHub からプロジェクトをクローン

1. `skeleton`ブランチを指定して、GitHub からコードの雛形をクローンします。  
   雛形の中身ですが、すでに作成済みのコードの一部、コードフォーマットやモックサーバの設定などがしてあります。

```Shell
git clone https://github.com/NwHub/youtube-api.git -b skeleton
```

1. クローンしたプロジェクトに移動

```Shell
cd youtube-api
```

1. `npm install`でパッケージダウンロード

```shell
npm install
```

1. プロジェクトの状態
```
.
├── mock
│   └── db.json               --- Mockサーバーの設定
├── package-lock.json         --- npm の設定ファイル
├── package.json              --- npm の設定ファイル
└── src
    ├── repository
    │   ├── YouTubeApi.js     --- YouTubeApiにアクセスするコード
    ├── service
    │   └── YouTubeService.js --- YouTubeApiから返却されたデータを必要な形に整形するコード（今回ここを修正する）
    └── youtube.js            --- 
```
---

### lesson02 - Mock サーバー（json-server）の立ち上げ -

YouTubeApi はクォータと呼ばれる使用制限があるため、何度も接続すると 1 日のインターバルが発生します。  
しかし開発中は何度も接続する必要がでてきます。

そこで簡単にサーバーを立ち上げることが出来る`json-server` を利用して、モックデータを取得するようにすることで解決します。

本当に簡易的に作っているので、id での検索などはできず、常に同じものが返ってきますが、とりあえず用は足ります。（必要に応じて YouTube 本番に繋げましょう）

1. `json-server`の設定はしてあるので、`新しく違うターミナルを立ち上げて`json-server を起動してみましょう。

```shell
npm run json-server
```

`json-server`を起動したターミナルはサーバー専用として、このまま放っておきます。(手元でサーバーを作ったイメージ)

1. lesson01 でプロジェクトを作成したターミナルに戻って、以下のコマンドを実行しサーバーが正常に動作しているか確認しましょう。

```shell
curl http://localhost:3000/videos
```

こんな感じのが返ってくれば OK

```json
{
  "kind": "youtube#videoListResponse",
  "etag": "YLxySir_kgJmqTJ73l3ZkBzfjFc",
  "items": [
    {
      "kind": "youtube#video",
      "etag": "OX39KNazvW0pFLmQofjbnzoFeww"
....
```

##### メモ

- 公式
  - [json-server](https://github.com/typicode/json-server)

---

## lesson02 -YouTube 情報取得の外枠を作成-

さぁ、いよいよ YouTube から必要なデータを取得しましょう。  
その前に簡単な仕様書を用意したので、参考にしてください。

### 仕様書

- [詳細設計](https://github.com/NwHub/newcomer-training/wiki/%E8%A9%B3%E7%B4%B0%E8%A8%AD%E8%A8%88)

### 関数の定義

- `getYouTubeInfo`の追加
- 不要な呼び出しを削除

```javascript
// axiosパッケージ読込
const axios = require("axios");

// YouTube API KEY
const API_KEY = "";
const MAX_RESULTS = 50;
const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function getChannelInfo(videoId) {
  // 省略
}

// 追加
// getYouTubeInfoを追加
// ついでにgetChannelInfoを呼び出すようにする
async function getYouTubeInfo(videoId) {
  // 1-1. チャンネル情報取得の呼び出し
  const channelInfo = await getChannelInfo(videoId);

  // 1-2. 動画 ID リスト取得の呼び出し
  // 1-3. 動画情報 リスト取得の呼び出し

  // 返却値
  const youTubeInfo = {
    channelInfo: {},
    videoInfoList: [],
  };
  // デバッグ
  console.log(`youTubeInfo : ${JSON.stringify(youTubeInfo, null, 2)}`);
  return youTubeInfo;
}

const videoId = "2dldq7XQdIo";
getYouTubeInfo(videoId);

// これは不要なので消す
// const videoId = "2dldq7XQdIo";
// getChannelInfo(videoId);
```

#### フォーマット＆実行

```Shell
npm run format && node src/youtube.js
```

##### メモ

- 使用する技術
  - [json](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#json)

---

## lesson03-チャンネル情報を取得-

チャンネル情報を取得する関数を作りましょう。  
半分くらい lesson01 で作っています。

### 返却値の設定

lesson01 で作成した `getChannelInfo` が利用できる形なので、返却値の処理を追加していきましょう。

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
    channelTitle: response.data.items[0].snippet.channelTitle,
  };

  //console.log(JSON.stringify(jsonObject, null, 2));
  console.log(channelInfo);
  return channelInfo;
}
function getYouTubeInfo(videoId) {
  // 省略
}

const videoId = "2dldq7XQdIo";
getYouTubeInfo(videoId);
```

#### フォーマット＆実行

```Shell
npm run format && node src/youtube.js
```

##### メモ

- 使用する技術
  - [json](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#json)
  - [async/await](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#asyncawait)

---

## lesson04-動画情報リストを取得-

おそらくこの処理が一番難しいかと思います。

### 関数の定義

```javascript
// 省略

// 追加
async function getVideoIdMultiList(channelId) {
  return [[]];
}

async function getYouTubeInfo(videoId) {
  // 省略

  // getVideoIdMultiListを呼び出すように修正
  // 1-2. 動画 ID リスト取得の呼び出し
  const videoIdMultiList = await getVideoIdMultiList(channelInfo.channelId);

  // 省略
}

getYouTubeInfo(videoId);
```

---

### YouTubeAPI の呼び出し処理を作り込み

```javascript
async function getVideoIdMultiList(channelId) {
  // 追加
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: MAX_RESULTS,
        // 後で設定する
        // pageToken: nextPageToken,
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(error);
  }
  return [[]];
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
        key: API_KEY,
        channelId: channelId,
        part: "id",
        order: "date",
        type: "video",
        maxResults: MAX_RESULTS,
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
  return [[]];
}
```

- 使用する技術
  - [ループして配列を作る](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#%E3%83%AB%E3%83%BC%E3%83%97%E3%81%97%E3%81%A6%E9%85%8D%E5%88%97%E3%82%92%E3%81%A4%E3%81%8F%E3%82%8B)

---

### 最大件数になるまで取得するように処理を追加

YouTubeApi では一回に取得出来る最大件数は 50 件なので、たとえば 100 件欲しい場合は 2 回取得することになります。  
加えて、何万件もある可能性があるので、取得件数に制限を儲ける必要もあります。  
そこで今回は「取得する最大件数を決めて、件数に達するまでループする」という処理にします。

- `MAX_VIDEO_COUNT`の定数を定義
- `getVideoIdMultiList`の変数として、取得件数の合計を保持する`videoCount`を定義
- `videoCount`に件数を加算する処理を追加
- API からの返却された nextPageToken をチェックし、存在しない場合はループを終了する（最大件数に達していないが、次の取得するデータがない）

```javascript
// 省略

const BASE_URL = "http://localhost:3000";
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
  let nextPageToken;

  // 追加
  while (videoCount < MAX_VIDEO_COUNT) {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          key: API_KEY,
          channelId: channelId,
          part: "id",
          order: "date",
          type: "video",
          maxResults: MAX_RESULTS,
          // 追加
          pageToken: nextPageToken,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));
      const videoIdList = response.data.items.map((item) => item.id.videoId);
      // 追加
      videoCount += videoIdList.length;

      // 追加
      nextPageToken = response.data.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return [[]];
}
```

##### メモ

- 使用する技術
  - [ループ](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#%E3%83%AB%E3%83%BC%E3%83%97)
  - [if 文](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#if-%E6%96%87)

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
          key: API_KEY,
          channelId: channelId,
          part: "id",
          order: "date",
          type: "video",
          maxResults: MAX_RESULTS,
          pageToken: nextPageToken,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));
      const videoIdList = response.data.items.map((item) => item.id.videoId);
      videoCount += videoIdList.length;
      // 追加
      videoIdMultiList = [...videoIdMultiList, videoIdList];

      nextPageToken = response.data.nextPageToken;
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

##### メモ

- 使用する技術
  - [配列に追加](https://github.com/NwHub/newcomer-training/wiki/03_JavaScript%E5%85%A5%E9%96%80#%E9%85%8D%E5%88%97%E3%81%AB%E8%BF%BD%E5%8A%A0)

---

## lesson05-動画情報 リスト取得-

### 関数の定義

- `getVideoInfoList`を追加する

```javascript
// 省略

async function getVideoIdMultiList(channelId) {
  // 省略
}

// 追加
async function getVideoInfoList(videoIdMultiList) {
  return [];
}
async function getYouTubeInfo(videoId) {
  // 省略

  // 1-3. 動画情報 リスト取得の呼び出し
  // 追加
  const videoInfoList = getVideoInfoList(videoIdMultiList);

  // 省略
}
```

---

### YouTubeAPI の呼び出し処理

```javascript
async function getVideoInfoList(videoIdMultiList) {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: API_KEY,
        id: "2CXvkGbiwbs,DQ5IquyRCNI",
        part: "snippet,statistics",
        maxResults: MAX_RESULTS,
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log(error);
  }
  return [];
}
```

---

### ループ化

```javascript
async function getVideoInfoList(videoIdMultiList) {
  // for を追加
  for (const videoIdList of videoIdMultiList) {
    try {
      // 配列を`join`を使ってカンマ繋ぎに変換する
      const commaVideoIdList = videoIdList.join(",");
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          key: API_KEY,
          // 変更
          id: commaVideoIdList,
          part: "snippet,statistics",
          maxResults: MAX_RESULTS,
        },
      });

      console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  return [];
}
```

---

### 返却値の videoInfoList を作成

```javascript
async function getVideoInfoList(videoIdMultiList) {
  let videoInfoList = [];
  for (const videoIdList of videoIdMultiList) {
    try {
      const commaVideoIdList = videoIdList.join(",");
      const response = await axios.get(`${BASE_URL}/videos`, {
        params: {
          key: API_KEY,
          id: commaVideoIdList,
          part: "snippet,statistics",
          maxResults: MAX_RESULTS,
        },
      });

      // console.log(JSON.stringify(response.data, null, 2));

      for (item of response.data.items) {
        const videoInfo = {
          viewCount: item.statistics.viewCount,
          likeCount: item.statistics.likeCount,
          dislikeCount: item.statistics.dislikeCount,
          commentCount: item.statistics.commentCount,
          videId: item.id,
          title: item.snippet.title,
          publishedAt: item.snippet.publishedAt,
        };
        videoInfoList = [...videoInfoList, videoInfo];
        // もしくは
        // videoInfoList.push(videoInfo);
      }

      // 別の方法として、こういうでもいい
      // const tmpVideoInfoList = response.data.items.map((item) => {
      //   return {
      //     viewCount: item.statistics.viewCount,
      //     likeCount: item.statistics.likeCount,
      //     dislikeCount: item.statistics.dislikeCount,
      //     commentCount: item.statistics.commentCount,
      //     videId: item.id,
      //     title: item.snippet.title,
      //     publishedAt: item.snippet.publishedAt,
      //   };
      // });
      // videoInfoList = [...videoInfoList, ...tmpVideoInfoList];
    } catch (error) {
      console.log(error);
    }
  }
  console.log(videoInfoList);
  return videoInfoList;
}
```

---

## lesson06-取得した情報を整形-

### 返却値の修正

1-1 と

```javascript
async function getYouTubeInfo(videoId) {
  // 1-1. チャンネル情報取得の呼び出し
  const channelInfo = await getChannelInfo(videoId);

  // 1-2. 動画 ID リスト取得の呼び出し
  const videoIdMultiList = await getVideoIdMultiList(channelInfo.channelId);

  // 1-3. 動画情報 リスト取得の呼び出し
  const videoInfoList = getVideoInfoList(videoIdMultiList);

  // 変更
  // 返却値
  const youTubeInfo = {
    channelInfo: channelInfo,
    videoInfoList: videoInfoList,
  };
  // デバッグ
  console.log(`youTubeInfo : ${JSON.stringify(youTubeInfo, null, 2)}`);
  return youTubeInfo;
}
```

## lesson06-画面表示-

```shell
cd
git clone https://github.com/NwHub/vue-chart.git
cd vue-chart
npm i
npm run serve
```
