#!/usr/bin/env node

/**
 * 手动推送脚本
 * 用法: npm run push:custom "your commit message"
 * 或者: node scripts/push.js "your commit message"
 */

const { execSync } = require('child_process');
const readline = require('readline');

// 获取 commit message（从命令行参数或交互式输入）
const getCommitMessage = () => {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    return args.join(' ');
  }
  
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('请输入 commit message (留空使用默认消息): ', (answer) => {
      rl.close();
      resolve(answer.trim() || `Update: ${new Date().toLocaleString('zh-CN')}`);
    });
  });
};

// 执行 git 命令
const execGit = (command, description) => {
  try {
    console.log(`\n${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✓ ${description} 成功\n`);
    return true;
  } catch (error) {
    console.error(`✗ ${description} 失败:`, error.message);
    return false;
  }
};

// 主函数
const main = async () => {
  console.log('========================================');
  console.log('开始推送代码到 GitHub');
  console.log('========================================\n');
  
  // 检查是否有未提交的更改
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    if (!status.trim()) {
      console.log('没有需要提交的更改');
      return;
    }
  } catch (error) {
    console.error('检查 git 状态失败:', error.message);
    process.exit(1);
  }
  
  // 获取 commit message
  const commitMessage = await getCommitMessage();
  console.log(`Commit message: ${commitMessage}\n`);
  
  // 执行 git 操作
  if (!execGit('git add .', '添加文件到暂存区')) {
    process.exit(1);
  }
  
  if (!execGit(`git commit -m "${commitMessage}"`, '提交更改')) {
    process.exit(1);
  }
  
  // 获取当前分支
  let currentBranch;
  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error('获取当前分支失败:', error.message);
    process.exit(1);
  }
  
  if (!execGit(`git push origin ${currentBranch}`, `推送到远程分支 ${currentBranch}`)) {
    process.exit(1);
  }
  
  console.log('========================================');
  console.log('✓ 推送成功！GitHub Actions 将自动部署');
  console.log('========================================');
};

main().catch((error) => {
  console.error('发生错误:', error);
  process.exit(1);
});

