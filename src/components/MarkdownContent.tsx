interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown-to-HTML converter for basic formatting
  const convertMarkdown = (text: string): string => {
    return text
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-5">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-6">$1</h1>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>')
      // Wrap lists
      .replace(/(<li.+?<\/li>\n?)+/g, '<ul class="list-disc list-inside mb-4">$&</ul>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline">$1</a>')
      // Wrap in paragraph
      .replace(/^(.+)$/gm, (match) => {
        if (match.startsWith('<')) return match;
        return `<p class="mb-4">${match}</p>`;
      });
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    />
  );
}
