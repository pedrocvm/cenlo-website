# HyperFrames · Site para pizzaria

Composições determinísticas para gerar os filmes de campanha e os posters da landing `/site-pizzaria`.

A landing não carrega o runtime do HyperFrames. Os ficheiros renderizados são assets estáticos de produção. As composições usam HTML, CSS, JavaScript e uma timeline GSAP finita, conforme o contrato do HyperFrames.

## Composições

- `desktop/` · 1600 × 1000 · 10 segundos
- `mobile/` · 1080 × 1920 · 10 segundos

As imagens usadas na composição são telas reais do tenant de demonstração Bella Napoli, servidas atualmente por `cenlofood.cenlo.pt`.

## Preparação

Na raiz do repositório

```bash
npx hyperframes doctor
npx hyperframes lint hyperframes/site-pizzaria-hero/desktop
npx hyperframes lint hyperframes/site-pizzaria-hero/mobile
```

## Preview

```bash
npx hyperframes preview hyperframes/site-pizzaria-hero/desktop
npx hyperframes preview hyperframes/site-pizzaria-hero/mobile --port 3003
```

## Snapshots de revisão

```bash
npx hyperframes snapshot hyperframes/site-pizzaria-hero/desktop --at 0.5,2.6,4.8,7.3,9.5
npx hyperframes snapshot hyperframes/site-pizzaria-hero/mobile --at 0.5,2.6,4.8,7.3,9.5
```

## Render final

Execute cada comando dentro da pasta correspondente, porque o CLI usa o `index.html` da pasta atual.

```bash
cd hyperframes/site-pizzaria-hero/desktop
npx hyperframes render --docker --fps 30 --quality high --output ../../../public/site-pizzaria/hero-desktop.mp4
npx hyperframes render --docker --format webm --fps 30 --quality high --output ../../../public/site-pizzaria/hero-desktop.webm

cd ../mobile
npx hyperframes render --docker --fps 30 --quality high --output ../../../public/site-pizzaria/hero-mobile.mp4
npx hyperframes render --docker --format webm --fps 30 --quality high --output ../../../public/site-pizzaria/hero-mobile.webm
```

A renderização final ainda precisa ser executada num ambiente com Chrome, FFmpeg e Docker disponíveis. Até lá, a landing usa o vídeo real de demonstração que já existe no Cenlo Food.

## Sequência

1. Busca por `pizzaria perto de mim`
2. Informações dispersas
3. Entrada do site no telemóvel
4. Cardápio
5. Carrinho e WhatsApp
6. Oferta de €149,90

O vídeo é silencioso e termina numa composição visual próxima do primeiro frame, reduzindo a percepção do corte quando usado em loop.
