"use client";

import React, { useState } from 'react';
import './Colapsable.css';

function Colapsable({ Label, children }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCollapsible = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <button className={`collapsible ${isExpanded ? 'active' : ''}`} onClick={toggleCollapsible}>
                {Label}
            </button>
            <div className="content" style={{ maxHeight: isExpanded ? '1000px' : '0', border: isExpanded ? '2px solid #8e8e8e' : '' }}>
                {children}
            </div>
        </div>
    );
}

export default Colapsable;
