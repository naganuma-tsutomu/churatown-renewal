FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Tailwind CSS v4 requires env to build sometimes, but it's fine.
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
