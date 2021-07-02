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
  - 変数定義
  - 文字列結合
  - console.log

youtube.js

```javascript
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

### json-server を使用する

YouTubeApi はクォータと呼ばれる使用制限があるため、json-server を利用しモックデータを取得するようにする。

新しくターミナルを立ち上げて、json-server を起動する

```shell
npm run json-server
```

---

### フォーマット

```shell
npm run format
```

## lesson02-動画情報を取得-

###

## lesson03-チャンネルに紐づく動画 ID リストを取得-

###

## lesson04-動画情報リストを取得-

###

## lesson05-取得した情報を整形-

###

## lesson06-画面表示-
