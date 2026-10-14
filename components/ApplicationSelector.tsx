'use client';

import { useId, useState, type ReactNode } from 'react';

export default function ApplicationSelector({names, panels}: {names: string[]; panels: ReactNode[]}) {
  const [selected, setSelected] = useState(0);
  const id = useId();

  return <>
    <div className="application-tags application-selector" role="group" aria-label="Applications">
      {names.map((name, index) => <button key={name} type="button" aria-pressed={selected === index} aria-controls={`${id}-panel`} onClick={() => setSelected(index)}>{name}</button>)}
    </div>
    <div id={`${id}-panel`} aria-live="polite">
      <div className="application-grid application-selected-grid">{panels[selected]}</div>
    </div>
  </>;
}
