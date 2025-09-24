import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { MapInteractionCSS } from 'react-map-interaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageHeader from '@common/PageHeader';
import Button, { IconButton } from '@common/Button';
import Grid from '@common/Grid';

import {
  ConceptsWrapper,
  ConceptCard,
  ConceptCardFooter,
  Lightbox,
  LightBoxCloseButton,
} from './Concepts.style';

const Card = React.memo(({ nodes, openLightbox }) => (
  <ConceptCard>
    <div
      style={{ width: '100%', height: '100%' }}
      onClick={openLightbox}
    >
      <img
        src={`/images/${nodes.node.links.image}`}
        alt={nodes.node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>

    <ConceptCardFooter
      nowrap
      align="center"
      justify="space-between"
      className="ccard__footer"
      onClick={e => e.stopPropagation()}
    >
      <p>{nodes.node.title}</p>
      <div>
        <IconButton
          label="Dribble Shot"
          href={nodes.node.links.dribbble}
          icon={['fab', 'dribbble']}
        />
        {nodes.node.links.demo && (
          <IconButton
            label="Live Demo"
            href={nodes.node.links.demo}
            icon="window-maximize"
          />
        )}
      </div>
    </ConceptCardFooter>
  </ConceptCard>
));

const Concepts = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };
  const openLightbox = useCallback(img => {
    setSelectedImg(img);
    setLightboxOpen(true);
  }, []);

  function closeLightBox(e) {
    if (e.target.tagName !== 'IMG') {
      setSelectedImg(null);
      setLightboxOpen(false);
    }
  }

  const concepts = useStaticQuery(
    graphql`
      query {
        allConceptsJson(sort: { fields: links___image }) {
          edges {
            node {
              id
              description
              title
              links {
                demo
                image
                dribbble
              }
            }
          }
        }
      }
    `
  );

  return (
    <ConceptsWrapper id="concepts">
      <PageHeader>Concepts</PageHeader>
      <Grid collapseHeight="1000px" showAll={showAll}>
        {concepts.allConceptsJson.edges.map((nodes, index) => {
          return (
            <Card
              key={nodes.node.id}
              nodes={nodes}
              openLightbox={() => openLightbox(nodes.node)}
            />
          );
        })}

        {!showAll && (
          <Button onClick={handleShowAll} className="showall__button">
            Show all
          </Button>
        )}
      </Grid>

      {isLightboxOpen && selectedImg && (
        <Lightbox data-testid="lightbox" onClick={closeLightBox}>
          <MapInteractionCSS>
            <img
              className="lightbox__gatsbyimage"
              src={`/images/${selectedImg.links.image}`}
              alt={selectedImg.title}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </MapInteractionCSS>

          <LightBoxCloseButton
            tabindex="1"
            onClick={closeLightBox}
            aria-label="Close Lightbox"
          >
            <FontAwesomeIcon icon="times" size="2x" />
          </LightBoxCloseButton>
        </Lightbox>
      )}
    </ConceptsWrapper>
  );
};

Card.propTypes = {
  nodes: PropTypes.object.isRequired,
  currentImg: PropTypes.object.isRequired,
  openLightbox: PropTypes.func.isRequired,
};

export default Concepts;
