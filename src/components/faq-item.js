import React, {useState, useRef} from 'react';
import '../styles/faqs.scss';
import PortableText from '@sanity/block-content-to-react';
import {TweenMax, Power2} from 'gsap';

function FaqItem ({ item }) {
  const answerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    const open = !isOpen;
    if (!open) TweenMax.to(answerRef.current, .3, {height: 0, ease: Power2.easeInOut});
    else {
      TweenMax.set(answerRef.current, {height: 'auto'});
      TweenMax.from(answerRef.current, .3, {height: 0, ease: Power2.easeInOut});
    }
    setIsOpen(open);
  }

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <div className='faq-item__question' onClick={toggleOpen}>
        <div className='faq-item__arrow'>↓</div>
        {item.question}
      </div>
      <div className='faq-item__answer' ref={answerRef}>
        <PortableText
          blocks={item._rawAnswer}
        />
      </div>
    </div>
  );
}

export default FaqItem;
