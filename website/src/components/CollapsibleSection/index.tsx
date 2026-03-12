import React, {useEffect, useRef, useState} from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const target = ref.current?.querySelector(hash);

      if (target) {
        setOpen(true);
      }
    };

    const hash = window.location.hash;
    if (hash && ref.current) {
      const target = ref.current.querySelector(hash);

      if (target) {
        setOpen(true);

        setTimeout(() => {
          (target as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className={`collapsible-section ${open ? 'is-open' : ''}`} ref={ref}>
      <button
        className="collapsible-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="collapsible-header-title">{title}</span>
        <svg
          className={`collapsible-header-icon ${open ? 'is-open' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div 
        className="collapsible-content-wrapper" 
        style={{ 
          display: open ? 'grid' : 'none',
          gridTemplateRows: open ? '1fr' : '0fr'
        }}
      >
        <div className="collapsible-content">
          {children}
        </div>
      </div>
    </div>
  );
}
