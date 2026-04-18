import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const animation = useBaseUrl('/img/whisper_cpp.gif');
  const logo = useBaseUrl('/img/whisper_logo.png');
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img height="128" width="128" src={logo} alt="Godot Whisper Logo" style={{display: 'block', margin: '0 auto'}} />

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p style={{textAlign: 'center'}}><img 
          src={animation} 
          alt="loading..." 
          width={512} 
          style={{
            marginRight: '64px', 
            display: 'block', 
            margin: '0 auto',
            borderRadius: '10px',
            boxShadow: '0 0 0 4px black'
          }}
        /></p>
        
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Tutorial - 5min ⏱️
          </Link>
          </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Godot Whisper addon for Godot that offers speech to text capabilities.">
      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
