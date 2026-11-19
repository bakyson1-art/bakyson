export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-6 text-muted-foreground">Get in touch for a free consultation.</p>
        <form className="mt-8 space-y-4 max-w-md">
          <input className="w-full rounded-md border border-border px-4 py-2" placeholder="Name" />
          <input className="w-full rounded-md border border-border px-4 py-2" placeholder="Email" />
          <textarea className="w-full rounded-md border border-border px-4 py-2" rows={4} placeholder="Message" />
          <button className="rounded-md bg-primary text-white px-6 py-2">Send</button>
        </form>
      </section>
    </div>
  );
}
