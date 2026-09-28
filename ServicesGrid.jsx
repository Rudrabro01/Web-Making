import React from 'react';
import { SERVICES_LIST } from './ServicesData.js';

export function ServiceCard({ service, delay = '0.1s' }) {
  return (
    <article className="service-editorial-card reveal" style={{ '--delay': delay }}>
      <div className="service-card-image-wrap">
        <img src={service.image} alt={service.alt} loading="lazy" />
        <span className="service-number">{service.num}</span>
      </div>
      <div className="service-card-body">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.desc}</p>
        <a href="#contact" className="service-link" aria-label={`Inquire about ${service.title}`}>
          <span>Inquire Service</span>
          <svg className="service-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function ServicesGrid() {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header-centered reveal">
          <span className="section-badge">WHAT WE DO</span>
          <h2 className="section-heading">
            Everything you need to <span className="serif-accent">print, promote</span> and present.
          </h2>
          <p className="section-intro">
            From high-impact advertising to elegant wedding stationery and professional business printing, Rangoli Adds
            offers multiple printing and advertising solutions.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES_LIST.map((service, index) => (
            <ServiceCard
              key={service.num}
              service={service}
              delay={`${0.1 + (index * 0.05)}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
