import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableTextProps {
  maxLength?: number;
  className?: string;
}

export default function ExpandableText({ 
  maxLength = 200,
  className = "",
  children
}: ExpandableTextProps & { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract text content from children
  const getTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return children.toString();
    if (Array.isArray(children)) return children.map(getTextContent).join('');
    if (React.isValidElement(children)) return getTextContent((children.props as { children?: React.ReactNode }).children);
    return '';
  };
  
  const text = getTextContent(children);
  const shouldTruncate = text.length > maxLength;
  
  const truncatedText = shouldTruncate && !isExpanded 
    ? text.slice(0, maxLength) + "..."
    : text;

  // Create the content with button positioned after truncated text
  const renderContent = () => {
    if (!React.isValidElement(children)) {
      return (
        <span className="text-xl md:text-2xl text-white font-light leading-relaxed">
          {truncatedText}
          {shouldTruncate && !isExpanded && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-sm text-[#0066ff] hover:text-[#00d4ff] transition-colors duration-200 font-medium underline underline-offset-2"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </span>
      );
    }

    // For element children, we need to modify their text content
     
    return React.cloneElement(children as React.ReactElement<any>, {
      children: (
        <>
          {truncatedText}
          {shouldTruncate && !isExpanded && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-sm text-[#0066ff] hover:text-[#00d4ff] transition-colors duration-200 font-medium underline underline-offset-2"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </>
      )
    });
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "truncated"}
          initial={{ opacity: 0, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: "auto" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      {shouldTruncate && isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-2"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-[#0066ff] hover:text-[#00d4ff] transition-colors duration-200 font-medium underline underline-offset-2"
          >
            Show less
          </button>
        </motion.div>
      )}
    </div>
  );
}