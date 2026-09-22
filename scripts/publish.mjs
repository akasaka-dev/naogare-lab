// Publish V1 — the one command that takes the place of remembering the
// manual "build, strip WAVs, copy into naogare-lab/saikai, commit, push"
// dance. Run with `npm run publish`. It builds this project, then writes
// the result into the sibling naogare-lab checkout (the real site repo)
// and pushes straight to its main branch, matching how the other games in
// that repo already auto-deploy on push.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(fileURLToPath(import.meta.url), '../..');
const siteRoot = path.resolve(projectRoot, '../../naogare-lab');
const distDir = path.join(projectRoot, 'dist');
const targetDir = path.join(siteRoot, 'saikai');

function step(label) {
  console.log(`\n=== ${label} ===`);
}

function run(command, cwd) {
  console.log(`$ ${command}`);
  execSync(command, { cwd, stdio: 'inherit' });
}

if (!existsSync(siteRoot)) {
  console.error(`サイトのローカルフォルダが見つかりません: ${siteRoot}`);
  process.exit(1);
}

step('1/5 ビルド (npm run build)');
run('npm run build', projectRoot);

step('2/5 大きいWAV原本をビルド成果物から除外');
const audioDir = path.join(distDir, 'audio');
if (existsSync(audioDir)) {
  for (const file of readdirSync(audioDir)) {
    if (file.endsWith('.wav')) {
      rmSync(path.join(audioDir, file));
      console.log(`除外: audio/${file}`);
    }
  }
}

step('3/5 naogare-lab/saikai/ へコピー');
rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(distDir, targetDir, { recursive: true });

step('4/5 コミット');
run('git add saikai', siteRoot);
let hasChanges = true;
try {
  execSync('git diff --cached --quiet', { cwd: siteRoot });
  hasChanges = false;
} catch {
  hasChanges = true;
}
if (!hasChanges) {
  console.log('変更なし。公開する内容はありません。');
  process.exit(0);
}
const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
run(
  `git commit -m "chore: update saikai build (${timestamp})" -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"`,
  siteRoot
);

step('5/5 push（これでサイトに公開されます）');
run('git push origin main', siteRoot);

console.log('\n公開完了しました。');
