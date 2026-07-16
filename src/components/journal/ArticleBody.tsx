"use client";

import Link from "next/link";

import { useLocale } from "@/components/i18n/LocaleProvider";
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
  tocLabel?: string;
  readNextLabel?: string;
  sourcesLabel?: string;
};

export function ArticleBody({
  blocks,
  related = [],
  tocLabel,
  readNextLabel,
  sourcesLabel,
}: ArticleBodyProps) {
  const { locale, dict } = useLocale();
  const toc = tocLabel ?? dict.journalIndex.toc;
  const readNext = readNextLabel ?? dict.journalIndex.readNext;
  const sources = sourcesLabel ?? dict.journalIndex.sources;

  return (
    <ArticleBodyInner
      blocks={blocks}
      related={related}
      locale={locale}
      tocLabel={toc}
      readNextLabel={readNext}
      sourcesLabel={sources}
    />
  );
}

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

function ArticleBodyInner({
  blocks,
  related = [],
  locale,
  tocLabel,
  readNextLabel,
  sourcesLabel,
}: ArticleBodyProps & { locale: "fr" | "en"; tocLabel: string; readNextLabel: string; sourcesLabel: string }) {
  const toc = tocFromBlocks(blocks);

  return (
    <article className="ww-article-layout">
      {toc.length > 0 ? (
        <aside className="ww-article-toc">
          <div className="ww-article-toc__sticky">
            <div className="ww-mono ww-article-toc__label">{tocLabel}</div>
            <nav className="ww-article-toc__nav">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      ) : null}

      <div className="ww-article-body">
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
                      <div className="ww-article-step__text">
                        {item.lead ? <strong>{item.lead}</strong> : null}
                        {item.text}
                      </div>
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
                                <span className="ww-article-table__accent">{cell}</span>
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
                  <h3>{sourcesLabel}</h3>
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
          <div className="ww-article-related">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={journalPostHref(item.slug, locale)}
                className="ww-article-related__card"
              >
                <span className="ww-mono ww-article-related__label">
                  {readNextLabel} · {item.cat}
                </span>
                <span className="ww-article-related__title">{item.title}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
