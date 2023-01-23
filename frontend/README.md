## Para inicializar um novo projeto com o Tailwind CSS

```
npx tailwindcss init -p
```

## Configure no arquivo `tailwind.config.cjs` para aplicar o tailwind a todos os arquivos .tsx e no index.html:

```js
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
}
```
