# 新人教育プログラム

# ご意見お待ちしております。

https://github.com/NwHub/newcomer-training/issues

# 要件

- オンラインでの実施が前提
  - 実施時間は長くて 3H
  - ハンズオン
  - 参加人数は最大 5 人
- 使用するのは個人の PC/Mac/Linux
  - 環境構築が課題
    => DaaSを利用することで解決
  - 個人 PC に色々インストールさせる状況はなるべく避けたい
  - 使用に料金がかかる、無料でもクレジットカードの登録が必要なども避けたい
    => 会社に出させればいける？
- 成功体験を重視する内容

# 実施内容検討

<details>
  <summary>検討内容</summary>

## 案 1:サンプルを用意してハンズオン

言語が決まれば何をやるか決まる

どれがいい？

- JavaScript

  - FrontEnd 系、クライアントサーバシステム
  - Good
    - 環境が用意しやすい
    - サクサク作れる
  - Bad
    - 研修内容が役に立たない
    - 記述方法が多いのでどれで統一するか迷う（他にも ES5 やら ES6 やら TypeScript やら、、、）

- Java

  - BackEnd 系、クライアントサーバシステム
  - Good
    - 研修内容が生かせる
    - 誰が書いても同じようになるので、覚えたことが腐らない
    - Java の現場が一番多い
  - Bad
    - 環境を用意するのがすごく大変
    - 生産性が悪い（出来上がりが遅い！）

- Go

  - BackEnd 系
  - Good
    - 環境が用意しやすい
  - Bad
    - 研修内容が役に立たない
    - 作るのが API とかバッチなので、好きな人は好きだが、、、

- Python

  - 機械学習、自然言語処理、クローラー
  - Good
    - 「Python 得意です」って猛者感がある
    - 機械学習ならこれ一択
  - Bad
    - 研修内容が役に立たない
    - 使える現場が、、、、
    - 入門でやるもんじゃないかも

- Git

  - How to use
  - Good
    - ものすごく役に立つ
  - Bad
    - たぶん眠くなる

- HTML/CSS
  - デザイン
  - Good
    - Beautiful
  - Bad
    - Beautiful

## 案 2:paiza ラーニングとかをみんなでやる

- [https://paiza.jp/works](https://paiza.jp/works)

- [https://paiza.jp/paiza_game_history](https://paiza.jp/paiza_game_history)

## 案 3:誰か考えたサービスをみんなで作る

- 72 時間は必要

</details>

# ディスカッション結果

- 成功体験は大事
- 何か作る方が楽しい
- JavaScript でも問題ないのでは（TypeScript は要検討）
- いきなり React/Vue よりは MVC の基本の方がよい？
  => 作る分には Vue が楽
- 動画のコメントを利用したサンプルが面白そう
  => 採用
- 40日以内には何らかの結果を提示する
