import React, {} from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import '../styles/footer.scss';
import SocialButton from './social-button';

function Footer ({isInHome}) {
  const data = useStaticQuery(graphql`
    query FooterQuery {
    
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
      }
      
      news: sanityNewsPage {
        title
      }

      theClub: sanityTheClub {
        title
      }

      yourVisit: sanityYourVisit
      {
        title
      }

      theShop: sanityTheShop {
        title
      }
      aboutDel: sanityAboutDel{
        title
      }
      aboutTheCourse: sanityAboutTheCourse{
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


      <div className='strip footer'>
        <div className='strip__middle pad-sides footer-content'>
          <div className='footer-content__left'>
            <Link className='footer__section-link' to='/'>Home</Link>
            <Link className='footer__section-link' to='/news'>{data.news.title}</Link>
            <Link className='footer__section-link' to='/the-club'>{data.theClub.title}</Link>
            <Link className='footer__section-link' to='/your-visit'>{data.yourVisit.title}</Link>
            <Link className='footer__section-link' to='/the-shop'>{data.theShop.title}</Link>
            <Link className='footer__section-link' to='/about-the-course'>{data.aboutTheCourse.title}</Link>
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
