import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { Book } from "lucide-react";
// import { useScrollToHash } from '../hooks/useScrollToHash';
import "highlight.js/styles/atom-one-dark.css";
import "../styles/markdown.css";

const SimpleDocumentation: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Trigger scroll to hash after content loads
  useEffect(() => {
    if (markdown && window.location.hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(
          decodeURIComponent(window.location.hash)
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [markdown]);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}nizam-overview.md`
        );
        if (!response.ok) {
          throw new Error("Failed to load documentation");
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Error Loading Documentation
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Book className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Documentation
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Complete command reference and guide for Nizam CLI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8"
        >
          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
                remarkSlug,
                [
                  remarkAutolinkHeadings,
                  {
                    behavior: "wrap",
                    linkProperties: {
                      className: "anchor-link",
                      ariaLabel: "Link to this section",
                    },
                  },
                ],
              ]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // Custom dark theme components
                h1: ({ children, id }) => (
                  <h1
                    id={id}
                    className="text-4xl font-bold text-white mb-6 pb-3 border-b-2 border-primary/30 scroll-mt-32"
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, id }) => (
                  <h2
                    id={id}
                    className="text-3xl font-semibold text-gray-100 mt-12 mb-6 pb-2 border-b border-gray-700 scroll-mt-32"
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, id }) => (
                  <h3
                    id={id}
                    className="text-2xl font-semibold text-gray-200 mt-8 mb-4 scroll-mt-32"
                  >
                    {children}
                  </h3>
                ),
                h4: ({ children, id }) => (
                  <h4
                    id={id}
                    className="text-xl font-semibold text-gray-300 mt-6 mb-3 scroll-mt-32"
                  >
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-5">
                    {children}
                  </p>
                ),
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");

                  // For code blocks (with language)
                  if (match) {
                    return (
                      <code
                        className={`${className} text-sm font-mono`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  // For inline code, clean up any stray backticks
                  const processedChildren = React.Children.map(
                    children,
                    (child) => {
                      if (typeof child === "string") {
                        // Remove backticks that might have slipped through
                        return child.replace(/^`+|`+$/g, "").replace(/`/g, "");
                      }
                      return child;
                    }
                  );

                  return (
                    <code
                      className="bg-gray-700/50 text-primary px-2 py-1 rounded text-sm font-mono border border-gray-600/30"
                      {...props}
                    >
                      {processedChildren}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-900/80 backdrop-blur text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 text-sm border border-gray-700/50">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/60 pl-6 py-3 my-6 bg-gray-800/30 text-gray-300 italic rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6 rounded-lg border border-gray-700/50">
                    <table className="min-w-full divide-y divide-gray-700">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-6 py-4 bg-gray-800/50 text-left text-sm font-semibold text-primary uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-6 py-4 text-sm text-gray-300 border-b border-gray-700/50">
                    {children}
                  </td>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 mb-5 space-y-2 text-gray-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-6 mb-5 space-y-2 text-gray-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-1 leading-relaxed">{children}</li>
                ),
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith("http");
                  const isAnchor = href?.startsWith("#");

                  return (
                    <a
                      href={href}
                      className={`${
                        isAnchor
                          ? "text-primary hover:text-primary/80 no-underline hover:underline"
                          : "text-primary hover:text-primary/80 underline hover:no-underline"
                      } transition-colors duration-200 font-medium`}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={
                        isAnchor
                          ? (e) => {
                              e.preventDefault();
                              const targetId = href?.substring(1);
                              const element = document.getElementById(
                                targetId || ""
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                                window.history.pushState(null, "", href);
                              }
                            }
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  );
                },
                // Process all text content to handle stray backticks
                text: ({ children }) => {
                  if (typeof children === "string") {
                    // Replace any visible backticks in regular text
                    const processedText = children.replace(
                      /`([^`\s][^`]*?[^`\s]?)`/g,
                      (match, content) => {
                        return content; // Remove the backticks, keep the content
                      }
                    );
                    return <>{processedText}</>;
                  }
                  return <>{children}</>;
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleDocumentation;
