import React, { useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../src/components/layout';
import SEO from '../src/components/seo';
import GraphQLErrorList from '../src/components/graphql-error-list';
import PortableText from '@sanity/block-content-to-react';
import '../src/styles/venue-hire.scss';
import VenueBox from '../components/news-box';
import Tag from '../components/tag';
import ImageCarousel from '../components/image-carousel';

export const query = graphql`
  query VenueHirePageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
    },
     vh: sanityVenueHire {
        title
        intro
        _rawContent
        imageSlider {
          asset {
             fluid(maxWidth: 1200) {
               ...GatsbySanityImageFluid
             }
          }
        }    
        video
    },
    factags: allSanityFacilitiesTag {
         edges {
          node {
            title
          }
        }
    },
    suttags: allSanitySuitableForTag {
         edges {
          node {
            title
          }
        }
    },
    venues:  allSanityVenue {
    edges {
      node {
        id
        people
        sqft
        clearHeight
        title
        preview {
          previewImage{
              asset{
                  fluid(maxWidth: 1200) {
                    ...GatsbySanityImageFluid
                  }
              }
          }
          _rawPreviewParagraph
        }        
        suitableForTags {
          title
        }
         facilitiesTags {
          title
        }
      }
    }
  }
  }
`;

const VenueHire = ({ navigate, location, data, errors }) => {
  const [eventTypeTagsSelected, setEventTypeTagsSelected] = useState([]);
  const [facilitiesTagsSelected, setFacilitiesTagsSelected] = useState([]);
  const [capacitiesSelected, setCapacitiesSelected] = useState([]);
  const capacities = [
    {
      title: 'Up to 20',
      min: 1,
      max: 19
    },
    {
      title: '20 - 100',
      min: 20,
      max: 99
    },
    {
      title: '100 - 400',
      min: 100,
      max: 399
    },
    {
      title: '400+',
      min: 400,
      max: 10000000
    }
  ];

  useEffect(() => {
    // console.log('location:', location);
    const urlParams = new URLSearchParams(location.search);
    // console.log('urlParams oof:', urlParams.get('oof'));
  }, [location]);



  // add box background colours into venues at the start
  const venues = useMemo(() => {
    return data.venues.edges.map((venue, idx) => {
      const venueBoxColours = ['pink', 'yellow', 'brown', 'blue', 'purple'];
      venue.node.boxColour = venueBoxColours[idx % venueBoxColours.length];
      return venue.node;
    });
  }, [data.venues]);

  // get only event type tags from the full venue list
  const eventTypeTagsUsed = useMemo(() => {
    let tags = [];
    venues.forEach((venue) => {
      venue.suitableForTags.forEach((tag) => {
        if (!tags.find(t => t.title === tag.title)) tags.push(tag);
      });
    });
    return tags;
  }, [venues]);

  // get only facilities tags from the full venue list
  const facilitiesTagsUsed = useMemo(() => {
    let tags = [];
    venues.forEach((venue) => {
      venue.facilitiesTags.forEach((tag) => {
        if (!tags.find(t => t.title === tag.title)) tags.push(tag);
      });
    });
    return tags;
  }, [venues]);

  // filter venues by tags
  const venuesFiltered = useMemo(() => {
    // no selections made
    if (!eventTypeTagsSelected.length && !facilitiesTagsSelected.length && !capacitiesSelected.length) return venues;

    // console.log('eventTypeTagsSelected:', eventTypeTagsSelected);
    // console.log('facilitiesTagsSelected:', facilitiesTagsSelected);
    // console.log('capacitiesSelected:', capacitiesSelected);

    // filter venues by event types tags
    const venuesFilteredByEventType = venues.filter((venue) => {
        if (!eventTypeTagsSelected.length) return true;
        return venue.suitableForTags.some((tag) => {
          return eventTypeTagsSelected.find(t => t.title === tag.title);
        });
      }
    );

    // console.log('venuesFilteredByEventType:', venuesFilteredByEventType);

    // filter event types result by facilities (reuslts must contain ALL selected)
    const venuesFilteredByFacilities = venuesFilteredByEventType.filter((venue) => {
        if (!facilitiesTagsSelected.length) return true;

        return facilitiesTagsSelected.every((tag) => {
          return venue.facilitiesTags.some((t) => {
            return t.title === tag.title;
          });
        });
      }
    );

    // console.log('venuesFilteredByFacilities:', venuesFilteredByFacilities);

    // filter facilities result by capacity (any)
    const venuesFilteredByCapacity = venuesFilteredByFacilities.filter((venue) => {
        if (!capacitiesSelected.length) return true;
        return capacitiesSelected.some((capacity) => capacity.min <= venue.people && capacity.max >= venue.people)
      }
    );

    // console.log('venuesFilteredByCapacity:', venuesFilteredByCapacity);

    return venuesFilteredByCapacity;
  }, [eventTypeTagsSelected, facilitiesTagsSelected, capacitiesSelected]);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors}/>
      </Layout>
    );
  }



  // tag button functions

  const handleSelectEventTypeTag = (tag) => {
    const newList = eventTypeTagsSelected.slice();
    newList.push(tag);
    // navigate('?oof=booms');
    setEventTypeTagsSelected(newList);
  };

  const handleRemoveEventTypeTag = (tag) => {
    setEventTypeTagsSelected(eventTypeTagsSelected.slice().filter((currentTag) => currentTag.title !== tag.title));
  };

  const handleSelectFacilitiesTag = (tag) => {
    const newList = facilitiesTagsSelected.slice();
    newList.push(tag);
    setFacilitiesTagsSelected(newList);
  };

  const handleRemoveFacilitiesTag = (tag) => {
    setFacilitiesTagsSelected(facilitiesTagsSelected.slice().filter((currentTag) => currentTag.title !== tag.title));
  };

  const handleSelectCapacity = (tag) => {
    const newList = capacitiesSelected.slice();
    newList.push(tag);
    setCapacitiesSelected(newList);
  };

  const handleRemoveCapacity = (tag) => {
    setCapacitiesSelected(capacitiesSelected.slice().filter((currentTag) => currentTag.title !== tag.title));
  };



  // checks for tags in filtered lists

  const filteredContainsEventType = (checkTag) => {
    return venuesFiltered.some((venue) => {
      return venue.suitableForTags.some((tag) => tag.title === checkTag.title);
    });
  };

  const filteredContainsFacility = (checkTag) => {
    return venuesFiltered.some((venue) => {
      return venue.facilitiesTags.some((tag) => tag.title === checkTag.title);
    });
  };

  const filteredContainsCapacity = (capacity) => {
    return venuesFiltered.some((venue) => {
      return capacity.min <= venue.people && capacity.max >= venue.people;
    });
  };



  // checks for tags in selected lists

  const selectedTagsContainEventType = (checkTag) => {
    return eventTypeTagsSelected.some((tag) => {
      return tag.title === checkTag.title;
    });
  };

  const selectedTagsContainFacility = (checkTag) => {
    return facilitiesTagsSelected.some((tag) => {
      return tag.title === checkTag.title;
    });
  };



  return (
    <Layout pageTitle={data.vh.title}>
      <SEO title={`${data.vh.title} | ${data.site.title}`} description={data.site.description}/>

      {/* Carousel */}
      <div className='image-carousel-harness'>
        <ImageCarousel images={data.vh.imageSlider} video={data.vh.video} autoPlay={true}/>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>

          <div className='venue-hire-intro'>
            <div className='venue-hire-intro__title'>{data.vh.intro}</div>
            <PortableText
              serializers={{ types: {} }}
              blocks={data.vh._rawContent}
            />
          </div>

        </div>
      </div>

      <div className='strip strip--tags'>
        <div className='strip__middle pad-sides'>

          <div className='tag-group-title'>Event Type</div>
          <Tag tag={{title: 'Any event types'}}
               selected={!eventTypeTagsSelected.length}
               handleSelect={() => setEventTypeTagsSelected([])}
               handleRemove={() => {}}
               onlyHoverWhenDeselected
          />
          {
            eventTypeTagsUsed.map((tag, idx) => {
              return (
                <Tag key={idx}
                     tag={tag}
                     selected={selectedTagsContainEventType(tag)}
                     disabled={!filteredContainsEventType(tag)}
                     handleSelect={handleSelectEventTypeTag}
                     handleRemove={handleRemoveEventTypeTag}
                />
              );
            })
          }

        </div>
      </div>

      <div className='strip strip--tags'>
        <div className='strip__middle pad-sides'>

          <div className='tag-group-title'>Facilities</div>
          <Tag tag={{title: 'Any facilities'}}
               selected={!facilitiesTagsSelected.length}
               handleSelect={() => setFacilitiesTagsSelected([])}
               handleRemove={() => {}}
               onlyHoverWhenDeselected
          />
          {
            facilitiesTagsUsed.map((tag, idx) => {
              return (
                <Tag key={idx}
                     tag={tag}
                     selected={selectedTagsContainFacility(tag)}
                     disabled={!filteredContainsFacility(tag)}
                     handleSelect={handleSelectFacilitiesTag}
                     handleRemove={handleRemoveFacilitiesTag}
                />
              );
            })
          }

        </div>
      </div>

      <div className='strip strip--tags strip--tags-last'>
        <div className='strip__middle pad-sides'>

          <div className='tag-group-title'>Capacity</div>
          <Tag tag={{title: 'Any capacity'}}
               selected={!capacitiesSelected.length}
               handleSelect={() => setCapacitiesSelected([])}
               handleRemove={() => {}}
               onlyHoverWhenDeselected
          />
          {
            capacities.map((capacity, idx) => {
              return (
                <Tag key={idx}
                   tag={capacity}
                   selected={capacitiesSelected.some((cap) => cap.title === capacity.title)}
                   disabled={!filteredContainsCapacity(capacity)}
                   handleSelect={handleSelectCapacity}
                   handleRemove={handleRemoveCapacity}
                />
              );
            })
          }

        </div>
      </div>

      <div className='strip'>
        <div className='strip__middle pad-sides'>

          <div className='news-box-list'>
            {
              venuesFiltered.map((venue, idx) => {
                  return (
                    <VenueBox data={venue} key={idx}/>
                  );
                }
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VenueHire;

