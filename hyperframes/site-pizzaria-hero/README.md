# HyperFrames · Site para pizzaria

Filme de campanha da oferta de site para pizzaria por €149,90. Conta o mesmo pedido que o mockup interativo da landing `/site-pizzaria` mostra: o cliente abre o site, escolhe a pizza, monta, confere o carrinho e o WhatsApp abre com o pedido escrito.

A landing não carrega o runtime do HyperFrames nem usa vídeo: o mockup da página é interativo. Este projeto produz os criativos do anúncio e a imagem social (`public/site-pizzaria/og.jpg`).

## Estrutura

- `index.html` · desktop 1600 × 1000 · 13 s
- `compositions/mobile.html` · mobile 1080 × 1920 · 13 s
- `assets/screens/` · telas reais de https://bellanapoli.cenlo.pt/ capturadas a 390 × 844 (as mesmas de `public/site-pizzaria/`)
- `assets/styles.css`, `assets/timeline.js` · visual e timeline partilhados; cada composição regista a sua timeline
- `assets/fonts/` · Schibsted Grotesk e Hanken Grotesk locais

A conversa do WhatsApp é uma ilustração identificada no próprio quadro. O texto é o que o template do site monta (`buildWhatsAppMessage`), sem a linha `Ref.`.

## Validação

```bash
cd hyperframes/site-pizzaria-hero
npx --yes hyperframes@0.8.179 check .
npx --yes hyperframes@0.8.179 snapshot . --at 1.2,3.4,5.5,7.4,9.6,11.2,12.6
```

## Render

Direção aprovada por Pedro em 20/10/2026. Arquivos em `public/site-pizzaria/`: `filme-desktop.mp4` (1,4 MB), `filme-desktop.webm`, `filme-desktop-poster.jpg`, `filme-mobile.mp4` (1,8 MB), `filme-mobile.webm`, `filme-mobile-poster.jpg`. Os posters são o quadro 3,6 s. Para refazer:

```bash
cd hyperframes/site-pizzaria-hero
npx --yes hyperframes@0.8.179 render . --video-frame-format png --crf 22 -o ../../public/site-pizzaria/filme-desktop.mp4
npx --yes hyperframes@0.8.179 render . --format webm --video-frame-format png -o ../../public/site-pizzaria/filme-desktop.webm
npx --yes hyperframes@0.8.179 render . -c compositions/mobile.html --video-frame-format png --crf 22 -o ../../public/site-pizzaria/filme-mobile.mp4
npx --yes hyperframes@0.8.179 render . -c compositions/mobile.html --format webm --video-frame-format png -o ../../public/site-pizzaria/filme-mobile.webm
```

Posters: `ffmpeg -ss 3.6 -i filme-<formato>.mp4 -frames:v 1 -q:v 3 filme-<formato>-poster.jpg`.

## Imagem social

`public/site-pizzaria/og.jpg` sai do quadro 3,6 s do desktop, recortado em 1600 × 840 e reduzido para 1200 × 630.
