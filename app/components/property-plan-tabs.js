'use client';

import { useState } from 'react';

function PlanCard({ title, firstSrc, secondSrc, firstAlt, secondAlt }) {
  const [tab, setTab] = useState('first');
  const isFirst = tab === 'first';

  return (
    <article className="property-plan-card">
      <div className="property-plan-card__head">
        <p className="property-plan-card__floor">{title}</p>
        <div className="property-plan-card__tabs" role="tablist" aria-label={`${title} plan tabs`}>
          <button
            type="button"
            role="tab"
            aria-selected={isFirst}
            className={`property-plan-card__tab ${isFirst ? 'is-active' : ''}`}
            onClick={() => setTab('first')}
          >
            <span className="property-plan-card__tab-main">1F</span>
            <span className="property-plan-card__tab-sub">1階平面図</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isFirst}
            className={`property-plan-card__tab ${!isFirst ? 'is-active' : ''}`}
            onClick={() => setTab('second')}
          >
            <span className="property-plan-card__tab-main">2F</span>
            <span className="property-plan-card__tab-sub">2階平面図</span>
          </button>
        </div>
      </div>
      <div className="property-plan-card__media-wrap property-plan-card__media-wrap--single">
        <img
          src={isFirst ? firstSrc : secondSrc}
          alt={isFirst ? firstAlt : secondAlt}
          className="property-plan-card__media"
        />
      </div>

      <div className="property-plan-card__pair">
        <figure className="property-plan-card__pair-item" data-floor="1F">
          <div className="property-plan-card__pair-head">
            <p className="property-plan-card__pair-kicker">1F 平面図</p>
          </div>
          <div className="property-plan-card__pair-media">
            <img src={firstSrc} alt={firstAlt} className="property-plan-card__media" />
          </div>
        </figure>
        <figure className="property-plan-card__pair-item" data-floor="2F">
          <div className="property-plan-card__pair-head">
            <p className="property-plan-card__pair-kicker">2F 平面図</p>
          </div>
          <div className="property-plan-card__pair-media">
            <img src={secondSrc} alt={secondAlt} className="property-plan-card__media" />
          </div>
        </figure>
      </div>
    </article>
  );
}

export default function PropertyPlanTabs() {
  return (
    <div className="property-info__plans">
      <PlanCard
        title="FLOOR PLANS"
        firstSrc="/assets/images/propatyinfo/timelesscondminium-02.png"
        secondSrc="/assets/images/propatyinfo/timelesscondminium-01.png"
        firstAlt="1F 平面図"
        secondAlt="2F 平面図"
      />
    </div>
  );
}
