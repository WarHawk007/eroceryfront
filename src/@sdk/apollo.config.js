module.exports = {
  client: {
    includes: ["./queries/*.ts", "./mutations/*.ts", "./fragments/*.ts"],
    service: {
      name: "erocery",
      url: "http://localhost:8000/graphql/"
    }
  }
};
