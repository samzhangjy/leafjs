import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple',
    Svg: require('@site/static/img/developer-activity.svg').default,
    description: (
      <>
        Leafjs was built with ease of use in mind. By using awesome solutions such as Vue-like reactivity and JSX, Leaf
        combines the best parts of the best frameworks. Thanks to web-components, Leaf made components a lot simpler -
        natively supported by <a href="https://caniuse.com/?search=web%20components">most modern browsers</a>.
      </>
    ),
  },
  {
    title: 'Performent',
    Svg: require('@site/static/img/speed.svg').default,
    description: (
      <>
        Leaf is extreamly lightweight - 3kb minified + compressed. While keeping it lightweight, the awesome Leaf
        reactivity system uses a strategy similar to caching - Leaf locks the rerender process when another rerender is
        going, which decreases the amount of rerenders at a visible level.
      </>
    ),
  },
  {
    title: 'Components',
    Svg: require('@site/static/img/web-devices.svg').default,
    description: (
      <>
        Leaf is totally based on web-components, which is great for building components that can be used with any or
        none framework. However, Leaf is also compatible when it comes to building websites: Leaf provides the{' '}
        <code>create-leafjs-app</code> tool which automatically handles everything for you!
      </>
    ),
  },
];

function Feature({
  title,
  Svg,
  description,
  isLeft,
}: {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  isLeft: boolean;
}) {
  return (
    <div className={`${styles.feature} container`}>
      {isLeft && (
        <div className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
      )}
      <div className={styles.featureDescription}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {!isLeft && (
        <div className={styles.featureIcon}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
      )}
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} isLeft={idx % 2 === 0} {...props} />
        ))}
      </div>
    </section>
  );
}
