import React from 'react';

interface CharSpanProps {
  char: string;
  index: number;
  className?: string;
}

const CharSpan: React.FC<CharSpanProps> = React.memo(({ char, index, className = '' }) => {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        className={`char-reveal-inner inline-block will-change-transform ${className}`}
        style={{ animationDelay: `${index * 0.03}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  );
});

CharSpan.displayName = 'CharSpan';

interface HeadingRevealProps {
  text: string;
  className?: string;
  cursiveLastWord?: boolean;
}

const HeadingReveal: React.FC<HeadingRevealProps> = ({
  text,
  className = '',
  cursiveLastWord = false,
}) => {
  const chars = text.split('');
  const lastWordStart = text.lastIndexOf(' ') + 1;

  return (
    <span
      className={`heading-reveal-mask inline-block ${className}`}
      data-scroll="heading-reveal"
    >
      {chars.map((char, i) => (
        <CharSpan
          key={i}
          char={char}
          index={i}
          className={
            cursiveLastWord && i >= lastWordStart
              ? 'font-cursive normal-case text-vermilion'
              : ''
          }
        />
      ))}
    </span>
  );
};

export default React.memo(HeadingReveal);
