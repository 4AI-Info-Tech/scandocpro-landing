import { useBlogPosts } from '@/hooks/useBlogPosts';
import { SEO } from '@/components/SEO';
import { BlogCard } from '@/components/BlogCard';
import { GradientText } from '@/components/GradientText';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function Blog() {
  const { posts, loading, error } = useBlogPosts();

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Failed to load posts</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <SEO
        title="Blog"
        description="Tips, tutorials, and insights about document scanning, OCR technology, and mobile productivity."
        keywords={['document scanning', 'OCR', 'mobile productivity', 'PDF scanning tips']}
      />

      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              ScanDocPro <GradientText>Blog</GradientText>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tips, tutorials, and insights about document scanning, OCR technology, and mobile productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-6">
              Featured Post
            </h2>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* All Posts */}
      {otherPosts.length > 0 && (
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
              Latest Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {otherPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
