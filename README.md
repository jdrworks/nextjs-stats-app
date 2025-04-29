## About

This app exists as both a learning project and as a tool for me to more easily manage card game statistics for my friends and I.

This is a work in progress, and I try to keep my commits manageable to show my work and thought process as a portfolio piece.

Currently, the app will render Player, Deck, and Game information. It will also calculate various stats based on wins, losses, game sizes, etc.

I plan on adding a user/auth system so I can host this app for my friends to see while preventing unauthorized data manipulation. Additionally, I plan to make the app Responsive/Mobile friendly as well.

The tech stack currently consists of:
* Next.js
  * Next is using the App Router
* Prsima ORM
* MySQL database (hosted locally with a vanilla docker image)
* Tailwind CSS
* Heroicons

# Instructions
If you would like to run this project locally:

```bash
npm install

docker run -d --name test-mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 mysql

npx prisma migrate
npx prisma generate

npm run dev
```
Additionally, you'll need to configure a `.env` with the following:

```env
DATABASE_URL="mysql://root:password@localhost:3306/magicstats"
```
