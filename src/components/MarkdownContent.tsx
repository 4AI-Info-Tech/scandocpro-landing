interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const escapeHtml = (value: string): string => (
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
  );

  const formatInline = (value: string): string => (
    escapeHtml(value)
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline">$1</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
  );

  const convertMarkdown = (text: string): string => {
    const lines = text.split('\n');
    const html: string[] = [];
    const paragraphLines: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let listItems: string[] = [];

    const flushParagraph = () => {
      if (paragraphLines.length === 0) {
        return;
      }

      html.push(`<p class="mb-4">${formatInline(paragraphLines.join(' '))}</p>`);
      paragraphLines.length = 0;
    };

    const flushList = () => {
      if (!listType || listItems.length === 0) {
        listType = null;
        listItems = [];
        return;
      }

      const className = listType === 'ul'
        ? 'list-disc list-inside mb-4'
        : 'list-decimal list-inside mb-4';
      html.push(`<${listType} class="${className}">${listItems.join('')}</${listType}>`);
      listType = null;
      listItems = [];
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph();
        flushList();
        return;
      }

      const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        const level = headingMatch[1].length;
        const sizes = {
          1: 'text-3xl mt-12 mb-6',
          2: 'text-2xl mt-10 mb-5',
          3: 'text-xl mt-8 mb-4',
        } as const;
        html.push(`<h${level} class="${sizes[level as 1 | 2 | 3]} font-bold">${formatInline(headingMatch[2])}</h${level}>`);
        return;
      }

      const unorderedMatch = trimmed.match(/^- (.+)$/);
      if (unorderedMatch) {
        flushParagraph();
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(`<li class="mb-2">${formatInline(unorderedMatch[1])}</li>`);
        return;
      }

      const orderedMatch = trimmed.match(/^\d+\. (.+)$/);
      if (orderedMatch) {
        flushParagraph();
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(`<li class="mb-2">${formatInline(orderedMatch[1])}</li>`);
        return;
      }

      flushList();
      paragraphLines.push(trimmed);
    });

    flushParagraph();
    flushList();

    return html.join('');
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: convertMarkdown(content) }}
    />
  );
}
