const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'blog');
const outputDir = path.join(__dirname, '..', 'public', 'blog-data');

function parseMarkdown(content) {
  const lines = content.split('\n');
  const metadata = {};
  const contentLines = [];
  let inFrontMatter = false;
  let frontMatterEnded = false;
  
  for (const line of lines) {
    if (line.trim() === '---' && !frontMatterEnded) {
      if (!inFrontMatter) {
        inFrontMatter = true;
        continue;
      } else {
        frontMatterEnded = true;
        continue;
      }
    }
    
    if (inFrontMatter && !frontMatterEnded) {
      const match = line.match(/^(.+?):\s*(.+)$/);
      if (match) {
        metadata[match[1].trim()] = match[2].trim();
      }
    } else if (frontMatterEnded) {
      contentLines.push(line);
    }
  }
  
  return {
    metadata,
    content: contentLines.join('\n').trim(),
  };
}

function buildBlog() {
  if (!fs.existsSync(blogDir)) {
    console.log('No blog directory found');
    return;
  }
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(blogDir);
  const posts = [];
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const slug = file.replace('.md', '');
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const parsed = parseMarkdown(content);
      
      const post = {
        slug,
        ...parsed.metadata,
        content: parsed.content,
      };
      
      posts.push(post);
      
      // Write individual post JSON
      fs.writeFileSync(
        path.join(outputDir, `${slug}.json`),
        JSON.stringify(post, null, 2)
      );
    }
  });
  
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Write index
  fs.writeFileSync(
    path.join(outputDir, 'index.json'),
    JSON.stringify(posts, null, 2)
  );
  
  console.log(`✅ Blog built: ${posts.length} posts`);
}

buildBlog();
