import ClientComponentA from "./ClientComponentA";
import ClientComponentB from "./ClientComponentB";
import QueryClientProviderInstance from "./QueryClientProviderInstance";

export default function PostsPage() {
  return (
    <QueryClientProviderInstance>
      <section>
        <h2>Top area</h2>
        <ClientComponentA />
      </section>

      <div style={{ height: 40 }} />

      <aside>
        <h2>Sidebar area</h2>
        <ClientComponentB />
      </aside>
    </QueryClientProviderInstance>
  );
}
