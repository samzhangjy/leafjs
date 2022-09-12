import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';
import Cover from '../../static/img/programmer.svg';

import styles from './index.module.css';
import Playground from '../components/Playground';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.heroOuter}>
      <header className={`${styles.heroContainer}`}>
        <Cover className={`${styles.coverIcon}`} />
        <div className={`${styles.mainHeading}`}>
          <div>
            <h1>{siteConfig.tagline}</h1>
            <br />
            <h3>
              Based on Web-Components, Leafjs provides a simple API for building websites, component libraries and so
              much more.
            </h3>
            <br />
            <a className="button button--secondary button--lg button--block" href="/docs/intro">
              Get Started &rarr;
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`Home`}
      description="A lightweight, blazing fast web component based frontend framework for the future."
    >
      <HomepageHeader />
      <div className={styles.spacer} />
      <div className="container">
        <h2>Features</h2>
        <HomepageFeatures />
        <div className={styles.spacer} />
        <h2>Get started</h2>
        <p>
          Take a look at the below example or <a href="/docs/intro">read the docs</a> to get started.
        </p>
        <Playground src="https://codesandbox.io/embed/zen-kapitsa-3lrwr5?fontsize=14&hidenavigation=1&theme=dark" />
      </div>
    </Layout>
  );
}
