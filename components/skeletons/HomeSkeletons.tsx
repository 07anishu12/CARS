import React from 'react';
import { Container, Section, Grid, Card } from '../ui';

// Shared card skeleton placeholder
const CardSkeleton: React.FC = () => (
  <Card className="stack stack-md" style={{ minHeight: '380px', opacity: 0.5 }}>
    <div 
      style={{ 
        width: '100%', 
        aspectRatio: '16 / 9', 
        backgroundColor: 'var(--border)', 
        borderRadius: 'var(--radius-sm)' 
      }} 
    />
    <div style={{ width: '60%', height: '20px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
    <div style={{ width: '40%', height: '16px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
    <div style={{ width: '50%', height: '24px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'auto' }} />
    <div style={{ width: '100%', height: '40px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-16)' }} />
  </Card>
);

export const RecentlyViewedSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg">
      <div className="stack stack-xs">
        <div style={{ width: '120px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '320px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <Grid variant="cards">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </Container>
  </Section>
);

export const TrendingSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg">
      <div className="split">
        <div className="stack stack-xs">
          <div style={{ width: '120px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
          <div style={{ width: '280px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
        </div>
        <div className="cluster cluster-sm" style={{ marginTop: 'var(--spacing-16)' }}>
          {['All', 'SUV', 'Sedan', 'Hatchback'].map((cat) => (
            <div key={cat} style={{ width: '80px', height: '36px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-full)' }} />
          ))}
        </div>
      </div>
      <Grid variant="cards">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </Container>
  </Section>
);

export const NewLaunchesSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg">
      <div className="stack stack-xs">
        <div style={{ width: '120px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '340px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <Grid variant="cards">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </Container>
  </Section>
);

export const KerbTakeSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true" style={{ backgroundColor: 'var(--surface)', borderBlock: 'var(--elevation-flat)' }}>
    <Container className="stack stack-lg">
      <div className="stack stack-xs" style={{ maxWidth: '720px' }}>
        <div style={{ width: '150px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '400px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
        <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-12)' }} />
      </div>
      <Grid variant="cards">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </Container>
  </Section>
);

export const InlineCompareSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg" style={{ maxWidth: '960px' }}>
      <div className="stack stack-xs">
        <div style={{ width: '140px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '360px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <Card className="stack stack-lg" style={{ minHeight: '160px', opacity: 0.5 }}>
        <div className="split" style={{ gap: 'var(--spacing-24)' }}>
          <div style={{ flex: 1, height: '44px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
          <div style={{ flex: 1, height: '44px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div style={{ width: '120px', height: '40px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </Card>
    </Container>
  </Section>
);

export const EMICalculatorSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg" style={{ maxWidth: '960px' }}>
      <div className="stack stack-xs">
        <div style={{ width: '140px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '240px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <Card className="stack stack-lg" style={{ minHeight: '360px', opacity: 0.5 }}>
        <div className="grid-cards" style={{ gap: 'var(--spacing-24)' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stack stack-xs">
              <div style={{ width: '100px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ width: '100%', height: '44px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
              <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
            </div>
          ))}
        </div>
      </Card>
    </Container>
  </Section>
);

export const GuidesRailSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true">
    <Container className="stack stack-lg">
      <div className="stack stack-xs">
        <div style={{ width: '120px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '260px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <Grid variant="cards">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </Container>
  </Section>
);

export const FAQBlockSkeleton: React.FC = () => (
  <Section aria-hidden="true" aria-busy="true" style={{ backgroundColor: 'var(--surface)', borderBlock: 'var(--elevation-flat)' }}>
    <Container className="stack stack-lg" style={{ maxWidth: '800px' }}>
      <div className="stack stack-xs">
        <div style={{ width: '130px', height: '12px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ width: '380px', height: '28px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--spacing-8)' }} />
      </div>
      <div className="stack" style={{ marginTop: 'var(--spacing-16)', opacity: 0.5 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ width: '100%', height: '56px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '60%', height: '16px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-sm)' }} />
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-full)' }} />
          </div>
        ))}
      </div>
    </Container>
  </Section>
);
