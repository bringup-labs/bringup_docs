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
    <div className="collapsible-section" ref={ref}>
      <button
        className="collapsible-header"
        onClick={() => setOpen(!open)}
      >
        {open ? "▼" : "▶"} {title}
      </button>

      <div className="collapsible-content" style={{ display: open ? "block" : "none" }}>
        {children}
      </div>
    </div>
  );
}
