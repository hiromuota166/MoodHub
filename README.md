# pre-commitによるフォーマットの導入方法

## huskyのセットアップ
```
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run format"
```

graphqlのコードのアップデート方法
1. lib/apollo/schema.graphqlを最新の状態にする
2. npm run codegen
3. lib/apollo/apollo-query.tsを手動で書き換え
