import React from 'react';
import { Article } from '../types';
import { Container, Section, Grid, Card, Button, ArticleImage } from './ui';

export interface KerbTakeProps {
  articles?: Article[];
}

const KerbTake: React.FC<KerbTakeProps> = ({ articles = [] }) => {
  return (
    <Section as="section" aria-labelledby="kerb-take-title" style={{ backgroundColor: 'var(--surface)', borderBlock: 'var(--elevation-flat)' }}>
      <Container className="stack stack-lg">
        <div className="stack stack-xs" style={{ maxWidth: '720px' }}>
          <span className="text-label">Opinionated Analysis</span>
          <h2 id="kerb-take-title" className="text-section-title">The Kerb Take — Editor&apos;s Picks</h2>
          <p className="text-body-large" style={{ color: 'var(--muted)' }}>
            Independent, expert-backed opinions and in-depth analyses of the latest releases.
          </p>
        </div>

        <Grid variant="cards">
          {articles.map((article, index) => (
            <Card key={`editorial-${index}`} as="article" aria-labelledby={`editorial-article-${index}`} className="stack stack-md">
              <header className="stack stack-xs">
                <span className="text-label" style={{ color: 'var(--accent)' }}>{article.category}</span>
                <h3 id={`editorial-article-${index}`} className="text-card-title" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {article.title}
                </h3>
                <p className="text-caption">
                  <span>By {article.author}</span>
                  <span> &bull; </span>
                  <span className="numeric">{article.readingTime}</span>
                </p>
              </header>

              <div className="stack stack-sm" style={{ flex: 1, marginTop: 'var(--spacing-8)' }}>
                <ArticleImage src={article.imagePlaceholder} alt={`Curated illustration for: ${article.title}`} />
                <p className="text-body" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {article.excerpt}
                </p>
              </div>

              <footer style={{ marginTop: 'var(--spacing-16)' }}>
                <a href={`/articles/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <Button variant="ghost" style={{ width: '100%' }} aria-label={`Read fully detailed review: ${article.title}`}>
                    Read Article
                  </Button>
                </a>
              </footer>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default KerbTake;
