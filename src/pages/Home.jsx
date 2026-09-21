import React from 'react';
import Hero from '../sections/Hero.jsx';
import InteractiveProduct from '../sections/InteractiveProduct.jsx';
import ProductsGrid from '../sections/ProductsGrid.jsx';
import TechnologySection from '../sections/TechnologySection.jsx';
import AboutSection from '../sections/AboutSection.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <InteractiveProduct />
      <ProductsGrid
        title="Featured collection"
        subtitle="Four headsets, one obsession with getting the details right."
        showViewAll
      />
      <TechnologySection />
      <AboutSection condensed />
    </>
  );
}
