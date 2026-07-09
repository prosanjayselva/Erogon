type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading${centered ? ' centered' : ''}`} data-reveal>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">
        {title}
        {highlight ? (
          <>
            <br />
            <span>{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}

