

# 🌤️ Weather App Next.js

Projeto de previsão do tempo moderno, responsivo e rápido, desenvolvido com Next.js, React e TailwindCSS.

🔗 **Acesse o projeto publicado:** [https://weather-app-nextjs-mauve.vercel.app/](https://weather-app-nextjs-mauve.vercel.app/)

---

## ✨ Funcionalidades

- Busca de cidades com sugestões automáticas (ignora acentos e caracteres especiais)
- Exibe clima atual, detalhes e previsão para os próximos dias
- Interface responsiva e animada
- Consome dados da API OpenWeatherMap
- Deploy automático na Vercel

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TailwindCSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [Lucide React](https://lucide.dev/) (ícones)

## 🖥️ Como rodar localmente

1. Clone o repositório:
	```bash
	git clone https://github.com/seu-usuario/weather-app-nextjs.git
	cd weather-app-nextjs
	```
2. Instale as dependências:
	```bash
	npm install
	# ou yarn install
	```
3. Crie um arquivo `.env.local` com sua chave da API OpenWeatherMap:
	```env
	NEXT_PUBLIC_WEATHER_API_KEY=SuaChaveAqui
	```
4. Rode o projeto:
	```bash
	npm run dev
	# ou yarn dev
	```
5. Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Deploy

O deploy é feito automaticamente na [Vercel](https://vercel.com/). Basta conectar o repositório e configurar a variável de ambiente `NEXT_PUBLIC_WEATHER_API_KEY`.

## 📄 Licença

Este projeto é open-source e está sob a licença MIT.

---

<p align="center">
  <a href="https://weather-app-nextjs-mauve.vercel.app/" target="_blank"><img src="public/globe.svg" width="80" alt="Weather App" /></a>
</p>
