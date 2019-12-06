import React, { useState, useEffect } from 'react';
import '../styles/pricing-table.scss';

function PricingTable ({pricing}) {
  useEffect(() => {
    console.log('pricing:', pricing);
  }, [pricing]);

  if (!pricing) return null;

  return (
    <div className='pricing-table'>
      {
        pricing.rows.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className='pricing-table__row'>
              {
                row.cells.map((cell, cellIdx) => {
                  return (
                    <div key={cellIdx} className={`pricing-table__cell 
                      ${ rowIdx === 0 || cellIdx === 0 ? 'pricing-table__cell--bold' : '' }
                      ${ rowIdx === 0 && cellIdx === 0 ? 'pricing-table__cell--title' : '' }
                    `}>
                      {cell}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
}

PricingTable.propTypes = {
  // pricing: PropTypes.
};

PricingTable.defaultProps = {};

export default PricingTable;
