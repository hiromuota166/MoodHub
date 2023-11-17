# pre-commitによるフォーマットの導入方法

## huskyのセットアップ
```
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run format"
```