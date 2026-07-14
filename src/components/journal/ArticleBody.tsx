import Link from "next/link";

import type { ArticleBlock } from "@/content/articles";
import { journalPostHref } from "@/content/journal";

type RelatedPost = {
  slug: string;
  cat: string;
  title: string;
};

type ArticleBodyProps = {
  blocks: ArticleBlock[];
  related?: RelatedPost[];
};

function tocFromBlocks(blocks: ArticleBlock[]) {
  let h2Count = 0;
  return blocks
    .filter((block): block is Extract<ArticleBlock, { type: "h2" }> => block.type === "h2")
    .map((block) => {
      h2Count += 1;
      return { id: `s${h2Count}`, text: block.text };
    });
}

function h2Id(blocks: ArticleBlock[], index: number) {
  let h2Count = 0;
  for (let i = 0; i <= index; i += 1) {
    if (blocks[i]?.type === "h2") h2Count += 1;
  }
  return `s${h2Count}`;
}

export function ArticleBody({ blocks, related = [] }: ArticleBodyProps) {
  const toc = tocFromBlocks(blocks);

  return (
    <article
      style={{
        maxWidth: 1040,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "232px minmax(0, 680px)",
        justifyContent: "center",
        gap: "0 56px",
      }}
    >
      {toc.length > 0 ? (
        <aside style={{ display: "block" }}>
          <div style={{ position: "sticky", top: 86 }}>
            <div
              className="ww-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "rgba(244,243,247,0.44)",
                marginBottom: 14,
              }}
            >
              Sommaire
            </div>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                borderLeft: "1px solid rgba(244,243,247,0.1)",
                paddingLeft: 16,
              }}
            >
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: "rgba(244,243,247,0.7)",
                    textDecoration: "none",
                  }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      ) : null}

      <div className="ww-article-body" style={{ minWidth: 0 }}>
        {blocks.map((block, index) => {
          switch (block.type) {
            case "p":
              return <p key={index}>{block.text}</p>;
            case "h2":
              return (
                <h2 key={index} id={h2Id(blocks, index)}>
                  {block.text}
                </h2>
              );
            case "h3":
              return <h3 key={index}>{block.text}</h3>;
            case "pull":
              return <blockquote key={index}>{block.text}</blockquote>;
            case "ul":
              return (
                <ul key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span
                        className="ww-glow-dot"
                        style={{ width: 6, height: 6, marginTop: "0.62em" }}
                        aria-hidden
                      />
                      <span>
                        {item.lead ? <strong>{item.lead}</strong> : null}
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            case "steps":
              return (
                <div key={index} className="ww-article-steps">
                  {block.items.map((item) => (
                    <div key={item.n} className="ww-article-step">
                      <span className="ww-article-step__num">{item.n}</span>
                      <span className="ww-article-step__text">
                        {item.lead ? <strong>{item.lead}</strong> : null}
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              );
            case "stats":
              return (
                <div key={index} className="ww-article-stats">
                  {block.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="ww-article-stat">
                      <div className="ww-article-stat__value">{item.value}</div>
                      <div className="ww-article-stat__label">{item.label}</div>
                      {item.source ? (
                        <div className="ww-article-stat__source">{item.source}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
              );
            case "table":
              return (
                <div key={index} className="ww-article-table-wrap">
                  <table className="ww-article-table">
                    <thead>
                      <tr>
                        {block.cols.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                              {cellIndex === 0 ? (
                                <span
                                  style={{
                                    color: "var(--accent)",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {cell}
                                </span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            case "sources":
              return (
                <div key={index} className="ww-article-sources">
                  <h3>Sources</h3>
                  {block.items.map((item) => (
                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                      ↗ {item.text}
                    </a>
                  ))}
                </div>
              );
            default:
              return null;
          }
        })}

        {related.length > 0 ? (
          <div
            style={{
              marginTop: 46,
              paddingTop: 26,
              borderTop: "1px solid rgba(244,243,247,0.1)",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {related.map((item) => (
              <Link
                key={item.slug}
                href={journalPostHref(item.slug)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  flex: "1 1 240px",
                  padding: "20px 22px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(244,243,247,0.1)",
                  textDecoration: "none",
                  transition: "border-color 0.25s",
                }}
              >
                <span
                  className="ww-mono"
                  style={{
                    fontSize: "10.5px",
                    letterSpacing: "0.14em",
                    color: "rgba(244,243,247,0.5)",
                  }}
                >
                  Lire ensuite · {item.cat}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
