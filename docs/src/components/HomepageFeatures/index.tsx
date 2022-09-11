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
        Leafjs was built with ease of use in mind. By using solutions such as Vue-like reactivity, Leaf combines the
        best parts of the best frameworks.
      </>
    ),
  },
  {
    title: 'Performent',
    Svg: require('@site/static/img/speed.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same
        header and footer.
      </>
    ),
  },
  {
    title: 'Components',
    Svg: require('@site/static/img/web-devices.svg').default,
    description: (
      <>
        Leaf is totally based on web-components, which is great for building components that can be used with any or
        none framework.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
