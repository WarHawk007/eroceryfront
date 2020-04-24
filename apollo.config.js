module.exports = {
  client: {
    service: {
      name: "erocery",
      url: "http://localhost:8000/graphql/",
      includes: ["./**/*.js", "./**/*.ts"],
      excludes: ["**/__tests__/**/*"],
    },
  },
};
