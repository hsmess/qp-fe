import React, {} from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '../styles/footer.scss';
import GreenwichLogo from './greenwich-logo';
import SocialButton from './social-button';
import map from '../images/map.svg';
import mapSquare from '../images/map-square.svg';

function Footer ({isInHome}) {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      map: file(relativePath: { eq: "map2.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      contact: sanityContactDetails {
        address
        city
        email
        phone
        postcode
        street
        social {
          facebook
          instagram
          twitter
        }
      }
      
      footer: sanityFooter {
        googleMapsUrl
        openingMessage
        formTitle
        content
        submitButton
      }
      
      venue: sanityVenueHire {
        title
      }
      
      history: sanityHistoryOfTheArsenal {
        title
      }     
      community: sanityCommunity(id: {eq:"b91facc9-d363-568b-b6b1-3086d969b3d4"}) {
        title
      }
      whatson: sanityP2Whatson(id: {eq: "94896bc7-b6ae-5dfa-ba4a-89c582acdd74"}) {
        title
      }
      about: sanityP2About(id: {eq:"1f486191-08f3-581c-8994-690521266d41"}) {
        title       
      }
      yourVisit: sanityP2Yourvisit(id: { eq: "d51ef68b-b8ca-5676-8b2c-20d99dc282e7" }) {
        title
      }
      cookies: sanityLegal(id: {eq:"758565eb-3fe1-5b82-971a-c491caccfd3b"}) {
        footerTitle
      }
      
      privacy: sanityLegal(id: {eq:"7a686698-6eda-555d-b604-158d19c52f1b"}) {
        footerTitle
      }
      
      terms: sanityLegal(id: {eq:"7aa9da6a-daa3-59c9-ac65-9475d62493f5"}) {
        footerTitle
      }
 
    },
  `);

  // NOT YET BUILT
  // yourvisit: sanityP2Yourvisit(id: {eq: "94896bc7-b6ae-5dfa-ba4a-89c582acdd74"}) {
  //   title
  // }

  return (
    <footer className={`strip ${!isInHome ? 'strip--pad-top-big' : ''}`}>
      {/*<Img className='footer__map' fluid={mapImage}/>*/}
      {/*© {new Date().getFullYear()} Woolwich Works*/}

      <div className='strip contact-form'>
        <div className='strip__middle pad-sides contact-form__harness'>
          <div className='contact-form__title'>{data.footer.formTitle}</div>
          <div className='contact-form__intro'>{data.footer.content}</div>
          <input className='contact-form__input' type="text" name="your_name" placeholder='Your name' />
          <input className='contact-form__input' type="email" name="email" placeholder='Your email' />
          <button className='button contact-form__sign-up-button'>{data.footer.submitButton} →</button>
        </div>
        <div className='footer__map'/>
      </div>

      <div className='strip footer'>
        <div className='strip__middle pad-sides footer-content'>
          <div className='footer-content__left'>
            <Link className='footer__section-link' to='/whats-on'>{data.whatson.title}</Link>
            <Link className='footer__section-link' to='/your-visit'>{data.yourVisit.title}</Link>
            <Link className='footer__section-link' to='/venue-hire'>{data.venue.title}</Link>
            <Link className='footer__section-link' to='/about'>{data.about.title}</Link>
            <Link className='footer__section-link' to='/history-of-the-arsenal'>{data.history.title}</Link>
            <Link className='footer__section-link' to='/community'>{data.community.title}</Link>
          </div>

          <div className='footer-content__middle'>
            <a className='footer__contact-link' href={`tel:${data.contact.phone}`}>{data.contact.phone}</a>
            <a className='footer__contact-link' href={`mailto:${data.contact.email}`}>{data.contact.email}</a>

            {
              data.footer.openingMessage &&
              <div className='footer__opening'>{data.footer.openingMessage}</div>
            }

            <div className='footer__address'>
              {data.contact.address}<br/>
              {data.contact.street}<br/>
              {data.contact.city}<br/>
              {data.contact.postcode}<br/>
            </div>
            <a className='footer__contact-link footer__google-maps-link' target='_blank' href={data.footer.googleMapsUrl}>Open
              in Google Maps ↗</a>

            <div className='footer__social'>
              <SocialButton classes='footer__social-button footer__social-button--instagram'
                            url={data.contact.social.instagram}/>
              <SocialButton classes='footer__social-button footer__social-button--twitter'
                            url={data.contact.social.twitter}/>
              <SocialButton classes='footer__social-button footer__social-button--facebook'
                            url={data.contact.social.facebook}/>
            </div>
          </div>

          <div className='footer-content__right'>
            <div>

              {/*<Link className='footer__contact-link' to='/cookies'>{data.legal.footerTitle}</Link>*/}
                <Link className='footer__contact-link' to='/cookies'>{data.cookies.footerTitle}</Link>
                <Link className='footer__contact-link' to='/privacy'>{data.privacy.footerTitle}</Link>
                <Link className='footer__contact-link' to='/terms'>{data.terms.footerTitle}</Link>
              {/*<Link className='footer__contact-link' to='/legal'>Legal</Link>*/}
            </div>
            <div className="footer__from">
              From the Royal Borough of Greenwich, for everyone
              <a href='https://www.royalgreenwich.gov.uk' target='_blank'>
                <GreenwichLogo classes='footer__greenwich-logo'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  isInHome: PropTypes.bool
};

Footer.defaultProps = {
  isInHome: false
};

export default Footer;
