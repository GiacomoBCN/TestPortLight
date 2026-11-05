import React from "react";
import SketchFrame from "../SketchFrame";

export default function DecisionTable({
  decisions,
  impactLabel = "Impact",
}: {
  decisions: Array<{
    point: string;
    options: string[];
    rationale: string;
    impact: string;
    /** Link facoltativo sull'ultima colonna (es. la fonte della ricerca) */
    impactHref?: string;
  }>;
  /** Intestazione dell'ultima colonna */
  impactLabel?: string;
}) {
  const impactCell = (d: { impact: string; impactHref?: string }) =>
    d.impactHref ? (
      <a
        href={d.impactHref}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-2 hover:decoration-current"
      >
        {d.impact}
      </a>
    ) : (
      d.impact
    );
  return (
    <>
      {/* Desktop Table View - hidden on mobile */}
      <div className="hidden lg:block sketch">
      <SketchFrame />
      <div className="bg-[var(--color-text-inverse)]/[0.03] backdrop-blur-xl border border-[var(--color-text-inverse)]/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-text-inverse)]/10">
                <th className="text-left py-4 px-6 text-[var(--color-text-inverse)] font-semibold text-sm">
                  Decision Point
                </th>
                <th className="text-left py-4 px-6 text-[var(--color-text-inverse)] font-semibold text-sm">
                  Options Considered
                </th>
                <th className="text-left py-4 px-6 text-[var(--color-text-inverse)] font-semibold text-sm">
                  Why We Chose
                </th>
                <th className="text-left py-4 px-6 text-[var(--color-text-inverse)] font-semibold text-sm">
                  {impactLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((decision, index) => (
                <tr key={index} className="border-b border-[var(--color-text-inverse)]/5 last:border-0">
                  <td className="py-4 px-6 text-[var(--color-text-inverse)] font-medium text-sm">
                    {decision.point}
                  </td>
                  <td className="py-4 px-6 text-[var(--color-text-primary)] text-sm">
                    {decision.options.map((option, i) => (
                      <div key={i}>{i + 1}. {option}</div>
                    ))}
                  </td>
                  <td className="py-4 px-6 text-[var(--color-text-primary)] text-sm">
                    {decision.rationale}
                  </td>
                  <td className="py-4 px-6 text-[var(--color-text-link-default)] font-semibold text-sm">
                    {impactCell(decision)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Mobile Card View - visible only on mobile */}
      <div className="lg:hidden space-y-4">
        {decisions.map((decision, index) => (
          <div
            key={index}
            className="sketch bg-[var(--color-text-inverse)]/[0.03] backdrop-blur-xl border border-[var(--color-text-inverse)]/10 rounded-xl p-5"
          >
            <SketchFrame />
            <h3 className="text-[var(--color-text-inverse)] font-semibold text-base mb-4">
              {decision.point}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="text-[var(--color-text-inverse)]/70 text-xs font-semibold uppercase tracking-wide mb-2">
                  Options Considered
                </div>
                <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                  {decision.options.map((option, i) => (
                    <div key={i}>{i + 1}. {option}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-inverse)]/70 text-xs font-semibold uppercase tracking-wide mb-2">
                  Why We Chose
                </div>
                <div className="text-[var(--color-text-primary)] text-sm">
                  {decision.rationale}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-inverse)]/70 text-xs font-semibold uppercase tracking-wide mb-2">
                  {impactLabel}
                </div>
                <div className="text-[var(--color-text-link-default)] font-semibold text-sm">
                  {impactCell(decision)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}