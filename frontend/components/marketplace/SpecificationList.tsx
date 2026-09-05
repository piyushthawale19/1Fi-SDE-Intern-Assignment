import React from 'react';

interface SpecificationListProps {
  specs: Record<string, string>;
}

export function SpecificationList({ specs }: SpecificationListProps) {
  const entries = Object.entries(specs);
  if (entries.length === 0) return null;

  return (
    <div className="spec-list">
      {entries.map(([key, value]) => (
        <div key={key} className="spec-row">
          <span className="spec-key">{key}</span>
          <span className="spec-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
