import React, {} from 'react';
import '../styles/faqs.scss';
import FaqItem from './faq-item';

function Faqs ({ items }) {
  return (
    <div className='faqs'>
      <div className='faqs__title'>FAQs</div>
      <div className='faqs__container'>
        <div className='faqs__shadow'/>
        {
          items.map((item, idx) => {
            return (
              <FaqItem key={idx} item={item}/>
            );
          })
        }
      </div>
    </div>
  );
}

export default Faqs;
