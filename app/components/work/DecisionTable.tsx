import React from "react";

export default function DecisionTable({
  decisions
}: {
  decisions: Array<{
    point: string;
    options: string[];
    rationale: string;
    impact: string;
  }>;
}) {
  return (
    <>
      {/* Desktop Table View - hidden on mobile */}
      <div className="hidden lg:block bg-[var(--color-text-inverse)]/[0.03] backdrop-blur-xl border border-[var(--color-text-inverse)]/10 rounded-xl overflow-hidden">
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
                  Impact
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
                    {decision.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - visible only on mobile */}
      <div className="lg:hidden space-y-4">
        {decisions.map((decision, index) => (
          <div
            key={index}
            className="bg-[var(--color-text-inverse)]/[0.03] backdrop-blur-xl border border-[var(--color-text-inverse)]/10 rounded-xl p-5"
          >
            <h3 className="text-[var(--color-text-inverse)] font-semibold text-base mb-4">
              {decision.point}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="text-[var(--color-text-inverse)]/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Options Considered
                </div>
                <div className="text-[var(--color-text-primary)] text-sm space-y-1">
                  {decision.options.map((option, i) => (
                    <div key={i}>{i + 1}. {option}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-inverse)]/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Why We Chose
                </div>
                <div className="text-[var(--color-text-primary)] text-sm">
                  {decision.rationale}
                </div>
              </div>

              <div>
                <div className="text-[var(--color-text-inverse)]/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Impact
                </div>
                <div className="text-[var(--color-text-link-default)] font-semibold text-sm">
                  {decision.impact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}