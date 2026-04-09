PDFs are dead. I started selling interactive web apps as digital products and it changed everything.
POD
Everyone in this sub talks about selling PDFs on Etsy. I did too. Made decent money. But let me tell you what happened when I switched to something nobody else is doing.
Instead of a static PDF that people print and forget about, I started giving buyers a single .html file they open in their browser. It looks and works like a real app. Checkboxes that actually check. Fields you can type in. Progress bars that fill up as you use it. Your data saves automatically. Works offline. No account needed, no subscription, nothing to install.

One file. Double click it. It opens in Chrome or Safari and it works.

Why this kills PDFs

A PDF is a printed page on a screen. Nobody fills them in digitally because the experience sucks. You either print it and lose it, or you try to type in the fields with Adobe and rage quit.

An HTML file is different. It behaves like an app. People actually USE it because it feels good to use. And when people use your product, they leave better reviews, they tell friends about it, and they don't ask for refunds.

My return rate went from about 8% on PDFs to basically zero on interactive files. Because the perceived value is completely different. A PDF feels like it should be free. An interactive tool feels like it should cost $20/month.

How I build them

I'm not a developer. I'm a regular person with a day job. Here's what I use:

A single HTML file with Tailwind CSS loaded from a CDN. Everything is in one file. The styling, the javascript, the content, all of it. No server, no hosting, no database. The data saves in the buyer's browser using localStorage.

The structure is simple. A header with the product title. A progress bar at the top. Tabs for different sections. Inside each tab, a mix of input fields, checklists, dropdown menus, sliders, and text areas. A dark mode toggle because people love that. An export button so they can backup their data as a JSON file.

If you know basic HTML you can build one in a weekend. If you don't, tools like Claude or ChatGPT can generate the whole thing from a description. I just describe what I want each section to do and what fields it needs.

What works as an interactive product

Anything where someone needs to track, log, or measure something over time. Health trackers are obvious but here are some others that surprised me with how well they sell:

Sourdough starter troubleshooting trackers. You log your daily feeding, temperature, rise time, smell, and it helps you figure out what's going wrong. Sounds niche but the sourdough community is obsessive.

Home renovation decision trackers. Room by room budget, contractor comparison, material choices, timeline. People doing a reno are overwhelmed and will pay $10 for something that organizes the chaos.

Pet training milestone trackers. Daily training log, commands learned, behavior notes, vet visit schedule. New puppy owners are desperate for structure.

The pattern is always the same: find someone in the middle of a stressful process who needs to track multiple things at once. Give them a tool that does it beautifully.

The pricing difference

I used to sell PDFs at 5 to 7 bucks and it felt right for what they were. The interactive versions I sell at 10 to 15 and nobody complains because it genuinely feels like a different category of product. You're not selling a document anymore. You're selling a tool.

What the file actually looks like inside

The tabs across the top let you switch between sections. Each section has forms with real inputs, checkboxes with satisfying animations, dropdown menus with relevant options, and sliders for things like pain level or satisfaction scores. Everything auto saves so if you close the browser and come back a week later your data is still there.

I include an export button that downloads all your data as a JSON file and an import button to restore it. Some people want to use the tracker on multiple devices so this lets them move their data around without any cloud service.

The dark mode toggle is surprisingly important. Sounds silly but I get comments about it constantly. People use these trackers at night and appreciate not getting blasted with white light.

The competitive moat

This is what excited me the most. Any random person with Canva can copy your PDF in an hour. But a working interactive HTML file with localStorage, tab navigation, progress tracking, and auto save? That takes actual skill or tools that most sellers don't have.

I've been selling these for weeks now and I haven't seen a single competitor doing it. The Etsy search results for any niche are still 100% static PDFs and printables. You show up with something that actually works and you're in a different league.

If you want to try it

Start with one niche you understand. Map out what someone would need to track (4 to 6 sections, each with 5 to 8 fields). Build it in a single HTML file. Make sure localStorage works so data persists. Test it on mobile because a lot of people use their phone. Price it at $10 minimum.

The first one takes effort. After that you have a template and you're just swapping the content for each new niche.

Happy to answer questions. I'll be around all weekend.

---

## Estado del proyecto: Certificado Builder

**Objetivo**: Crear un builder de plantillas de certificados/constancias donde:
1. Se sube una imagen de plantilla (PNG/JPG)
2. Se definen campos interactivos (nombre, foto, categoría)
3. Se exporta un HTML interactivo que otra persona puede completar


**Funcionalidad del builder**:
1. Subir imagen de plantilla
2. Seleccionar tipo de campo (Nombre 📝, Foto 📷, Categoría 🏆)
3. Hacer clic en la imagen para posicionar cada campo
4. Los campos se pueden arrastrar para reubicarlos
5. Exportar genera un HTML standalone con localStorage

**Último estado**: El builder tiene bugs - los campos no se pueden crear clickeando en la imagen. Se hicieron fixes en el CSS y JS pero aún no se probó correctamente. El MCP de Playwright está configurado y conectado para testing.

**Próximo paso**: Depurar por qué no se pueden crear los campos en la imagen.