import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'GPU Accelerated',
    Svg: require('@site/static/img/undraw_voice-notes_x4kp.svg').default,
    description: (
      <>
        Realtime audio to text with Metal, OpenCL + Vulkan, and WebGPU across Desktop, Mobile and Web.
      </>
    ),
  },
  {
    title: '99 Languages',
    Svg: require('@site/static/img/undraw_speech-to-text_4kov.svg').default,
    description: (
      <>
        Automatic language detection or manual selection. English‑only models available for extra speed.
      </>
    ),
  },
  {
    title: 'Offline',
    Svg: require('@site/static/img/undraw_sync_pe2t.svg').default,
    description: (
      <>
        Runs entirely on device — no internet needed. Quantized models from 32 MB to 1.6 GB.
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
