# Development Guide

## Clone

1. Install Node.js
2. Clone this repository

```
git clone https://github.com/yzuagile/2025-team-b.git

cd 2025-team-b
```

3. download all packages you need

```
npm install
```

## Commands

```
// build and execute the program
npm start

// start unit test
npm test

// build the javascript code
npm run build
```

## Branche Rules

1. Never do force push \
   **NEVER DO FORCE PUSH** \
   **NEVER DO FORCE PUSH** \
   **NEVER DO FORCE PUSH**

2. Commit Message \
   沒限制，有寫清楚就好，反正 pull request 的時候會 review 一次

3. New features or anything \
   If you want to develop a new feature, fix something or test something, please create a new branch.
   After you finish your works, open a pull request to branch `main`

```
// create a new branch local
git branch <feat/fix/test>/<name>

// go into the branch
git checkout <branch_name>

// push the code to github (ensure that you have already set the remote)
git push
git push --set-upstream origin <branch_name>
```

## Testing

請各位 PR 上來的程式碼需自行撰寫 unit test，並確保 code coverage = 100 %

### 測試 code coverage 指令

**全部.test.ts 都測**

```
npm run test -- --coverage
```

**測試單獨檔案**

```
npx jest <pathToTestFile> -- --coverage
```
