import { codeToHtml } from "shiki";
import { CodeCopy } from "./code-copy";

const code = `const session = await relay.checkout.create({
  amount: 4900,
  currency: 'jpy',
  customer: 'cus_tanaka_872x',
  line_items: [{
    name: 'Pro Plan',
    quantity: 1,
  }],
  success_url: 'https://sakuratech.jp/order/complete',
});

await relay.webhooks.deliver(session.id);`;

export async function CodeShowcase() {
  const highlighted = await codeToHtml(code, {
    lang: "typescript",
    theme: "github-light",
  });

  return (
    <section
      id="developers"
      className="section overflow-hidden bg-background py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
        <CodeCopy />

        <div className="w-full lg:w-1/2">
          <div className="card overflow-hidden shadow-xl shadow-black/5">
            <div className="flex items-center gap-2 border-b border-default bg-zinc-50 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs text-tertiary">
                checkout.ts
              </span>
            </div>
            <div
              className="overflow-x-auto p-6 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!font-mono"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
