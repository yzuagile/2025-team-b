import { parseMD } from '../backend/controller/ProcessContext'; // ← 視實際檔案路徑調整
// 例如你把 function 放在 src/utils/markdown.ts，路徑就改成
// import { parseMD } from '../src/utils/markdown';

describe('parseMD', () => {
  it('應該把 Markdown 轉成 HTML 字串', async () => {
    const md = '# 標題\n\n**粗體文字**';
    const html = await parseMD(md);

    // 基本檢查
    expect(typeof html).toBe('string');
    // 標題 <h1>
    expect(html).toContain('<h1');
    // 粗體 <strong>
    expect(html).toContain('<strong');
  });

  it('當輸入非字串時應拋出錯誤', async () => {
    // 這裡故意傳 undefined，期望 parseMD 會丟錯
    await expect(parseMD(undefined as any)).rejects.toThrow();
  });
});