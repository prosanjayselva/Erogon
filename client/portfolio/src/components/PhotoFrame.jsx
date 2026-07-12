export default function PhotoFrame({ icon: Icon, caption, tone = "", ratio, blob = false, className = "", style = {}, src, alt = "", fit, objectPosition }) {
  if (src) {
    return (
      <div
        className={`photo-frame photo-frame--real ${blob ? "is-blob" : ""} ${className}`}
        style={{ ...(ratio ? { "--pf-ratio": ratio } : {}), ...style }}
      >
        <img src={src} alt={alt} loading="lazy" style={{ ...(fit ? { objectFit: fit } : {}), ...(objectPosition ? { objectPosition } : {}) }} />
        {caption && <span className="pf-caption pf-caption--real">{caption}</span>}
      </div>
    );
  }
  return (
    <div
      className={`photo-frame ${tone} ${blob ? "is-blob" : ""} ${className}`}
      style={{ ...(ratio ? { "--pf-ratio": ratio } : {}), ...style }}
    >
      <div className="pf-mark">{Icon && <Icon />}</div>
      {caption && <span className="pf-caption">{caption}</span>}
    </div>
  );
}
