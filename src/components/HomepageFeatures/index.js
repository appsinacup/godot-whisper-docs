import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Fast',
    Svg: require('@site/static/img/undraw_voice-notes_x4kp.svg').default,
    description: (
      <>
        Realtime audio to text. And works on Desktop, Mobile and Web
      </>
    ),
  },
  {
    title: 'Multiple Languages',
    Svg: require('@site/static/img/undraw_speech-to-text_4kov.svg').default,
    description: (
      <>
        Speak in any language.
      </>
    ),
  },
  {
    title: 'Offline',
    Svg: require('@site/static/img/undraw_sync_pe2t.svg').default,
    description: (
      <>
        Works on device without internet. Model sizes from 40MB to 2GB.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>

      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
